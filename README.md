# drizzle-supabase-nextjs - Full-Stack Next.js Application

A modern, production-ready full-stack web application built with Next.js 15, Supabase, and Drizzle ORM. This project demonstrates best practices for building scalable web applications with authentication, database management, and a beautiful UI.

## 🚀 Features

### **Authentication & Authorization**
- **Complete Auth System**: Sign up, sign in, sign out functionality
- **Password Management**: Forgot password and password update flows
- **Email Verification**: Email confirmation for new accounts
- **Protected Routes**: Middleware-based route protection
- **Session Management**: Cookie-based authentication with Supabase SSR

### **Database & ORM**
- **PostgreSQL Database**: Powered by Supabase
- **Drizzle ORM**: Type-safe database queries and schema management
- **User Management**: User profiles with posts relationship
- **CRUD Operations**: Complete database operations for users and posts
- **Type Safety**: Full TypeScript support with inferred types

### **Modern UI/UX**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: Theme switching with next-themes
- **Component Library**: Built with shadcn/ui components
- **Accessibility**: ARIA-compliant components
- **Modern Styling**: Clean, professional design

### **Development Experience**
- **TypeScript**: Full type safety throughout the application
- **ESLint & Biome**: Code quality and formatting
- **Hot Reload**: Fast development with Turbopack
- **Environment Management**: Secure environment variable handling

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Drizzle ORM
- **Authentication**: Supabase Auth
- **Deployment**: Vercel-ready
- **Code Quality**: ESLint, Biome

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Bun](https://bun.sh/) (recommended) or npm/yarn
- [Git](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/drizzle-supabase-nextjs.git
cd drizzle-supabase-nextjs
```

### 2. Install Dependencies

```bash
bun install
# or
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the API settings
3. Add them to your `.env.local` file

### 5. Run Database Migrations

```bash
bun run db:push
# or
npx drizzle-kit push
```

### 6. Start the Development Server

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
drizzle-supabase-nextjs/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── auth-button.tsx   # Authentication button
│   ├── login-form.tsx    # Login form
│   └── sign-up-form.tsx  # Sign up form
├── lib/                  # Utility libraries
│   ├── drizzle/          # Database configuration
│   ├── supabase/         # Supabase client setup
│   └── utils.ts          # Utility functions
├── middleware.ts         # Next.js middleware
├── supabase/            # Supabase configuration
└── drizzle.config.ts    # Drizzle ORM configuration
```

## 🔧 Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint
- `bun db:push` - Push database schema changes
- `bun db:studio` - Open Drizzle Studio

## 🗄️ Database Schema

The application includes two main tables:

### Users Table
```sql
CREATE TABLE users_table (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  email TEXT NOT NULL UNIQUE
);
```

### Posts Table
```sql
CREATE TABLE posts_table (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users_table(id) ON DELETE CASCADE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL
);
```

## 🔐 Authentication Flow

1. **Sign Up**: Users can create accounts with email verification
2. **Sign In**: Email/password authentication
3. **Password Reset**: Forgot password functionality
4. **Protected Routes**: Automatic redirection for unauthenticated users
5. **Session Management**: Persistent sessions with cookies

## 🎨 Customization

### Adding New Components

1. Create components in the `components/` directory
2. Use shadcn/ui components for consistency
3. Follow the existing naming conventions

### Styling

- Use Tailwind CSS classes for styling
- Follow the design system in `app/globals.css`
- Support both light and dark themes

### Database Changes

1. Modify the schema in `lib/drizzle/db/schema.ts`
2. Run `bun db:push` to apply changes
3. Update TypeScript types automatically

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Supabase](https://supabase.com/) for the backend-as-a-service
- [Drizzle ORM](https://orm.drizzle.team/) for type-safe database operations
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/yourusername/drizzle-supabase-nextjs/issues) page
2. Create a new issue if your problem isn't already addressed
3. Join our community discussions

---

**Happy Coding! 🚀**
