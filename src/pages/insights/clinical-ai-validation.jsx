import React from "react";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import Article from "../../components/Article";
import { getArticle } from "../../data/insights";

const SLUG = "clinical-ai-validation";

const ClinicalAiValidationPage = () => (
  <Layout locale="en" path={`/insights/${SLUG}/`}>
    <Article slug={SLUG} locale="en" />
  </Layout>
);

export default ClinicalAiValidationPage;

export const Head = () => {
  const article = getArticle(SLUG);
  return (
    <Seo
      title={article.title.en}
      description={article.summary.en}
      locale="en"
      pathname={`/insights/${SLUG}/`}
      type="article"
    />
  );
};
