"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Transform Your Business with
            <span className="block text-blue-600"> Quality Leads</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
            Get high-quality leads that convert. Our proven lead generation
            strategies help businesses grow faster and smarter. Join thousands
            of companies already seeing results.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              onClick={scrollToForm}
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">10K+</div>
              <div className="mt-2 text-sm text-gray-600">Active Leads</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">98%</div>
              <div className="mt-2 text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">24/7</div>
              <div className="mt-2 text-sm text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
      <div ref={formRef} className="absolute -bottom-20" />
    </section>
  );
}
