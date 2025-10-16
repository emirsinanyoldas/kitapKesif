# KitapKeşif - Book Discovery & Review Platform

A modern, responsive book discovery and review platform built with React, TypeScript, and Supabase.

## 🏗️ Architecture

This project follows a clean, modular architecture based on industry best practices:

### Directory Structure

```
src/
├── components/          # React components (UI layer)
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── BookCard.tsx
│   ├── BookModal.tsx
│   ├── SearchBar.tsx
│   ├── ScrollToTop.tsx
│   └── AIAssistant.tsx
├── hooks/              # Custom React hooks (business logic)
│   ├── useTheme.ts     # Theme management hook
│   ├── useBooks.ts     # Books data management hook
│   ├── useBookModal.ts # Book modal state hook
│   └── index.ts
├── services/           # Service layer (API & business logic)
│   ├── bookService.ts   # Book-related API calls
│   ├── reviewService.ts # Review-related API calls
│   ├── themeService.ts  # Theme management logic
│   └── index.ts
├── utils/              # Utility functions
│   ├── helpers.ts      # Common helper functions
│   └── index.ts
├── constants/          # Application constants
│   └── index.ts        # Constants and messages
├── lib/                # Third-party library configurations
│   └── supabase.ts     # Supabase client
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🎨 Design Patterns

### 1. **Separation of Concerns**
- **Components**: Pure presentational components (UI only)
- **Hooks**: Business logic and state management
- **Services**: API calls and data transformation
- **Utils**: Reusable helper functions

### 2. **Custom Hooks Pattern**
- `useTheme`: Manages theme state and persistence
- `useBooks`: Handles book data fetching, filtering, and search
- `useBookModal`: Manages modal state and review loading

### 3. **Service Layer Pattern**
- `BookService`: Centralized book-related operations
- `ReviewService`: Centralized review-related operations
- `ThemeService`: Theme management utilities

### 4. **Performance Optimizations**
- React.memo for all components to prevent unnecessary re-renders
- useCallback for stable function references in hooks
- Lazy loading and code splitting ready

## 🚀 Features

- **Theme Management**: Light/Dark mode with persistence
- **Book Discovery**: Browse, search, and filter books
- **Reviews**: Read and view book reviews
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Gradient backgrounds, smooth transitions

## 🛠️ Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Backend & Database
- **Vite** - Build tool
- **Lucide React** - Icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Code Quality

### TypeScript
- Strict type checking enabled
- All components properly typed
- No `any` types used

### Code Organization
- Single Responsibility Principle
- DRY (Don't Repeat Yourself)
- Consistent naming conventions
- Proper error handling

### Performance
- Memoized components
- Optimized re-renders
- Efficient state management

## 🎯 Best Practices Implemented

1. **Component Structure**: Each component has a single responsibility
2. **Type Safety**: Full TypeScript coverage
3. **Error Handling**: Proper error states and user feedback
4. **Loading States**: User-friendly loading indicators
5. **Constants**: No magic strings or numbers
6. **Reusability**: Shared utilities and services
7. **Maintainability**: Clear code organization and documentation

## 📄 License

MIT License - feel free to use this project for learning and development.
