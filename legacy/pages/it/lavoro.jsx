import React from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import Work from "../../components/Work";

const LavoroPage = () => (
  <Layout locale="it" path="/it/lavoro/">
    <Work locale="it" />
  </Layout>
);

export default LavoroPage;

export const Head = () => (
  <Seo
    title="Lavoro"
    description="Una selezione di progetti, ricerca peer-reviewed ed esperienza professionale tra AI medica e robotica."
    locale="it"
    pathname="/it/lavoro/"
  />
);
