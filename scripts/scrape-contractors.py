#!/usr/bin/env python3
"""
Tektora AI — Contractor Lead Scraper
Scrapes Google Maps for contractors by trade and city.
No API key needed — uses web scraping via SerpAPI or direct search.
"""

import json
import csv
import os
import sys
from datetime import datetime
from urllib.parse import quote_plus

try:
    import requests
except ImportError:
    os.system("pip3 install requests")
    import requests

# Configuration
TRADES = [
    "general contractor",
    "remodeling contractor", 
    "roofing contractor",
    "HVAC contractor",
    "plumber",
    "electrician",
    "landscaping contractor",
    "painting contractor",
    "flooring contractor",
    "kitchen remodeling"
]

CITIES = [
    "Champaign IL",
    "Chicago IL",
    "Indianapolis IN",
    "St Louis MO",
    "Nashville TN",
    "Columbus OH",
    "Louisville KY",
    "Memphis TN",
    "Kansas City MO",
    "Milwaukee WI",
    "Cincinnati OH",
    "Detroit MI",
    "Minneapolis MN",
    "Des Moines IA",
    "Omaha NE"
]

OUTPUT_DIR = os.path.expanduser("~/Projects/tektora-ai/leads")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def scrape_google_maps_serp(query, city, num_results=20):
    """Use SerpAPI or fallback to Brave Search for contractor leads"""
    leads = []
    
    # Try Brave Search API (we have this available)
    brave_key = os.environ.get("BRAVE_API_KEY", "")
    
    search_query = f"{query} in {city} phone number email"
    
    # Use Brave Search
    try:
        # We'll use the web_search tool via Mason instead
        # This script outputs the search queries needed
        leads.append({
            "query": f"{query} in {city}",
            "trade": query,
            "city": city,
            "source": "google_maps",
            "scraped_at": datetime.now().isoformat()
        })
    except Exception as e:
        print(f"Error: {e}")
    
    return leads

def scrape_yelp(trade, city):
    """Scrape Yelp for contractor listings"""
    url = f"https://www.yelp.com/search?find_desc={quote_plus(trade)}&find_loc={quote_plus(city)}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
    }
    
    try:
        resp = requests.get(url, headers=headers, timeout=10)
        # Basic parsing - in production would use BeautifulSoup
        return {"url": url, "status": resp.status_code}
    except Exception as e:
        return {"error": str(e)}

def generate_search_queries():
    """Generate all search queries for Mason to execute via web_search"""
    queries = []
    for city in CITIES[:5]:  # Start with 5 cities
        for trade in TRADES[:5]:  # Start with 5 trades
            queries.append({
                "query": f"{trade} in {city} phone number",
                "yelp_url": f"https://www.yelp.com/search?find_desc={quote_plus(trade)}&find_loc={quote_plus(city)}",
                "google_url": f"https://www.google.com/maps/search/{quote_plus(trade + ' in ' + city)}",
                "trade": trade,
                "city": city
            })
    
    output_file = os.path.join(OUTPUT_DIR, "search-queries.json")
    with open(output_file, "w") as f:
        json.dump(queries, f, indent=2)
    
    print(f"Generated {len(queries)} search queries")
    print(f"Saved to: {output_file}")
    print(f"\nFirst 5 queries:")
    for q in queries[:5]:
        print(f"  - {q['query']}")
    
    return queries

def scrape_yellowpages(trade, city):
    """Scrape YellowPages for contractor info"""
    url = f"https://www.yellowpages.com/search?search_terms={quote_plus(trade)}&geo_location_terms={quote_plus(city)}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
    }
    
    try:
        resp = requests.get(url, headers=headers, timeout=10)
        if resp.status_code == 200:
            # Extract business listings
            from html.parser import HTMLParser
            text = resp.text
            
            # Find business names and phones (basic extraction)
            businesses = []
            # In production: use BeautifulSoup for proper parsing
            return {"url": url, "status": resp.status_code, "length": len(text)}
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "queries":
        generate_search_queries()
    elif len(sys.argv) > 1 and sys.argv[1] == "yellowpages":
        trade = sys.argv[2] if len(sys.argv) > 2 else "general contractor"
        city = sys.argv[3] if len(sys.argv) > 3 else "Champaign IL"
        result = scrape_yellowpages(trade, city)
        print(json.dumps(result, indent=2))
    else:
        print("Tektora AI Lead Scraper")
        print("Usage:")
        print("  python3 scrape-contractors.py queries    — Generate search queries")
        print("  python3 scrape-contractors.py yellowpages [trade] [city]  — Scrape YellowPages")
        generate_search_queries()
