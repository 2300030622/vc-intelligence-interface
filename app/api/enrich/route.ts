import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL required" }, { status: 400 });
    }

    const response = await fetch(url);
    const html = await response.text();

    const text = html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 5000);

    const words = text
      .toLowerCase()
      .match(/\b[a-z]{4,}\b/g) || [];

    const keywords = [...new Set(words)].slice(0, 15);

    return NextResponse.json({
      summary: text.slice(0, 300) + "...",
      whatTheyDo: keywords.slice(0, 3),
      keywords,
      signals: [
        "Website content detected",
        "Keyword extraction completed",
        "Public page analysis"
      ],
      sources: [
        { url, fetchedAt: new Date().toISOString() }
      ]
    });

  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch website" },
      { status: 500 }
    );
  }
}