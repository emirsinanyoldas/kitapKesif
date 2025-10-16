# Open Library Integration Architecture

## System Architecture Diagram

```mermaid
graph TB
    A[Open Library API] --> B[OpenLibraryService]
    B --> C[Transform Data]
    C --> D[Supabase Database]
    D --> E[React App]
    
    F[Import Script] --> B
    G[Manual SQL] --> D
    
    E --> H[BookService]
    H --> D
```

## Data Flow Diagram

```mermaid
graph LR
    A[User] --> B[npm run import-books]
    B --> C[import-books.js]
    C --> D[Fetch from API]
    D --> E[Transform Books]
    E --> F[Deduplicate]
    F --> G[Batch Insert]
    G --> H[Supabase]
    H --> I[React UI]
```

## Service Layer Integration

```mermaid
graph TB
    A[Services Layer] --> B[bookService.ts]
    A --> C[reviewService.ts]
    A --> D[themeService.ts]
    A --> E[openLibraryService.ts]
    
    E --> F[searchBooks]
    E --> G[getCoverImageUrl]
    E --> H[transformToBook]
    E --> I[fetchBooksForImport]
```

## Import Process Flow

```mermaid
graph TD
    A[Start Import] --> B[Load Environment Variables]
    B --> C[Connect to Supabase]
    C --> D[Loop Through Topics]
    D --> E[Fetch Books from API]
    E --> F[Transform to Book Format]
    F --> G[Check for Duplicates]
    G --> H{Duplicate?}
    H -->|No| I[Add to Collection]
    H -->|Yes| J[Skip]
    I --> K{More Topics?}
    J --> K
    K -->|Yes| D
    K -->|No| L[Batch Insert to DB]
    L --> M[Show Statistics]
    M --> N[Complete]
```

## Category Detection Logic

```mermaid
graph TD
    A[Book Subjects] --> B{Has Subjects?}
    B -->|No| C[Return 'General']
    B -->|Yes| D[Convert to Lowercase]
    D --> E[Check Category Map]
    E --> F{Match Found?}
    F -->|Yes| G[Return Category]
    F -->|No| H[Return First Subject]
```

## File Structure

```
kitapKesif/
├── src/
│   ├── services/
│   │   ├── bookService.ts
│   │   ├── reviewService.ts
│   │   ├── themeService.ts
│   │   ├── openLibraryService.ts ← NEW
│   │   └── index.ts (updated)
│   └── ...
├── scripts/
│   ├── add-reviews.js
│   ├── import-books.js ← NEW
│   └── test-open-library.js ← NEW
├── supabase/
│   └── migrations/
│       ├── 20251011080112_create_books_and_reviews_schema.sql
│       ├── 20251015000000_add_diverse_realistic_reviews.sql
│       └── 20251016000000_import_open_library_books.sql ← NEW
├── OPEN_LIBRARY_INTEGRATION.md ← NEW
├── IMPLEMENTATION_SUMMARY.md ← NEW
└── package.json (updated)
```

## API Integration Points

### 1. Search Endpoint
```
https://openlibrary.org/search.json
Parameters:
  - q: search query
  - limit: number of results
```

### 2. Cover Images
```
https://covers.openlibrary.org/b/isbn/{ISBN}-{size}.jpg
https://covers.openlibrary.org/b/id/{cover_id}-{size}.jpg
Sizes: S, M, L
```

## Database Schema

```
books table:
├── id (uuid, PK)
├── title (text)
├── author (text)
├── description (text)
├── cover_image (text)
├── back_cover_image (text, nullable)
├── category (text)
├── average_rating (numeric)
├── total_reviews (integer)
└── created_at (timestamptz)
```

## Component Interaction

```mermaid
graph TB
    A[React Components] --> B[useBooks Hook]
    B --> C[BookService]
    C --> D[Supabase Client]
    D --> E[books table]
    
    F[Import Script] --> G[OpenLibraryService]
    G --> H[Open Library API]
    H --> I[Transform]
    I --> D
```

## Error Handling Flow

```mermaid
graph TD
    A[API Request] --> B{Success?}
    B -->|Yes| C[Transform Data]
    B -->|No| D[Log Error]
    D --> E[Continue Next Query]
    C --> F{Valid Book?}
    F -->|Yes| G[Add to Collection]
    F -->|No| H[Skip]
    G --> I[Database Insert]
    H --> E
    I --> J{Insert Success?}
    J -->|Yes| K[Increment Success Count]
    J -->|No| L[Log Error & Continue]
```

## Rate Limiting Strategy

```mermaid
graph LR
    A[Request 1] --> B[Wait 1s]
    B --> C[Request 2]
    C --> D[Wait 1s]
    D --> E[Request 3]
    E --> F[...]
```

## Batch Processing

```mermaid
graph TD
    A[300 Books Collected] --> B[Split into Batches]
    B --> C[Batch 1: 50 books]
    B --> D[Batch 2: 50 books]
    B --> E[Batch 3: 50 books]
    B --> F[...]
    C --> G[Insert to DB]
    D --> G
    E --> G
    F --> G
```

## Usage Scenarios

### Scenario 1: Automated Import
```mermaid
graph LR
    A[Developer] --> B[npm run import-books]
    B --> C[Script Runs]
    C --> D[300+ Books Added]
```

### Scenario 2: Manual SQL
```mermaid
graph LR
    A[Developer] --> B[Supabase Dashboard]
    B --> C[Copy SQL Migration]
    C --> D[Run SQL]
    D --> E[10 Books Added]
```

### Scenario 3: Programmatic Use
```mermaid
graph LR
    A[Custom Code] --> B[Import OpenLibraryService]
    B --> C[Call searchBooks]
    C --> D[Transform Results]
    D --> E[Custom Processing]
```

## Technology Stack

```
Frontend:
├── React 18
├── TypeScript
├── Tailwind CSS
└── Vite

Backend:
├── Supabase (PostgreSQL)
└── Node.js (Scripts)

External APIs:
└── Open Library API

Data Format:
├── JSON (API)
└── SQL (Database)
```

---

This architecture provides:
- ✅ **Scalability:** Easy to add more data sources
- ✅ **Maintainability:** Clear separation of concerns
- ✅ **Testability:** Each component can be tested independently
- ✅ **Extensibility:** Easy to add new features
- ✅ **Type Safety:** Full TypeScript support
