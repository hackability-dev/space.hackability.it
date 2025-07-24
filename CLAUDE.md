# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build for production (uses SKIP_ENV_VALIDATION=1)
- `npm run lint` - Run ESLint
- `npm run start` - Start production server
- `npx prisma studio` - Open Prisma database browser
- `npx prisma generate` - Generate Prisma client (runs automatically after npm install)
- `npx prisma db seed` - Seed database with initial data

## Project Architecture

**Space Hackability** is a T3 Stack application for managing and showcasing accessibility-focused projects from the Hackability community.

### Tech Stack
- **Next.js 13.1.6** with hybrid App Router + Pages Router
- **tRPC 10.9.1** for type-safe API communication
- **Prisma 4.9.0** with PostgreSQL for data persistence
- **NextAuth.js 4.19.2** for Google OAuth authentication
- **Tailwind CSS + DaisyUI** for styling
- **Editor.js 2.26.5** for rich content editing

### Key Architecture Patterns

**Hybrid Routing**: The app uses both App Router (`/src/app/`) for admin dashboard and Pages Router (`/src/pages/`) for public pages like the homepage.

**Role-Based Access**: Three user levels:
- Public users (view published projects)
- Authors (`isAuthor: true` - create/edit own projects)  
- Admins (`isAdmin: true` - full system access)

**Rich Content System**: Projects use Editor.js for structured content with multiple block types (headers, paragraphs, code, images, tables, etc.). Content is stored as JSON in the `body` field.

### Database Schema

Core models:
- **User**: Authentication + role flags (`isAdmin`, `isAuthor`)
- **Project**: Main content model with rich Editor.js `body` (JSON), structured fields (`what`, `why`, `how`), `buildSteps` (JSON array), and media management
- Standard NextAuth models (Account, Session, VerificationToken)

### tRPC API Structure

Located in `/src/server/api/routers/`:
- `/auth` - Authentication management
- `/project` - Core project operations, file uploads (Cloudinary/Google Cloud)
- `/author` - Author-specific operations (`getMyProjects`, `createProject`)
- `/admin` - Admin operations (`getAllProjects`, `setDraft`, `deleteProject`, role management)
- `/files` - File management utilities

**Security**: Procedures use `protectedProcedure`, `authorProcedure`, and `adminProcedure` middleware for access control.

### File Organization

- `/src/projects/` - Project-specific components and forms
- `/src/ui/` - Reusable UI components (Editor, Logo, Nav, Footer)
- `/src/projects/forms/` - Form components with Zod validation and React Final Form
- `/src/app/dashboard/` - Admin interface using App Router
- `/src/pages/` - Public pages (homepage, project views)

### Media Management

**Images**: Cloudinary integration with `generateCloudinaryUploadSignature` for direct uploads
**Files**: Google Cloud Storage with `generategsUploadUrl` for document uploads
**Fallback**: Uses `/hackability.png` for missing project preview images

### Form System

Uses React Final Form with Zod validation:
- `ZodForm` wrapper component handles schema validation
- Custom field components (`TextField`, `SelectPicker`) in `/src/projects/forms/`
- Editor.js integration for rich content fields

### Development Notes

**Environment**: Extensive environment validation using Zod schemas - check `.env.example` for required variables.

**TypeScript**: Strict TypeScript configuration with full end-to-end type safety via tRPC.

**Styling**: Tailwind CSS with DaisyUI component library. The project uses Italian language throughout the UI.

**Build**: Production builds skip environment validation (`SKIP_ENV_VALIDATION=1`) - ensure all environment variables are properly set in production.

**Docker Support**: Multi-stage Dockerfile available for containerized deployment.