import { NextResponse } from "next/server";

const BASE = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const key = process.env.RAPIDAPI_KEY;
    const host = process.env.RAPIDAPI_HOST || "wft-geo-db.p.rapidapi.com";
    if (!key) {
      return NextResponse.json({ error: "Missing RAPIDAPI_KEY" }, { status: 500 });
    }

    const url = `${BASE}/cities/${encodeURIComponent(id)}`;

    const r = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": host,
      },
      cache: "no-store",
    });

    const data = await r.json();

    if (!r.ok) {
      return NextResponse.json(
        { error: data?.message || "GeoDB request failed", details: data },
        { status: r.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}