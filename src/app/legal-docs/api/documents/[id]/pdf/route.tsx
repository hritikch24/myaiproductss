import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import { DocumentPdf } from "@/components/document-pdf";
import { StampPaperDocumentPdf } from "@/components/stamp-paper-pdf";
import React from "react";

function formatDocType(docType: string): string {
  return docType
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const docId = parseInt(id, 10);
  if (isNaN(docId)) {
    return NextResponse.json({ error: "Invalid document ID" }, { status: 400 });
  }

  const { rows } = await pool.query(
    "SELECT * FROM documents WHERE id = $1 AND user_id = $2",
    [docId, session.user.id]
  );

  if (!rows.length) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  const doc = rows[0];
  const content = doc.generated_content || "";
  const title = formatDocType(doc.doc_type);
  const formData =
    typeof doc.form_data === "string"
      ? JSON.parse(doc.form_data)
      : doc.form_data;

  const format = _req.nextUrl.searchParams.get("format");
  let buffer: NodeJS.ArrayBufferView;

  if (doc.doc_type === "rental_agreement") {
    buffer = await renderToBuffer(
      React.createElement(StampPaperDocumentPdf, {
        title,
        content,
        state: formData.state || "Maharashtra",
        firstParty: formData.landlord_name || "",
        secondParty: formData.tenant_name || "",
        purchasedBy: formData.landlord_name || "First Party",
        blankHeader: format === "stamp-blank",
      }) as React.ReactElement<DocumentProps>
    );
  } else {
    buffer = await renderToBuffer(
      React.createElement(DocumentPdf, {
        title,
        content,
      }) as React.ReactElement<DocumentProps>
    );
  }

  return new NextResponse(Buffer.from(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${doc.doc_type}_${doc.id}.pdf"`,
    },
  });
}
