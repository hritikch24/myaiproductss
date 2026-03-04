import { DocumentForm, FormField } from "@/components/document-form";

const fields: FormField[] = [
  {
    name: "disclosing_party",
    label: "Disclosing Party Name",
    type: "text",
    placeholder: "Person or company name",
    helperText: "The party sharing confidential information",
    maxLength: 150,
    section: "Disclosing Party",
  },
  {
    name: "disclosing_party_address",
    label: "Disclosing Party Address",
    type: "textarea",
    placeholder: "Full address with pincode",
    maxLength: 300,
    section: "Disclosing Party",
  },
  {
    name: "receiving_party",
    label: "Receiving Party Name",
    type: "text",
    placeholder: "Person or company name",
    helperText: "The party receiving confidential information",
    maxLength: 150,
    section: "Receiving Party",
  },
  {
    name: "receiving_party_address",
    label: "Receiving Party Address",
    type: "textarea",
    placeholder: "Full address with pincode",
    maxLength: 300,
    section: "Receiving Party",
  },
  {
    name: "purpose",
    label: "Purpose of NDA",
    type: "textarea",
    placeholder: "e.g. Discussing potential business partnership for a mobile app project",
    helperText: "Describe why confidential information is being shared",
    maxLength: 1000,
    section: "Agreement Details",
  },
  {
    name: "duration_years",
    label: "Duration",
    type: "number",
    placeholder: "e.g. 2",
    suffix: "years",
    min: 1,
    max: 10,
    helperText: "How long the NDA remains in effect (1-10 years)",
    section: "Agreement Details",
  },
  {
    name: "jurisdiction",
    label: "Jurisdiction / City",
    type: "text",
    placeholder: "e.g. New Delhi",
    helperText: "City where disputes will be resolved",
    maxLength: 50,
    section: "Agreement Details",
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
    section: "Document Settings",
  },
];

export default function NDAPage() {
  return (
    <DocumentForm
      title="Non-Disclosure Agreement"
      titleHi="गोपनीयता समझौता"
      docType="nda"
      fields={fields}
    />
  );
}
