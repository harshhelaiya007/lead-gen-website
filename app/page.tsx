import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

// Lazy load the form component for better performance
const LeadForm = dynamic(() => import("@/components/LeadForm"), {
  loading: () => (
    <div className="py-20 text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
    </div>
  ),
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <LeadForm />
      <CTA />
      <Footer />
    </main>
  );
}
