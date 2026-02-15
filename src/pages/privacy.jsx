import React from "react";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

const PrivacyPage = () => {
  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray prose-sm">
          <h1>Privacy Policy</h1>
          <p className="text-gray-500 text-sm">
            Last updated: 15 February 2026
          </p>

          <h2>Data Controller</h2>
          <p>
            This website is operated by Francesco Vigni, based in Forlì, Italy.
            You can reach me at{" "}
            <a href="mailto:hello@francescovigni.com">hello@francescovigni.com</a>.
          </p>

          <h2>Analytics</h2>
          <p>
            This site uses <strong>Google Analytics 4</strong> (provided by
            Google LLC / Google Ireland Limited) to collect usage statistics —
            such as pages visited, session duration, referral source, and
            approximate geographic region. This helps me understand how the site
            is used and improve its content.
          </p>
          <p>
            The Google Analytics script is loaded using{" "}
            <strong>Google Consent Mode v2</strong>. By default, analytics
            storage is set to <em>denied</em>. In this mode, the script sends
            limited, cookieless pings to Google with no personally identifiable
            information and no cookies are set on your device.
          </p>
          <p>
            If you <strong>accept</strong> the cookie banner, analytics storage
            is upgraded to <em>granted</em>, and Google Analytics operates
            normally — setting cookies to distinguish users and sessions. IP
            anonymization is enabled and no advertising features are used.
          </p>
          <p>
            If you <strong>decline</strong>, no analytics cookies are set. The
            script remains loaded in restricted mode but does not store any data
            on your device.
          </p>

          <h2>Legal Basis</h2>
          <p>
            The legal basis for analytics data processing is your{" "}
            <strong>consent</strong> (Art. 6(1)(a) GDPR), obtained through the
            cookie banner before any tracking cookies are set.
          </p>

          <h2>Cookies</h2>
          <table>
            <thead>
              <tr>
                <th>Cookie</th>
                <th>Purpose</th>
                <th>Duration</th>
                <th>Set when</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>gatsby-gdpr-google-analytics</code></td>
                <td>
                  Stores your consent preference (<code>true</code> or{" "}
                  <code>false</code>).
                </td>
                <td>1 year</td>
                <td>Accept or Decline</td>
              </tr>
              <tr>
                <td><code>_ga</code></td>
                <td>
                  Distinguishes unique visitors.
                </td>
                <td>2 years</td>
                <td>Accept only</td>
              </tr>
              <tr>
                <td><code>_ga_G-QHV4ZCMNJ9</code></td>
                <td>
                  Maintains session state.
                </td>
                <td>2 years</td>
                <td>Accept only</td>
              </tr>
            </tbody>
          </table>

          <h2>Embedded Content</h2>
          <p>
            Some pages embed YouTube videos using YouTube's privacy-enhanced
            mode (<code>youtube-nocookie.com</code>). When you load a page with
            an embedded video, YouTube may set cookies and collect data according
            to{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google's privacy policy
            </a>
            . No YouTube data is loaded until the page containing the embed is
            visited.
          </p>

          <h2>International Data Transfers</h2>
          <p>
            Analytics data may be transferred to Google LLC in the United States.
            Google LLC is certified under the{" "}
            <a
              href="https://www.dataprivacyframework.gov/"
              target="_blank"
              rel="noopener noreferrer"
            >
              EU–U.S. Data Privacy Framework
            </a>
            , which provides appropriate safeguards for such transfers. Google's
            data processing terms are available at{" "}
            <a
              href="https://business.safety.google/processorterms/"
              target="_blank"
              rel="noopener noreferrer"
            >
              business.safety.google/processorterms
            </a>
            .
          </p>

          <h2>Data Retention</h2>
          <p>
            Google Analytics data is retained for 14 months (the default GA4
            retention period), after which it is automatically deleted. You can
            verify or adjust this in the GA4 admin settings.
          </p>

          <h2>Your Rights</h2>
          <p>
            Under the GDPR, you have the right to:
          </p>
          <ul>
            <li>Access any personal data associated with your visit</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent at any time</li>
            <li>Lodge a complaint with a supervisory authority (in Italy: the{" "}
              <a
                href="https://www.garanteprivacy.it/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Garante per la protezione dei dati personali
              </a>
            )</li>
          </ul>
          <p>
            To withdraw consent, clear your browser cookies for this site and
            reload the page — the consent banner will reappear. Since analytics
            data is anonymous, there is typically no personally identifiable
            information stored that can be linked back to you.
          </p>

          <h2>Changes</h2>
          <p>
            This policy may be updated occasionally. Any changes will be
            reflected on this page with an updated date.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions about this privacy policy, please contact
            me at{" "}
            <a href="mailto:hello@francescovigni.com">hello@francescovigni.com</a>.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPage;

export const Head = () => <Seo title="Privacy Policy" />;
