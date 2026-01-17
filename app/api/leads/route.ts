import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema matching the frontend
const leadSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  companyName: z.string().min(2),
  companySize: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"]),
  industry: z.string().min(2),
  leadType: z.enum(["B2B", "B2C", "Both"]),
  monthlyBudget: z.enum(["< $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000+"]),
  timeline: z.enum(["Immediate", "1-3 months", "3-6 months", "6+ months"]),
  additionalInfo: z.string().optional(),
});

// In-memory storage (replace with database in production)
let leads: z.infer<typeof leadSchema>[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = leadSchema.parse(body);

    // In production, you would:
    // 1. Save to database (MongoDB, PostgreSQL, etc.)
    // 2. Send email notification
    // 3. Integrate with CRM (Salesforce, HubSpot, etc.)
    // 4. Add to email marketing platform (Mailchimp, ConvertKit, etc.)
    
    // For now, we'll just store in memory and log
    leads.push({
      ...validatedData,
      submittedAt: new Date().toISOString(),
    } as any);

    console.log("New lead submitted:", validatedData);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json(
      {
        success: true,
        message: "Lead submitted successfully",
        data: {
          id: leads.length,
          ...validatedData,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Error submitting lead:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve leads (for admin/dashboard)
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      count: leads.length,
      leads: leads,
    },
    { status: 200 }
  );
}
