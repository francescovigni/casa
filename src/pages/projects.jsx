import React, { useEffect } from "react";
import { navigate } from "gatsby";

const ProjectsRedirect = () => {
  useEffect(() => {
    navigate("/portfolio/", { replace: true });
  }, []);
  return null;
};

export default ProjectsRedirect;

export const Head = () => (
  <>
    <title>Redirecting…</title>
    <meta httpEquiv="refresh" content="0; url=/portfolio/" />
    <link rel="canonical" href="https://francescovigni.com/portfolio/" />
    <meta name="robots" content="noindex" />
  </>
);
