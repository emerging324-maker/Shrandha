"use client";
import { Playfair_Display, Great_Vibes } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: ["400"] });

/**
 * The actual certificate design, rendered as real DOM/CSS at a fixed
 * pixel size (1492x1054, matching the original sample certificate's
 * proportions) so html2canvas produces a clean, high-res snapshot that
 * gets dropped into a landscape PDF. This is rendered off-screen — never
 * shown directly to the user, only captured and exported.
 */
export function CertificateTemplate({
  name,
  domain,
  duration,
  certificateId,
  issuedDate,
}: {
  name: string;
  domain: string;
  duration: string;
  certificateId: string;
  issuedDate: string;
}) {
  return (
    <div
      id="certificate-template"
      style={{
        width: 1492,
        height: 1054,
        position: "relative",
        background: "#ffffff",
        fontFamily: "'IBM Plex Sans', Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Outer border */}
      <div style={{ position: "absolute", inset: 24, border: "2px solid #d9b76c" }} />
      <div style={{ position: "absolute", inset: 32, border: "1px solid #e3e3e8" }} />

      {/* Corner accents */}
      <div style={{ position: "absolute", top: 0, left: 0, width: 220, height: 220, borderTop: "10px solid #07070A", borderLeft: "10px solid #07070A", borderTopLeftRadius: 4 }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: 220, height: 220, background: "linear-gradient(135deg, rgba(217,183,108,0.9), transparent 70%)", clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 220, height: 220, borderBottom: "10px solid #07070A", borderRight: "10px solid #07070A" }} />
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 220, height: 220, background: "linear-gradient(-45deg, rgba(217,183,108,0.9), transparent 70%)", clipPath: "polygon(100% 100%, 0 100%, 100% 0)" }} />

      {/* Logo + wordmark, top-left */}
      <div style={{ position: "absolute", top: 64, left: 72, display: "flex", alignItems: "center", gap: 16 }}>
        <img src="/images/logo-mark.png" alt="" width={68} height={68} crossOrigin="anonymous" />
        <div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#07070A" }}>
            Shrandha <span style={{ color: "#F5A623" }}>Labs</span>
          </div>
          <div style={{ fontSize: 13, letterSpacing: 2, color: "#9A9AA6", marginTop: 2 }}>LEARN. BUILD. ACHIEVE.</div>
        </div>
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", marginTop: 70 }}>
        <div className={playfair.className} style={{ fontSize: 64, letterSpacing: 6, color: "#0f1730" }}>
          CERTIFICATE
        </div>
        <div style={{ marginTop: 8, fontSize: 20, letterSpacing: 6, color: "#4b4b55" }}>
          OF INTERNSHIP COMPLETION
        </div>
        <div style={{ margin: "16px auto 0", width: 220, height: 1, background: "#d9b76c" }} />
      </div>

      {/* Body */}
      <div style={{ textAlign: "center", marginTop: 56 }}>
        <div style={{ fontSize: 20, color: "#3a3a42" }}>This is to certify that</div>
        <div
          className={greatVibes.className}
          style={{
            fontSize: 76,
            color: "#0f1730",
            marginTop: 8,
            lineHeight: 1.1,
          }}
        >
          {name}
        </div>
        <div style={{ margin: "18px auto 0", width: 620, height: 1, background: "#d9b76c" }} />

        <div style={{ marginTop: 30, fontSize: 19, color: "#3a3a42" }}>has successfully completed the</div>
        <div style={{ marginTop: 6, fontSize: 26, fontWeight: 700, color: "#0f1730", letterSpacing: 1 }}>
          INTERNSHIP PROGRAM
        </div>
        <div style={{ fontSize: 18, color: "#3a3a42", margin: "4px 0" }}>in</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#0f1730" }}>{domain.toUpperCase()}</div>

        <div style={{ marginTop: 24, fontSize: 16, color: "#4b4b55", maxWidth: 900, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          organized by Shrandha Labs for a duration of <b>{duration}</b>.
          <br />
          During this internship, the candidate has demonstrated dedication, hard work,
          <br />
          and a strong understanding of the concepts. We wish them all the best for their future endeavors.
        </div>
      </div>

      {/* Footer row: duration/cert id (left), seal (center), signature + date (right) */}
      <div style={{ position: "absolute", bottom: 70, left: 72, display: "flex", flexDirection: "column", gap: 18 }}>
        <FooterItem label="DURATION" value={duration} />
        <FooterItem label="CERTIFICATE ID" value={certificateId} mono />
      </div>

      <div style={{ position: "absolute", bottom: 56, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: "50%",
            background: "#0f1730",
            border: "3px solid #d9b76c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src="/images/logo-mark.png" alt="" width={60} height={60} crossOrigin="anonymous" style={{ filter: "brightness(0) invert(1)" }} />
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 70, right: 100, textAlign: "center" }}>
        <div className={greatVibes.className} style={{ fontSize: 34, color: "#0f1730" }}>Shrandha Labs</div>
        <div style={{ width: 180, height: 1, background: "#d9b76c", margin: "6px 0" }} />
        <div style={{ fontSize: 12, fontWeight: 700, color: "#3a3a42", letterSpacing: 1 }}>AUTHORIZED SIGNATORY</div>
        <div style={{ fontSize: 12, color: "#9A9AA6", marginTop: 12 }}>DATE OF ISSUE</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#0f1730" }}>{issuedDate}</div>
      </div>
    </div>
  );
}

function FooterItem({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div style={{ fontSize: 11, letterSpacing: 1, color: "#9A9AA6", fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: "#0f1730", fontFamily: mono ? "monospace" : undefined, marginTop: 2 }}>{value}</div>
    </div>
  );
}
