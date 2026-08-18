"use client";

import { ConsultationForm } from "@/components/consultation-form-popup";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/animations";

export function Contact() {
  return (
    <motion.section
      id="contact"
      className="w-full py-10 md:py-[100px] bg-background"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="w-full px-[14px] md:w-[96%] md:mx-auto md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 items-start border rounded-2xl p-4">
          <div className="p-4 md:p-8 space-y-8 h-full flex flex-col justify-center">
            <div className="space-y-4">
                <h2 className="font-headline font-bold text-foreground">
                    Book an Appointment
                </h2>
                <p className="text-muted-foreground text-sm lg:text-base xl:text-lg">
                    Take the first step towards a healthier, happier you. Fill out the form to request an appointment. We'll be in touch shortly to confirm.
                </p>
            </div>
          </div>
          
          <div className="bg-muted p-4 md:p-8 rounded-2xl">
            <ConsultationForm variant="inline" />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
