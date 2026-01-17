# LeadGen Pro - Modern Lead Generation Website

A production-ready lead generation website built with Next.js 14, React, TypeScript, and Tailwind CSS. Features a multi-step form with validation, API integration, and optimized performance.

## 🚀 Features

- **Modern Landing Page**: Hero section, services showcase, and compelling CTAs
- **Multi-Step Lead Form**: 3-step form with progress tracking and validation
- **Form Validation**: Real-time validation using Zod and React Hook Form
- **API Integration**: RESTful API endpoint for form submission
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **Performance Optimized**: Lazy loading, code splitting, and best practices
- **UX Feedback**: Loading states, error handling, and success messages

## 📁 Project Structure

```
lead-gen-website/
├── app/
│   ├── api/
│   │   └── leads/
│   │       └── route.ts          # API endpoint for form submission
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with SEO metadata
│   └── page.tsx                  # Home page
├── components/
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   ├── card.tsx
│   │   └── progress.tsx
│   ├── Hero.tsx                  # Hero section component
│   ├── Services.tsx              # Services showcase
│   ├── CTA.tsx                   # Call-to-action section
│   ├── LeadForm.tsx              # Multi-step form component
│   ├── Navbar.tsx                # Navigation bar
│   └── Footer.tsx                # Footer component
└── lib/
    └── utils.ts                  # Utility functions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form + Zod
- **Icons**: Lucide React
- **Validation**: Zod schema validation

## 📦 Installation

1. **Install dependencies**:
```bash
cd lead-gen-website
npm install
```

2. **Run development server**:
```bash
npm run dev
```

3. **Open browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture Explanation

### Form Logic

The multi-step form is implemented using React Hook Form with Zod validation:

1. **State Management**: Uses `useState` for step tracking and form state
2. **Validation**: Each step validates specific fields before proceeding
3. **Progress Tracking**: Visual progress bar shows completion percentage
4. **Error Handling**: Real-time validation with user-friendly error messages

**Key Features**:
- Step-by-step validation prevents invalid submissions
- Smooth transitions between steps with animations
- Form state persists during navigation
- Client-side validation before API submission

### State Management

The application uses a combination of:

1. **React Hook Form**: Manages form state, validation, and submission
2. **Local State**: `useState` for UI state (current step, loading, success)
3. **Form Context**: React Hook Form's context for form-wide state

**Benefits**:
- Minimal re-renders
- Optimized performance
- Built-in validation integration
- Easy error handling

### API Handling

The API route (`/app/api/leads/route.ts`) handles form submissions:

1. **Validation**: Server-side validation using Zod schema
2. **Error Handling**: Comprehensive error responses
3. **Data Processing**: Validates and processes lead data

**Current Implementation**:
- In-memory storage (for demo purposes)
- Ready for database integration
- Structured for CRM/email marketing integration

**Production Enhancements**:
```typescript
// Example: Database integration
await db.leads.create({
  data: validatedData,
  timestamp: new Date(),
});

// Example: Email notification
await sendEmail({
  to: 'sales@company.com',
  subject: 'New Lead Submission',
  body: formatLeadEmail(validatedData),
});

// Example: CRM integration
await crm.createContact({
  firstName: validatedData.firstName,
  lastName: validatedData.lastName,
  email: validatedData.email,
  // ... other fields
});
```

### UX Decisions

1. **Multi-Step Form**: Reduces cognitive load and improves completion rates
2. **Progress Indicator**: Shows users how far they've progressed
3. **Real-time Validation**: Immediate feedback prevents errors
4. **Loading States**: Clear feedback during submission
5. **Success State**: Confirmation message builds trust
6. **Smooth Scrolling**: Better navigation experience
7. **Responsive Design**: Works seamlessly on all devices
8. **Accessibility**: Proper labels, ARIA attributes, keyboard navigation

### Performance Optimizations

1. **Lazy Loading**: Form component loaded only when needed
2. **Code Splitting**: Automatic with Next.js App Router
3. **Image Optimization**: Ready for Next.js Image component
4. **CSS Optimization**: Tailwind CSS purges unused styles
5. **Server Components**: Default rendering strategy
6. **Client Components**: Only where interactivity is needed

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for production:

```env
# Database (example)
DATABASE_URL=your_database_url

# Email Service (example)
SMTP_HOST=your_smtp_host
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# CRM Integration (example)
CRM_API_KEY=your_crm_api_key
```

### API Endpoint

The form submits to `/api/leads` endpoint:

**POST /api/leads**
- Validates form data
- Returns success/error response
- Currently stores in memory (replace with database)

**GET /api/leads** (optional)
- Returns all submitted leads
- Useful for admin dashboard

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  primary: {
    DEFAULT: "#2563eb", // Change to your brand color
    // ...
  }
}
```

### Form Fields

Modify `components/LeadForm.tsx` to add/remove fields:

1. Update Zod schema
2. Add form fields in appropriate step
3. Update API route validation

## 📈 Production Checklist

- [ ] Replace in-memory storage with database
- [ ] Add email notifications
- [ ] Integrate with CRM system
- [ ] Add analytics tracking
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure environment variables
- [ ] Add rate limiting to API
- [ ] Implement CAPTCHA for spam protection
- [ ] Add A/B testing for form variations
- [ ] Set up automated testing

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
# lead-gen-website
