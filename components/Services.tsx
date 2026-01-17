"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Zap, TrendingUp, Users, Shield, BarChart } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Targeted Lead Generation",
    description:
      "We identify and reach your ideal customers using advanced targeting techniques and data analysis.",
  },
  {
    icon: Zap,
    title: "Fast Turnaround",
    description:
      "Get quality leads delivered to your inbox within 24-48 hours. No waiting, no delays.",
  },
  {
    icon: TrendingUp,
    title: "High Conversion Rates",
    description:
      "Our leads convert at 3x the industry average thanks to our rigorous qualification process.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description:
      "Work with a dedicated team of lead generation specialists who understand your business.",
  },
  {
    icon: Shield,
    title: "Data Security",
    description:
      "Your data is protected with enterprise-grade security and GDPR compliance.",
  },
  {
    icon: BarChart,
    title: "Real-time Analytics",
    description:
      "Track your lead performance with detailed analytics and insights dashboard.",
  },
];

export default function Services() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose Our Lead Generation Service?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We combine cutting-edge technology with proven strategies to deliver
            results that matter.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
