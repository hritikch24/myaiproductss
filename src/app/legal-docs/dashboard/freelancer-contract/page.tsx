import { DocumentForm, FormField } from "@/components/document-form";

const fields: FormField[] = [
  {
    name: "client_name",
    label: "Client Name",
    type: "text",
    placeholder: "Person or company name",
    helperText: "Full legal name or registered company name",
    maxLength: 150,
  },
  {
    name: "client_address",
    label: "Client Address",
    type: "textarea",
    placeholder: "Full address with pincode",
    helperText: "Registered address for the contract",
    maxLength: 300,
  },
  {
    name: "freelancer_name",
    label: "Freelancer Name",
    type: "text",
    placeholder: "Full legal name",
    helperText: "As it appears on PAN/Aadhaar",
    maxLength: 100,
  },
  {
    name: "freelancer_address",
    label: "Freelancer Address",
    type: "textarea",
    placeholder: "Full address with pincode",
    helperText: "Your current address",
    maxLength: 300,
  },
  {
    name: "project_description",
    label: "Project Description",
    type: "textarea",
    placeholder: "Describe the project scope, objectives, and key requirements",
    helperText: "Be specific — this defines the scope of work in the contract",
    maxLength: 2000,
  },
  {
    name: "deliverables",
    label: "Deliverables",
    type: "textarea",
    placeholder: "e.g.\n• Website frontend (5 pages)\n• Admin dashboard\n• API integration\n• Source code handover",
    helperText: "List each deliverable clearly. Use bullet points for multiple items.",
    maxLength: 2000,
  },
  {
    name: "deadline",
    label: "Deadline",
    type: "date",
    placeholder: "Select deadline",
    minDate: "today",
  },
  {
    name: "payment_amount",
    label: "Payment Amount",
    type: "number",
    placeholder: "e.g. 50000",
    prefix: "₹",
    min: 100,
    max: 100000000,
    helperText: "Total project amount in Indian Rupees",
  },
  {
    name: "payment_terms",
    label: "Payment Terms",
    type: "select",
    options: [
      { label: "On Completion", value: "completion" },
      { label: "Milestone-based", value: "milestone" },
      { label: "Monthly", value: "monthly" },
    ],
    helperText: "Milestone-based is recommended for large projects",
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

export default function FreelancerContractPage() {
  return (
    <DocumentForm
      title="Freelancer Contract"
      titleHi="फ्रीलांसर अनुबंध"
      docType="freelancer_contract"
      fields={fields}
    />
  );
}
