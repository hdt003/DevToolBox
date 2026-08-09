# DevToolBox — Fast, Free Developer Tools in Your Browser

**DevToolBox** is a modern, privacy-focused, browser-first developer utilities website built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **Lucide Icons**, and a lightweight **FastAPI** backend.

---

## Key Features

- **100% Client-Side Processing**: Tools execute inside your browser DOM using Web Crypto API and client-side JavaScript. No sensitive JWTs, JSON payloads, or secrets are uploaded to backend servers.
- **32 Functional Tools**: Complete end-to-end functionality for JSON, Base64, JWT, UUID, Regex, Timestamps, Cron, SQL, HTML/CSS/JS, XML, YAML, Markdown, Networking, and Cryptography.
- **Global Command Palette**: Instant modal search (`Cmd + K` / `Ctrl + K`) across all tools, keywords, and categories with keyboard navigation.
- **Theme System**: Light, Dark, and System preference color themes persisted in `localStorage`.
- **Favorites & History**: Save favorite tools and view recently used utilities without requiring user authentication.
- **SEO & Performance**: Dynamic metadata, structured schema, How-To guides, FAQ accordions, `sitemap.xml`, `robots.txt`, and code-split lazy loading.
- **Docker Ready**: Multi-stage `Dockerfile` for frontend and backend with `docker-compose.yml`.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript + Vite 6
- **Styling**: Tailwind CSS v4 + PostCSS
- **Icons**: Lucide React
- **Testing**: Vitest + JSDOM
- **Libraries**: `sql-formatter`, `yaml`, `papaparse`, `cronstrue`, `marked`, `dompurify`, `ua-parser-js`

### Backend
- **Framework**: Python 3.11 + FastAPI + Uvicorn
- **Validation**: Pydantic v2

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm 10+
- Python 3.11+ (optional, for backend)
- Docker & Docker Compose (optional)

### 1. Frontend Development

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start local Vite dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Run Automated Unit Tests

```bash
cd frontend
npm run test
```

### 3. Build Production Bundle

```bash
cd frontend
npm run build
```

---

## 🐍 Backend API (Optional)

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Health Check endpoint: `GET http://localhost:8000/api/health`

---

## 🐳 Docker Deployment

To run both Frontend and FastAPI backend in Docker containers:

```bash
docker compose up --build
```

Frontend will be available at [http://localhost:3000](http://localhost:3000) and Backend at [http://localhost:8000](http://localhost:8000).

---

## 📁 Repository Structure

```text
devtools/
├── frontend/
│   ├── src/
│   │   ├── components/    (Header, Footer, SearchModal, CopyButton, ToolWrapper)
│   │   ├── data/          (toolsRegistry.ts with 32 tools)
│   │   ├── hooks/         (useTheme, useFavorites, useRecentTools, useSearch)
│   │   ├── pages/         (Home, Tools, ToolPage, About, Privacy, Terms, Contact)
│   │   ├── tools/         (32 individual tool implementations)
│   │   └── types/         (Tool definitions & category interfaces)
│   ├── public/            (sitemap.xml, robots.txt, manifest.json)
│   └── package.json
├── backend/
│   ├── app/               (FastAPI main.py & routes)
│   └── Dockerfile
├── docker-compose.yml
├── .env.example
└── README.md
```
