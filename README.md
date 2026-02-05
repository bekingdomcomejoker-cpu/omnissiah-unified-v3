# Omnissiah Unified V3

**Omega Federation - Unified Sovereignty**

A comprehensive full-stack application featuring React frontend, Express backend, and tRPC API integration.

## Features

- **Frontend**: React 19 with TypeScript, Tailwind CSS, and Wouter routing
- **Backend**: Express.js with tRPC for type-safe API
- **Database**: MySQL/TiDB with Drizzle ORM
- **Authentication**: OAuth integration
- **Real-time**: WebSocket support with Socket.io
- **Cloud Storage**: AWS S3 integration
- **AI Integration**: Google Generative AI support

## Project Structure

```
omnissiah-unified-v3/
├── client/
│   └── src/
│       ├── components/      # React components
│       ├── pages/           # Page components
│       ├── contexts/        # React contexts
│       ├── App.tsx          # Main app component
│       ├── main.tsx         # React entry point
│       └── index.css        # Global styles
├── server/
│   ├── _core/              # Core server setup
│   ├── routers/            # tRPC routers
│   ├── core/               # Core functionality
│   ├── security/           # Security modules
│   ├── telemetry/          # Telemetry modules
│   └── websocket/          # WebSocket handlers
├── core/                   # Python core modules
├── vite.config.ts          # Vite configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+
- MySQL 8+ or TiDB

### Installation

1. Clone the repository:
```bash
gh repo clone bekingdomcomejoker-cpu/omnissiah-unified-v3
cd omnissiah-unified-v3
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm check` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests with Vitest
- `pnpm db:push` - Push database schema changes

## Technology Stack

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- Vite
- Wouter (routing)
- Radix UI components
- Socket.io client

### Backend
- Express.js
- tRPC
- Drizzle ORM
- MySQL2 / PostgreSQL
- Socket.io
- AWS SDK
- Google Generative AI

### Development
- TypeScript
- Prettier
- Vitest
- Vite

## License

MIT

## Support

For issues and questions, please refer to the project documentation or contact the development team.
