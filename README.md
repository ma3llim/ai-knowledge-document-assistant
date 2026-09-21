# AI Knowledge Document Assistant

A modern and responsive **AI-powered Document Intelligence frontend** built with React and TypeScript.

The application enables users to upload their documents, explore their knowledge base through natural-language conversations, and receive intelligent, context-aware answers grounded in their own content.

## Overview

The AI Knowledge Document Assistant provides a clean and intuitive interface for interacting with personal documents through an AI-powered conversational experience.

Users can upload and manage documents, select documents for conversations, ask questions in natural language, and receive real-time AI responses through a responsive chat interface.

## Features

- Google OAuth authentication
- Document upload and management
- Support for PDF, DOCX, XLSX, PPTX, CSV, TXT, and Markdown documents
- Document selection for conversations
- Natural-language document conversations
- Real-time AI response streaming
- Conversation history
- Responsive chat interface
- Document status and processing indicators
- Loading and error states
- Responsive design for desktop and mobile devices
- Reusable and accessible UI components

## Technology Stack

- **Language:** TypeScript
- **Framework:** React
- **Build Tool:** Vite
- **Routing:** React Router
- **State Management:** Redux Toolkit
- **Server State:** TanStack React Query
- **Form Management:** React Hook Form
- **Validation:** Zod
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Icons:** Lucide React & React Icons
- **API Communication:** Axios
- **Real-Time Communication:** WebSocket

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/ma3llim/ai-knowledge-document-assistant
    cd <frontend-project>
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    ```bash
    cp .env.example .env
    ```

    On Windows:

    ```powershell
    Copy-Item .env.example .env
    ```

    Update the `.env` file with the required application configuration.

4. **Start the Development Server**

    ```bash
    npm run dev
    ```

5. **Access the Application**

    The frontend will be available at:

    ```text
    http://localhost:5173
    ```

## Deployment

The frontend is deployed independently using Cloudflare.

```text
Developer
    │
    ▼
GitHub
    │
    ▼
Cloudflare
    │
    ▼
E-Commerce Frontend
    │
    │ HTTPS / REST API
    ▼
E-Commerce Backend

The backend is deployed separately on AWS EC2.
```

## License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for the complete license terms.

## Acknowledgements

1. **React:** Component-based frontend development and user interface architecture.
2. **TypeScript:** Type-safe application development.
3. **Vite:** Fast frontend development and build tooling.
4. **React Router:** Client-side routing and navigation.
5. **Redux Toolkit:** Application state management.
6. **TanStack React Query:** Server-state management, caching, and data synchronization.
7. **React Hook Form:** Form state management.
8. **Zod:** Schema validation.
9. **Tailwind CSS:** Utility-first styling and responsive design.
10. **shadcn/ui:** Reusable and accessible UI components.
11. **Lucide React:** Interface icons.
12. **React Icons:** Technology and application icons.
