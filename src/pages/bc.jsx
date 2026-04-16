import React from "react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Seo from "../components/Seo";

const quickFacts = [
	{
		label: "Currently",
		value: "Medical AI Consulting",
		detail: "Building a foundation model for gastroenterology.",
	},
	{
		label: "Engineering",
		value: "Cloud Architecture",
		detail: "Optimizing training throughput and cost-efficiency.",
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

const trustedBy = [
	"Humanitas IRCCS",
	"TU Munich",
	"Disney Research",
	"TU Wien",
	"Università di Napoli Federico II",
	"Daimler",
];

const pills = [
	"Medical AI",
	"Computer Vision",
	"EHDS",
	"HRI Research",
	"Edge AI",
];

const actionLinks = [
	{
		label: "Connect on LinkedIn",
		href: "https://www.linkedin.com/in/francesco-vigni/",
		accent: false,
	},
	{
		label: "Write me",
		href: "mailto:hello@francescovigni.com",
		accent: true,
	},
];

const BcPage = () => {
	return (
		<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start py-12 px-4">
			<div className="w-full max-w-sm space-y-8">

				{/* ── Hero ── */}
				<div className="flex flex-col items-center text-center gap-4">
					<div className="w-50 h-50 rounded-full overflow-hidden ring-4 ring-primary-100 shadow-md">
						<StaticImage
							src="../images/IMG_0661.jpg"
							alt="Francesco Vigni"
							width={150}
							height={150}
							className="w-full h-full"
							placeholder="blurred"
						/>
					</div>
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Francesco Vigni, PhD</h1>
						<p className="text-primary-600 font-medium mt-1">
							AI Advisor
						</p>
						<p className="text-sm text-gray-500 mt-0.5">Forlì · Remote-first</p>
					</div>
					{/* Skills pills */}
					<div className="flex flex-wrap justify-center gap-2">
						{pills.map((p) => (
							<span
								key={p}
								className="text-xs font-medium bg-primary-50 text-primary-700 px-3 py-1 rounded-full"
							>
								{p}
							</span>
						))}
					</div>
				</div>

				{/* ── Quick facts ── */}
				<div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-50">
					{quickFacts.map((f) => (
						<div key={f.label} className="px-5 py-4">
							<span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
								{f.label}
							</span>
							<p className="font-semibold text-gray-900 mt-0.5">{f.value}</p>
							<p className="text-sm text-gray-500 mt-0.5">{f.detail}</p>
						</div>
					))}
				</div>

				{/* ── Trusted by ── */}
				<div>
					<p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3 text-center">
						Experience from
					</p>
					<div className="flex flex-wrap justify-center gap-2">
						{trustedBy.map((name) => (
							<span
								key={name}
								className="text-sm font-medium bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg shadow-sm"
							>
								{name}
							</span>
						))}
					</div>
				</div>

				{/* ── CTAs ── */}
				<div className="flex flex-col gap-3">
					{actionLinks.map((link) => (
						<a
							key={link.href}
							href={link.href}
							className={`w-full text-center py-3 px-6 rounded-xl font-semibold text-sm transition-colors ${
								link.accent
									? "bg-primary-600 text-white hover:bg-primary-700"
									: "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
							}`}
						>
							{link.label}
						</a>
					))}
				</div>

				{/* ── Footer link ── */}
				<p className="text-center text-xs text-gray-400">
					<Link to="/" className="hover:text-primary-500 transition-colors">
						See full portfolio →
					</Link>
				</p>
			</div>
		</div>
	);
};

export default BcPage;

export const Head = () => <Seo title="Francesco Vigni" description="Robotics & AI Engineer — Medical AI, Computer Vision, HRI." pathname="/bc/" />;
