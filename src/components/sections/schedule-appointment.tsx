"use client";

import { Button } from "@/components/ui/button";
import { ConsultationFormPopup } from "@/components/consultation-form-popup";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/animations";

export function ScheduleAppointment() {
  return (
    <motion.section
      className="w-full mt-10 md:mt-[100px] bg-primary text-primary-foreground relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-[0.08]"
        style={{ backgroundImage: "url('https://fse.jegtheme.com/resolace/wp-content/uploads/sites/75/2025/03/cta-bg.webp')" }}
      ></div>
      
      <div className="relative w-full px-[14px] md:w-[96%] md:mx-auto md:px-6 py-10 md:py-24 text-center">
        <div className="flex flex-col items-center space-y-6">
          <h2 className="font-headline font-bold text-4xl md:text-5xl max-w-2xl">
            Take The Next Step Schedule Your Appointment
          </h2>
          <p className="max-w-xl text-primary-foreground/80 text-sm lg:text-base xl:text-lg">
            We're here to support you, let's work together to create a path toward healing, growth, and balance
          </p>
          <ConsultationFormPopup
            trigger={
              <Button size="lg" variant="secondary" className="text-foreground hover:bg-secondary/80">
                Schedule Consultation
              </Button>
            }
          />
        </div>
      </div>
    </motion.section>
  );
}
