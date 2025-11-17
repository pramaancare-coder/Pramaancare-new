
"use client";

import Image from "next/image";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationFormPopup } from "@/components/consultation-form-popup";
import { Marquee } from "@/components/ui/marquee";


const reviews = [
  {
    name: "Group Therapy",
    img: "https://cdn.shopify.com/s/files/1/0581/7198/1896/files/Three.png?v=1756186294",
    hint: "group therapy session",
  },
  {
    name: "Couples Counseling",
    img: "https://cdn.shopify.com/s/files/1/0581/7198/1896/files/Container.png?v=1756186293",
    hint: "couple therapy",
  },
  {
    name: "Individual Support",
    img: "https://cdn.shopify.com/s/files/1/0581/7198/1896/files/Container-2.png?v=1756186292",
    hint: "counseling session",
  },
  {
    name: "Family Therapy",
    img: "https://cdn.shopify.com/s/files/1/0581/7198/1896/files/Container-1.png?v=1756186286",
    hint: "family therapy",
  },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
    >
        <Image 
            src="https://cdn.shopify.com/s/files/1/0581/7198/1896/files/circle-pattern.png?v=1756187260"
            alt="Circle Pattern"
            width={500}
            height={500}
            priority
            className="absolute top-0 right-0 -z-10 opacity-[0.04] w-3/4 h-auto transform translate-x-1/3"
        />
      <div className="w-full px-[14px] md:w-[96%] md:mx-auto md:px-6 pt-20 md:pt-28 lg:pt-32 pb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
                <h1 className="font-headline font-bold text-foreground -tracking-[1px]">
                    Empowering Your <br />
                    Mind, Transforming Your Life
                </h1>
            </div>
            <div className="space-y-6">
                <p className="text-muted-foreground text-sm lg:text-base xl:text-lg">
                    Professional counseling and psychological support to help you navigate life's challenges with clarity and confidence.
                </p>
                <div className="flex">
                    <ConsultationFormPopup
                        trigger={
                            <Button size="lg">
                                Get Started <ArrowRight />
                            </Button>
                        }
                    />
                </div>
            </div>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white">
  <Marquee repeat={4} className="[--duration:60s] [--gap:1.5rem]">
          {reviews.map((review, index) => (
             <div key={review.name} className="relative h-[400px] w-[460px] overflow-hidden rounded-[20px]">
                 <Image
                    src={review.img}
                    alt={review.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 300px, 460px"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                  />
             </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
