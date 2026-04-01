import React from "react";
import Seo from "../components/Seo";

const mecspeLogo = "https://senaf-mecspe.s3.eu-west-1.amazonaws.com/2024/12/mecspe_logo_it.svg";

const quickFacts = [
	{
		label: "Currently",
		value: "Medical AI Consulting",
		detail: "Building foundation model for gastroenterology.",
	},
	{
		label: "Engineering",
		value: "Robot minds",
		detail: "Jetson deployments, perception stacks, safety loops.",
	},
	{
		label: "Research",
		value: "Human-centered robotics",
		detail: "HRI, proxemics, social cues for service robots.",
	},
	{
		label: "Base",
		value: "Forlì · Remote-first",
		detail: "Collaborating with EU & North America teams.",
	},
];

const highlights = [
	{
		title: "Ph.D. — Univ. of Naples",
		detail:
			"MSCA fellow. Explored spontaneous human-robot encounters and interaction metrics.",
	},
	{
		title: "Trusted by",
		detail: "Disney Research, TU Munich, TU Wien, Roboception, Noosware, Daimler dealers.",
	},
	{
		title: "What I ship",
		detail: "Perception pipelines, social behaviors, ML-backed tooling for autonomous services.",
	},
];

const actionLinks = [
	{
		label: "Linkedin",
		href: "https://www.linkedin.com/in/francesco-vigni/",
	},
	{
		label: "Write me",
		href: "mailto:hello@francescovigni.com",
		accent: true,
	},
];

const pillItems = [
	"Medical AI Consulting",
	"Full-stack ROS2 tooling",
	"ROS2 + Jetson deployments",
	"Jetson + CV deployments",
];


import { useEffect } from "react";
import { navigate } from "gatsby";

const BcPage = () => {
  useEffect(() => {
    navigate("/", { replace: true });
  }, []);
  return null;
};

export default BcPage;

export const Head = () => (
	<>
		<Seo title="Business Card Landing" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
		<link
			href="https://fonts.googleapis.com/css2?family=General+Sans:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
			rel="stylesheet"
		/>
	</>
);
