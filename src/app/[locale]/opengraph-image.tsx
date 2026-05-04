import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: Promise<{ locale: string }> };

export default async function OgImage({ params }: Props) {
  const { locale } = await params;
  const isRu = locale === "ru";

  const label    = isRu ? "Полиграфолог · Киев"    : "Поліграфолог · Київ";
  const firstName = isRu ? "Ирина"                 : "Ірина";
  const lastName  = isRu ? "Шириевская"            : "Ширієвська";
  const tagline   = isRu
    ? "Профессиональные полиграфные исследования для бизнеса и частных клиентов"
    : "Професійні поліграфні дослідження для бізнесу та приватних клієнтів";
  const stats = [
    { value: "2+",    label: isRu ? "лет практики"   : "роки практики" },
    { value: "1000+", label: isRu ? "исследований"   : "досліджень" },
    { value: "100%",  label: isRu ? "конфиденциально" : "конфіденційно" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          backgroundColor: "#2A2A2A",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", backgroundColor: "#C9A96E" }} />

        {/* Subtle glow */}
        <div style={{
          position: "absolute", bottom: "-80px", right: "-80px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 70%)",
        }} />

        {/* Top row: label + domain */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ width: "36px", height: "1px", backgroundColor: "#C9A96E" }} />
            <span style={{
              color: "#C9A96E", fontSize: "13px",
              letterSpacing: "0.28em", textTransform: "uppercase",
            }}>
              {label}
            </span>
          </div>
          <span style={{ color: "rgba(201,169,110,0.35)", fontSize: "15px", letterSpacing: "0.18em" }}>
            shyriievska.com.ua
          </span>
        </div>

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{
            fontSize: "76px", lineHeight: 1.0, color: "#F5F0EB",
            fontWeight: 300, display: "flex", gap: "18px",
          }}>
            <span>{firstName}</span>
            <span style={{ color: "#C9A96E" }}>{lastName}</span>
          </div>

          <p style={{
            color: "#A89B8C", fontSize: "22px", lineHeight: 1.6,
            maxWidth: "700px", margin: 0,
          }}>
            {tagline}
          </p>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", gap: "56px",
          paddingTop: "28px",
          borderTop: "1px solid rgba(201,169,110,0.18)",
        }}>
          {stats.map(st => (
            <div key={st.value} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <span style={{ color: "#C9A96E", fontSize: "32px", fontWeight: 300 }}>{st.value}</span>
              <span style={{
                color: "#6B6057", fontSize: "13px",
                letterSpacing: "0.12em", textTransform: "uppercase",
              }}>
                {st.label}
              </span>
            </div>
          ))}

          {/* Divider + pills */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto" }}>
            {(isRu ? ["Конфиденциально", "Объективно", "Этично"] : ["Конфіденційно", "Об'єктивно", "Етично"]).map(pill => (
              <div key={pill} style={{
                padding: "8px 16px",
                border: "1px solid rgba(201,169,110,0.3)",
                color: "#C9A96E", fontSize: "12px",
                letterSpacing: "0.18em", textTransform: "uppercase",
              }}>
                {pill}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
