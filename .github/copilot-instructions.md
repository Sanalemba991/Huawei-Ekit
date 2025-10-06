# Huawei eKit UAE - AI Coding Instructions

This is a Next.js 15 corporate website for Huawei eKit UAE (authorized distributor) with an admin dashboard and product catalog system.

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router (`src/app/` directory)
- **Database**: MongoDB with Mongoose ODM
- **Auth**: NextAuth.js v4 with MongoDB adapter
- **Styling**: Tailwind CSS v4
- **Icons**: Heroicons, React Icons (Feather), Lucide React
- **Animations**: Framer Motion
- **Build Tool**: Turbopack (enabled in dev/build scripts)

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── models/            # Mongoose schemas
│   ├── admin/             # Admin dashboard routes
│   │   └── dashboard/     # Protected admin pages
│   └── solution/          # Solution pages with sub-routes
├── components/            # React components
└── public/                # Static assets organized by feature
```

## Key Patterns & Conventions

### Component Organization
- **Layout Control**: `ConditionalLayout.tsx` conditionally renders navbar/footer (excludes admin pages starting with `/admin`)
- **Admin System**: Context-based auth with hardcoded credentials (`admin`/`admin123`) in `AdminContext.tsx`
- **Complex Navigation**: Multi-level dropdown navigation in `Navbar.tsx` with sophisticated hover/mobile handling

### Data Modeling
- **Mongoose Models**: Located in `src/app/models/` (e.g., `NavbarCategory.ts`)
- **Schema Patterns**: Use timestamps, pre-save hooks for slug generation
- **Model Export**: `mongoose.models.ModelName || mongoose.model()` pattern prevents re-compilation issues

### Styling Approach
- **CSS Structure**: Global styles in `src/app/globals.css` with custom animations
- **Component Styling**: Tailwind classes with conditional styling based on state
- **Custom Animations**: Dropdown animations using CSS keyframes (`dropdown-enter`, `navbar-dropdown`)

### Navigation System
- **Multi-tier**: Top nav (Enterprise/Consumer sections) + Main nav with mega dropdowns
- **State Management**: Complex hover/click states with cleanup timeouts
- **Mobile Responsive**: Separate mobile menu with accordion-style dropdowns
- **Active States**: Path-based active detection with underline animations

## Development Workflows

### Running the Project
```bash
npm run dev          # Uses --turbopack flag
npm run build        # Production build with turbopack
npm run start        # Production server
```

### Admin Dashboard
- Access: `/admin` → Login → `/admin/dashboard`
- Features: Navbar Categories, Products, Contacts management
- Auth: Context-based with hardcoded credentials
- Sidebar navigation defined in `AdminSidebar.tsx`

## Critical Implementation Details

### Component Hydration
- Many components use `useState` with `mounted` flag to prevent hydration mismatches
- Example pattern in `Navbar.tsx`: render null until `mounted` state is true

### Asset Organization
- Images organized by feature in `/public/` (About/, Solution/, SolutionBusiness/, etc.)
- Logo variants: `/huaweilogo-new.png` (primary), size-responsive in navbar

### Route Structure
- Solutions: `/solution/` with sub-routes like `/it-office`, `/it-health`, `/it-education`
- Each solution route imports specific solution components
- Admin routes are nested under `/admin/dashboard/`

## Integration Points

### Database Connection
- MongoDB/Mongoose setup (connection details in environment variables)
- NextAuth MongoDB adapter configuration
- Model registration pattern prevents duplicate compilation

### External Dependencies
- Toast notifications via `react-toastify`
- Intersection observer for scroll effects
- Framer Motion for component animations

## Component Dependencies
- `ConditionalLayout` wraps all pages, determines layout based on route
- Admin components require `AdminProvider` context wrapper
- Navigation components expect specific data structures for dropdowns/links

When working on this codebase, pay attention to the sophisticated navigation system, proper Next.js 15 App Router patterns, and the distinction between public-facing pages and the admin dashboard system.