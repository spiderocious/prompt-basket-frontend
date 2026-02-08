# PromptBasket

A beautiful and intuitive prompt management tool for organizing and managing your AI prompts. Built with React, TypeScript, and Tailwind CSS.

## Links
- [Live Demo](https://promptbasket.devferanmi.xyz/)
- [GitHub Repository](https://github.com/spiderocious/prompt-basket-frontend)

## Features

- **Prompt Management**: Create, edit, delete, and organize your prompts
- **Bucket Organization**: Group prompts into colorful, customizable buckets
- **Smart Search**: Search prompts by title, content, or tags
- **Markdown Support**: Write prompts with markdown formatting and live preview
- **Local Storage**: All data stored locally in your browser
- **Beautiful UI**: Clean, modern interface with smooth animations
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile


## Project Structure

```
src/
├── app/                    # App configuration and routing
│   └── layout/            # Layout components (sidebar, app shell)
├── features/              # Feature modules
│   ├── dashboard/         # Dashboard with stats and recent prompts
│   ├── prompt-library/    # All prompts page with search/filter
│   ├── prompt-editor/     # Create/edit prompts with markdown
│   ├── buckets-page/      # View all buckets
│   └── bucket-management/ # Bucket CRUD operations
└── shared/                # Shared resources
    ├── ui/                # Reusable UI components
    ├── services/          # Business logic and storage
    ├── types/             # TypeScript type definitions
    └── utils/             # Utility functions
```

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## Architecture Highlights

### Feature-Sliced Design
The project follows feature-sliced design principles for better organization and maintainability.

### Storage Abstraction
All data operations go through a storage adapter interface, making it easy to switch from localStorage to a backend API in the future.

### Component Organization
- **Components**: Reusable, self-contained UI elements
- **Parts**: Larger, feature-specific sections that compose multiple components
- **Hooks**: Custom hooks for business logic and state management

### Code Conventions

- Use hyphenated file names (e.g., `prompt-card.tsx`)
- One utility function per file for modularity
- Barrel exports (`index.ts`) in feature folders
- Re-export external libraries through `shared/ui` for easy swapping