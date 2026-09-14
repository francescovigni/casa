import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse as parseYaml } from "yaml";

const ROOT = join(import.meta.dirname, "..");
const CHART = join(ROOT, "deploy", "helm");

const hasHelm = (() => {
  try {
    execFileSync("helm", ["version", "--short"], { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
})();

/** Rendered manifests, as parsed documents. */
const render = (args: string[] = []): Record<string, any>[] => {
  const out = execFileSync("helm", ["template", "web", CHART, ...args], { encoding: "utf8" });
  return out
    .split(/^---$/m)
    .map((doc) => parseYaml(doc))
    .filter((doc): doc is Record<string, any> => Boolean(doc?.kind));
};

const kind = (docs: Record<string, any>[], k: string) => docs.filter((d) => d.kind === k);
const container = (docs: Record<string, any>[]) =>
  kind(docs, "Deployment")[0].spec.template.spec.containers[0];

describe.runIf(hasHelm)("helm chart, default (chart-managed secret)", () => {
  const docs = render();

  it("renders a Secret the deployment then consumes", () => {
    const secret = kind(docs, "Secret")[0];
    expect(secret.metadata.name).toBe("web-francescovigni-web-secret");
    expect(container(docs).envFrom).toContainEqual({
      secretRef: { name: "web-francescovigni-web-secret" },
    });
  });

  it("ships placeholder credentials, never real ones", () => {
    const secret = kind(docs, "Secret")[0];
    expect(secret.stringData.TWENTY_API_TOKEN).toBe("changeme");
    expect(secret.stringData.SMTP_URL).toBe("");
  });
});

describe.runIf(hasHelm)("helm chart, existingSecret (credentials from a .env)", () => {
  const docs = render(["--set", "existingSecret=web-env"]);

  it("renders no Secret at all, so Helm never holds the credentials", () => {
    expect(kind(docs, "Secret")).toHaveLength(0);
  });

  it("points envFrom at the secret you created yourself", () => {
    expect(container(docs).envFrom).toContainEqual({ secretRef: { name: "web-env" } });
  });

  it("keeps the non-secret config map either way", () => {
    expect(container(docs).envFrom).toContainEqual({
      configMapRef: { name: "web-francescovigni-web-config" },
    });
    expect(kind(docs, "ConfigMap")[0].data.LEAD_FALLBACK_EMAIL).toBe("hello@francescovigni.com");
  });
});

describe.runIf(hasHelm)("helm chart invariants", () => {
  const docs = render(["--set", "image.tag=2026-09-14"]);

  it("runs the pushed image on the documented port", () => {
    const c = container(docs);
    expect(c.image).toBe("ghcr.io/francescovigni/website:2026-09-14");
    expect(c.ports[0].containerPort).toBe(4321);
  });

  it("keeps the hardening the smoke test was run against", () => {
    const c = container(docs);
    expect(c.securityContext.readOnlyRootFilesystem).toBe(true);
    expect(c.securityContext.allowPrivilegeEscalation).toBe(false);
    expect(c.resources.limits.memory).toBe("256Mi");
  });

  it("exposes the NodePort Caddy proxies to", () => {
    const service = kind(docs, "Service")[0];
    expect(service.spec.type).toBe("NodePort");
    expect(service.spec.ports[0].nodePort).toBe(30080);
  });
});

describe("secrets cannot be committed by accident", () => {
  const gitignore = readFileSync(join(ROOT, ".gitignore"), "utf8");

  /** What git itself would do with a path, rather than what the file looks like. */
  const isIgnored = (path: string) => {
    try {
      execFileSync("git", ["check-ignore", "-q", path], { cwd: ROOT, stdio: "pipe" });
      return true;
    } catch {
      return false;
    }
  };

  it("ignores env files", () => {
    expect(gitignore).toMatch(/^\.env\*$/m);
  });

  it.each([".env", ".env.local", "web.env", "deploy/web.env", "prod.env"])(
    "git actually ignores %s",
    (path) => {
      // `.env*` alone misses web.env, which is the name the deploy docs use.
      expect(isIgnored(path)).toBe(true);
    },
  );

  it("still tracks the example, which carries no credentials", () => {
    expect(isIgnored("deploy/web.env.example")).toBe(false);
  });

  it("ignores local values files", () => {
    expect(gitignore).toMatch(/values\*\.local\.yaml|\*-values\.yaml/);
  });

  it("ships an example env file with no real credentials", () => {
    const example = join(ROOT, "deploy", "web.env.example");
    expect(existsSync(example)).toBe(true);
    const body = readFileSync(example, "utf8");
    expect(body).toMatch(/^SMTP_URL=/m);
    expect(body).toMatch(/^TWENTY_API_TOKEN=/m);
    expect(body).not.toMatch(/@[\w.]+:\d+|Bearer\s+\w{8}/);
  });
});
