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

const BcPage = () => {
	const fontFamily = {
		fontFamily: '"Space Grotesk", "General Sans", sans-serif',
	};

	return (
		<div className="relative isolate min-h-screen overflow-hidden bg-[#03030a] text-white">
			<div className="absolute inset-0 -z-10">
				<div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-[#6247ff] opacity-40 blur-[130px]" />
				<div className="absolute bottom-[-4rem] left-[-2rem] h-[26rem] w-[26rem] rounded-full bg-[#00f5d4] opacity-25 blur-[150px]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_60%)]" />
				<div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,rgba(0,0,0,0)_50%)]" />
			</div>

			<div className="relative mx-auto flex max-w-4xl flex-col gap-10 px-6 py-12 md:gap-12 md:py-20" style={fontFamily}>
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/60">
						<span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_12px_rgba(190,242,100,0.9)]" />
						Direct line to Francesco Vigni
					</div>
					<h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
						Robots? Humans? <span className="text-lime-400">Both</span>.
					</h1>
					<p className="text-base text-white/80 md:text-lg">
						Robotics & AI Engineer (Ph.D.) bridging research labs and production teams. I build perception stacks, and deployment workflows for autonomous systems.
					</p>
				</div>

				<div className="rounded-[32px] border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-white/10 p-6">
					<p className="text-sm uppercase tracking-[0.4em] text-white/60">Let’s add momentum</p>
					<p className="mt-3 text-2xl font-semibold text-white">
						Need a robotics partner? I help teams validate, prototype, and deploy.
					</p>
					<p className="mt-2 text-sm text-white/70">
						Typical engagement: diagnostics call → technical scope → pilot build for your platform.
					</p>
					<div className="mt-5 flex flex-wrap gap-3">
						{actionLinks.map((action) => (
							<a
								key={action.label}
								href={action.href}
								className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
									action.accent
										? "bg-white text-black hover:bg-white/90"
										: "border border-white/30 text-white hover:border-white"
								}`}
							>
								{action.label}
							</a>
						))}
					</div>
				</div>

				<div className="mt-2 flex flex-wrap items-center gap-3 rounded-[28px] border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
					<span className="text-[10px] font-semibold uppercase tracking-[0.45em] text-white/70">
						Next stop
					</span>
					<img
						src={mecspeLogo}
						alt="MECSPE logo"
						className="h-8 w-auto drop-shadow-[0_6px_20px_rgba(3,3,10,0.5)]"
					/>
					<span className="text-sm text-white/75">
						Meet me at MECSPE Bologna · Mar 6–8
					</span>
				</div>

				<div className="grid gap-4 rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur lg:grid-cols-2">
					{quickFacts.map((item) => (
						<div key={item.label} className="rounded-2xl border border-white/5 p-4">
							<p className="text-[11px] uppercase tracking-[0.3em] text-white/50">
								{item.label}
							</p>
							<p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
							<p className="mt-1 text-sm text-white/70">{item.detail}</p>
						</div>
					))}
				</div>

				<div className="flex flex-wrap gap-2">
					{pillItems.map((pill) => (
						<span
							key={pill}
							className="rounded-full border border-white/15 bg-white/10 px-4 py-1 text-xs font-medium uppercase tracking-wide text-white/80"
						>
							{pill}
						</span>
					))}
				</div>

				<div className="grid gap-5 md:grid-cols-3">
					{highlights.map((item) => (
						<div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
							<p className="text-sm font-semibold text-white">{item.title}</p>
							<p className="mt-2 text-sm text-white/70">{item.detail}</p>
						</div>
					))}
				</div>

				<p className="text-xs uppercase tracking-[0.3em] text-white/50">
					Snapshot · Updated Mar 2026 · francescovigni.com/bc
				</p>
			</div>
		</div>
	);
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
