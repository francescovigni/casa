import React from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import Insights from "../../components/Insights";

const ApprofondimentiPage = () => (
  <Layout locale="it" path="/it/approfondimenti/">
    <Insights locale="it" />
  </Layout>
);

export default ApprofondimentiPage;

export const Head = () => (
  <Seo
    title="Approfondimenti"
    description="Note pratiche su come costruire un'AI clinica che superi validazione, governance e deployment reale."
    locale="it"
    pathname="/it/approfondimenti/"
  />
);
