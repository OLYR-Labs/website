"use client";

import { useMemo, useRef, useState } from "react";

type Service =
  | "Website & E-Commerce"
  | "Custom Software & Automation"
  | "AI Solutions"
  | "Cybersecurity Services";

type FormData = {
  name: string;
  email: string;
  company: string;
  phone: string;

  service: Service | "";

  projectType: string;

  description: string;

  requirements: string[];

  customRequirements: string;

  budget: string;

  timeline: string;
};

const services: {
  name: Service;
  description: string;
}[] = [
  {
    name: "Website & E-Commerce",
    description:
      "Business websites, corporate platforms, landing pages, and online stores.",
  },
  {
    name: "Custom Software & Automation",
    description:
      "Custom systems, dashboards, internal platforms, workflows, and business automation.",
  },
  {
    name: "AI Solutions",
    description:
      "AI assistants, intelligent automation, data analysis, chatbots, and custom AI systems.",
  },
  {
    name: "Cybersecurity Services",
    description:
      "Security assessments, vulnerability analysis, infrastructure security, and security reviews.",
  },
];

const projectTypes: Record<Service, string[]> = {
  "Website & E-Commerce": [
    "Business / Company Website",
    "Corporate Website",
    "Landing Page",
    "E-Commerce Website",
    "Online Store",
    "Website Redesign",
    "Other",
  ],

  "Custom Software & Automation": [
    "Business Management System",
    "Internal Business Platform",
    "Customer Management System",
    "Dashboard / Admin Panel",
    "Workflow Automation",
    "Custom Web Application",
    "Custom Software",
    "Other",
  ],

  "AI Solutions": [
    "AI Chatbot / Assistant",
    "AI Business Automation",
    "AI Data Analysis",
    "AI Customer Support",
    "Custom AI System",
    "AI Integration",
    "Other",
  ],

  "Cybersecurity Services": [
    "Website Security Assessment",
    "Vulnerability Assessment",
    "Security Review",
    "Infrastructure Security Review",
    "Web Application Security",
    "Domain & Email Security",
    "Cybersecurity Consultation",
    "Other",
  ],
};

const requirementOptions: Record<Service, string[]> = {
  "Website & E-Commerce": [
    "Responsive mobile design",
    "Multiple website pages",
    "Content Management System",
    "Contact forms",
    "Blog / News section",
    "User accounts",
    "Admin dashboard",
    "Payment integration",
    "Product catalogue",
    "Shopping cart",
    "Order management",
    "Inventory management",
    "Analytics & reporting",
    "Third-party integrations",
    "SEO optimisation",
  ],

  "Custom Software & Automation": [
    "User authentication",
    "User roles & permissions",
    "Admin dashboard",
    "Customer management",
    "Database system",
    "Reports & analytics",
    "File / document management",
    "Notifications",
    "Email integration",
    "Payment integration",
    "Third-party API integration",
    "Automated workflows",
    "Business process automation",
    "Multi-user access",
    "Cloud deployment",
  ],

  "AI Solutions": [
    "AI chatbot",
    "AI business assistant",
    "Customer support automation",
    "Document analysis",
    "Data analysis",
    "AI-powered search",
    "Content generation",
    "Workflow automation",
    "OpenAI / LLM integration",
    "Knowledge base / RAG system",
    "Voice AI",
    "Image analysis",
    "Custom AI model integration",
    "Business data integration",
    "API integrations",
  ],

  "Cybersecurity Services": [
    "Website security assessment",
    "Vulnerability assessment",
    "Security headers analysis",
    "SSL / TLS analysis",
    "Domain security analysis",
    "SPF analysis",
    "DMARC analysis",
    "DNS security analysis",
    "Technology stack analysis",
    "Infrastructure security review",
    "Web application security review",
    "Security recommendations report",
    "Risk assessment",
    "Security consultation",
    "Ongoing security monitoring",
  ],
};

const budgetOptions = [
  "Under LKR 100,000",
  "LKR 100,000 – 250,000",
  "LKR 250,000 – 500,000",
  "LKR 500,000 – 1,000,000",
  "LKR 1,000,000+",
  "Not sure – I need guidance",
];

const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "6+ months",
  "Flexible",
];

const totalSteps = 5;

export default function QuoteForm() {
  const [step, setStep] = useState(1);

  const assessmentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    projectType: "",
    description: "",
    requirements: [],
    customRequirements: "",
    budget: "",
    timeline: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const currentProjectTypes = useMemo(() => {
    if (!formData.service) {
      return [];
    }

    return projectTypes[formData.service];
  }, [formData.service]);

  const currentRequirements = useMemo(() => {
    if (!formData.service) {
      return [];
    }

    return requirementOptions[formData.service];
  }, [formData.service]);

  function updateField(
    field: keyof FormData,
    value: string
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function toggleRequirement(requirement: string) {
    setFormData((previous) => {
      const exists =
        previous.requirements.includes(requirement);

      return {
        ...previous,
        requirements: exists
          ? previous.requirements.filter(
              (item) => item !== requirement
            )
          : [
              ...previous.requirements,
              requirement,
            ],
      };
    });
  }

  function validateStep() {
    setError("");

    if (step === 1) {
      if (
        !formData.name.trim() ||
        !formData.email.trim()
      ) {
        setError(
          "Please enter your name and email address."
        );

        return false;
      }

      if (
        !formData.email.includes("@") ||
        !formData.email.includes(".")
      ) {
        setError(
          "Please enter a valid email address."
        );

        return false;
      }
    }

    if (step === 2) {
      if (!formData.service) {
        setError(
          "Please select a service category."
        );

        return false;
      }
    }

    if (step === 3) {
      if (!formData.projectType) {
        setError(
          "Please select a project type."
        );

        return false;
      }

      if (!formData.description.trim()) {
        setError(
          "Please describe what you want to build or achieve."
        );

        return false;
      }
    }

    if (step === 4) {
      if (!formData.budget) {
        setError(
          "Please select an estimated budget."
        );

        return false;
      }

      if (!formData.timeline) {
        setError(
          "Please select your expected timeline."
        );

        return false;
      }
    }

    return true;
  }

  function scrollToAssessment() {
    setTimeout(() => {
      assessmentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  }

  function nextStep() {
    if (!validateStep()) {
      return;
    }

    setStep((previous) =>
      Math.min(previous + 1, totalSteps)
    );

    scrollToAssessment();
  }

  function previousStep() {
    setError("");

    setStep((previous) =>
      Math.max(previous - 1, 1)
    );

    scrollToAssessment();
  }

  async function submitForm() {
    if (!validateStep()) {
      return;
    }

    setLoading(true);

    setError("");

    try {
      const requirements = [
        ...formData.requirements,
        ...(formData.customRequirements.trim()
          ? [
              `Additional Requirements: ${formData.customRequirements.trim()}`,
            ]
          : []),
      ];

      const response = await fetch(
        "/api/quote",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            phone: formData.phone,

            service: formData.service,

            project_type:
              formData.projectType,

            description:
              formData.description,

            budget:
              formData.budget,

            timeline:
              formData.timeline,

            requirements:
              requirements.join(", "),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Submission failed"
        );
      }

      setSuccess(true);

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    } catch (error) {
      console.error(
        "Quote submission error:",
        error
      );

      setError(
        "Unable to submit your quote request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24">
        <div className="border border-blue-400/30 bg-blue-400/[0.04] p-10 text-center shadow-[0_0_80px_rgba(59,130,246,0.08)] sm:p-16">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-blue-400/30 bg-blue-400/10 text-2xl text-blue-400">
            ✓
          </div>

          <p className="mt-8 text-xs font-medium uppercase tracking-[0.25em] text-blue-400">
            Request Received
          </p>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
            Thank you for contacting OLYR Labs.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#A1A1AA]">
            Your project information has been
            successfully submitted. Our team will
            review your requirements and contact you
            to discuss the next steps.
          </p>

          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setStep(1);

              setFormData({
                name: "",
                email: "",
                company: "",
                phone: "",
                service: "",
                projectType: "",
                description: "",
                requirements: [],
                customRequirements: "",
                budget: "",
                timeline: "",
              });

              setTimeout(() => {
                assessmentRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 100);
            }}
            className="mt-10 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 text-sm font-medium text-white transition hover:border-blue-400/50 hover:bg-white/[0.08]"
          >
            Submit Another Request
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={assessmentRef}
      className="mx-auto max-w-5xl scroll-mt-8 px-5 py-16 sm:px-6 sm:py-24"
    >
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-blue-400">
              OLYR Labs Quote Request
            </p>

            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">
              Project Assessment
            </h2>
          </div>

          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.2em] text-[#71717A]">
              Step
            </p>

            <p className="mt-1 text-xl font-semibold text-white">
              {step}{" "}
              <span className="text-[#52525B]">
                / {totalSteps}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-2">
          {Array.from({
            length: totalSteps,
          }).map((_, index) => {
            const stepNumber = index + 1;

            return (
              <div
                key={stepNumber}
                className={`h-1 flex-1 transition-all duration-500 ${
                  stepNumber <= step
                    ? "bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.5)]"
                    : "bg-white/10"
                }`}
              />
            );
          })}
        </div>

        <div className="mt-4 flex justify-between text-[10px] uppercase tracking-[0.15em] text-[#52525B] sm:text-xs">
          <span
            className={
              step >= 1
                ? "text-blue-400"
                : ""
            }
          >
            Contact
          </span>

          <span
            className={
              step >= 2
                ? "text-blue-400"
                : ""
            }
          >
            Service
          </span>

          <span
            className={
              step >= 3
                ? "text-blue-400"
                : ""
            }
          >
            Requirements
          </span>

          <span
            className={
              step >= 4
                ? "text-blue-400"
                : ""
            }
          >
            Budget
          </span>

          <span
            className={
              step >= 5
                ? "text-blue-400"
                : ""
            }
          >
            Review
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-8 border border-red-400/30 bg-red-400/[0.05] px-5 py-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {step === 1 && (
        <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400">
            Step 01
          </p>

          <h3 className="mt-4 text-3xl font-semibold">
            Tell us about yourself.
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#A1A1AA]">
            Provide your contact information so
            our team can follow up with your
            project assessment.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <InputField
              label="Full Name *"
              value={formData.name}
              onChange={(value) =>
                updateField("name", value)
              }
              placeholder="Your full name"
            />

            <InputField
              label="Email Address *"
              type="email"
              value={formData.email}
              onChange={(value) =>
                updateField("email", value)
              }
              placeholder="you@company.com"
            />

            <InputField
              label="Company / Organisation"
              value={formData.company}
              onChange={(value) =>
                updateField(
                  "company",
                  value
                )
              }
              placeholder="Company name"
            />

            <InputField
              label="Phone Number"
              value={formData.phone}
              onChange={(value) =>
                updateField(
                  "phone",
                  value
                )
              }
              placeholder="+94 XX XXX XXXX"
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400">
            Step 02
          </p>

          <h3 className="mt-4 text-3xl font-semibold">
            What are you looking to build?
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#A1A1AA]">
            Select the service category that
            best matches your project.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {services.map((service) => {
              const selected =
                formData.service ===
                service.name;

              return (
                <button
                  key={service.name}
                  type="button"
                  onClick={() => {
                    setFormData(
                      (previous) => ({
                        ...previous,
                        service:
                          service.name,
                        projectType: "",
                        requirements: [],
                      })
                    );

                    setError("");
                  }}
                  className={`group relative min-h-[190px] overflow-hidden border p-6 text-left transition-all duration-300 ${
                    selected
                      ? "border-blue-400 bg-blue-400/[0.08] shadow-[0_0_40px_rgba(59,130,246,0.12)]"
                      : "border-white/10 bg-white/[0.02] hover:border-blue-400/40 hover:bg-white/[0.04]"
                  }`}
                >
                  {selected && (
                    <div className="absolute right-5 top-5 flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-400">
                      <span>✓</span>
                      Selected
                    </div>
                  )}

                  <h4
                    className={`mt-2 text-xl font-semibold transition ${
                      selected
                        ? "text-blue-400"
                        : "text-white"
                    }`}
                  >
                    {service.name}
                  </h4>

                  <p className="mt-5 text-sm leading-6 text-[#71717A]">
                    {service.description}
                  </p>

                  <div
                    className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${
                      selected
                        ? "w-full bg-blue-400"
                        : "w-0 bg-blue-400 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400">
            Step 03
          </p>

          <h3 className="mt-4 text-3xl font-semibold">
            Define your project requirements.
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#A1A1AA]">
            Select the project type and identify
            the features, systems, and technical
            requirements you need.
          </p>

          <div className="mt-10">
            <label className="text-sm font-medium text-white">
              Project Type *
            </label>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {currentProjectTypes.map(
                (type) => {
                  const selected =
                    formData.projectType ===
                    type;

                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        updateField(
                          "projectType",
                          type
                        );

                        setError("");
                      }}
                      className={`flex items-center justify-between border px-5 py-4 text-left text-sm transition ${
                        selected
                          ? "border-blue-400 bg-blue-400/[0.08] text-white"
                          : "border-white/10 bg-white/[0.02] text-[#A1A1AA] hover:border-blue-400/40"
                      }`}
                    >
                      <span>
                        {type}
                      </span>

                      {selected && (
                        <span className="font-semibold text-blue-400">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <div className="mt-12">
            <label className="text-sm font-medium text-white">
              Project Description *
            </label>

            <p className="mt-2 text-xs text-[#71717A]">
              Describe the problem you are
              trying to solve, what you want
              to build, and how you expect
              the solution to work.
            </p>

            <textarea
              value={formData.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value
                )
              }
              rows={7}
              placeholder="Example: We need a platform that allows our staff to manage customers, track orders, generate reports, and automate repetitive business processes..."
              className="mt-4 w-full resize-none border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white outline-none transition placeholder:text-[#52525B] focus:border-blue-400"
            />
          </div>

          <div className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <label className="text-sm font-medium text-white">
                  Technical Requirements
                </label>

                <p className="mt-2 text-xs text-[#71717A]">
                  Select everything you may need.
                </p>
              </div>

              <span className="text-xs text-blue-400">
                {formData.requirements.length}{" "}
                selected
              </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {currentRequirements.map(
                (requirement) => {
                  const selected =
                    formData.requirements.includes(
                      requirement
                    );

                  return (
                    <button
                      key={requirement}
                      type="button"
                      onClick={() =>
                        toggleRequirement(
                          requirement
                        )
                      }
                      className={`flex items-center gap-3 border px-4 py-3 text-left text-sm transition ${
                        selected
                          ? "border-blue-400 bg-blue-400/[0.08] text-white"
                          : "border-white/10 bg-white/[0.02] text-[#A1A1AA] hover:border-blue-400/40"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center border text-xs ${
                          selected
                            ? "border-blue-400 bg-blue-400 text-black"
                            : "border-white/20"
                        }`}
                      >
                        {selected
                          ? "✓"
                          : ""}
                      </span>

                      {requirement}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <div className="mt-10">
            <label className="text-sm font-medium text-white">
              Additional Requirements
            </label>

            <textarea
              value={
                formData.customRequirements
              }
              onChange={(event) =>
                updateField(
                  "customRequirements",
                  event.target.value
                )
              }
              rows={5}
              placeholder="Add any specific features, integrations, technologies, constraints, or requirements not listed above..."
              className="mt-4 w-full resize-none border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white outline-none transition placeholder:text-[#52525B] focus:border-blue-400"
            />
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400">
            Step 04
          </p>

          <h3 className="mt-4 text-3xl font-semibold">
            Budget and timeline.
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#A1A1AA]">
            This helps us understand the scale
            and expected delivery requirements
            of your project.
          </p>

          <div className="mt-10">
            <label className="text-sm font-medium text-white">
              Estimated Project Budget *
            </label>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {budgetOptions.map(
                (budget) => {
                  const selected =
                    formData.budget ===
                    budget;

                  return (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => {
                        updateField(
                          "budget",
                          budget
                        );

                        setError("");
                      }}
                      className={`flex items-center justify-between border px-5 py-4 text-left text-sm transition ${
                        selected
                          ? "border-blue-400 bg-blue-400/[0.08] text-white"
                          : "border-white/10 bg-white/[0.02] text-[#A1A1AA] hover:border-blue-400/40"
                      }`}
                    >
                      {budget}

                      {selected && (
                        <span className="text-blue-400">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          <div className="mt-12">
            <label className="text-sm font-medium text-white">
              Expected Timeline *
            </label>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {timelineOptions.map(
                (timeline) => {
                  const selected =
                    formData.timeline ===
                    timeline;

                  return (
                    <button
                      key={timeline}
                      type="button"
                      onClick={() => {
                        updateField(
                          "timeline",
                          timeline
                        );

                        setError("");
                      }}
                      className={`flex items-center justify-between border px-5 py-4 text-left text-sm transition ${
                        selected
                          ? "border-blue-400 bg-blue-400/[0.08] text-white"
                          : "border-white/10 bg-white/[0.02] text-[#A1A1AA] hover:border-blue-400/40"
                      }`}
                    >
                      {timeline}

                      {selected && (
                        <span className="text-blue-400">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-blue-400">
            Step 05
          </p>

          <h3 className="mt-4 text-3xl font-semibold">
            Review your request.
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#A1A1AA]">
            Review the information below before
            submitting your project request.
          </p>

          <div className="mt-10 space-y-6">
            <ReviewSection title="Contact Information">
              <ReviewRow
                label="Name"
                value={formData.name}
              />

              <ReviewRow
                label="Email"
                value={formData.email}
              />

              <ReviewRow
                label="Company"
                value={
                  formData.company ||
                  "Not provided"
                }
              />

              <ReviewRow
                label="Phone"
                value={
                  formData.phone ||
                  "Not provided"
                }
              />
            </ReviewSection>

            <ReviewSection title="Project">
              <ReviewRow
                label="Service"
                value={formData.service}
              />

              <ReviewRow
                label="Project Type"
                value={
                  formData.projectType
                }
              />

              <ReviewRow
                label="Budget"
                value={formData.budget}
              />

              <ReviewRow
                label="Timeline"
                value={
                  formData.timeline
                }
              />
            </ReviewSection>

            <ReviewSection title="Description">
              <p className="whitespace-pre-wrap text-sm leading-7 text-[#A1A1AA]">
                {formData.description}
              </p>
            </ReviewSection>

            <ReviewSection title="Selected Requirements">
              {formData.requirements.length >
              0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.requirements.map(
                    (requirement) => (
                      <span
                        key={requirement}
                        className="border border-blue-400/20 bg-blue-400/[0.05] px-3 py-2 text-xs text-blue-300"
                      >
                        ✓ {requirement}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <p className="text-sm text-[#71717A]">
                  No predefined requirements
                  selected.
                </p>
              )}

              {formData.customRequirements && (
                <div className="mt-6 border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#71717A]">
                    Additional Requirements
                  </p>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#A1A1AA]">
                    {
                      formData.customRequirements
                    }
                  </p>
                </div>
              )}
            </ReviewSection>
          </div>
        </div>
      )}

      <div className="mt-12 flex flex-col-reverse gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={previousStep}
            disabled={loading}
            className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.04]"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < totalSteps ? (
          <button
            type="button"
            onClick={nextStep}
            className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-blue-400"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={submitForm}
            disabled={loading}
            className="rounded-full bg-blue-400 px-8 py-3 text-sm font-semibold text-black transition hover:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Submitting Request..."
              : "Submit Quote Request"}
          </button>
        )}
      </div>
    </section>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-white">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="mt-3 w-full border border-white/10 bg-white/[0.02] px-5 py-4 text-sm text-white outline-none transition placeholder:text-[#52525B] focus:border-blue-400"
      />
    </div>
  );
}

function ReviewSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <h4 className="text-sm font-semibold text-white">
        {title}
      </h4>

      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-white/[0.06] py-4 first:pt-0 last:border-b-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
      <span className="text-xs uppercase tracking-[0.15em] text-[#52525B]">
        {label}
      </span>

      <span className="break-words text-sm text-[#A1A1AA] sm:max-w-[65%] sm:text-right">
        {value}
      </span>
    </div>
  );
}