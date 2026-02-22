"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SavedRow = {
  id: string;
  saved: boolean;
};

function getSavedIds(): string[] {
  if (typeof window === "undefined") return [];
  const keys = Object.keys(localStorage);
  const ids = keys
    .filter((k) => k.startsWith("vc_saved_") && localStorage.getItem(k) === "1")
    .map((k) => k.replace("vc_saved_", ""));
  return ids;
}

export default function ListsPage() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getSavedIds());
  }, []);

  const rows: SavedRow[] = useMemo(
    () => ids.map((id) => ({ id, saved: true })),
    [ids]
  );

  function refresh() {
    setIds(getSavedIds());
  }

  function exportJSON() {
    const data = {
      exportedAt: new Date().toISOString(),
      savedCompanyIds: ids,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "saved_companies.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Lists</h1>
          <p className="text-sm text-gray-600">
            Saved companies (stored in localStorage). Export to share.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={refresh}
            className="text-sm px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition"
          >
            Refresh
          </button>
          <button
            onClick={exportJSON}
            className="text-sm px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition"
          >
            Export JSON
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow p-5">
        {rows.length === 0 ? (
          <div className="text-sm text-gray-600">
            No saved companies yet. Go to{" "}
            <Link href="/companies" className="underline">
              Companies
            </Link>{" "}
            and click <b>Save</b> on a profile.
          </div>
        ) : (
          <div className="space-y-3">
            {rows.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div>
                  <div className="font-semibold">Company ID: {r.id}</div>
                  <div className="text-xs text-gray-500">
                    Open profile to view enrichment + notes
                  </div>
                </div>
                <Link
                  href={`/companies/${r.id}`}
                  className="text-sm px-3 py-2 rounded-lg border bg-white hover:bg-gray-100 transition"
                >
                  Open →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link href="/companies" className="text-sm text-gray-600 underline">
        ← Back to Companies
      </Link>
    </div>
  );
}