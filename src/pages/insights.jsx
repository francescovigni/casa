import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Insights from "../components/Insights";

const InsightsPage = () => (
  <Layout locale="en" path="/insights/">
    <Insights locale="en" />
  </Layout>
);

export default InsightsPage;

export const Head = () => (
  <Seo
    title="Insights"
    description="Practical notes on building clinical AI that survives validation, governance, and real deployment."
    locale="en"
    pathname="/insights/"
  />
);
