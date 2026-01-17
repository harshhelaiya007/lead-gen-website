"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function CTA() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to Grow Your Business?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            Join thousands of businesses that trust us to deliver quality leads.
            Start your free trial today - no credit card required.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            ✓ No credit card required • ✓ Cancel anytime • ✓ 14-day money-back guarantee
          </p>
        </div>
      </div>
      <div ref={formRef} className="absolute -bottom-20" />
    </section>
  );
}
