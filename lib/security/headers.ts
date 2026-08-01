export function analyzeHeaders(headers: Headers) {

    const findings = [];
  
    let score = 100;
  
  
    const checks = [
      {
        name: "Content Security Policy",
        header: "content-security-policy",
        risk: "High",
      },
      {
        name: "Strict Transport Security",
        header: "strict-transport-security",
        risk: "Medium",
      },
      {
        name: "Frame Protection",
        header: "x-frame-options",
        risk: "Medium",
      },
      {
        name: "Content Type Protection",
        header: "x-content-type-options",
        risk: "Low",
      },
    ];
  
  
    checks.forEach((check)=>{
  
      if(!headers.has(check.header)){
  
        score -= 10;
  
  
        findings.push({
          title: check.name,
          severity: check.risk,
          description:
            `${check.name} header is missing.`,
        });
  
      }
  
    });
  
  
    return {
      score,
      findings,
    };
  
  }