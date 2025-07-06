# Anonymous Feedback System

A modern, accessible, and secure feedback system built with Next.js, TypeScript, and shadcn/ui. This system allows users to submit anonymous feedback while providing administrators with powerful tools to manage and respond to submissions.

## 🎨 Design System

### Color Palette

Our design system uses a comprehensive color palette with semantic meaning:

#### Primary Colors (Purple/Indigo)
- **Primary 50-950**: Main brand colors ranging from light to dark
- **Usage**: Buttons, links, highlights, brand elements

#### Secondary Colors (Slate/Gray)
- **Secondary 50-950**: Neutral colors for text and backgrounds
- **Usage**: Text, borders, subtle backgrounds

#### Accent Colors (Green)
- **Accent 50-900**: Supporting colors for highlights
- **Usage**: Success states, CTAs, special highlights

#### Semantic Colors
- **Success**: Green tones for positive actions and resolved states
- **Warning**: Amber tones for pending states and cautions
- **Error**: Red tones for errors and destructive actions
- **Info**: Blue tones for informational content

### Typography

- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Font Sizes**: xs (12px) to 5xl (48px)
- **Font Weights**: Normal (400), Medium (500), Semibold (600), Bold (700)
- **Line Heights**: Tight (1.25), Normal (1.5), Relaxed (1.625)

### Spacing System

Based on an 8px grid system:
- **Base unit**: 4px
- **Scale**: 0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px), 20 (80px), 24 (96px)

### Component Architecture

#### Layout Components
- **PageContainer**: Main page wrapper with responsive constraints
- **Section**: Flexible content sections with variants
- **Card**: Content containers with elevation and styling

#### UI Components (shadcn/ui)
- **Button**: Multiple variants and sizes
- **Input/Textarea**: Form inputs with validation states
- **Select**: Dropdown selections with search
- **Dialog**: Modal dialogs with accessibility
- **Badge**: Status indicators and labels

#### Custom Components
- **StatusBadge**: Semantic status indicators
- **LoadingSpinner**: Loading states with accessibility
- **FeedbackForm**: Complete feedback submission form
- **FeedbackModal**: Detailed feedback management

## 🚀 Features

### User Features
- **Anonymous Submission**: No personal data collection
- **Category Selection**: Organized feedback types
- **Rich Text Input**: Detailed feedback descriptions
- **Success Feedback**: Clear submission confirmation
- **Responsive Design**: Works on all devices

### Admin Features
- **Dashboard Overview**: Statistics and metrics
- **Advanced Filtering**: Status, category, and search filters
- **Status Management**: Mark feedback as pending/resolved
- **Detailed Views**: Full feedback information in modals
- **Real-time Updates**: Dynamic status changes

### Accessibility Features
- **WCAG 2.1 AA Compliance**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **Reduced Motion**: Respects user preferences
- **High Contrast**: Supports high contrast mode

## 🛠️ Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS Variables
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useMemo)

## 📁 Project Structure

```
src/
├── app/                          # Next.js app router pages
│   ├── admin/
│   │   ├── dashboard/           # Admin dashboard
│   │   └── login/               # Admin login
│   ├── globals.css              # Global styles and design tokens
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/
│   ├── common/                  # Reusable components
│   │   ├── PageContainer.tsx    # Page layout wrapper
│   │   ├── Section.tsx          # Content sections
│   │   ├── StatusBadge.tsx      # Status indicators
│   │   └── LoadingSpinner.tsx   # Loading states
│   ├── feedback/                # Feedback-specific components
│   │   └── FeedbackForm.tsx     # Feedback submission form
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   └── dialog.tsx
│   ├── FeedbackModal.tsx        # Feedback detail modal
│   ├── Header.tsx               # Navigation header
│   └── Footer.tsx               # Site footer
├── lib/
│   └── utils.ts                 # Utility functions
├── styles/
│   └── design-tokens.css        # Design system variables
├── utils/
│   ├── feedback.ts              # Feedback types
│   └── index.ts                 # Utility exports
└── dummyDatabase/
    └── feedback.ts              # Mock data
```

## 🎯 Design Principles

### 1. Consistency
- Unified color system across all components
- Consistent spacing using 8px grid
- Standardized typography scale
- Reusable component patterns

### 2. Accessibility
- Semantic HTML structure
- Proper ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

### 3. Performance
- Optimized component structure
- Efficient re-rendering with useMemo
- Lazy loading where appropriate
- Minimal bundle size

### 4. Maintainability
- Modular component architecture
- Clear separation of concerns
- TypeScript for type safety
- Comprehensive documentation
- Consistent naming conventions

## 🔧 Development Guidelines

### Component Creation
1. Use TypeScript interfaces for props
2. Include JSDoc comments for complex components
3. Follow the established naming conventions
4. Implement proper accessibility features
5. Use design system tokens for styling

### Styling Guidelines
1. Use CSS variables from design-tokens.css
2. Prefer Tailwind utilities over custom CSS
3. Use semantic color names (primary, secondary, etc.)
4. Follow the spacing system (4px increments)
5. Implement responsive design patterns

### Code Organization
1. Group related components in folders
2. Use index files for clean imports
3. Separate concerns (UI, logic, data)
4. Keep components under 300 lines
5. Extract reusable logic into hooks

### Accessibility Checklist
- [ ] Semantic HTML elements
- [ ] Proper heading hierarchy
- [ ] Alt text for images
- [ ] ARIA labels for interactive elements
- [ ] Keyboard navigation support
- [ ] Focus indicators
- [ ] Color contrast ratios
- [ ] Screen reader testing

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Customization

### Adding New Colors
1. Add color variables to `src/styles/design-tokens.css`
2. Update `tailwind.config.js` to include new colors
3. Document usage in this README

### Creating New Components
1. Follow the established component structure
2. Use TypeScript interfaces for props
3. Include proper accessibility features
4. Add JSDoc comments for documentation
5. Export from appropriate index files

### Theme Switching
The system supports light/dark themes through CSS variables. To add theme switching:
1. Toggle `data-theme="dark"` on the root element
2. CSS variables automatically switch contexts
3. All components inherit the new theme

## 📝 Contributing

1. Follow the established code style
2. Write comprehensive TypeScript types
3. Include accessibility features
4. Add proper documentation
5. Test across different devices and browsers

## 🔒 Security Considerations

- No personal data collection
- Secure form handling
- Input validation and sanitization
- CSRF protection (when implementing backend)
- Rate limiting (when implementing backend)

---

This design system provides a solid foundation for building accessible, maintainable, and scalable user interfaces. The comprehensive token system ensures consistency while the modular architecture enables easy customization and extension.