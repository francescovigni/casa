// Shared Person JSON-LD for the EN and IT homepages. A stable @id lets search
// engines treat the two locale homepages as one entity.
const personJsonLd = (locale = "en") => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://francescovigni.com/#person",
  name: "Francesco Vigni",
  alternateName: "Francesco Vigni, PhD",
  url: "https://francescovigni.com",
  image: "https://francescovigni.com/og-default.jpg",
  jobTitle: locale === "it" ? "Consulente AI per la Sanità" : "Medical AI Consultant",
  alumniOf: [
    { "@type": "EducationalOrganization", name: "University of Naples Federico II" },
    { "@type": "EducationalOrganization", name: "University of Siena" },
  ],
  sameAs: [
    "https://www.linkedin.com/in/francesco-vigni/",
    "https://github.com/francescovigni",
    "https://scholar.google.com/citations?user=ksO3xN0AAAAJ&hl=en",
    "https://orcid.org/0000-0001-9918-8485",
    "https://x.com/fra_cescovigni",
  ],
});

export default personJsonLd;
