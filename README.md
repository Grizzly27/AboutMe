# Drew Whitlock | Finance Transformation x Business Intelligence

[Live portfolio](https://grizzly27.github.io/AboutMe/) | [LinkedIn](https://www.linkedin.com/in/drewwhitlock/) | [GitHub](https://github.com/Grizzly27)

I build executive finance systems that convert complex operating data into faster, cleaner decisions. My work sits at the intersection of FP&A, business intelligence, forecasting automation, and modern data products.

This repository powers my public portfolio: a GitHub Pages site designed to show the same operating range I bring to finance transformation work.

## Executive Snapshot

- Supported analysis and executive visibility across **$13B in annual expenses** through BI, forecasting, and self-service financial reporting.
- Identified **$30M+ in financial opportunity** through automation, analytics, vendor strategy, and expense optimization.
- Reduced manual forecasting work by up to **80%** by replacing spreadsheet-heavy workflows with Python-enabled automation.
- Upskilled **15+ finance professionals** in analytics, automation, and modern finance technology.
- Built across the finance and technology stack: **FP&A, Power BI, Anaplan, Python, SQL, AWS, forecasting, and executive storytelling**.

## What This Site Demonstrates

This is not a static resume page. It is a working proof of how I think about executive finance products:

- **Executive dashboard experience**: a standalone drag-and-drop dashboard page for public-company financial analysis.
- **Historical plus forecast view**: actuals paired with a 3-year moving-average trend forecast.
- **Decision-ready financial storytelling**: KPIs, expense mix, margin trend, forecast detail, and executive insights in one flow.
- **Portfolio proof points**: career impact, research, and applied finance technology projects.
- **Static-site discipline**: fast, dependency-light, deployable through GitHub Pages.

## Featured Dashboard

The dashboard is a front-end demo of the kind of BI experience finance teams should expect from modern internal tools.

Core capabilities:

- Select among real financial-services and technology companies and instantly refresh financials.
- View revenue, operating expense, operating margin, YoY growth, and forecast metrics.
- Compare historical performance with a 3-year moving-average forecast.
- Reorder widgets with drag and drop.
- Persist dashboard layout locally with `localStorage`.
- Render charts and tables client-side with vanilla JavaScript.

Included public-company set:

- Financial services: Visa, Mastercard, PayPal.
- Technology: Microsoft, Apple, NVIDIA.

Data basis:

Annual figures are sourced from SEC companyfacts where available. Amounts are shown in millions. Operating expense is derived as revenue less operating income so companies can be compared consistently across sectors.

Forecast method:

The demo calculates the trailing average of the last three historical YoY growth rates, then projects revenue and expenses three years forward. The model is intentionally simple, explainable, and suitable for executive demonstration.

## Tech Stack

- **HTML5** for semantic structure.
- **CSS3** with responsive grid and custom properties.
- **Vanilla JavaScript** for navigation, animation, dashboard state, chart rendering, and forecast calculations.
- **GitHub Pages** for static hosting.

No framework is required. The project is intentionally portable and easy to inspect.

## Local Development

Clone the repository and serve the static files:

```bash
git clone https://github.com/Grizzly27/AboutMe.git
cd AboutMe
python -m http.server 8000
```

Open:

```text
http://localhost:8000
```

Node-based option:

```bash
npm install
npm run dev
```

## Repository Structure

```text
AboutMe/
|-- index.html              # Portfolio homepage and dashboard entry point
|-- dashboard.html          # Standalone financial dashboard demo
|-- track-record.html       # Career impact and achievements
|-- research.html           # Research and technical thinking
|-- about.html              # Longer-form professional thesis
|-- css/main.css            # Site design system and responsive styles
|-- js/main.js              # Interactions, dashboard logic, and forecasting
|-- assets/                 # Static assets
`-- papers/                 # Published research pages
```

## Design Principles

- **Executive signal first**: lead with business outcomes, not tool lists.
- **Conservative claims**: quantify impact without overstating ownership.
- **Product-grade interaction**: make the portfolio feel like a usable finance tool.
- **Readable implementation**: keep the code simple enough to audit quickly.
- **Responsive by default**: desktop polish without sacrificing mobile usability.

## Deployment

The public site is served through GitHub Pages:

```text
https://grizzly27.github.io/AboutMe/
```

The live publishing branch is `gh-pages`. The default repository branch is `main`.

## Contact

- Email: [drew.whitlock04@gmail.com](mailto:drew.whitlock04@gmail.com)
- LinkedIn: [linkedin.com/in/drewwhitlock](https://www.linkedin.com/in/drewwhitlock/)
- GitHub: [github.com/Grizzly27](https://github.com/Grizzly27)
