"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Loader2, ArrowRight, ArrowLeft } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  // Step 1: Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  
  // Step 2: Business Information
  companyName: z.string().min(2, "Company name is required"),
  companySize: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"]),
  industry: z.string().min(2, "Industry is required"),
  
  // Step 3: Requirements
  leadType: z.enum(["B2B", "B2C", "Both"]),
  monthlyBudget: z.enum(["< $1,000", "$1,000 - $5,000", "$5,000 - $10,000", "$10,000+"]),
  timeline: z.enum(["Immediate", "1-3 months", "3-6 months", "6+ months"]),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const TOTAL_STEPS = 3;

export default function LeadForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const progress = (currentStep / TOTAL_STEPS) * 100;

  // Step validation
  const validateStep = async (step: number): Promise<boolean> => {
    let fields: (keyof FormData)[] = [];
    
    switch (step) {
      case 1:
        fields = ["firstName", "lastName", "email", "phone"];
        break;
      case 2:
        fields = ["companyName", "companySize", "industry"];
        break;
      case 3:
        fields = ["leadType", "monthlyBudget", "timeline"];
        break;
    }
    
    const result = await trigger(fields);
    return result;
  };

  const nextStep = async () => {
    const isValidStep = await validateStep(currentStep);
    if (isValidStep && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
      setSubmitError(null);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSubmitError(null);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }

      setIsSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section className="py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="mx-auto max-w-2xl border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-900">
                Thank You for Your Interest!
              </CardTitle>
              <CardDescription className="text-base text-green-700">
                We&apos;ve received your information and our team will contact you within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-green-600">
                Check your email for a confirmation message and next steps.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Get Started Today
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    Step {currentStep} of {TOTAL_STEPS}
                  </span>
                  <span className="text-gray-500">{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          {...register("firstName")}
                          className={errors.firstName ? "border-red-500" : ""}
                          placeholder="John"
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          {...register("lastName")}
                          className={errors.lastName ? "border-red-500" : ""}
                          placeholder="Doe"
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className={errors.phone ? "border-red-500" : ""}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Business Information */}
                {currentStep === 2 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <Label htmlFor="companyName">
                        Company Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        {...register("companyName")}
                        className={errors.companyName ? "border-red-500" : ""}
                        placeholder="Acme Inc."
                      />
                      {errors.companyName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.companyName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="companySize">
                        Company Size <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        id="companySize"
                        {...register("companySize")}
                        className={errors.companySize ? "border-red-500" : ""}
                      >
                        <option value="">Select company size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-500">201-500 employees</option>
                        <option value="500+">500+ employees</option>
                      </Select>
                      {errors.companySize && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.companySize.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="industry">
                        Industry <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="industry"
                        {...register("industry")}
                        className={errors.industry ? "border-red-500" : ""}
                        placeholder="Technology, Healthcare, Finance, etc."
                      />
                      {errors.industry && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.industry.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 3: Requirements */}
                {currentStep === 3 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div>
                      <Label htmlFor="leadType">
                        Lead Type <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        id="leadType"
                        {...register("leadType")}
                        className={errors.leadType ? "border-red-500" : ""}
                      >
                        <option value="">Select lead type</option>
                        <option value="B2B">B2B (Business to Business)</option>
                        <option value="B2C">B2C (Business to Consumer)</option>
                        <option value="Both">Both</option>
                      </Select>
                      {errors.leadType && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.leadType.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="monthlyBudget">
                        Monthly Budget <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        id="monthlyBudget"
                        {...register("monthlyBudget")}
                        className={errors.monthlyBudget ? "border-red-500" : ""}
                      >
                        <option value="">Select budget range</option>
                        <option value="< $1,000">Less than $1,000</option>
                        <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000+">$10,000+</option>
                      </Select>
                      {errors.monthlyBudget && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.monthlyBudget.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="timeline">
                        Timeline <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        id="timeline"
                        {...register("timeline")}
                        className={errors.timeline ? "border-red-500" : ""}
                      >
                        <option value="">Select timeline</option>
                        <option value="Immediate">Immediate</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6+ months">6+ months</option>
                      </Select>
                      {errors.timeline && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.timeline.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="additionalInfo">
                        Additional Information (Optional)
                      </Label>
                      <Textarea
                        id="additionalInfo"
                        {...register("additionalInfo")}
                        placeholder="Tell us more about your lead generation needs..."
                        rows={4}
                      />
                    </div>
                  </div>
                )}

                {submitError && (
                  <div className="rounded-md bg-red-50 p-4">
                    <p className="text-sm text-red-800">{submitError}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1 || isSubmitting}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>
                  {currentStep < TOTAL_STEPS ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={isSubmitting}
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
