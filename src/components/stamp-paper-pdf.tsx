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

// Detect if a line is a heading/section title
function isHeading(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/^(Section|SECTION|Article|ARTICLE|Clause|CLAUSE)\s/i.test(trimmed)) return true;
  if (/^\d+[\.\)]\s/.test(trimmed)) return true;
  if (trimmed === trimmed.toUpperCase() && trimmed.length > 5 && /[A-Z]/.test(trimmed)) return true;
  if (/^[A-Z].*:$/.test(trimmed) && trimmed.length < 80) return true;
  return false;
}

const GREEN_DARK = "#2d6a2d";
const GREEN_MED = "#4a8c4a";
const GREEN_LIGHT = "#f0f7f0";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    paddingBottom: 50,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.6,
    color: "#000000",
    backgroundColor: "#ffffff",
  },
  pageHindi: {
    padding: 20,
    paddingBottom: 50,
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
    marginBottom: 4,
  },
  sampleBadge: {
    fontSize: 8,
    textAlign: "center",
    color: "#cc0000",
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    padding: 2,
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
  heading: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#000000",
    marginTop: 4,
  },
  content: {
    fontSize: 10,
    color: "#000000",
  },
  footer: {
    position: "absolute",
    bottom: 25,
    left: 30,
    right: 30,
    fontSize: 7,
    color: "#666666",
    textAlign: "center",
    fontFamily: "Helvetica",
  },
  pageNumber: {
    position: "absolute",
    bottom: 15,
    right: 30,
    fontSize: 7,
    color: "#999999",
    fontFamily: "Helvetica",
  },
});

interface StampPaperDocumentPdfProps {
  title: string;
  content: string;
  state?: string;
  firstParty?: string;
  secondParty?: string;
  purchasedBy?: string;
  blankHeader?: boolean;
}

export function StampPaperDocumentPdf({
  title,
  content,
  state = "Maharashtra",
  firstParty = "",
  secondParty = "",
  purchasedBy = "First Party",
  blankHeader = false,
}: StampPaperDocumentPdfProps) {
  const hasHindi = containsDevanagari(content);
  const lines = content.split("\n");

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
        wrap
      >
        <View style={styles.outerBorder}>
          <View style={styles.innerBorder}>
            {/* Stamp Paper Header */}
            {blankHeader ? (
              <View
                style={{
                  height: 180,
                  borderStyle: "dashed",
                  borderWidth: 1,
                  borderColor: "#cccccc",
                  marginBottom: 12,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    color: "#999999",
                    fontFamily: "Helvetica",
                  }}
                >
                  Affix Stamp Paper Here
                </Text>
              </View>
            ) : (
              <View style={styles.headerBox}>
                <Text style={styles.headerTitle}>INDIA NON JUDICIAL</Text>
                <Text style={styles.headerSubtitle}>e-Stamp Paper</Text>
                <Text style={styles.sampleBadge}>
                  SAMPLE FORMAT — NOT A VALID e-STAMP CERTIFICATE
                </Text>
                <Text style={styles.headerState}>
                  Government of {state}
                </Text>

                <View style={styles.headerGrid}>
                  <View style={styles.headerGridCol}>
                    <Text style={styles.headerLabel}>Stamp Duty</Text>
                    <Text style={styles.headerValue}>As applicable in your state</Text>
                    <Text style={styles.headerLabel}>Purchased By</Text>
                    <Text style={styles.headerValue}>
                      {purchasedBy}
                    </Text>
                  </View>
                  <View style={styles.headerGridCol}>
                    <Text style={styles.headerLabel}>Date</Text>
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
            )}

            <View style={styles.divider} />

            {/* Agreement Content */}
            <Text style={hasHindi ? styles.titleHindi : styles.title}>
              {title}
            </Text>
            <View>
              {lines.map((line, i) => {
                if (isHeading(line)) {
                  return (
                    <Text
                      key={i}
                      style={styles.heading}
                      minPresenceAhead={30}
                    >
                      {line}
                    </Text>
                  );
                }
                return (
                  <Text key={i} style={styles.content}>
                    {line}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>

        <Text style={styles.footer} fixed>
          SAMPLE FORMAT — Purchase actual e-Stamp Paper from your state&apos;s authorized vendor. Generated by LegalDocs.
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}
