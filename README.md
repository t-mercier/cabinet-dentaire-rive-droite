# Cabinet Dentaire Rive Droite

A modern, clean brochure website for a dental practice in Floirac, Bordeaux. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Quickstart (5 minutes)

### Prerequisites
- Node.js 20+ 
- pnpm 9+ (Corepack auto-activates in devcontainer)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Setup
Create `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 3. Run Development Server
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 4. Build for Production
```bash
pnpm build
pnpm start
```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |
| `pnpm typecheck` | Run TypeScript checks |
| `pnpm test` | Run tests |
| `pnpm test:watch` | Run tests in watch mode |

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── testimonials/  # Testimonials CRUD API
│   ├── services/          # Service pages
│   ├── contact/           # Contact page
│   ├── testimonials/      # Testimonials page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── testimonials/      # Testimonial-specific components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Site header
│   └── footer.tsx        # Site footer
├── lib/                  # Framework-agnostic utilities
│   ├── supabase/         # Supabase client configuration
│   │   ├── client.ts     # Browser client
│   │   └── server.ts     # Server client
│   ├── api/              # API helpers
│   ├── logger.ts         # Logging utility
│   └── utils.ts          # General utilities
└── types/                # TypeScript type definitions
    └── testimonials.ts   # Testimonial types
```

## 🔧 Environment Variables

### Required (Public)
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

### Required (Server-only)
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (for API routes)

## 🎨 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Radix UI + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Testing**: Vitest + Testing Library
- **Linting**: ESLint + Prettier

## 🗄️ Database Schema

### Testimonials Table
```sql
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patientName TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  content TEXT NOT NULL,
  service TEXT NOT NULL,
  isApproved BOOLEAN DEFAULT false,
  createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Other Platforms
- Set environment variables in your hosting platform
- Build and start commands are standard Next.js

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm test src/components/__tests__/header.test.tsx
```

## 📝 Code Style

- **ESLint**: Flat config with Next.js rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict mode enabled
- **Imports**: Absolute imports using `@/` alias

## 🔒 Security

- No direct database connections from client
- Service role key only used server-side
- Row Level Security (RLS) policies recommended for testimonials
- Environment variables properly separated

## 🎯 Features

- ✅ Responsive design
- ✅ Modern UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ Supabase integration
- ✅ Testimonials system
- ✅ Contact form
- ✅ Service pages
- ✅ SEO optimized
- ✅ Error boundaries
- ✅ Loading states
- ✅ Form validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is private and proprietary to Cabinet Dentaire Rive Droite.

