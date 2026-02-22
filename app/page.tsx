import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: "#111",
            color: "white",
            display: "grid",
            placeItems: "center",
            fontWeight: 800,
          }}
        >
          VC
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>
            VC Intelligence Interface
          </div>
          <div style={{ opacity: 0.75 }}>
            Thesis-first scouting • Live enrichment
          </div>
        </div>

        <div style={{ marginLeft: "auto", opacity: 0.7 }}>
          Local demo • Server-side enrichment
        </div>
      </div>

      <hr style={{ margin: "18px 0" }} />

      <h1 style={{ fontSize: 44, margin: "10px 0" }}>Home</h1>
      <p style={{ marginTop: 8 }}>
        Choose a flow:
      </p>

      <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
        <Link href="/cities" style={{ textDecoration: "none" }}>
          <div
            style={{
              border: "2px solid #111",
              borderRadius: 18,
              padding: 18,
              color: "#111",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800 }}>View Cities →</div>
            <div style={{ opacity: 0.75 }}>
              Search cities using GeoDB (RapidAPI)
            </div>
          </div>
        </Link>

        <Link href="/companies" style={{ textDecoration: "none" }}>
          <div
            style={{
              border: "2px solid #111",
              borderRadius: 18,
              padding: 18,
              color: "#111",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800 }}>View Companies →</div>
            <div style={{ opacity: 0.75 }}>
              Demo companies list + save to localStorage
            </div>
          </div>
        </Link>

        <Link href="/lists" style={{ textDecoration: "none" }}>
          <div
            style={{
              border: "2px solid #111",
              borderRadius: 18,
              padding: 18,
              color: "#111",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800 }}>View Lists →</div>
            <div style={{ opacity: 0.75 }}>
              See saved companies + export JSON
            </div>
          </div>
        </Link>
      </div>

      <div style={{ marginTop: 28, opacity: 0.7 }}>
        Built for VC sourcing workflow — search → profile → enrich → save → note
      </div>
    </main>
  );
}