import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Curriculum from "@/components/Curriculum";
import Skills from "@/components/Skills";
import Instructor from "@/components/Instructor";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import EnrollmentForm from "@/components/EnrollmentForm";
import Footer from "@/components/Footer";

import GlobalAmbience from "@/components/GlobalAmbience";

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen">
      <GlobalAmbience />
      <Header />
      <Hero />
      <About />
      <Curriculum />
      <Skills />
      <Instructor />
      <Testimonials />
      <FAQ />
      <EnrollmentForm />
      <Footer />
    </main>
  );
}
