"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { sectionVariants, staggerContainer, cardVariants } from "@/lib/animations";

const faqs = [
  {
    id: "faq-1",
    question: "What should I expect in my first counselling session?",
    answer: "The first session is an opportunity to discuss your concerns, personal history, and goals for therapy. The therapist will also explain how counselling works, outline what you can expect from the process, and answer any questions you may have. This session helps establish a clear direction for therapy and ensures that the process feels comfortable and meaningful for you."
  },
  {
    id: "faq-2",
    question: "How many sessions will I need?",
    answer: "The number of sessions depends on your individual needs, goals, and progress. On average, clients attend 10–15 therapy sessions, which typically progress through three phases: understanding your concerns, addressing them through skill-building and insight, and finally consolidating progress for long-term well-being. Some clients may require fewer sessions, while others benefit from longer-term support depending on the complexity of their concerns."
  },
  {
    id: "faq-3",
    question: "How long is each session?",
    answer: "Sessions typically last 50 or 60 minutes, depending on what works best for you and your therapist. This allows enough time for meaningful progress while avoiding mental fatigue. During the maintenance phase, sessions can sometimes be shorter, around 30 minutes, focusing on reinforcing skills and addressing specific concerns as needed."
  },
  {
    id: "faq-4",
    question: "Do you offer online counselling?",
    answer: "Yes. Counselling is available both in-person in Gurgaon and East of Kailash, Delhi, as well as through secure online therapy sessions for clients across India and overseas. Online sessions are conducted via trusted platforms such as Google Meet, ensuring confidentiality, accessibility, and convenience."
  },
  {
    id: "faq-5",
    question: "Are these services meant for crisis or emergency situations?",
    answer: "No. Our services are not intended for crisis intervention or emergency care. If you are in immediate danger or experiencing a psychiatric or medical emergency, please contact local emergency services or a 24/7 crisis helpline."
  },
  {
    id: "faq-6",
    question: "Is therapy confidential?",
    answer: "Yes. Everything shared in therapy is kept strictly confidential, in line with ethical and legal guidelines. Confidentiality is explained in detail during your first session, including the few situations where disclosure may be required by law (such as risk of harm)."
  },
  {
    id: "faq-7",
    question: "How do I book an appointment?",
    answer: "You can book your session easily by calling, messaging on WhatsApp, sending an email, or filling out the appointment form on the website. The team will guide you through the next steps."
  },
  {
    id: "faq-8",
    question: "What are the therapist's qualifications?",
    answer: "The therapist holds an M.Phil. in Clinical Psychology and is registered with the Rehabilitation Council of India (RCI). The training and clinical experience enable work with a wide range of psychological concerns using evidence-based therapeutic approaches."
  },
  {
    id: "faq-9",
    question: "How do I know if counselling is right for me?",
    answer: "Many people wonder if their challenges are \"serious enough\" for therapy. If you are feeling overwhelmed, stuck, or simply want a safe space to explore your thoughts and emotions, counselling may be helpful. An initial consultation can clarify whether therapy is the right step for your needs."
  },
  {
    id: "faq-10",
    question: "What is your approach to counselling?",
    answer: "The therapist takes a collaborative and individualized approach, drawing from evidence-based methods such as cognitive-behavioral therapy (CBT), solution-focused techniques, and mindfulness-based strategies. The goal is to provide a supportive environment where you can gain insight, build skills, and make meaningful changes."
  },
];

const firstColumnFaqs = faqs.slice(0, 5);
const secondColumnFaqs = faqs.slice(5);

export function Faqs() {
  const [value1, setValue1] = useState<string | undefined>(undefined);
  const [value2, setValue2] = useState<string | undefined>(undefined);

  return (
    <motion.section
      id="faqs"
      className="w-full mt-10 md:mt-[100px]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="w-full px-[14px] md:w-[96%] md:mx-auto md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="font-headline font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="max-w-4xl text-muted-foreground text-sm lg:text-base xl:text-lg">
           Starting therapy is a big step. Here you’ll learn how counselling works, what to expect, and how we support your mental health. Have more questions? Reach out we’re here to help.
          </p>
        </div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Accordion 
            type="single" 
            collapsible 
            className="w-full space-y-3.5"
            value={value1}
            onValueChange={setValue1}
          >
            {firstColumnFaqs.map((faq) => (
              <motion.div key={faq.id} variants={cardVariants}>
                <AccordionItem value={faq.id}>
                  <AccordionTrigger className="text-lg md:text-base font-semibold text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground h5">
                    <p className="text-sm lg:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
          <Accordion 
            type="single" 
            collapsible 
            className="w-full space-y-3.5"
            value={value2}
            onValueChange={setValue2}
          >
            {secondColumnFaqs.map((faq) => (
              <motion.div key={faq.id} variants={cardVariants}>
                <AccordionItem value={faq.id}>
                  <AccordionTrigger className="text-lg md:text-base font-semibold text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground h5">
                    <p className="text-sm lg:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </motion.section>
  );
}