import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import ContactBody from "../components/ContactBody";

const ContactPage = () => (
  <Layout locale="en" path="/contact/">
    <ContactBody locale="en" />
  </Layout>
);

export default ContactPage;

export const Head = () => (
  <Seo
    title="Contact"
    description="Contact Francesco Vigni for ROS2 medical AI consulting, edge ML endoscopy projects, and freelance robotics engineering collaborations."
    locale="en"
    pathname="/contact/"
  />
);
