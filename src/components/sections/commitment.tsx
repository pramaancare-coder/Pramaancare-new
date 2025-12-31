
"use client";

import { motion } from "framer-motion";
import { sectionVariants, staggerContainer, cardVariants } from "@/lib/animations";

const stats = [
  {
    value: "8+",
    label: "Years of Experience Helping individuals navigate life's",
  },
  {
    value: "1400+",
    label: "Happy Clients Empowered through counseling and therapy",
  },
  {
    value: "4500+",
    label: "Sessions Conducted Providing guidance and support every day",
  },
  {
    value: "98%",
    label: "Satisfaction Positive outcomes and improved well-being",
  },
];

export function Commitment() {
  return (
    <motion.section
      className="w-full mt-10 md:mt-[100px] bg-primary text-primary-foreground"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full px-[14px] md:w-[96%] md:mx-auto md:px-6 py-10 md:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="font-headline font-bold text-primary-foreground">
              Our Commitment to Your Well-Being
            </h2>
            <p className="text-primary-foreground/80 max-w-md text-sm lg:text-base xl:text-lg">
              We are dedicated to providing compassionate and effective mental health support. How we've helped individuals on their journey to well-being.
            </p>
          </div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={cardVariants} className="space-y-2">
                <h3 className="text-5xl font-bold text-primary-foreground font-headline">{stat.value}</h3>
                <p className="text-primary-foreground/80 text-sm lg:text-base xl:text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
