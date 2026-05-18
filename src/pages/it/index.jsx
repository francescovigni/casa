import React from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import Home from "../../components/Home";
import personJsonLd from "../../data/person";

const IndexPageIt = () => (
  <Layout locale="it" path="/it/">
    <Home locale="it" />
  </Layout>
);

export default IndexPageIt;

export const Head = () => (
  <>
    <Seo
      title="Home"
      description="Consulente AI per la sanità — IRCCS e team di R&S medtech. Imaging, foundation model per l'endoscopia, governance dei dati EHDS. Dottorato in ICT for Health."
      locale="it"
      pathname="/it/"
    />
    <script type="application/ld+json">
      {JSON.stringify(personJsonLd("it"))}
    </script>
  </>
);
