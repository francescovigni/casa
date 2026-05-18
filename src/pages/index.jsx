import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Home from "../components/Home";
import personJsonLd from "../data/person";

const IndexPage = () => (
  <Layout locale="en" path="/">
    <Home locale="en" />
  </Layout>
);

export default IndexPage;

export const Head = () => (
  <>
    <Seo
      title="Home"
      description="Freelance medical AI consultant for IRCCS hospitals and medtech R&D teams — endoscopy foundation models, validation pipelines, EHDS-ready data governance."
      locale="en"
      pathname="/"
    />
    <script type="application/ld+json">
      {JSON.stringify(personJsonLd("en"))}
    </script>
  </>
);
