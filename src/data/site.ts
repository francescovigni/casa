// One source of truth for the site's own urls and identities. Anything that
// renders a link to "me somewhere else" reads it from here, so the Person
// JSON-LD, the footer, and the portfolio note can never drift apart.

export const SITE = {
  /** Canonical origin. No trailing slash: everything appends a rooted path. */
  url: "https://francescovigni.com",
  /**
   * The standalone research site the /research/ pages were ported from. Still
   * online, still the place the write-ups first appeared; francescovigni.com
   * /research/ is the canonical copy.
   */
  portfolio: "https://portfolio.francescovigni.com",
  email: "hello@francescovigni.com",
  profiles: {
    scholar: "https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en",
    linkedin: "https://www.linkedin.com/in/francesco-vigni",
    github: "https://github.com/francescovigni",
    orcid: "https://orcid.org/0000-0001-9918-8485",
  },
} as const;
