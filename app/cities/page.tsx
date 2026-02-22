"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CityItem = {
  id: string;
  name: string;
  region?: string;
  country?: string;
  population?: number;
};

export default function CitiesPage() {
  const [q, setQ] = useState("hyd");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<CityItem[]>([]);

  const query = useMemo(() => q.trim(), [q]);

  useEffect(() => {
    const t = setTimeout(async () => {
      if (!query) {
        setItems([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/cities?namePrefix=${encodeURIComponent(query)}&limit=10`,
          { cache: "no-store" }
        );
        const data = await res.json();

        if (!res.ok) {
          setItems([]);
          setError(data?.error || "GeoDB request failed");
        } else {
          setItems(data?.data || []);
        }
      } catch (e: any) {
        setItems([]);
        setError(e?.message || "Network error");
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(t);
  }, [query]);

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 44, margin: 0 }}>Cities</h1>
          <p style={{ marginTop: 8 }}>
            Type any city name (e.g., hyd, del, mum, ban).
          </p>
        </div>

        <Link href="/" style={{ alignSelf: "center" }}>
          <button style={{ padding: "10px 14px", borderRadius: 12 }}>
            Back to Home →
          </button>
        </Link>
      </div>

      <div
        style={{
          border: "2px solid #111",
          borderRadius: 18,
          padding: 18,
          marginTop: 18,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search city..."
            style={{
              width: "70%",
              padding: 14,
              borderRadius: 14,
              border: "2px solid #111",
              fontSize: 18,
            }}
          />

          <div style={{ alignSelf: "center" }}>
            {loading ? "Loading..." : `Showing ${items.length} result(s)`}
          </div>
        </div>

        {error && (
          <p style={{ marginTop: 12, color: "crimson" }}>
            API error: {error}
          </p>
        )}

        <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
          {items.map((c) => (
            <Link
              key={c.id}
              href={`/cities/${c.id}`}
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <div
                style={{
                  border: "2px solid #111",
                  borderRadius: 16,
                  padding: 18,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 16,
                  cursor: "pointer",
                }}
              >
                <div>
                  <div style={{ fontSize: 26, fontWeight: 800 }}>{c.name}</div>
                  <div style={{ opacity: 0.8 }}>
                    {c.region ? `${c.region}, ` : ""}
                    {c.country || ""}
                  </div>
                </div>

                <div style={{ alignSelf: "center" }}>
                  Pop: {c.population ? c.population.toLocaleString() : "—"}
                </div>
              </div>
            </Link>
          ))}

          {!loading && query && items.length === 0 && !error && (
            <p style={{ marginTop: 10 }}>No results. Try another spelling.</p>
          )}
        </div>
      </div>
    </main>
  );
}