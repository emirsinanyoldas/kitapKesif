# 🏗️ Mimari Diyagram

## Sistem Mimarisine Genel Bakış

```mermaid
graph TB
    User[User/Browser]
    
    subgraph "Presentation Layer"
        App[App.tsx]
        Header[Header]
        SearchBar[SearchBar]
        BookCard[BookCard]
        BookModal[BookModal]
        Footer[Footer]
        ScrollTop[ScrollToTop]
        AI[AIAssistant]
    end
    
    subgraph "Business Logic Layer"
        UseTheme[useTheme Hook]
        UseBooks[useBooks Hook]
        UseModal[useBookModal Hook]
    end
    
    subgraph "Service Layer"
        ThemeService[ThemeService]
        BookService[BookService]
        ReviewService[ReviewService]
    end
    
    subgraph "Data Layer"
        Supabase[Supabase Client]
        LocalStorage[Local Storage]
    end
    
    User --> App
    App --> Header
    App --> SearchBar
    App --> BookCard
    App --> BookModal
    App --> Footer
    App --> ScrollTop
    App --> AI
    
    App --> UseTheme
    App --> UseBooks
    App --> UseModal
    
    UseTheme --> ThemeService
    UseBooks --> BookService
    UseModal --> ReviewService
    
    ThemeService --> LocalStorage
    BookService --> Supabase
    ReviewService --> Supabase
```

## Veri Akışı Mimarisi

```mermaid
graph LR
    User[User Action]
    Component[Component]
    Hook[Custom Hook]
    Service[Service Layer]
    API[Supabase API]
    State[Component State]
    
    User --> Component
    Component --> Hook
    Hook --> Service
    Service --> API
    API --> Service
    Service --> Hook
    Hook --> State
    State --> Component
    Component --> User
```

## Bileşen Mimarisi

```mermaid
graph TB
    subgraph "App Container"
        AppMain[App.tsx - Main Container]
    end
    
    subgraph "Layout Components"
        HeaderComp[Header - Navigation & Theme]
        FooterComp[Footer - Site Info]
    end
    
    subgraph "Feature Components"
        SearchComp[SearchBar - Search & Filter]
        BookCardComp[BookCard - Book Display]
        ModalComp[BookModal - Book Details]
    end
    
    subgraph "Utility Components"
        ScrollComp[ScrollToTop - Navigation]
        AIComp[AIAssistant - Help Widget]
    end
    
    AppMain --> HeaderComp
    AppMain --> SearchComp
    AppMain --> BookCardComp
    AppMain --> ModalComp
    AppMain --> FooterComp
    AppMain --> ScrollComp
    AppMain --> AIComp
```

## Hook Bağımlılıkları

```mermaid
graph TB
    subgraph "Custom Hooks"
        ThemeHook[useTheme]
        BooksHook[useBooks]
        ModalHook[useBookModal]
    end
    
    subgraph "Services Used"
        ThemeSvc[ThemeService]
        BookSvc[BookService]
        ReviewSvc[ReviewService]
    end
    
    subgraph "React Hooks"
        State[useState]
        Effect[useEffect]
        Callback[useCallback]
    end
    
    ThemeHook --> ThemeSvc
    BooksHook --> BookSvc
    ModalHook --> ReviewSvc
    
    ThemeHook --> State
    ThemeHook --> Effect
    
    BooksHook --> State
    BooksHook --> Effect
    BooksHook --> Callback
    
    ModalHook --> State
    ModalHook --> Callback
```

## Servis Katmanı Yapısı

```mermaid
graph TB
    subgraph "Services"
        BookSvc[BookService]
        ReviewSvc[ReviewService]
        ThemeSvc[ThemeService]
    end
    
    subgraph "External APIs"
        Supabase[Supabase Database]
        Storage[Browser Storage]
    end
    
    subgraph "Return Types"
        DataError[data, error Pattern]
        Boolean[Boolean Returns]
        Direct[Direct Values]
    end
    
    BookSvc --> Supabase
    ReviewSvc --> Supabase
    ThemeSvc --> Storage
    
    BookSvc --> DataError
    ReviewSvc --> DataError
    ThemeSvc --> Direct
```

## Durum Yönetimi Akışı

```mermaid
graph LR
    Initial[Initial State]
    Action[User Action]
    Hook[Custom Hook]
    Service[Service Call]
    Update[State Update]
    Render[Re-render]
    
    Initial --> Render
    Render --> Action
    Action --> Hook
    Hook --> Service
    Service --> Update
    Update --> Render
```

## Tema Sistemi Akışı

```mermaid
graph TB
    User[User Clicks Theme Toggle]
    Toggle[toggleTheme Function]
    Service[ThemeService.toggleTheme]
    Save[ThemeService.saveTheme]
    Apply[ThemeService.applyTheme]
    DOM[Update DOM Class]
    State[Update React State]
    Rerender[Components Re-render]
    
    User --> Toggle
    Toggle --> Service
    Service --> Save
    Service --> Apply
    Apply --> DOM
    Toggle --> State
    State --> Rerender
    DOM --> Rerender
```

## Kitap Yükleme Akışı

```mermaid
graph TB
    Mount[Component Mounts]
    Hook[useBooks Hook]
    Fetch[fetchBooks Function]
    Service[BookService.fetchBooks]
    API[Supabase API Call]
    Response[API Response]
    Error{Error?}
    SetBooks[Set Books State]
    SetError[Set Error State]
    Filter[Apply Filters]
    Render[Render Components]
    
    Mount --> Hook
    Hook --> Fetch
    Fetch --> Service
    Service --> API
    API --> Response
    Response --> Error
    Error -->|No| SetBooks
    Error -->|Yes| SetError
    SetBooks --> Filter
    Filter --> Render
    SetError --> Render
```

## Klasör Yapısı Görselleştirme

```
src/
├── 📱 components/          (Presentation Layer)
│   ├── Header.tsx         → Layout
│   ├── Footer.tsx         → Layout
│   ├── SearchBar.tsx      → Feature
│   ├── BookCard.tsx       → Feature
│   ├── BookModal.tsx      → Feature
│   ├── ScrollToTop.tsx    → Utility
│   └── AIAssistant.tsx    → Utility
│
├── 🎣 hooks/              (Business Logic Layer)
│   ├── useTheme.ts        → Theme management
│   ├── useBooks.ts        → Book data management
│   ├── useBookModal.ts    → Modal state management
│   └── index.ts           → Exports
│
├── ⚙️ services/           (Service Layer)
│   ├── bookService.ts     → Book operations
│   ├── reviewService.ts   → Review operations
│   ├── themeService.ts    → Theme operations
│   └── index.ts           → Exports
│
├── 🛠️ utils/              (Utility Layer)
│   ├── helpers.ts         → Helper functions
│   └── index.ts           → Exports
│
├── 📋 constants/          (Configuration Layer)
│   └── index.ts           → App constants
│
├── 🔌 lib/                (External Libraries)
│   └── supabase.ts        → Database client
│
├── 📝 types.ts            (Type Definitions)
├── 🎨 App.tsx             (Main Application)
├── 🚀 main.tsx            (Entry Point)
└── 💅 index.css           (Global Styles)
```

## Teknoloji Yığını Katmanları

```mermaid
graph TB
    subgraph "Frontend"
        React[React 18]
        TS[TypeScript]
        Tailwind[Tailwind CSS]
    end
    
    subgraph "Build Tools"
        Vite[Vite]
        ESLint[ESLint]
    end
    
    subgraph "Backend"
        Supabase[Supabase]
        PostgreSQL[PostgreSQL]
    end
    
    subgraph "Deployment"
        Vercel[Vercel/Netlify]
        CDN[CDN]
    end
    
    React --> Vite
    TS --> Vite
    Tailwind --> Vite
    Vite --> Vercel
    Vercel --> CDN
    React --> Supabase
    Supabase --> PostgreSQL
```

## İstek/Yanıt Akışı

```mermaid
sequenceDiagram
    participant U as User
    participant C as Component
    participant H as Hook
    participant S as Service
    participant A as API
    
    U->>C: Click Book Card
    C->>H: openModal(book)
    H->>S: fetchReviewsByBookId(id)
    S->>A: GET /reviews?book_id=X
    A-->>S: Reviews Data
    S-->>H: {data, error}
    H-->>C: Update State
    C-->>U: Show Modal with Reviews
```

## Hata İşleme Akışı

```mermaid
graph TB
    Action[User Action]
    Try[Try Block]
    Service[Service Call]
    Success{Success?}
    Data[Process Data]
    Error[Catch Error]
    UserError[Show User Error]
    LogError[Console Log]
    State[Update State]
    UI[Update UI]
    
    Action --> Try
    Try --> Service
    Service --> Success
    Success -->|Yes| Data
    Success -->|No| Error
    Data --> State
    Error --> UserError
    Error --> LogError
    UserError --> State
    State --> UI
```

---

## Ana Mimari İlkeler

### 1. Endişelerin Ayrılması
- **Bileşenler**: Sadece UI oluşturma
- **Hook'lar**: Durum ve yan etkiler
- **Servisler**: İş mantığı ve API
- **Araçlar**: Yeniden kullanılabilir fonksiyonlar

### 2. Tek Yönlü Veri Akışı
```
User Action → Component → Hook → Service → API
                  ↑                        ↓
                  └──── State Update ←─────┘
```

### 3. Bağımlılık Enjeksiyonu
- Servisler bağımsızdır
- Hook'lar servisleri tüketir
- Bileşenler hook'ları tüketir

### 4. Tek Sorumluluk
- Her modülün tek bir işi vardır
- Test edilmesi ve bakımı kolaydır
- Net sınırlar

---

**Bu mimari şunları sağlar**:
✅ Bakım Kolaylığı  
✅ Ölçeklenebilirlik  
✅ Test Edilebilirlik  
✅ Performans  
✅ Geliştirici Deneyimi