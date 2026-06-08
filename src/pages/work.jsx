import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Work from "../components/Work";

const WorkPage = () => (
  <Layout locale="en" path="/work/">
    <Work locale="en" />
  </Layout>
);

export default WorkPage;

export const Head = () => (
  <Seo
    title="Work"
    description="Selected projects, peer-reviewed research, and professional experience across medical AI and robotics."
    locale="en"
    pathname="/work/"
  />
);
