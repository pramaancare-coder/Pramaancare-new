"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/animations";

export function WhyPartnerWithUs() {
  return (
    <motion.section
      className="w-full mt-10 md:mt-[100px] overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full px-[14px] md:w-[96%] md:mx-auto md:px-6">
        <div className="grid md:grid-cols-2 md:gap-8 bg-background rounded-[20px] md:items-stretch overflow-hidden">
          {/* Text Content */}
          <div className="pt-6 pb-0 space-y-8 flex flex-col justify-center order-2 md:order-1">
            <h2 className="font-headline font-bold text-foreground">
              Why Choose Pramaan Care
            </h2>
            <div className="space-y-6">
              <p className="text-muted-foreground text-sm lg:text-base xl:text-lg">
                Pramaan Care is dedicated to providing personalized counselling and therapy with an RCI-registered Clinical Psychologist in Gurgaon and Delhi NCR where every client—whether an individual, a couple, or a corporate team—receives focused attention and support tailored to their needs.
              </p>
              <p className="text-muted-foreground text-sm lg:text-base xl:text-lg">
                Each session or program follows a client-centered approach, designed to address present concerns while also building resilience for the future. From helping individuals manage emotional challenges, to supporting couples in strengthening relationships, to guiding organizations toward better mental well-being—Pramaan Care creates spaces where people feel supported, understood, and empowered.
              </p>
              <p className="text-muted-foreground text-sm lg:text-base xl:text-lg">
                Grounded in trust, empathy, and ethical care, Pramaan Care offers a safe and consistent environment where clients can find both immediate relief and sustainable paths toward clarity and well-being.
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative min-h-[400px] md:min-h-0 order-1 md:order-2 flex items-center justify-center overflow-hidden rounded-r-[20px] bg-white">
            <Image
              src="/images/Pramaan Logo.jpeg"
              alt="Pramaan Care Logo"
              fill
              className="object-cover" 
              priority
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
