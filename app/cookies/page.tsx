import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Cookie Policy — OLYR Labs",
  description: "How OLYR Labs uses cookies and similar browser technologies.",
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Website preferences"
      title="Cookie Policy"
      updated="3 September 2026"
      intro="This Cookie Policy explains how olyrlabs.com uses cookies and similar technologies. We keep the current website intentionally lightweight and privacy-conscious."
      sections={[
        { title: "What we use", body: <><p>The current website uses browser local storage to remember whether you selected the light or dark visual theme. This is a functional preference and is not used to identify you or build an advertising profile.</p><p>The website may also rely on ordinary technical mechanisms provided by our hosting and application infrastructure to deliver pages securely and reliably.</p></> },
        { title: "What we do not currently use", body: <><p>At the time this policy was last updated, OLYR Labs does not intentionally use advertising cookies, cross-site behavioural tracking cookies, or third-party marketing trackers on the public website.</p><p>If this changes, we will review the consent and disclosure requirements that apply to the new technology.</p></> },
        { title: "Third-party websites", body: <><p>Links from OLYR Labs to services such as social networks, messaging services, or other websites take you to systems operated by those third parties. Their own cookies and privacy practices apply once you leave our website.</p></> },
        { title: "Managing browser storage", body: <><p>You can clear local website storage using your browser settings. Clearing it will remove your saved theme preference, after which the website will return to its default visual theme.</p></> },
        { title: "Updates", body: <><p>We may update this Cookie Policy if the website begins using analytics, consent-management, advertising, embedded media, or other technologies that change how information is collected or stored.</p></> },
      ]}
    />
  );
}
