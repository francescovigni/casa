import React from "react";
import Layout from "../../../components/Layout";
import Seo from "../../../components/Seo";
import Article from "../../../components/Article";
import { getArticle } from "../../../data/insights";

const SLUG = "clinical-ai-validation";

const ClinicalAiValidationPageIt = () => (
  <Layout locale="it" path={`/it/approfondimenti/${SLUG}/`}>
    <Article slug={SLUG} locale="it" />
  </Layout>
);

export default ClinicalAiValidationPageIt;

export const Head = () => {
  const article = getArticle(SLUG);
  return (
    <Seo
      title={article.title.it}
      description={article.summary.it}
      locale="it"
      pathname={`/it/approfondimenti/${SLUG}/`}
      type="article"
    />
  );
};
