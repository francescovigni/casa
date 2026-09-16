import { describe, it, expect } from "vitest";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import Consent from "../src/components/Consent.astro";
import Footer from "../src/components/Footer.astro";
import { CONSENT_MAX_AGE, consentCookie, readConsent } from "../src/lib/consent";
import { SITE } from "../src/data/site";

const container = await AstroContainer.create();
const render = (locale: "en" | "it") => container.renderToString(Consent, { props: { locale } });

describe("readConsent", () => {
  it("is null until the visitor chooses, so the card shows", () => {
    expect(readConsent("")).toBeNull();
    expect(readConsent("lang=it")).toBeNull();
  });

  it("reads either answer among other cookies", () => {
    expect(readConsent("lang=it; consent=replay")).toBe("replay");
    expect(readConsent("consent=none; lang=en")).toBe("none");
  });

  it("treats anything unexpected as no answer yet", () => {
    expect(readConsent("consent=yes")).toBeNull();
    expect(readConsent("consent=")).toBeNull();
    expect(readConsent("notconsent=replay")).toBeNull();
  });
});

describe("consentCookie", () => {
  it("round-trips through readConsent", () => {
    for (const choice of ["replay", "none"] as const) {
      expect(readConsent(consentCookie(choice).split(";")[0])).toBe(choice);
    }
  });

  it("lasts six months, the Garante's floor before asking again after a refusal", () => {
    expect(CONSENT_MAX_AGE).toBeGreaterThanOrEqual(60 * 60 * 24 * 180);
    expect(consentCookie("none")).toContain(`max-age=${CONSENT_MAX_AGE}`);
    expect(consentCookie("none")).toContain("path=/");
  });
});

describe("the consent card", () => {
  it("renders hidden, so nobody sees a flash before their stored answer is read", async () => {
    expect(await render("en")).toMatch(/<div[^>]*data-consent[^>]*\shidden/);
  });

  it("carries the recorder it will load, and loads nothing itself", async () => {
    const html = await render("en");
    const { host, websiteId } = SITE.analytics;
    expect(html).toContain(`data-recorder-src="${host}/recorder.js"`);
    expect(html).toContain(`data-website-id="${websiteId}"`);
    expect(html).not.toMatch(/<script[^>]+src="[^"]*recorder\.js"/);
  });

  it("gives Reject and Accept the same weight", async () => {
    const html = await render("en");
    const reject = html.match(/<button[^>]*data-consent-choice="none"[^>]*class="([^"]+)"/)?.[1];
    const accept = html.match(/<button[^>]*data-consent-choice="replay"[^>]*class="([^"]+)"/)?.[1];
    expect(reject).toBeTruthy();
    expect(reject).toBe(accept);
    // Equal columns, so a longer label cannot make one button bigger.
    expect(html).toMatch(/<div class="[^"]*grid-cols-2[^"]*"[^>]*>\s*<button[^>]*data-consent-choice="none"/);
  });

  it("asks in the visitor's language and links the matching policy", async () => {
    const en = await render("en");
    const it = await render("it");
    expect(en).toContain(">Reject<");
    expect(en).toContain(">Accept<");
    expect(en).toContain('href="/privacy/"');
    expect(it).toContain(">Rifiuta<");
    expect(it).toContain(">Accetta<");
    expect(it).toContain('href="/it/privacy/"');
  });

  it("promises masking, so the question is answerable", async () => {
    expect(await render("en")).toMatch(/masked/);
    expect(await render("it")).toMatch(/mascherato/);
  });
});

describe("withdrawing", () => {
  it("is one click away in the footer, in both languages", async () => {
    const en = await container.renderToString(Footer, { props: { locale: "en" } });
    const it = await container.renderToString(Footer, { props: { locale: "it" } });
    expect(en).toMatch(/<button[^>]*data-consent-open[^>]*>\s*Privacy settings\s*</);
    expect(it).toMatch(/<button[^>]*data-consent-open[^>]*>\s*Preferenze privacy\s*</);
  });
});
