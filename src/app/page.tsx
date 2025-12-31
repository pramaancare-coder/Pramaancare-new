import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";

// Dynamic imports for below-the-fold components
const ConsultationModes = dynamic(() => 
  import("@/components/sections/consultation-modes").then(mod => ({ default: mod.ConsultationModes })),
  { ssr: true }
);
const Commitment = dynamic(() => 
  import("@/components/sections/commitment").then(mod => ({ default: mod.Commitment })),
  { ssr: true }
);
const WhyPartnerWithUs = dynamic(() => 
  import("@/components/sections/why-partner-with-us").then(mod => ({ default: mod.WhyPartnerWithUs })),
  { ssr: true }
);
const ScheduleAppointment = dynamic(() => 
  import("@/components/sections/schedule-appointment").then(mod => ({ default: mod.ScheduleAppointment })),
  { ssr: true }
);
const Testimonials = dynamic(() => 
  import("@/components/sections/testimonials").then(mod => ({ default: mod.Testimonials })),
  { ssr: true }
);
const Faqs = dynamic(() => 
  import("@/components/sections/faqs").then(mod => ({ default: mod.Faqs })),
  { ssr: true }
);
const Contact = dynamic(() => 
  import("@/components/sections/contact").then(mod => ({ default: mod.Contact })),
  { ssr: true }
);
const MediaCoverage = dynamic(() => 
  import("@/components/sections/media-coverage").then(mod => ({ default: mod.MediaCoverage })),
  { ssr: true }
);
const BackToTopButton = dynamic(() => 
  import("@/components/back-to-top-button").then(mod => ({ default: mod.BackToTopButton })),
  { ssr: true }
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-grow">
        <Hero />
        <About />
        <Services />
        <Commitment />
        <ConsultationModes />
        <WhyPartnerWithUs />
        <ScheduleAppointment />
        <Testimonials />
        <MediaCoverage />
        <Faqs />
        <Contact />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
}
