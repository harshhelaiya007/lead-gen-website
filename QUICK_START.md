# Quick Start Guide

Get your lead generation website up and running in minutes!

## 🚀 Installation

```bash
# Navigate to project directory
cd lead-gen-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Form Flow

1. **Step 1**: User enters personal information (name, email, phone)
2. **Step 2**: User provides business details (company, size, industry)
3. **Step 3**: User specifies requirements (lead type, budget, timeline)
4. **Submit**: Form validates and submits to API
5. **Success**: User sees confirmation message

## 🔧 Key Files

- `app/page.tsx` - Main landing page
- `components/LeadForm.tsx` - Multi-step form component
- `app/api/leads/route.ts` - API endpoint for form submission
- `components/Hero.tsx` - Hero section
- `components/Services.tsx` - Services showcase
- `components/CTA.tsx` - Call-to-action section

## 🎨 Customization

### Change Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    DEFAULT: "#your-color", // Change this
  }
}
```

### Modify Form Fields

1. Update schema in `components/LeadForm.tsx`:
```typescript
const formSchema = z.object({
  // Add your fields here
  newField: z.string().min(2),
});
```

2. Add form input in appropriate step
3. Update API validation in `app/api/leads/route.ts`

### Add New Step

1. Update `TOTAL_STEPS` constant
2. Add step validation in `validateStep` function
3. Add step UI in form component
4. Update progress calculation

## 🌐 API Integration

### Current Setup

The form submits to `/api/leads` endpoint which:
- Validates the data
- Stores in memory (for demo)
- Returns success/error response

### Production Setup

Replace in-memory storage with:

**Database**:
```typescript
await db.leads.create({ data: validatedData });
```

**Email Notification**:
```typescript
await sendEmail({
  to: 'sales@company.com',
  subject: 'New Lead',
  body: formatLead(validatedData),
});
```

**CRM Integration**:
```typescript
await crm.createContact(validatedData);
```

## 📦 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🐛 Troubleshooting

### Form not submitting?
- Check browser console for errors
- Verify API route is accessible
- Check network tab for API response

### Validation errors?
- Ensure all required fields are filled
- Check field formats (email, phone, etc.)
- Review error messages

### Styling issues?
- Clear `.next` cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check Tailwind config

## 📚 Next Steps

1. **Database**: Set up PostgreSQL/MongoDB
2. **Email**: Configure SMTP service
3. **CRM**: Integrate Salesforce/HubSpot
4. **Analytics**: Add Google Analytics/Mixpanel
5. **Monitoring**: Set up error tracking (Sentry)

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- Review `ARCHITECTURE.md` for design decisions
- Open an issue for bugs or questions
