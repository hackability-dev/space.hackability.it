<div align="center">
  <h1>Space Hackability</h1>
  <a href="https://github.com/hackability-dev/space.hackability.it">
    <img src="https://github.com/hackability-dev/space.hackability.it/blob/main/public/hackability.png?raw=true" alt="Logo" width="80" height="80">
  </a>
  <p align="center">
    <strong>Digital platform for collaborative accessibility innovation</strong><br/>
    <em>By <a href="https://hackability.it">Hackability</a> — Italian non-profit for inclusive design</em>
    <br /><br />
    <a href="https://github.com/hackability-dev/space.hackability.it"><strong>Explore the docs »</strong></a>
    ·
    <a href="https://github.com/hackability-dev/space.hackability.it/issues">Report Bug</a>
    ·
    <a href="https://github.com/hackability-dev/space.hackability.it/issues">Request Feature</a>
  </p>
</div>

---

# About Hackability & This Platform

**Hackability** is an Italian non-profit dedicated to co-designing innovative accessibility solutions with and for people with disabilities and the elderly. Founded in Turin in 2016, Hackability brings together designers, makers, and users to create personalized, scalable, and impactful assistive technologies using digital fabrication and open innovation.

This platform, **Space Hackability**, is the digital hub for documenting, sharing, and collaborating on Hackability's projects, methods, and community-driven solutions.

## Mission & Methodology

- **Co-design**: Users are active partners in the design process.
- **Social Impact**: Solutions that improve autonomy and inclusion.
- **Scalability**: Designs that can be reproduced and adapted.
- **Digital Fabrication**: Leveraging 3D printing and maker spaces.
- **Community Building**: Fostering local and global networks for accessibility.

**Hackability Thinking** systematically involves people with and without disabilities in the creation of custom solutions, empowering communities and democratizing technology.

## Platform Features

- **Project Documentation**: Rich, structured project pages using Editor.js
- **Role-Based Access**: Public, Author, and Admin roles
- **Media Management**: Cloudinary for images, Google Cloud for files
- **Open Knowledge**: Projects and methods are open source/Creative Commons
- **Community Collaboration**: Tools for designers, makers, and users to connect

## Tech Stack & Architecture

- **Next.js 13** (Hybrid App + Pages Router)
- **tRPC** for type-safe API
- **Prisma** (PostgreSQL)
- **NextAuth.js** (Google OAuth)
- **Tailwind CSS + DaisyUI**
- **Editor.js** for rich content
- **Cloudinary & Google Cloud Storage** for media
- **TypeScript** (strict, end-to-end types)

### Key Patterns

- **Hybrid Routing**: Admin dashboard (App Router), public pages (Pages Router)
- **Role-Based Security**: `isAdmin`, `isAuthor` flags
- **Rich Content**: Editor.js JSON for project bodies
- **Strict Environment Validation**: Zod schemas

## User Roles

- **Public**: View published projects
- **Author**: Create/edit own projects
- **Admin**: Full access, user/project management

## Development

### Local Setup

```bash
npm install
npm run dev
```

- Visit [localhost:3000](http://localhost:3000)
- Use `.env.example` as a template for environment variables

### Useful Commands

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run lint` — Lint code
- `npx prisma studio` — DB browser
- `npx prisma db seed` — Seed database

### Project Structure

- `/src/app/dashboard/` — Admin dashboard (App Router)
- `/src/pages/` — Public pages (Pages Router)
- `/src/projects/` — Project components/forms
- `/src/ui/` — Reusable UI components
- `/src/server/` — API, DB, auth, storage logic

## Contributing

We welcome contributions from everyone interested in accessibility, inclusive design, and open source! Whether you want to help with code, documentation, design, or community building, your input is valued.

### How to Get Started

1. **Fork** this repository and **clone** it locally.
2. **Create a new branch** for your feature or fix:
   ```bash
   git checkout -b my-feature
   ```
3. Make your changes, following our coding standards.
4. **Test** your changes locally.
5. **Commit** with clear, descriptive messages.
6. **Push** to your fork and **open a Pull Request** (PR) on GitHub.

### Coding Standards

- Use **TypeScript** and follow existing code style.
- Run `npm run lint` and fix any lint errors before submitting.
- Write clear, concise commit messages (e.g., `fix: correct image upload bug`).
- Add or update documentation and tests as needed.

### Submitting a Pull Request

- Ensure your PR describes the problem and solution clearly.
- Reference related issues if applicable (e.g., `Closes #42`).
- Be open to feedback and ready to make changes.

### Reporting Bugs & Requesting Features

- Use [GitHub Issues](https://github.com/hackability-dev/space.hackability.it/issues) to report bugs or suggest features.
- Please provide as much detail as possible (steps to reproduce, screenshots, etc.).

### Community Guidelines

- Be respectful and collaborative—everyone is welcome.
- Follow our [Code of Conduct](https://github.com/hackability-dev/space.hackability.it/blob/main/CODE_OF_CONDUCT.md) (if available).
- Non-code contributions (design, documentation, accessibility feedback, etc.) are highly appreciated!

### Questions & Help

- For questions, open a [discussion](https://github.com/hackability-dev/space.hackability.it/discussions) or an issue.
- You can also reach out via [Hackability's website](https://hackability.it) or community channels.

Thank you for helping us make technology more accessible for everyone! 🚀

## Deployment

- **Vercel**: See [Vercel deployment guide](https://create.t3.gg/en/deployment/vercel)
- **Docker**: See [Docker deployment guide](https://create.t3.gg/en/deployment/docker)

## Learn More

- [Hackability Website](https://hackability.it)
- [T3 Stack Docs](https://create.t3.gg/)
- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)
- [Tailwind CSS](https://tailwindcss.com)

---

<div align="center">
  <sub>With ❤️ by the Hackability community — Empowering inclusive innovation</sub>
</div>
