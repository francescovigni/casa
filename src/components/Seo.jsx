import React from "react";

const Seo = ({ title, description }) => {
  const siteTitle = "Francesco Vigni";
  const defaultDescription =
    "ML Engineer & Robotics Researcher — Applied ML, Computer Vision, Human-Robot Interaction.";

  return (
    <>
      <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
};

export default Seo;
