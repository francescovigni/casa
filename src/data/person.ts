// Person JSON-LD, emitted on both homepages and on /research/. A stable @id
// lets search engines treat the EN page, the IT page and the research index as
// one entity; sameAs ties the standalone portfolio subdomain to that entity
// instead of letting it read as a second, unrelated person.
import type { Locale } from "../i18n";
import { SITE } from "./site";

export interface AlumniOrganization {
  "@type": "EducationalOrganization";
  name: string;
}

export interface PersonJsonLd {
  "@context": "https://schema.org";
  "@type": "Person";
  "@id": string;
  name: string;
  alternateName: string;
  url: string;
  jobTitle: string;
  alumniOf: AlumniOrganization[];
  sameAs: string[];
}

const JOB_TITLE: Record<Locale, string> = {
  en: "Applied AI and ML Engineer",
  it: "Ingegnere AI / ML applicata",
};

export function personJsonLd(locale: Locale = "en"): PersonJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE.url}/#person`,
    name: "Francesco Vigni",
    alternateName: "Francesco Vigni, PhD",
    url: SITE.url,
    jobTitle: JOB_TITLE[locale] ?? JOB_TITLE.en,
    alumniOf: [
      { "@type": "EducationalOrganization", name: "University of Naples Federico II" },
      { "@type": "EducationalOrganization", name: "University of Siena" },
    ],
    sameAs: [SITE.portfolio, ...Object.values(SITE.profiles)],
  };
}
