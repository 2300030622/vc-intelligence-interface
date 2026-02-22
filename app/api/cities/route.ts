import { NextResponse } from "next/server";

const BASE = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const namePrefix = searchParams.get("namePrefix")?.trim();
    const limit = searchParams.get("limit") || "10";

    if (!namePrefix) {
      return NextResponse.json({ error: "Missing namePrefix" }, { status: 400 });
    }

    const key = process.env.RAPIDAPI_KEY;
    const host = process.env.RAPIDAPI_HOST || "wft-geo-db.p.rapidapi.com";

    if (!key) {
      return NextResponse.json({ error: "Missing RAPIDAPI_KEY" }, { status: 500 });
    }

    const url = `${BASE}/cities?namePrefix=${encodeURIComponent(
      namePrefix
    )}&limit=${encodeURIComponent(limit)}&sort=-population`;

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