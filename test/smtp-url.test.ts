import { describe, it, expect } from "vitest";
import { checkSmtpUrl, parseEnvFile } from "../scripts/smtp-url.mjs";

const GOOD = "smtps://me%40gmail.com:abcdefghijklmnop@smtp.gmail.com:465";

describe("checkSmtpUrl", () => {
  it("accepts a well-formed Gmail url", () => {
    const result = checkSmtpUrl(GOOD);
    expect(result.problems).toEqual([]);
    expect(result.ok).toBe(true);
  });

  it("never echoes the password back", () => {
    expect(checkSmtpUrl(GOOD).summary).toBe("smtps://me%40gmail.com:***@smtp.gmail.com:465");
  });

  it("catches an empty value, which silently drops every lead", () => {
    expect(checkSmtpUrl("").ok).toBe(false);
    expect(checkSmtpUrl(undefined).problems[0]).toMatch(/only reach the logs/);
  });

  it("catches quotes, which --from-env-file keeps literally", () => {
    expect(checkSmtpUrl(`"${GOOD}"`).problems.join(" ")).toMatch(/quotes/i);
  });

  it("catches the spaces Google shows in an app password", () => {
    const spaced = "smtps://me%40gmail.com:abcd efgh ijkl mnop@smtp.gmail.com:465";
    expect(checkSmtpUrl(spaced).problems.join(" ")).toMatch(/space/i);
  });

  it("accepts an unencoded @ in the username: the parser splits on the last one", () => {
    const unencoded = "smtps://me@gmail.com:abcdefghijklmnop@smtp.gmail.com:465";
    const result = checkSmtpUrl(unencoded);
    expect(result.ok).toBe(true);
    // Same credentials either way; %40 is canonical, not required.
    expect(result.summary).toBe(checkSmtpUrl(GOOD).summary);
  });

  it("catches an account password used instead of an app password", () => {
    const account = "smtps://me%40gmail.com:hunter2@smtp.gmail.com:465";
    expect(checkSmtpUrl(account).problems.join(" ")).toMatch(/app password/i);
  });

  it("catches a wrong Gmail port", () => {
    const wrongPort = "smtps://me%40gmail.com:abcdefghijklmnop@smtp.gmail.com:25";
    expect(checkSmtpUrl(wrongPort).problems.join(" ")).toMatch(/465|587/);
  });

  it("leaves non-Gmail hosts to their own rules", () => {
    expect(checkSmtpUrl("smtp://user:whatever-pw@mail.example.com:587").ok).toBe(true);
  });

  it("rejects a protocol that is not smtp", () => {
    expect(checkSmtpUrl("https://smtp.gmail.com").ok).toBe(false);
  });
});

describe("parseEnvFile", () => {
  it("keeps values literally, as kubectl --from-env-file does", () => {
    // node --env-file would strip these quotes; the cluster would not.
    const parsed = parseEnvFile('SMTP_URL="smtps://a:b@h:465"\n');
    expect(parsed.SMTP_URL).toBe('"smtps://a:b@h:465"');
    expect(checkSmtpUrl(parsed.SMTP_URL).problems.join(" ")).toMatch(/quotes/i);
  });

  it("skips comments and blank lines", () => {
    const parsed = parseEnvFile("# a comment\n\nSMTP_URL=smtp://x\n");
    expect(Object.keys(parsed)).toEqual(["SMTP_URL"]);
  });

  it("keeps everything after the first = intact", () => {
    expect(parseEnvFile("SMTP_URL=smtps://u:p=q@h:465").SMTP_URL).toBe("smtps://u:p=q@h:465");
  });
});
