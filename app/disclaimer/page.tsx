import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Disclaimer — OLYR Labs",
  description: "Important information about OLYR Labs website content and services.",
};

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Important information"
      title="Disclaimer"
      updated="3 September 2026"
      intro="The OLYR Labs website describes our capabilities and provides general information about technology services. This disclaimer explains the limits of information published on the site."
      sections={[
        { title: "General information", body: <p>Website content is provided for general informational purposes and is not legal, financial, tax, regulatory, medical, cybersecurity incident-response, or other professional advice. You should obtain appropriate professional advice for circumstances that require it.</p> },
        { title: "Cybersecurity information", body: <p>Security-related content and service descriptions are not a guarantee that a system will be free from vulnerabilities or attacks. Security outcomes depend on the scope of an assessment, the environment, implementation, configuration, user behaviour, third-party systems, and changing threats.</p> },
        { title: "Project information", body: <p>Examples, concepts, technologies, features, prices, timelines, and capabilities shown on the website may change. A final project scope is established through a written proposal or agreement.</p> },
        { title: "Third-party content", body: <p>References and links to third-party products, services, websites, or technologies are provided for convenience or context. OLYR Labs does not necessarily endorse those third parties and is not responsible for their independent content or policies.</p> },
        { title: "No guarantee", body: <p>We make reasonable efforts to keep the website useful and accurate, but we do not guarantee that every page will always be complete, current, uninterrupted, or error-free. To the extent permitted by law, reliance on general website information is at your own risk.</p> },
      ]}
    />
  );
}
