# URMAH - Premium Global Events Platform

A modern, premium global events platform built with Next.js 14, TypeScript, and TailwindCSS. Book exclusive events, flights, and accommodations all in one place.

## 🎯 Features

- **Premium Events**: Access to world-class festivals and concerts
- **Integrated Flights**: Book flights directly from the platform
- **Accommodations**: Find and book luxury stays
- **All-Inclusive Packages**: Pre-configured packages combining events, flights, and hotels
- **Responsive Design**: Mobile-first design that works on all devices
- **Payment Processing**: Stripe integration for secure transactions
- **Email Services**: Resend integration for transactional emails

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/turbillon50/ticket.git
cd ticket

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
```

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your API keys:

```env
NEXT_PUBLIC_APP_URL=https://urmah.vercel.app
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
RESEND_API_KEY=re_xxxxx
```

### Development

```bash
# Run development server
npm run dev

# Server will be at http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
/app
  /components   - React components
  /layout.tsx   - Root layout
  /globals.css  - Global styles
  /page.tsx     - Home page

/components
  - Header.tsx
  - Hero.tsx
  - EventsGrid.tsx
  - FlightSearch.tsx
  - StaysSearch.tsx
  - PackageBuilder.tsx
  - Footer.tsx

/public
  /manifest.json - PWA manifest
  
package.json
tsconfig.json
next.config.js
tailwind.config.js
```

## 🎨 Design System

**Colors**
- Primary: Black (#000000)
- Accent: Amber (#fbbf24)
- Gray Scale: zinc-* utilities

**Typography**
- Font Weight: Light (300) for premium feel
- Font Family: System fonts

**Components**
- Responsive grid layouts
- Form inputs with validation
- Tab navigation
- Card-based design

## 🔧 Technology Stack

- **Framework**: Next.js 14.2.0
- **Language**: TypeScript 5.4.5
- **Styling**: TailwindCSS 3.4.1 + PostCSS
- **Forms**: React Hook Form + Zod
- **Payments**: Stripe
- **Email**: Resend
- **HTTP**: Axios

## 📦 Installation & Dependencies

All dependencies are managed via npm. See `package.json` for the complete list.

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Go to [Vercel Dashboard](https://vercel.com)
3. Import this repository
4. Add environment variables
5. Deploy

```bash
npm run build
npm start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push and create a PR

## 📄 License

MIT License - feel free to use this project as a template

## 📞 Support

For issues or questions, please create a GitHub issue.

---

**Status**: Under Development
**Latest Update**: April 2026
