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
	"Humanitas Research Hospital",
	"Computer Vision",
	"EHDS",
	"HRI Research",
	"Edge AI",
];

const LinkedInIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
		<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
	</svg>
);

const MailIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
		<rect width="20" height="16" x="2" y="4" rx="2"/>
		<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
	</svg>
);

const actionLinks = [
	{
		label: "Connect on LinkedIn",
		href: "https://www.linkedin.com/in/francesco-vigni/",
		accent: false,
		icon: LinkedInIcon,
	},
	{
		label: "Write me",
		href: "mailto:hello@francescovigni.com",
		accent: true,
		icon: MailIcon,
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
							Applied Research Scientist
						</p>
						<p className="text-sm text-gray-500 mt-0.5">Forlì, Italy</p>
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
					{actionLinks.map((link) => {
						const Icon = link.icon;
						return (
							<a
								key={link.href}
								href={link.href}
								className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-colors ${
									link.accent
										? "bg-primary-600 text-white hover:bg-primary-700"
										: "bg-white border border-gray-200 text-gray-800 hover:bg-gray-50"
								}`}
							>
								<Icon />
								{link.label}
							</a>
						);
					})}
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
