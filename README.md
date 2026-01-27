# Jitesh Borse - Personal Portfolio

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, interactive components, and a clean design showcasing my projects, skills, and achievements.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38bdf8)

## ✨ Features

- **Responsive Design** - Fully responsive layout that works seamlessly on all devices
- **Smooth Animations** - Scroll-reveal animations and smooth transitions throughout
- **Interactive Navigation** - Floating pill navbar with active section tracking
- **Dynamic Sections**:
  - Hero section with animated profile image
  - About Me with academic background and personality summary
  - Skills showcase with categorized technical competencies
  - Achievements & Recognition section
  - Featured projects with GitHub links
  - Working contact form with FormSubmit integration
- **Modern UI/UX** - Clean, professional design with indigo/purple gradient accents
- **Fast Performance** - Built with Vite for lightning-fast development and optimized builds

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/jiteshborse/jitesh-portfolio.git

# Navigate to project directory
cd jitesh-portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Language:** TypeScript 5.9.3
- **Styling:** Tailwind CSS 3.x
- **Icons:** Lucide React
- **Build Tool:** Vite 7.x
- **Animations:** CSS Transitions & IntersectionObserver API
- **Form Handling:** FormSubmit.co
- **Linting:** ESLint

## 📁 Project Structure

```
jitesh-portfolio/
├── public/           # Static assets
├── src/
│   ├── App.tsx      # Main application component
│   ├── index.css    # Global styles with Tailwind
│   └── main.tsx     # Application entry point
├── index.html       # HTML template
├── package.json     # Dependencies and scripts
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json    # TypeScript configuration
└── vite.config.ts   # Vite configuration
```

## 🎨 Customization

### Updating Personal Information

Edit `src/App.tsx` to update:
- Personal details in the hero section
- Project information in the `projects` array
- Skills in the skills section
- Contact information

### Changing Colors

Modify the color scheme in `tailwind.config.js` or update the gradient classes in `src/App.tsx`.

### Contact Form

The contact form uses FormSubmit.co. Update the email in the form submission handler:
```typescript
const response = await fetch("https://formsubmit.co/ajax/YOUR_EMAIL@example.com", {
  // ...
});
```

## 📝 Available Scripts

- `npm run dev` - Start development server at http://localhost:5173
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Jitesh Borse**
- GitHub: [@jiteshborse](https://github.com/jiteshborse)
- LinkedIn: [Jitesh Borse](https://www.linkedin.com/in/jiteshborse8083/)
- Email: jitesh.borse007@gmail.com

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)

---

⭐ Star this repository if you found it helpful!
