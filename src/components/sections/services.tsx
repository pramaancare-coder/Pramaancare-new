"use client";

import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { sectionVariants, staggerContainer, cardVariants } from "@/lib/animations";

type SubService = {
  title: string;
  description: string;
  img: {
    src: string;
    hint: string;
  };
};

const services: { id: string; title: string; content: string; img: { src: string; hint: string; }; subServices: SubService[] }[] = [
  {
    id: "item-1",
    title: "For Individuals",
    content: "One-on-one sessions to address personal challenges like anxiety, depression, and stress in a confidential space.",
    img: {
      src: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=400&fit=crop",
      hint: "individual therapy mental health counseling personal development"
    },
      subServices: [
      {
        title: "Anxiety Disorders",
        description: "People often experience excessive worry, racing thoughts, difficulty concentrating, avoidance behaviours, reassurance seeking, restlessness, and trouble sleeping. Therapy helps you learn relaxation skills, reduce anxiety, and gradually restore daily functioning.",
        img: { src: "/images/Anxiety Disorders.jpg", hint: "anxiety relief calm peaceful mind" }
      },
      {
        title: "Depressive Disorders",
        description: "People may feel persistent low mood, lose interest in daily activities, and struggle with hopelessness, negative thoughts, withdrawal, fatigue, changes in sleep or appetite, and slowed movement or thinking. Therapy helps improve mood, restore energy, enhance daily functioning, and rebuild confidence.",
        img: { src: "/images/Depressive Disorders.jpg", hint: "depression recovery hope sunrise" }
      },
      {
        title: "Stress & Burnout",
        description: "Many experience irritability, overthinking, poor sleep, and low motivation linked to workplace stress, caregiver fatigue, or lifestyle exhaustion. Therapy restores balance, renews energy, and supports healthier boundaries.",
        img: { src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop", hint: "stress relief burnout recovery balance" }
      },
      {
        title: "Obsessive–Compulsive Disorder (OCD)",
        description: "This can show up as intrusive thoughts, compulsive rituals (checking, cleaning, repeating), rumination, and avoidance behaviours. Therapy helps reduce obsessions, resist compulsions, and regain control over daily life.",
        img: { src: "/images/Obsessive–Compulsive Disorder (OCD)service.jpg", hint: "ocd therapy mental health treatment" }
      },
      {
        title: "Personality & Emotional Regulation Difficulties",
        description: "This often involves challenges such as unstable relationships, fear of abandonment, emptiness, loneliness, mood swings, indecisiveness, overthinking, or intense anger. Therapy builds stability, resilience, and healthier coping strategies.",
        img: { src: "/images/Personality and Emotional.jpg", hint: "emotional regulation therapy stability" }
      },
      {
        title: "Addiction & Behavioral Addictions",
        description: "Addictions may involve alcohol or drug use, smoking, gambling, gaming, or screen overuse, often leading to loss of control and strained relationships. Therapy helps break unhealthy patterns, strengthen motivation, and rebuild routines and meaningful connections.",
        img: { src: "/images/Addiction & Behavioral Addictions.jpg", hint: "addiction recovery therapy support" }
      },
      {
        title: "Eating Disorders",
        description: "This can include restrictive eating, binge–purge cycles, loss of control over eating, body dissatisfaction, and declining health. Therapy supports healthier eating, body acceptance, and emotional recovery.",
        img: { src: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop", hint: "eating disorder recovery healthy eating" }
      },
      {
        title: "Anger & Impulse Regulation",
        description: "Some people experience irritability, frequent outbursts, impulsivity, and difficulty controlling reactions. Therapy strengthens emotional regulation, communication, and relationships.",
        img: { src: "/images/Anger & Impulse Regulation.jpg", hint: "anger management impulse control therapy" }
      },
      {
        title: "Self-Esteem & Confidence Issues",
        description: "Often showing up as low self-worth, self-doubt, indecisiveness, negative self-image, or overreliance on reassurance. Therapy fosters self-acceptance, assertiveness, and lasting confidence.",
        img: { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop", hint: "self esteem confidence building therapy" }
      }
    ]
  },
  {
    id: "item-2", 
    title: "For Relationships",
    content: "Couples counselling to improve communication, resolve conflicts, and strengthen emotional bonds.",
    img: {
      src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop",
      hint: "couples therapy relationship counseling marriage support"
    },
    subServices: [
      {
        title: "Couples & Marriage Counselling",
        description: "You may face communication breakdowns, intimacy concerns, trust issues, or frequent conflicts. Therapy builds healthier communication, emotional closeness, and problem-solving skills.",
        img: { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop", hint: "couples counseling marriage therapy communication" }
      },
      {
        title: "Pre-marital Counselling",
        description: "Couples often explore expectations, communication styles, family adjustments, and shared future goals. Therapy supports couples in building understanding, preparing for challenges, and creating a strong foundation for marriage.",
        img: { src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop", hint: "premarital counseling relationship preparation" }
      },
      {
        title: "Separation & Divorce Support",
        description: "During separation or after divorce, many feel emotional distress, grief, or conflict. Therapy supports adjustment, co-parenting, and emotional healing.",
        img: { src: "/images/Separation & Divorce Support.jpg", hint: "divorce support separation counseling healing" }
      }
    ]
  },
  {
    id: "item-3",
    title: "For Families & Teens",
    content: "Family therapy and adolescent counselling to address developmental challenges and family dynamics.",
    img: {
      src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop",
      hint: "family therapy parent child counseling adolescent support"
    },
    subServices: [
      {
        title: "Family Therapy",
        description: "Families may struggle with conflicts, communication gaps, or strained relationships. Therapy strengthens bonds, mutual understanding, and conflict resolution.",
        img: { src: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop", hint: "family therapy counseling support" }
      },
      {
        title: "Parent–Child Counselling",
        description: "Helps parents and children improve communication, manage behavioral challenges, and strengthen their relationship through structured family therapy sessions.",
        img: { src: "/images/Parent-Child-Counselling.jpg", hint: "parent child counselling family therapy relationship building" }
      },
      {
        title: "Adolescent & Teen Counselling",
        description: "Specialized support for teenagers dealing with identity issues, peer pressure, academic stress, and emotional challenges during this critical developmental stage.",
        img: { src: "/images/Adolescent & Teen Counselling.jpg", hint: "adolescent teen counselling youth mental health support" }
      }
    ]
  },
  {
    id: "item-4",
    title: "Corporate Mental Health & Wellbeing Programs",
    content: "Evidence-based employee, leader, and team assessments using standardized tools to drive wellbeing and performance.",
    img: {
      src: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop",
      hint: "corporate team meeting mental health wellbeing professional"
    },
      subServices: [
      {
        title: "Mental Health Screening",
        description: "Identifies stress, anxiety, depression, or burnout using evidence-based assessment tools to guide wellbeing strategies.",
        img: { src: "/images/Mental Health Screening.jpg", hint: "mental health screening assessment evaluation professional corporate" }
      },
      {
        title: "Leadership & Emotional Intelligence",
        description: "Measures self-awareness, empathy, and management style to enhance leadership effectiveness and team dynamics.",
        img: { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop", hint: "leadership coaching development emotional intelligence training" }
      },
      {
        title: "Team Performance & Dynamics",
        description: "Evaluates collaboration, trust, and communication to improve team effectiveness and workplace relationships.",
        img: { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop", hint: "team building collaboration workplace dynamics" }
      },
      {
        title: "Workplace Motivation & Engagement",
        description: "Provides insights into satisfaction, culture, and retention to enhance employee engagement and organizational performance.",
        img: { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop", hint: "employee motivation engagement workplace happiness" }
      },
      {
        title: "Training Programs (Workshops & Webinars)",
        description: "Flexible training delivered in-person or online including: Stress & Resilience Training, Burnout Prevention, Mental Health Awareness, Mindfulness Techniques, Work-Life Balance, and Leadership Coaching & Emotional Intelligence Development.",
        img: { src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop", hint: "corporate workshop training professional development" }
      }
    ]
  },
  {
    id: "item-5",
    title: "Assessments",
    content: "Psychological assessments identify patterns to clarify diagnoses and guide treatment.",
    img: {
      src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
      hint: "psychological assessment testing evaluation diagnostic tools"
    },
      subServices: [
      {
        title: "Intelligence (IQ) Testing (Children & Adolescents)",
        description: "Standardized assessments are used to evaluate reasoning, problem-solving, comprehension, and working memory. These measures provide an overview of a child's overall intellectual functioning and help identify both cognitive strengths and areas of limitation that may impact learning and development.",
        img: { src: "/images/Intelligence (IQ) Testing (Children & Adolescents).jpg", hint: "intelligence iq testing child assessment" }
      },
      {
        title: "Learning Disability Assessment (Children & Adolescents)",
        description: "A detailed evaluation of academic skills in reading, writing, and mathematics. The assessment clarifies whether a child's difficulties meet criteria for a specific learning disorder (e.g., dyslexia, dysgraphia, dyscalculia) and provides recommendations for evidence-based educational interventions.",
        img: { src: "/images/Learning Disability Assessment (Children & Adolescents).jpg", hint: "learning disability assessment education testing" }
      },
      {
        title: "Autism Spectrum Assessment (Children & Adolescents)",
        description: "A structured developmental evaluation of communication, social interaction, and behavioral patterns. This process determines whether a child's presentation is consistent with autism spectrum conditions and outlines appropriate therapeutic and educational supports.",
        img: { src: "/images/Autism Spectrum Assessment (Children & Adolescents).jpg", hint: "autism spectrum assessment child development" }
      },
      {
        title: "ADHD Assessment (Children & Adolescents)",
        description: "A comprehensive evaluation of attention span, concentration, impulse control, and activity levels across different settings such as school and home. The assessment establishes whether the difficulties are consistent with Attention-Deficit/Hyperactivity Disorder and provides guidance for clinical management and school accommodations.",
        img: { src: "/images/ADHD Assessment (Children & Adolescents).jpg", hint: "adhd assessment attention focus evaluation" }
      },
      {
        title: "Vocational, Aptitude & Interest Testing (Adolescents)",
        description: "Standardized psychometric testing to assess abilities, aptitudes, and interests in adolescents. Results support informed choices regarding subject selection, higher education, and future career direction.",
        img: { src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop", hint: "vocational aptitude testing career assessment" }
      },
      {
        title: "Diagnostic Assessment (Adults)",
        description: "A structured approach to evaluating mental health concerns through clinical interviews and standardized measures. These assessments clarify diagnoses, determine severity, and facilitate effective therapy or intervention planning.",
        img: { src: "/images/Diagnostic Assessment (Adults).jpg", hint: "diagnostic assessment adult mental health evaluation" }
      },
      {
        title: "Neurocognitive Assessment (Adults)",
        description: "Comprehensive evaluation of memory, attention, language, executive functioning, and processing speed. These assessments identify cognitive changes linked to conditions such as dementia, stroke, traumatic brain injury, or epilepsy, and provide recommendations for rehabilitation, workplace adaptation, and daily functioning.",
        img: { src: "/images/Neurocognitive Assessment (Adults).jpg", hint: "neurocognitive assessment brain function evaluation" }
      },
      {
        title: "Personality Assessment (Adults)",
        description: "Standardized evaluation of personality traits, emotional regulation, and interpersonal patterns. These assessments identify how personality styles influence mental health, decision making and relationships, and guide treatment planning, strengthen self-awareness, and support lasting emotional well-being.",
        img: { src: "/images/Personality Assessment (Adults).jpg", hint: "personality assessment psychological evaluation" }
      },
      {
        title: "Vocational, Aptitude & Interest Testing (Adults)",
        description: "Psychometric assessment of abilities, aptitudes, and occupational interests. Results assist individuals in making informed career decisions, planning professional transitions, and aligning strengths with suitable vocational opportunities to improve career satisfaction and growth.",
        img: { src: "/images/Vocational, Aptitude & Interest Testing (Adults).jpg", hint: "vocational aptitude testing adult career assessment" }
      }
    ]
  }
];

const gridLayout = [
  "md:col-span-1",      // For Individuals - top left (small)
  "md:col-span-2",      // For Relationships - top center/right (wide)
  "md:row-span-2",      // For Families & Teens - right side (tall)
  "md:col-span-2",      // Corporate Programs - bottom left/center (wide)
  "md:col-span-1"       // Assessments - bottom right (small)
];

export function Services() {
  return (
    <motion.section
      id="services"
      className="w-full mt-10 md:mt-[100px]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="w-full px-[14px] md:w-[96%] md:mx-auto md:px-6">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-headline font-bold text-foreground text-4xl md:text-5xl">
              Our Services
            </h2>
            <p className="max-w-3xl mx-auto mt-6 text-muted-foreground text-sm lg:text-base xl:text-lg">
              Comprehensive mental health support tailored to meet diverse needs across individuals, relationships, families, and organizations.
            </p>
          </motion.div>
        </div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 md:auto-rows-[300px] gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <Dialog key={service.id}>
              <DialogTrigger asChild>
                <motion.div 
                  variants={cardVariants}
                  data-service-id={service.id}
                  className={cn(
                    "group relative w-full h-full min-h-[300px] overflow-hidden rounded-[20px] p-6 flex flex-col justify-end cursor-pointer", 
                    gridLayout[index]
                  )}
                >
                  <Image
                    src={service.img.src}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="relative">
                    <h3 className="font-headline text-2xl font-bold text-white">{service.title}</h3>
                    <p className="text-white/90 mt-2 text-sm lg:text-base xl:text-lg">{service.content}</p>
                    <Button variant="link" className="hidden md:flex text-white self-start p-0 h-auto mt-4">
                      View More <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-4xl max-h-[90svh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-headline text-3xl">{service.title}</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-6 py-4">
                  {service.subServices.map((subService) => (
                    <div key={subService.title} className="group relative w-full overflow-hidden rounded-[20px] flex flex-col md:flex-row items-center bg-card">
                      <div className="relative h-48 md:h-full w-full md:w-1/3 overflow-hidden">
                        <Image
                          src={subService.img.src}
                          alt={subService.title}
                          fill
                          className="object-cover h-full w-full"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <h3 className="font-headline text-xl font-bold text-foreground">{subService.title}</h3>
                        <p className="text-muted-foreground mt-2 text-sm lg:text-base xl:text-lg">{subService.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
