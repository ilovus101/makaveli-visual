# MAKAVELI VISUAL

**Where Creativity Meets Quality.**

A premium printing, branding, signage, embroidery, and promotional products platform built with modern web technologies.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18.x or higher
- PostgreSQL 13.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ilovus101/makaveli-visual.git
   cd makaveli-visual
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in the required variables:
   ```env
   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/makaveli_visual
   
   # Authentication
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3000
   
   # AWS
   AWS_ACCESS_KEY_ID=your-access-key
   AWS_SECRET_ACCESS_KEY=your-secret-key
   AWS_REGION=us-east-1
   AWS_S3_BUCKET=makaveli-visual-bucket
   AWS_SES_REGION=us-east-1
   ```

4. **Setup database**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
makaveli-visual/
├── app/                 # Next.js app directory (pages & routes)
├── components/          # Reusable React components
├── features/            # Feature modules
├── services/            # Business logic & API clients
├── lib/                 # Utilities & helpers
├── hooks/               # Custom React hooks
├── store/               # State management
├── config/              # Configuration
├── constants/           # Constants
├── types/               # TypeScript types
├── prisma/              # Database schema & migrations
├── public/              # Static assets
├── styles/              # Global styles
├── tests/               # Test files
├── docs/                # Documentation
├── .env.example         # Environment variables template
├── PROJECT_BLUEPRINT.md # Development specification
└── README.md           # This file
```

For detailed architecture documentation, see [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

---

## 🛠 Technology Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Library:** React 18
- **Styling:** Tailwind CSS 3
- **Components:** shadcn/ui (optional)

### Backend
- **API:** Next.js Route Handlers
- **ORM:** Prisma 5
- **Database:** PostgreSQL 13+
- **Validation:** Zod

### Authentication
- **Provider:** Auth.js (NextAuth.js v5)
- **Strategies:** Email/Password, OAuth (future)

### Storage & Services
- **Storage:** Amazon S3
- **Email:** Amazon SES
- **Deployment:** Vercel

### Development Tools
- **Version Control:** GitHub
- **Testing:** Jest, React Testing Library
- **Linting:** ESLint, Prettier
- **Formatting:** Prettier

---

## 🎨 Design System

### Colors
- **Primary Black:** `#111111`
- **Accent Gold:** `#D4AF37`
- **White:** `#FFFFFF`

### Typography
- **Primary Font:** League Spartan
- **Secondary Font:** Poppins

### Principles
- Mobile-first responsive design
- WCAG 2.1 Level AA accessibility
- Consistent spacing and visual hierarchy
- Reusable component library

---

## 📋 Development Rules

### Always
✅ Use TypeScript with strict mode
✅ Use functional React components
✅ Use Server Components where appropriate
✅ Follow SOLID principles
✅ Separate UI from business logic
✅ Add JSDoc comments to exported functions
✅ Validate all inputs
✅ Handle errors gracefully

### Never
❌ Hardcode secrets or API keys
❌ Duplicate code or logic
❌ Ignore TypeScript errors
❌ Skip input validation
❌ Commit sensitive files

---

## 🗓 Milestone Roadmap

1. **Milestone 1** — Project Foundation
   - Configuration & Setup
   - Prisma Database
   - Authentication Foundation
   - AWS Integration
   - Shared UI Components

2. **Milestone 2** — Design System
   - Component Library
   - Theming System
   - Design Documentation

3. **Milestone 3** — Landing Page
   - Hero Section
   - Services Overview
   - Portfolio Preview
   - CTA Sections

4. **Milestone 4** — Authentication UI
   - Login Page
   - Signup Page
   - Password Reset
   - Email Verification

5. **Milestone 5** — Product Catalog
   - Product Listing
   - Filtering & Search
   - Product Details
   - Categories

6. **Milestone 6** — Shopping Cart
   - Add to Cart
   - Cart Management
   - Checkout Flow

7. **Milestone 7** — Quote Request System
   - Quote Form
   - Quote Management
   - Email Notifications

8. **Milestone 8** — Customer Dashboard
   - Profile Management
   - Order History
   - Quote Requests

9. **Milestone 9** — Admin Dashboard
   - Product Management
   - Order Management
   - User Management
   - Analytics

10. **Milestone 10** — Payments
    - Paystack Integration
    - Payment Processing
    - Receipt Generation

11. **Milestone 11** — Portfolio
    - Project Showcase
    - Case Studies
    - Image Gallery

12. **Milestone 12** — Blog
    - Blog Posts
    - Categories
    - Comments

13. **Milestone 13** — Testing
    - Unit Tests
    - Integration Tests
    - E2E Tests

14. **Milestone 14** — Optimization
    - Performance Tuning
    - SEO Optimization
    - Analytics

15. **Milestone 15** — Deployment
    - Production Setup
    - CI/CD Pipeline
    - Monitoring

---

## 🔐 Security

This project implements security best practices including:

- ✅ Input validation and sanitization
- ✅ CSRF protection
- ✅ XSS prevention
- ✅ SQL injection prevention (Prisma ORM)
- ✅ Secure password hashing
- ✅ Role-based authorization
- ✅ Secure session management
- ✅ Environment variable protection

---

## ⚡ Performance

Optimized for speed and efficiency:

- ✅ Next.js Image optimization
- ✅ Code splitting and lazy loading
- ✅ Server Components
- ✅ Database query optimization
- ✅ CDN for static assets
- ✅ Caching strategies
- ✅ Web Vitals monitoring

---

## 📚 Documentation

- [PROJECT_BLUEPRINT.md](./PROJECT_BLUEPRINT.md) — Development specification
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — Architecture guide
- [docs/DATABASE.md](./docs/DATABASE.md) — Database schema (pending)
- [docs/API.md](./docs/API.md) — API documentation (pending)
- [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) — Deployment guide (pending)

---

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

---

## 📦 Building for Production

### Build
```bash
npm run build
```

### Start Production Server
```bash
npm run start
```

### Analyze Bundle
```bash
npm run analyze
```

---

## 🔄 Git Workflow

### Branch Naming
- `feature/description` — New features
- `bugfix/description` — Bug fixes
- `chore/description` — Maintenance
- `docs/description` — Documentation

### Commit Messages
Follow conventional commits:
```
feat: add new feature
fix: resolve bug
docs: update documentation
chore: update dependencies
```

### Pull Request Process
1. Create feature branch
2. Commit changes with clear messages
3. Push to GitHub
4. Create Pull Request with description
5. Pass code review
6. Merge to main

---

## 🌐 Environment Variables

Required environment variables (see `.env.example`):

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `NEXTAUTH_SECRET` | Session encryption secret | Random 32+ char string |
| `NEXTAUTH_URL` | NextAuth callback URL | `http://localhost:3000` |
| `AWS_ACCESS_KEY_ID` | AWS access key | Your AWS key |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key | Your AWS secret |
| `AWS_REGION` | AWS region | `us-east-1` |
| `AWS_S3_BUCKET` | S3 bucket name | `makaveli-visual-prod` |
| `AWS_SES_REGION` | SES region | `us-east-1` |

---

## 📊 Analytics

Integrated services for tracking and monitoring:

- **Google Analytics** — User behavior tracking
- **Vercel Analytics** — Performance metrics
- **Database Logs** — Query monitoring

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is proprietary. All rights reserved.

---

## 📧 Support

For support, email support@makaveli.visual or open an issue on GitHub.

---

## 🙏 Acknowledgments

Built with ❤️ by the Makaveli Visual team.

**Where Creativity Meets Quality.** ✨
