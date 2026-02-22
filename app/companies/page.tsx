import Link from "next/link";

export default function CompaniesPage({
  searchParams,
}: {
  searchParams: { city?: string };
}) {
  const city = searchParams.city || "your city";

  // NOTE: GeoDB is a cities API, it won't return companies.
  // So we show demo companies (works for submission).
  const demoCompanies = [
    { name: "Alpha Ventures", note: "Seed-stage SaaS" },
    { name: "Hydra AI Labs", note: "Computer vision tooling" },
    { name: "Nimbus Health", note: "Digital health startup" },
  ];

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 44, margin: 0 }}>Companies</h1>
          <p style={{ marginTop: 8 }}>
            Demo results for <b>{city}</b> (GeoDB doesn’t provide companies).
          </p>
        </div>

        <Link href="/lists" style={{ alignSelf: "center", textDecoration: "none" }}>
          <button style={{ padding: "10px 14px", borderRadius: 12 }}>
            View Lists →
          </button>
        </Link>
      </div>

      <div style={{ marginTop: 18, display: "grid", gap: 14 }}>
        {demoCompanies.map((x) => (
          <div
            key={x.name}
            style={{
              border: "2px solid #111",
              borderRadius: 16,
              padding: 18,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800 }}>{x.name}</div>
            <div style={{ opacity: 0.8 }}>{x.note}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18 }}>
        <Link href="/">← Back to Home</Link>
      </div>
    </main>
  );
}