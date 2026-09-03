export type FindingSeverity = "Critical" | "High" | "Medium" | "Low" | "Info";
export type FindingConfidence = "High" | "Medium" | "Low";

export type SecurityFinding = {
  id: string;
  title: string;
  severity: FindingSeverity;
  category: string;
  description: string;
  evidence: string;
  location: string;
  confidence: FindingConfidence;
  remediation?: string;
  cwe?: string;
  owasp?: string;
  discovery?: string;
  secretRef?: string;
};

const severityPenalty: Record<FindingSeverity, number> = {
  Critical: 28,
  High: 14,
  Medium: 6,
  Low: 2,
  Info: 0,
};

const confidenceFactor: Record<FindingConfidence, number> = {
  High: 1,
  Medium: 0.75,
  Low: 0.5,
};

export function normalizeFinding(
  finding: Omit<SecurityFinding, "id"> & { id?: string },
): SecurityFinding {
  return {
    ...finding,
    id: finding.id || crypto.randomUUID(),
    confidence: finding.confidence || "Medium",
  };
}

export function deduplicateFindings(findings: SecurityFinding[]) {
  const seen = new Set<string>();
  return findings.filter((finding) => {
    const key = [finding.title, finding.location, finding.evidence].join("|").toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function calculateRisk(findings: SecurityFinding[], categoryScores: Record<string, number>) {
  const unique = deduplicateFindings(findings);
  const penalty = Math.min(
    85,
    unique.reduce((sum, finding) => sum + severityPenalty[finding.severity] * confidenceFactor[finding.confidence], 0),
  );
  const categoryValues = Object.values(categoryScores).filter((value) => Number.isFinite(value));
  const baseline = categoryValues.length
    ? categoryValues.reduce((sum, value) => sum + value, 0) / categoryValues.length
    : 100;
  const score = Math.max(0, Math.min(100, Math.round(baseline - penalty)));

  const counts: Record<FindingSeverity, number> = {
    Critical: 0,
    High: 0,
    Medium: 0,
    Low: 0,
    Info: 0,
  };
  for (const finding of unique) counts[finding.severity] += 1;

  return {
    score,
    grade: score >= 90 ? "Excellent" : score >= 75 ? "Good" : score >= 50 ? "Needs Improvement" : "Critical",
    counts,
    findings: unique,
  };
}

export function enrichFinding(
  finding: Omit<SecurityFinding, "id" | "confidence"> & { confidence?: FindingConfidence },
) {
  return normalizeFinding({
    ...finding,
    confidence: finding.confidence || "Medium",
  });
}
