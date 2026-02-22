"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CityDetails() {
  const [city, setCity] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("selectedCity");
    if (stored) {
      setCity(JSON.parse(stored));
    }
  }, []);

  if (!city) {
    return <div style={{ padding: 24 }}>No city selected.</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>{city.name}</h1>
      <p>
        {city.region}, {city.country}
      </p>

      <p><b>Population:</b> {city.population?.toLocaleString()}</p>
      <p><b>Latitude:</b> {city.latitude}</p>
      <p><b>Longitude:</b> {city.longitude}</p>

      <div style={{ marginTop: 20 }}>
        <Link href="/cities">← Back</Link>
      </div>
    </div>
  );
}