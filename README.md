# VC Intelligence Interface + Live Enrichment (MVP)

## Overview
This project implements a thesis-first VC discovery interface with a structured workflow:

Discover → Open Profile → Enrich → Analyze → Save → Export

The system demonstrates:
- Searchable companies page
- Structured company profiles
- Save-to-list functionality (localStorage)
- Export lists (JSON)
- Server-side enrichment route scaffolded
- Secure environment variable handling

## Architecture
- Next.js App Router
- Server-side API routes for enrichment (/api/enrich)
- Environment variables for API keys (never exposed client-side)
- Local caching strategy for enrichment results
- Production-ready routing structure

## Live Enrichment
Enrichment is implemented via a secure server endpoint.
The system is designed to:
- Fetch public website data
- Extract summary, keywords, derived signals
- Display sources and timestamps
- Cache results per company

Due to time-boxing (8-hour constraint), enrichment pipeline is scaffolded and structured for production deployment.

## Deployment
Designed for Vercel deployment.

## Environment Variables
RAPIDAPI_KEY=your_key_here
BASE_URL=http://localhost:3000