export type VulnerabilitySeverity =
  | "Low"
  | "Medium"
  | "High"
  | "Critical";


export type VulnerabilityFinding = {

  title: string;

  severity: VulnerabilitySeverity;

  description: string;

  recommendation: string;

};




const vulnerabilityDatabase = [

  {
    technology: "WordPress",

    severity: "High" as VulnerabilitySeverity,

    title:
      "WordPress Security Exposure",

    description:
      "WordPress installations can become targets when outdated versions, themes, or plugins are used.",

    recommendation:
      "Update WordPress core, plugins, and themes regularly.",
  },



  {
    technology: "nginx",

    severity: "Medium" as VulnerabilitySeverity,

    title:
      "Web Server Hardening Required",

    description:
      "nginx servers may expose unnecessary information or weak default configurations.",

    recommendation:
      "Hide server version information and apply security hardening rules.",
  },



  {
    technology: "Apache",

    severity: "Medium" as VulnerabilitySeverity,

    title:
      "Apache Server Review Recommended",

    description:
      "Apache deployments should be regularly updated and securely configured.",

    recommendation:
      "Update Apache and disable unnecessary modules.",
  },



  {
    technology: "React",

    severity: "Medium" as VulnerabilitySeverity,

    title:
      "Frontend Dependency Review",

    description:
      "Older frontend dependencies may contain known security vulnerabilities.",

    recommendation:
      "Keep React and frontend packages updated.",
  },



  {
    technology: "Next.js",

    severity: "Medium" as VulnerabilitySeverity,

    title:
      "Next.js Security Review",

    description:
      "Next.js applications should follow recommended security practices and stay updated.",

    recommendation:
      "Update Next.js versions and review application security settings.",
  },



  {
    technology: "PHP",

    severity: "High" as VulnerabilitySeverity,

    title:
      "PHP Runtime Security Risk",

    description:
      "Older PHP versions may contain publicly known vulnerabilities.",

    recommendation:
      "Upgrade PHP to a supported stable release.",
  },

];






export function analyzeVulnerabilities(
  technologies: string[]
): VulnerabilityFinding[] {


  const findings: VulnerabilityFinding[] = [];



  for (const technology of technologies) {


    const matches =
      vulnerabilityDatabase.filter(
        (item)=>

          technology
            .toLowerCase()
            .includes(
              item.technology.toLowerCase()
            )

      );



    findings.push(
      ...matches
    );


  }



  return findings;

}