import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const FIELD_DESCRIPTIONS: Record<string, Record<string, string>> = {
  rental_agreement: {
    landlord_name: "Full legal name of the landlord/property owner",
    landlord_address: "Permanent/correspondence address of the landlord",
    landlord_phone: "Landlord's 10-digit mobile number (digits only)",
    landlord_id: "Last 4 digits of landlord's Aadhaar number",
    tenant_name: "Full legal name of the tenant/renter",
    tenant_address: "Permanent/previous address of the tenant",
    tenant_phone: "Tenant's 10-digit mobile number (digits only)",
    tenant_id: "Last 4 digits of tenant's Aadhaar number",
    property_address: "Complete address of the rental property",
    city: "City where the property is located",
    state: "State where the property is located",
    property_type: "Type of property: Apartment, Independent House, Villa, Commercial Space, or PG",
    furnishing_status: "Furnishing: Fully Furnished, Semi Furnished, or Unfurnished",
    purpose: "Purpose of use: Residential, Commercial, or Mixed Use",
    parking: "Parking type: Covered Parking, Open Parking, Two-Wheeler Only, or No Parking",
    monthly_rent: "Monthly rent amount in rupees (number only)",
    security_deposit: "Security deposit amount in rupees (number only)",
    rent_due_date: "Day of month when rent is due (number 1-28)",
    maintenance_charges: "Monthly maintenance charges in rupees (number only)",
    escalation_percentage: "Annual rent escalation percentage (number only)",
    lease_start_date: "Lease start date in YYYY-MM-DD format",
    lease_duration_months: "Lease duration in months (number only)",
    notice_period_months: "Notice period in months (number only)",
    pets_allowed: "Whether pets are allowed: Yes, No, or With Permission",
    witness_1_name: "Full name of the first witness",
    witness_2_name: "Full name of the second witness",
    additional_terms: "Any additional terms or conditions mentioned",
  },
  nda: {
    disclosing_party: "Name of the disclosing party (person or company)",
    receiving_party: "Name of the receiving party (person or company)",
    purpose: "Purpose or reason for the NDA",
    duration_years: "Duration of NDA in years (number only)",
    jurisdiction: "City/jurisdiction for legal matters",
  },
  freelancer_contract: {
    client_name: "Name of the client (person or company)",
    freelancer_name: "Full legal name of the freelancer",
    project_description: "Description of the project scope",
    deliverables: "Key deliverables of the project",
    deadline: "Project deadline in YYYY-MM-DD format",
    payment_amount: "Payment amount in rupees (number only)",
  },
};

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { text, docType } = await req.json();

  if (!text || typeof text !== "string" || text.trim().length < 10) {
    return NextResponse.json(
      { error: "Please provide at least 10 characters of text to extract from." },
      { status: 400 }
    );
  }

  if (!docType || !FIELD_DESCRIPTIONS[docType]) {
    return NextResponse.json(
      { error: "Invalid document type" },
      { status: 400 }
    );
  }

  const fieldDescs = FIELD_DESCRIPTIONS[docType];
  const fieldList = Object.entries(fieldDescs)
    .map(([key, desc]) => `- "${key}": ${desc}`)
    .join("\n");

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `Extract the following fields from the given text. Return ONLY a valid JSON object with the field names as keys. If a field cannot be found, omit it from the response. Do not include any markdown formatting, code blocks, or explanation — just the raw JSON.

Fields to extract:
${fieldList}

Text to extract from:
"""
${text.slice(0, 5000)}
"""

Return JSON:`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();

    // Parse JSON from response, handling possible markdown wrapping
    let jsonStr = responseText;
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    }

    const extracted = JSON.parse(jsonStr);

    // Sanitize: only keep known fields, convert all values to strings
    const sanitized: Record<string, string> = {};
    for (const key of Object.keys(fieldDescs)) {
      if (extracted[key] !== undefined && extracted[key] !== null) {
        sanitized[key] = String(extracted[key]);
      }
    }

    return NextResponse.json({ fields: sanitized });
  } catch (err) {
    console.error("Smart fill extraction error:", err);
    return NextResponse.json(
      { error: "Could not extract fields from the provided text." },
      { status: 500 }
    );
  }
}
