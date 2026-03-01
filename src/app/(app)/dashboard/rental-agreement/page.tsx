import { DocumentForm, FormField } from "@/components/document-form";

const fields: FormField[] = [
  {
    name: "landlord_name",
    label: "Landlord Name",
    type: "text",
    placeholder: "Full legal name",
    helperText: "As it appears on government ID",
    maxLength: 100,
  },
  {
    name: "tenant_name",
    label: "Tenant Name",
    type: "text",
    placeholder: "Full legal name",
    helperText: "As it appears on government ID",
    maxLength: 100,
  },
  {
    name: "property_address",
    label: "Property Address",
    type: "textarea",
    placeholder: "Flat No., Building, Street, Locality",
    helperText: "Include flat/house number, building name, street, and locality",
    maxLength: 500,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "e.g. Mumbai",
    maxLength: 50,
  },
  {
    name: "state",
    label: "State",
    type: "text",
    placeholder: "e.g. Maharashtra",
    maxLength: 50,
  },
  {
    name: "monthly_rent",
    label: "Monthly Rent",
    type: "number",
    placeholder: "e.g. 25000",
    prefix: "₹",
    min: 500,
    max: 10000000,
    helperText: "Amount in Indian Rupees",
  },
  {
    name: "security_deposit",
    label: "Security Deposit",
    type: "number",
    placeholder: "e.g. 50000",
    prefix: "₹",
    min: 0,
    max: 50000000,
    helperText: "Typically 2-10 months of rent",
  },
  {
    name: "lease_start_date",
    label: "Lease Start Date",
    type: "date",
    placeholder: "Select start date",
    minDate: "today",
  },
  {
    name: "lease_duration_months",
    label: "Lease Duration",
    type: "number",
    placeholder: "e.g. 11",
    suffix: "months",
    min: 1,
    max: 120,
    helperText: "11 months is standard (avoids mandatory registration)",
  },
  {
    name: "language",
    label: "Language",
    type: "select",
    options: [
      { label: "English", value: "english" },
      { label: "Hindi (हिंदी)", value: "hindi" },
      { label: "Bengali (বাংলা)", value: "bengali" },
      { label: "Tamil (தமிழ்)", value: "tamil" },
      { label: "Telugu (తెలుగు)", value: "telugu" },
      { label: "Marathi (मराठी)", value: "marathi" },
      { label: "Gujarati (ગુજરાતી)", value: "gujarati" },
      { label: "Kannada (ಕನ್ನಡ)", value: "kannada" },
      { label: "Malayalam (മലയാളം)", value: "malayalam" },
      { label: "Punjabi (ਪੰਜਾਬੀ)", value: "punjabi" },
      { label: "Both (English + Hindi)", value: "both" },
    ],
  },
];

export default function RentalAgreementPage() {
  return (
    <DocumentForm
      title="Rental Agreement"
      titleHi="किराया अनुबंध"
      docType="rental_agreement"
      fields={fields}
    />
  );
}
