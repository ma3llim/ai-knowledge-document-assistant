# AI Knowledge & Document Assistant

A modern **AI Knowledge & Document Assistant frontend** built with React and TypeScript.

The application enables users to upload their documents, explore their knowledge base through natural-language conversations, and receive intelligent, context-aware answers grounded in their own content.

## Overview

The frontend is designed as a responsive single-page application that communicates with the backend through REST APIs and WebSocket connections.

It provides the user interface for:

- Authentication
- Document management
- Conversations
- AI chat
- Real-time response streaming
- Source/citation presentation
- Application navigation

## Features

- Google OAuth authentication
- Protected application routes
- Document upload and document management
- Support for PDF, DOCX, XLSX, PPTX, CSV, TXT, and Markdown documents
- Document processing status display
- Conversation management
- Chat interface with message history
- Real-time AI response streaming using WebSocket
- WebSocket connection lifecycle management
- Document and source citation display
- Loading and skeleton states
- Form validation
- API error handling
- Client-side state management
- Server-state caching and synchronization
- Responsive layout for different screen sizes

## Technology Stack

- **Language:** TypeScript
- **Framework:** React
- **Build Tool:** Vite
- **State Management:** Redux Toolkit
- **Server State:** TanStack React Query
- **Routing:** React Router
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Form Management:** React Hook Form
- **Validation:** Zod
- **HTTP Client:** Axios
- **Real-Time Communication:** WebSocket
- **UI Icons:** Lucide React
- **Package Manager:** npm

## Architecture

The frontend follows a feature-oriented React architecture.

```text
                         Frontend
                            │
             ┌──────────────┼──────────────┐
             │              │              │
            Auth          Chat         Conversation
             │              │              │
             └──────────────┼──────────────┘
                            │
                    React Components
                            │
              ┌─────────────┴─────────────┐
              │                           │
         REST API                     WebSocket
              │                           │
              ▼                           ▼
       Axios / React Query          WebSocket Manager
              │                           │
              └─────────────┬─────────────┘
                            │
                            ▼
                         Backend
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ma3llim/ai-knowledge-document-assistant
cd ai-knowledge-document-assistant
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

On Windows:

```powershell
Copy-Item .env.example .env
```

Update the `.env` file with the required application configuration.

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available through the Vite development server.

### 5. Build for Production

```bash
npm run build
```

The production build will be generated in the `dist` directory.

## Deployment

The frontend is built as a static Vite application.

```text
                         Internet
                            │
                            ▼
                        Cloudflare
                            │
                            ▼
                    React Static Build
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
             REST API              WebSocket
                 │                     │
                 └──────────┬──────────┘
                            ▼
                     Spring Boot Backend
```

The production frontend uses environment-specific API and WebSocket endpoints to communicate with the deployed backend.

## CI/CD

The frontend deployment can be automated through GitHub Actions.

```text
Developer
    │
    ▼
GitHub
    │
    ▼
GitHub Actions
    │
    ├── Install Dependencies
    ├── Build
    └── Production Checks
    │
    ▼
Production Build
    │
    ▼
Cloudflare
    │
    ▼
Deployment Complete
```

## License

This project is developed for **educational, portfolio, and demonstration purposes**.

See the [LICENSE](LICENSE) file in the repository for the applicable license terms.

## Acknowledgements

- **React:** Component-based frontend application development.
- **TypeScript:** Type-safe application development.
- **Vite:** Fast frontend development and production build tooling.
- **Redux Toolkit:** Application state management.
- **TanStack React Query:** Server-state management and caching.
- **React Router:** Client-side routing.
- **Tailwind CSS:** Utility-first styling.
- **shadcn/ui:** Reusable and accessible UI components.
- **React Hook Form:** Form state management.
- **Zod:** Runtime schema validation.
- **Axios:** HTTP client for REST API communication.
- **WebSocket:** Real-time communication for AI response streaming.
