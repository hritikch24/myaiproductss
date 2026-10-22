import { ImageResponse } from "next/og";

export const alt = "DPHONES Workbench — an interactive repair operations concept by KraftAI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#f4f7f4", padding: "60px 64px", color: "#233d30", fontFamily: "sans-serif", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 29, fontWeight: 700, letterSpacing: -1 }}>DPHONES<span style={{ color: "#28845d" }}>.</span><span style={{ fontSize: 16, fontWeight: 400, color: "#768c7a", marginLeft: 18, marginTop: 10 }}>WORKBENCH</span></div>
        <div style={{ display: "flex", background: "#e2f0e6", padding: "10px 18px", borderRadius: 30, color: "#4d7d59", fontSize: 15 }}>Interactive concept demo</div>
      </div>
      <div style={{ display: "flex", marginTop: 68, fontSize: 65, fontWeight: 600, letterSpacing: -3, lineHeight: 1.1 }}>A clearer day at the desk.</div>
      <div style={{ display: "flex", marginTop: 22, fontSize: 23, color: "#6e8374" }}>Follow a repair from the first quote to a happy handover.</div>
      <div style={{ display: "flex", gap: 18, marginTop: 46 }}>
        {[{ label: "Repair desk", value: "Every job in one place" }, { label: "Customer portal", value: "Quotes & clear updates" }, { label: "Four-store stock", value: "Move parts where needed" }].map(item => <div key={item.label} style={{ display: "flex", flexDirection: "column", width: 340, background: "#fff", border: "1px solid #dce6df", borderRadius: 13, padding: "25px 24px" }}><div style={{ display: "flex", fontSize: 23, fontWeight: 600 }}>{item.label}</div><div style={{ display: "flex", color: "#85958a", fontSize: 16, marginTop: 10 }}>{item.value}</div></div>)}
      </div>
      <div style={{ display: "flex", marginTop: "auto", fontSize: 15, color: "#86998c", justifyContent: "space-between" }}><span>Sample data · No live customer records</span><span>A concept by KraftAI</span></div>
    </div>, size,
  );
}
