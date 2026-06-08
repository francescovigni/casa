import React from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import ContactBody from "../../components/ContactBody";

const ContattiPage = () => (
  <Layout locale="it" path="/it/contatti/">
    <ContactBody locale="it" />
  </Layout>
);

export default ContattiPage;

export const Head = () => (
  <Seo
    title="Contatti"
    description="Contatta Francesco Vigni per consulenza di AI medica, progetti di edge ML per l'endoscopia e collaborazioni di ingegneria robotica."
    locale="it"
    pathname="/it/contatti/"
  />
);
