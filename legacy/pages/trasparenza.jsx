import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

// Star pointing up (outer r=30, inner r≈11.46), centred on the origin —
// reused 12× to build the European emblem.
const STAR_POINTS =
  "0,-30 6.74,-9.27 28.53,-9.27 10.9,3.54 17.63,24.27 0,11.46 -17.63,24.27 -10.9,3.54 -28.53,-9.27 -6.74,-9.27";

// The 12 star centres, evenly spaced on a circle (R=180) around (405,270).
const STAR_CENTRES = [
  [405, 90], [495, 114], [561, 180], [585, 270], [561, 360], [495, 426],
  [405, 450], [315, 426], [249, 360], [225, 270], [249, 180], [315, 114],
];

const EuEmblem = () => (
  <svg
    viewBox="0 0 810 540"
    className="h-12 w-auto rounded-sm"
    role="img"
    aria-label="Cofinanziato dall'Unione europea"
  >
    <rect width="810" height="540" fill="#003399" />
    <defs>
      <polygon id="eu-star" points={STAR_POINTS} fill="#FFCC00" />
    </defs>
    {STAR_CENTRES.map(([x, y]) => (
      <use key={`${x}-${y}`} href="#eu-star" x={x} y={y} />
    ))}
  </svg>
);

const rows = [
  ["Soggetto beneficiario", "Ing. Francesco Vigni — libero professionista, Forlì (FC)"],
  [
    "Soggetto erogante",
    "Invitalia S.p.A., per conto del Ministero del Lavoro e delle Politiche Sociali",
  ],
  ["Data del provvedimento di concessione", "18 maggio 2026"],
  ["CUP", "C66I26001050001"],
  ["Codice Concessione RNA (COR)", "26000994"],
];

const TrasparenzaPage = () => {
  return (
    <Layout locale="it" path="/trasparenza/">
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray prose-sm">
            <h1>Trasparenza delle erogazioni pubbliche</h1>
            <p>
              In adempimento agli obblighi di pubblicazione e trasparenza delle
              erogazioni pubbliche previsti dall'art. 1, commi 125–129, della
              legge 4 agosto 2017, n. 124, si pubblicano di seguito le
              informazioni relative ai contributi pubblici ricevuti.
            </p>
          </div>

          <dl className="mt-8 divide-y divide-gray-100 border-y border-gray-100">
            {rows.map(([label, value]) => (
              <div
                key={label}
                className="py-3 sm:grid sm:grid-cols-3 sm:gap-4"
              >
                <dt className="text-sm font-medium text-gray-500">{label}</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="prose prose-gray prose-sm mt-8">
            <p>
              Aiuto registrato nel Registro Nazionale degli Aiuti di Stato (RNA)
              con codice COR 26000994 e concesso in regime «de minimis» ai sensi
              del Regolamento (UE) 2023/2831.
            </p>
          </div>

          <div className="mt-10 border-t border-gray-100 pt-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-3">
                <EuEmblem />
                <span className="text-sm text-gray-600 max-w-[12rem] leading-snug">
                  Cofinanziato dall'Unione europea
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-snug">
                Ministero del Lavoro e delle Politiche Sociali
                <span className="text-gray-300"> · </span>
                Invitalia
                <span className="text-gray-300"> · </span>
                Coesione Italia 2021–2027
              </p>
            </div>
          </div>

          <p className="mt-10 text-xs text-gray-400">
            Ultimo aggiornamento: 8 giugno 2026
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default TrasparenzaPage;

export const Head = () => (
  <Seo
    title="Trasparenza"
    locale="it"
    pathname="/trasparenza/"
    description="Informazioni sui contributi pubblici ricevuti, pubblicate ai sensi della legge 124/2017 (trasparenza delle erogazioni pubbliche)."
  />
);
