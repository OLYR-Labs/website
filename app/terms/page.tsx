import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Terms of Use — OLYR Labs",
  description: "Terms governing use of the OLYR Labs website.",
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Website terms"
      title="Terms of Use"
      updated="3 September 2026"
      intro="These terms govern your use of the OLYR Labs public website. They are intended to clarify how the website and its content may be used. Specific OLYR Labs services are governed by the agreements, proposals, statements of work, and other terms applicable to the relevant client engagement."
      sections={[
        { title: "Using this website", body: <><p>You may use this website for lawful purposes and to learn about OLYR Labs and our services. You must not use the website to interfere with its operation, attempt unauthorised access, introduce malicious code, scrape it in a way that causes harm, or use it for unlawful activity.</p></> },
        { title: "Information and quotations", body: <><p>Website content is provided for general information. A quotation request, enquiry, estimate, or conversation does not by itself create a contract or guarantee that OLYR Labs will accept a project, provide a particular feature, meet a particular deadline, or maintain a quoted price indefinitely.</p><p>Project scope, price, delivery dates, support, warranties, intellectual property, confidentiality, and other commercial terms should be confirmed in a written agreement or statement of work.</p></> },
        { title: "Intellectual property", body: <><p>Unless otherwise stated, the OLYR Labs website, branding, text, graphics, designs, original visual concepts, code, and other materials are owned by or licensed to OLYR Labs and may not be copied, republished, sold, or modified for commercial use without appropriate permission.</p></> },
        { title: "Client materials", body: <><p>If you provide information, text, images, documents, trademarks, code, or other materials to OLYR Labs, you are responsible for having the rights and permissions necessary for us to use those materials for the requested purpose.</p></> },
        { title: "Third-party services and links", body: <><p>The website may link to or rely on third-party services. OLYR Labs does not control third-party websites and is not responsible for their content, availability, security, or privacy practices. Third-party terms may apply to your use of those services.</p></> },
        { title: "Availability", body: <><p>We aim to keep the website available and accurate, but we do not guarantee uninterrupted availability or that every piece of information will always be current, complete, or error-free. We may change, suspend, or discontinue website features when necessary.</p></> },
        { title: "Limitation", body: <><p>To the extent permitted by applicable law, OLYR Labs is not responsible for losses arising solely from reliance on general website information, temporary website unavailability, or third-party services linked from the website. Nothing in these terms is intended to exclude a liability that cannot lawfully be excluded.</p></> },
        { title: "Governing law", body: <><p>Unless a separate written client agreement provides otherwise, these website terms are intended to be governed by the laws applicable in Sri Lanka.</p></> },
        { title: "Changes", body: <><p>We may update these terms when the website or our business practices change. The latest version will be published on this page.</p></> },
      ]}
    />
  );
}
