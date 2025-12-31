"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/animations";

export function About() {
  return (
    <motion.section
      id="about"
      className="w-full mt-10 md:mt-[100px]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="w-full px-[14px] md:w-[96%] md:mx-auto md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          <div className="relative order-1 flex">
            <Image
              src="/images/about-prerna.webp"
              alt="Ms. Prerna Sethi, Clinical Psychologist"
              width={794}
              height={602}
              priority
              className="rounded-[20px] object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="space-y-6 order-2 flex flex-col">
            <h2 className="font-headline font-bold text-foreground">
              Meet Ms. Prerna Sethi <br />
              Trusted Clinical Psychologist
            </h2>
            <p className="text-muted-foreground text-sm lg:text-base xl:text-lg">
              <strong>Ms. Prerna Sethi – RCI Registered Clinical Psychologist (M.Phil. Clinical Psychology)</strong>
            </p>
            <p className="text-muted-foreground text-sm lg:text-base xl:text-lg">
              Ms. Prerna Sethi is an RCI-registered Clinical Psychologist with over 8 years of experience across schools, hospitals, corporates and outpatient mental health settings. She supports adolescents, adults, couples, families, and organizations in improving mental clarity, enhancing emotional well-being, and building resilience.
            </p>
            <p className="text-muted-foreground text-sm lg:text-base xl:text-lg">
              Her therapeutic approach is evidence-based and tailored to each client's needs. Depending on the concern, she draws upon therapies such as Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), Exposure and Response Prevention (ERP), or Motivational Enhancement Therapy (MET). She also incorporates Expressive Arts Therapy, offering clients creative avenues to explore and express emotions.
            </p>
            <p className="text-muted-foreground text-sm lg:text-base xl:text-lg">
              She began her professional journey as a school counselor at Kendriya Vidyalaya, where she developed a strong interest in using creative methods to engage students. She later served as an Art Therapist at Fortis Hospital, conducting inpatient sessions, facilitating therapeutic art workshops, and conducting awareness programs on mental health issues—laying a strong foundation in both clinical practice and preventive education. After completing her M.Phil. in Clinical Psychology, she joined UVI Health, tailoring interventions to address the nuanced emotional needs associated with women's reproductive and sexual health.
            </p>
            <p className="text-muted-foreground text-sm lg:text-base xl:text-lg">
              At Athena Behavioral Health, she worked extensively in both inpatient and outpatient settings, eventually advancing to Center Head, where she supervised multidisciplinary teams, trained interns, developed treatment protocols, and oversaw clinical service delivery. She also briefly held a leadership role at Merlin Health, further strengthening her ability to integrate therapeutic depth with organizational efficiency while continuing her therapeutic practice.
            </p>
            <p className="text-muted-foreground text-sm lg:text-base xl:text-lg">
              Through these cumulative experiences, Ms. Sethi has cultivated a practice that is client-centered, collaborative, and deeply attuned to the diverse mental health needs of adolescents and adults.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}