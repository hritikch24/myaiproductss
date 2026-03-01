export type DocType = "rental_agreement" | "nda" | "freelancer_contract";

type Language = "english" | "hindi" | "bengali" | "tamil" | "telugu" | "marathi" | "gujarati" | "kannada" | "malayalam" | "punjabi" | "both";

const LANGUAGE_CONFIG: Record<Language, { name: string; script: string; font?: string }> = {
  english: { name: "English", script: "English" },
  hindi: { name: "Hindi", script: "Devanagari (हिंदी)", font: "NotoSansDevanagari" },
  bengali: { name: "Bengali", script: "Bengali (বাংলা)", font: "NotoSansBengali" },
  tamil: { name: "Tamil", script: "Tamil (தமிழ்)", font: "NotoSansTamil" },
  telugu: { name: "Telugu", script: "Telugu (తెలుగు)", font: "NotoSansTelugu" },
  marathi: { name: "Marathi", script: "Marathi (मराठी)", font: "NotoSansDevanagari" },
  gujarati: { name: "Gujarati", script: "Gujarati (ગુજરાતી)", font: "NotoSansGujarati" },
  kannada: { name: "Kannada", script: "Kannada (ಕನ್ನಡ)", font: "NotoSansKannada" },
  malayalam: { name: "Malayalam", script: "Malayalam (മലയാളം)", font: "NotoSansMalayalam" },
  punjabi: { name: "Punjabi", script: "Gurmukhi (ਪੰਜਾਬੀ)", font: "NotoSansGurmukhi" },
  both: { name: "English + Hindi", script: "English and Devanagari" },
};

const COMMON_INSTRUCTIONS = `
You are a legal document generator for India. Generate professional, legally valid documents.
- Use proper legal language and formatting
- Include all standard clauses required under Indian law
- Use numbered sections and sub-sections
- Include spaces for signatures at the end
- Do NOT include any markdown formatting — output plain text only
- If the user requests Hindi or other Indian languages, include that language translation inline
`;

const RENTAL_AGREEMENT_PROMPT = `${COMMON_INSTRUCTIONS}

Generate a Rental/Lease Agreement valid under Indian law (Transfer of Property Act, 1882 and applicable state Rent Control Acts).

Include these sections:
1. Title and date
2. Parties (Landlord and Tenant with full names)
3. Property description and address
4. Term of lease (start date, duration)
5. Rent amount, due date, and payment method
6. Security deposit amount and terms of refund
7. Maintenance and repairs responsibilities
8. Restrictions on use
9. Termination and notice period (typically 1-2 months)
10. Lock-in period clause
11. Registration and stamp duty clause
12. Dispute resolution (jurisdiction)
13. General provisions
14. Signature blocks for both parties and witnesses

Use the following details provided by the user to fill in the agreement.
`;

const NDA_PROMPT = `${COMMON_INSTRUCTIONS}

Generate a Non-Disclosure Agreement (NDA) valid under Indian law (Indian Contract Act, 1872).

Include these sections:
1. Title and date
2. Parties (Disclosing Party and Receiving Party with full addresses)
3. Definition of Confidential Information
4. Obligations of the Receiving Party
5. Exclusions from Confidential Information
6. Term and duration of confidentiality obligations
7. Return or destruction of confidential materials
8. Remedies for breach (injunctive relief)
9. Non-solicitation clause
10. Governing law and jurisdiction
11. Entire agreement clause
12. Amendment provisions
13. Signature blocks for both parties and witnesses

IMPORTANT: Include full addresses for both parties.

Use the following details provided by the user to fill in the agreement.
`;

const FREELANCER_CONTRACT_PROMPT = `${COMMON_INSTRUCTIONS}

Generate a Freelancer/Independent Contractor Agreement valid under Indian law (Indian Contract Act, 1872).

Include these sections:
1. Title and date
2. Parties (Client and Freelancer/Contractor with full names and addresses)
3. Scope of work and project description
4. Deliverables and milestones
5. Timeline and deadline
6. Payment terms (amount, schedule, method)
7. Intellectual property rights and assignment
8. Confidentiality obligations
9. Independent contractor status (not employee)
10. Termination clause
11. Liability limitation
12. Indemnification
13. Dispute resolution and governing law
14. Force majeure
15. Signature blocks for both parties and witnesses

IMPORTANT: Include full addresses for both client and freelancer in the parties section.

Use the following details provided by the user to fill in the agreement.
`;

export const PROMPTS: Record<DocType, string> = {
  rental_agreement: RENTAL_AGREEMENT_PROMPT,
  nda: NDA_PROMPT,
  freelancer_contract: FREELANCER_CONTRACT_PROMPT,
};

export function buildUserMessage(
  docType: DocType,
  formData: Record<string, string>
): string {
  const language = (formData.language || "english") as Language;
  const filteredData = Object.entries(formData).filter(
    ([key]) => key !== "language"
  );

  const lines = filteredData.map(
    ([key, value]) => `${key.replace(/_/g, " ")}: ${value}`
  );

  let languageInstruction = "";
  const langConfig = LANGUAGE_CONFIG[language];

  switch (language) {
    case "both":
      languageInstruction =
        "\n\nIMPORTANT: Generate this document in both English and Hindi. For each section, first write it in English, then immediately follow with the Hindi (Devanagari script) translation of that section.";
      break;
    case "english":
      languageInstruction = "\n\nGenerate this document in English.";
      break;
    default:
      languageInstruction = `\n\nIMPORTANT: Generate this entire document in ${langConfig.name} (${langConfig.script} script). All sections, clauses, and legal language must be in ${langConfig.name}.`;
  }

  return `Please generate the document with these details:\n\n${lines.join("\n")}${languageInstruction}`;
}
