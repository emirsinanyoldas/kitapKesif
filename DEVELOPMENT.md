# Development Guide

## 🎯 How to Add New Features

### Adding a New Service

1. Create a new service file in `src/services/`:
```typescript
// src/services/yourService.ts
export class YourService {
  static async yourMethod(): Promise<{ data: any; error: Error | null }> {
    try {
      // Your logic here
      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  }
}
```

2. Export it in `src/services/index.ts`:
```typescript
export { YourService } from './yourService';
```

### Adding a New Hook

1. Create a new hook file in `src/hooks/`:
```typescript
// src/hooks/useYourHook.ts
import { useState, useEffect } from 'react';

export function useYourHook() {
  const [state, setState] = useState();
  
  // Your logic here
  
  return { state, /* other values */ };
}
```

2. Export it in `src/hooks/index.ts`:
```typescript
export { useYourHook } from './useYourHook';
```

### Adding a New Component

1. Create a new component file in `src/components/`:
```typescript
// src/components/YourComponent.tsx
import { memo } from 'react';

interface YourComponentProps {
  // Your props
}

export const YourComponent = memo(function YourComponent({ }: YourComponentProps) {
  return (
    <div>
      {/* Your JSX */}
    </div>
  );
});
```

### Adding New Constants

Add to `src/constants/index.ts`:
```typescript
export const YOUR_CONSTANT = 'value';
```

### Adding New Utility Functions

Add to `src/utils/helpers.ts`:
```typescript
export function yourHelper(param: string): string {
  // Your logic
  return result;
}
```

## 🧪 Testing Guidelines

### Unit Testing Services
```typescript
import { BookService } from '../services';

describe('BookService', () => {
  it('should filter books by query', () => {
    const books = [/* test data */];
    const result = BookService.filterBooks(books, 'query');
    expect(result).toHaveLength(1);
  });
});
```

### Testing Hooks
```typescript
import { renderHook } from '@testing-library/react-hooks';
import { useBooks } from '../hooks';

describe('useBooks', () => {
  it('should fetch books on mount', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useBooks());
    await waitForNextUpdate();
    expect(result.current.books).toBeDefined();
  });
});
```

### Testing Components
```typescript
import { render, screen } from '@testing-library/react';
import { BookCard } from '../components';

describe('BookCard', () => {
  it('should render book title', () => {
    const book = {/* mock data */};
    render(<BookCard book={book} onClick={() => {}} />);
    expect(screen.getByText(book.title)).toBeInTheDocument();
  });
});
```

## 📝 Code Style Guidelines

### Naming Conventions

- **Components**: PascalCase (`BookCard`, `Header`)
- **Hooks**: camelCase with `use` prefix (`useTheme`, `useBooks`)
- **Services**: PascalCase with `Service` suffix (`BookService`)
- **Utils**: camelCase (`formatDate`, `scrollToTop`)
- **Constants**: UPPER_SNAKE_CASE (`THEME_STORAGE_KEY`)

### File Organization

```
ComponentName.tsx
├── Imports (grouped by: react, third-party, local)
├── Types/Interfaces
├── Component Definition (with memo)
└── Export
```

### TypeScript Guidelines

- Always specify return types for functions
- Use interfaces for object shapes
- Avoid `any` type
- Use proper generics
- Document complex types

### Component Guidelines

- Use functional components
- Wrap with `memo` for performance
- Keep components small and focused
- Extract logic to hooks
- Props should be interfaces

### Hook Guidelines

- Start with `use` prefix
- Return an object with named values
- Use `useCallback` for functions
- Use `useMemo` for computed values
- Handle errors properly

### Service Guidelines

- Use static methods
- Return `{ data, error }` pattern
- Handle all errors
- Add JSDoc comments
- Keep methods focused

## 🔧 Common Tasks

### Updating Theme Colors

Edit `tailwind.config.js` and update components:
```typescript
// Light mode: from-orange-100
// Dark mode: dark:from-slate-900
```

### Adding New API Endpoint

1. Add method to appropriate service
2. Create/update hook to use service
3. Update component to use hook

### Adding Loading States

```typescript
const [loading, setLoading] = useState(false);

try {
  setLoading(true);
  // Your async operation
} finally {
  setLoading(false);
}
```

### Error Handling Pattern

```typescript
const [error, setError] = useState<string | null>(null);

try {
  setError(null);
  const { data, error: fetchError } = await Service.method();
  if (fetchError) {
    setError('User-friendly message');
    console.error('Detailed error:', fetchError);
  }
} catch (e) {
  setError('Unexpected error');
  console.error(e);
}
```

## 🚀 Performance Tips

1. **Use React.memo** for all components
2. **Use useCallback** for event handlers
3. **Use useMemo** for expensive calculations
4. **Lazy load** components when possible
5. **Optimize images** (WebP, lazy loading)
6. **Code split** large features

## 🐛 Debugging

### Common Issues

1. **Theme not applying**: Check if `darkMode: 'class'` is in tailwind.config.js
2. **Data not loading**: Check Supabase credentials in .env
3. **TypeScript errors**: Run `npm run typecheck`
4. **Style issues**: Clear browser cache

### Debug Tools

- React DevTools
- Redux DevTools (if using)
- Network tab for API calls
- Console for errors

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)

## 🤝 Contributing

1. Create feature branch
2. Follow code style
3. Add tests
4. Update documentation
5. Submit PR

## ✅ Pre-commit Checklist

- [ ] Code follows style guidelines
- [ ] No TypeScript errors
- [ ] No console.log in production
- [ ] Components are memoized
- [ ] Error handling in place
- [ ] Loading states implemented
- [ ] Types properly defined
- [ ] Constants used (no magic values)
