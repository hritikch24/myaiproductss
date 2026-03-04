import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import path from "path";

Font.register({
  family: "NotoSansDevanagari",
  fonts: [
    {
      src: path.join(
        process.cwd(),
        "public/fonts/NotoSansDevanagari-Regular.ttf"
      ),
      fontWeight: "normal",
    },
    {
      src: path.join(
        process.cwd(),
        "public/fonts/NotoSansDevanagari-Bold.ttf"
      ),
      fontWeight: "bold",
    },
  ],
});

function containsDevanagari(text: string): boolean {
  return /[\u0900-\u097F]/.test(text);
}

const GREEN_DARK = "#2d6a2d";
const GREEN_MED = "#4a8c4a";
const GREEN_LIGHT = "#f0f7f0";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    color: "#000000",
    backgroundColor: "#ffffff",
  },
  pageHindi: {
    padding: 20,
    fontSize: 10,
    fontFamily: "NotoSansDevanagari",
    lineHeight: 1.8,
    color: "#000000",
    backgroundColor: "#ffffff",
  },
  outerBorder: {
    border: `3pt solid ${GREEN_DARK}`,
    padding: 4,
    flex: 1,
  },
  innerBorder: {
    border: `1pt solid ${GREEN_MED}`,
    padding: 20,
    flex: 1,
  },
  headerBox: {
    backgroundColor: GREEN_LIGHT,
    padding: 12,
    marginBottom: 12,
    borderBottom: `1pt solid ${GREEN_MED}`,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    color: GREEN_DARK,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    color: GREEN_DARK,
    marginBottom: 6,
  },
  headerState: {
    fontSize: 10,
    textAlign: "center",
    color: "#333333",
    marginBottom: 8,
  },
  headerGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  headerGridCol: {
    width: "48%",
  },
  headerLabel: {
    fontSize: 7,
    color: "#666666",
    marginBottom: 1,
  },
  headerValue: {
    fontSize: 8,
    color: "#000000",
    marginBottom: 4,
  },
  divider: {
    borderBottom: `1pt solid ${GREEN_MED}`,
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 14,
    color: "#000000",
  },
  titleHindi: {
    fontSize: 14,
    fontFamily: "NotoSansDevanagari",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
    color: "#000000",
  },
  content: {
    fontSize: 10,
    whiteSpace: "pre-wrap",
    color: "#000000",
  },
  footer: {
    marginTop: 12,
    paddingTop: 6,
    borderTop: `1pt solid ${GREEN_MED}`,
    fontSize: 7,
    color: "#666666",
    textAlign: "center",
    fontFamily: "Helvetica",
  },
});

interface StampPaperDocumentPdfProps {
  title: string;
  content: string;
  state?: string;
  stampDuty?: string;
  firstParty?: string;
  secondParty?: string;
  purchasedBy?: string;
}

export function StampPaperDocumentPdf({
  title,
  content,
  state = "Maharashtra",
  stampDuty = "₹ 500",
  firstParty = "",
  secondParty = "",
  purchasedBy = "First Party",
}: StampPaperDocumentPdfProps) {
  const hasHindi = containsDevanagari(content);
  const paragraphs = content.split("\n");

  const certNo = `IN-${state.slice(0, 2).toUpperCase()}${Math.floor(10000000 + Math.random() * 90000000)}`;
  const certDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Document>
      <Page
        size="A4"
        style={hasHindi ? styles.pageHindi : styles.page}
      >
        <View style={styles.outerBorder}>
          <View style={styles.innerBorder}>
            {/* Stamp Paper Header */}
            <View style={styles.headerBox}>
              <Text style={styles.headerTitle}>INDIA NON JUDICIAL</Text>
              <Text style={styles.headerSubtitle}>e-Stamp Paper</Text>
              <Text style={styles.headerState}>
                Government of {state}
              </Text>

              <View style={styles.headerGrid}>
                <View style={styles.headerGridCol}>
                  <Text style={styles.headerLabel}>Certificate No.</Text>
                  <Text style={styles.headerValue}>{certNo}</Text>
                  <Text style={styles.headerLabel}>Stamp Duty Paid</Text>
                  <Text style={styles.headerValue}>{stampDuty}</Text>
                  <Text style={styles.headerLabel}>Purchased By</Text>
                  <Text style={styles.headerValue}>
                    {purchasedBy}
                  </Text>
                </View>
                <View style={styles.headerGridCol}>
                  <Text style={styles.headerLabel}>Issue Date</Text>
                  <Text style={styles.headerValue}>{certDate}</Text>
                  <Text style={styles.headerLabel}>First Party</Text>
                  <Text style={styles.headerValue}>
                    {firstParty || "—"}
                  </Text>
                  <Text style={styles.headerLabel}>Second Party</Text>
                  <Text style={styles.headerValue}>
                    {secondParty || "—"}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Agreement Content */}
            <Text style={hasHindi ? styles.titleHindi : styles.title}>
              {title}
            </Text>
            <View>
              {paragraphs.map((para, i) => (
                <Text key={i} style={styles.content}>
                  {para}
                </Text>
              ))}
            </View>

            {/* Footer */}
            <Text style={styles.footer}>
              This is a computer-generated e-Stamp Paper for reference purposes.
              Generated by KanoonSimplified — Consult a lawyer for legal advice.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
