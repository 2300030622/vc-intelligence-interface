import Link from "next/link";

type CityDetail = {
  id: number;
  name: string;
  region?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  population?: number;
  timezone?: string;
};

export default async function CityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/cities/${params.id}`, {
    cache: "no-store",
  }).catch(() => null);

  // If NEXT_PUBLIC_BASE_URL is not set, fallback to relative fetch on server:
  const res2 =
    res ??
    (await fetch(`http://localhost:3000/api/cities/${params.id}`, {
      cache: "no-store",
    }).catch(() => null));

  if (!res2 || !res2.ok) {
    let msg = "GeoDB request failed";
    try {
      const j = await res2?.json();
      msg = j?.error || msg;
    } catch {}
    return (
      <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        <h1 style={{ color: "crimson", fontSize: 52, margin: "30px 0 10px" }}>
          City not found.
        </h1>
        <div style={{ marginTop: 8 }}>API error: {msg}</div>
        <div style={{ marginTop: 12 }}>
          <Link href="/cities">← Back to Cities</Link>
        </div>
      </main>
    );
  }

  const data = await res2.json();
  const c: CityDetail = data?.data;

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 46, margin: 0 }}>{c?.name}</h1>
          <div style={{ marginTop: 8, opacity: 0.8 }}>
            {c?.region ? `${c.region}, ` : ""}
            {c?.country || ""}
          </div>
        </div>
        <Link href="/cities" style={{ alignSelf: "center" }}>
          <button style={{ padding: "10px 14px", borderRadius: 12 }}>
            Back to Cities →
          </button>
        </Link>
      </div>

      <div
        style={{
          border: "2px solid #111",
          borderRadius: 18,
          padding: 18,
          marginTop: 18,
          display: "grid",
          gap: 10,
        }}
      >
        <div><b>Population:</b> {c?.population?.toLocaleString?.() ?? "—"}</div>
        <div><b>Latitude:</b> {c?.latitude ?? "—"}</div>
        <div><b>Longitude:</b> {c?.longitude ?? "—"}</div>
        <div><b>Timezone:</b> {(c as any)?.timezone ?? "—"}</div>
        <div style={{ opacity: 0.7, marginTop: 6 }}>
          Data source: GeoDB Cities (RapidAPI)
        </div>
      </div>
    </main>
  );
}