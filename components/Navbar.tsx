"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";

export default function Navbar() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    const formElement = document.getElementById("lead-form");
    formElement?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-blue-600">
              LeadGen Pro
            </a>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-6">
            <a href="#services" className="text-sm font-medium text-gray-700 hover:text-blue-600">
              Services
            </a>
            <a href="#about" className="text-sm font-medium text-gray-700 hover:text-blue-600">
              About
            </a>
            <Button onClick={scrollToForm} className="bg-blue-600 text-white hover:bg-blue-700">
              Get Started
            </Button>
          </div>
          <div className="md:hidden">
            <Button onClick={scrollToForm} size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
