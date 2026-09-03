import dns from "dns/promises";

export type DNSFinding = {
  title: string;
  severity: "High" | "Medium" | "Low" | "Info";
  description: string;
  evidence?: string;
};

export async function analyzeDNS(domain: string) {
  const result = {
    score: 100,
    records: {
      A: [] as string[],
      AAAA: [] as string[],
      MX: [] as string[],
      TXT: [] as string[],
      NS: [] as string[],
      CAA: [] as string[],
    },
    emailSecurity: {
      SPF: false,
      DMARC: false,
      DKIM: false,
      DNSSEC: false,
      SPFRecord: null as string | null,
      DMARCRecord: null as string | null,
      DKIMSelectors: [] as string[],
    },
    findings: [] as DNSFinding[],
  };

  const queryTxt = async (name: string) => {
    try { return (await dns.resolveTxt(name)).flat().join(" "); } catch { return ""; }
  };

  try {
    try { result.records.A = await dns.resolve4(domain); } catch {}
    try { result.records.AAAA = await dns.resolve6(domain); } catch {}
    try { result.records.MX = (await dns.resolveMx(domain)).map((item) => item.exchange); } catch {}
    try { result.records.TXT = (await dns.resolveTxt(domain)).flat(); } catch {}
    try { result.records.NS = await dns.resolveNs(domain); } catch {}
    try {
      result.records.CAA = (await dns.resolveCaa(domain)).map((item) => {
        const value = item.issue ?? item.issuewild ?? item.iodef ?? "";
        return `${item.issue ? "issue" : item.issuewild ? "issuewild" : "iodef"}:${value}`;
      });
    } catch {}

    const spf = result.records.TXT.find((value) => /^v=spf1\b/i.test(value));
    result.emailSecurity.SPF = !!spf;
    result.emailSecurity.SPFRecord = spf || null;

    const dmarc = await queryTxt(`_dmarc.${domain}`);
    result.emailSecurity.DMARC = /^v=DMARC1\b/i.test(dmarc);
    result.emailSecurity.DMARCRecord = result.emailSecurity.DMARC ? dmarc : null;

    try {
      const records = await dns.resolveAny(domain);
      result.emailSecurity.DNSSEC = records.some((record) => record && typeof record === "object" && "type" in record && record.type === "DS");
    } catch {}

    const selectors = ["default", "selector1", "selector2", "google", "k1", "dkim", "mail", "s1", "s2"];
    for (const selector of selectors) {
      const key = await queryTxt(`${selector}._domainkey.${domain}`);
      if (key && /^v=DKIM1\b/i.test(key)) result.emailSecurity.DKIMSelectors.push(selector);
    }
    result.emailSecurity.DKIM = result.emailSecurity.DKIMSelectors.length > 0;

    if (!result.emailSecurity.SPF) {
      result.score -= 15;
      result.findings.push({ title: "Missing SPF record", severity: "Medium", description: "The domain does not publish an SPF email authentication policy." });
    } else if (/\+all\b/i.test(result.emailSecurity.SPFRecord || "")) {
      result.score -= 18;
      result.findings.push({ title: "SPF permits all senders", severity: "High", description: "The SPF policy contains +all, which broadly authorizes every sender." });
    } else if (/(?:~all|\?all)\b/i.test(result.emailSecurity.SPFRecord || "")) {
      result.score -= 5;
      result.findings.push({ title: "Weak SPF enforcement", severity: "Low", description: "The SPF policy uses a soft or neutral final qualifier instead of a strict deny." });
    }

    if (!result.emailSecurity.DMARC) {
      result.score -= 20;
      result.findings.push({ title: "Missing DMARC protection", severity: "Medium", description: "The domain does not publish a DMARC policy." });
    } else if (/\bp=none\b/i.test(result.emailSecurity.DMARCRecord || "")) {
      result.score -= 4;
      result.findings.push({ title: "DMARC monitoring-only policy", severity: "Low", description: "DMARC is configured with p=none, which monitors rather than instructing receivers to quarantine or reject failing mail." });
    }

    if (!result.emailSecurity.DKIM && result.records.MX.length > 0) {
      result.score -= 6;
      result.findings.push({ title: "DKIM could not be confirmed", severity: "Low", description: "Common DKIM selectors did not expose a DKIM public key. This indicative check may miss custom selectors." });
    }

    if (!result.emailSecurity.DNSSEC) {
      result.score -= 4;
      result.findings.push({ title: "DNSSEC could not be confirmed", severity: "Low", description: "SecureScan could not confirm a DS record for the target domain." });
    }

    if (!result.records.CAA.length) {
      result.score -= 3;
      result.findings.push({ title: "No CAA record observed", severity: "Info", description: "The domain does not publish a CAA record restricting certificate authorities." });
    }

    if (!result.records.MX.length) {
      result.findings.push({ title: "No MX record observed", severity: "Info", description: "The domain does not publish an MX record. This is not a vulnerability for domains that do not send email." });
    }
  } catch {
    result.score = 40;
    result.findings.push({ title: "DNS analysis failed", severity: "High", description: "Unable to complete DNS configuration analysis." });
  }

  return { ...result, score: Math.max(0, Math.min(100, result.score)) };
}
