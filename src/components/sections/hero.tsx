"use client";

import Image from "next/image";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConsultationFormPopup } from "@/components/consultation-form-popup";
import { Marquee } from "@/components/ui/marquee";

const heroImages = [
  {
    name: "Group Therapy",
    img: "/images/group-therapy.jpg",
  },
  {
    name: "Couples Counseling",
    img: "/images/couple-therapy.jpg",
  },
  {
    name: "Individual Support",
    img: "/images/counseling-session.jpg",
  },
  {
    name: "Family Therapy",
    img: "/images/family-therapy.jpg",
  },
];

export function Hero() {
  return (
    <section id="home" className="relative w-full overflow-hidden">
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
              Professional counseling and psychological support to help you
              navigate life&apos;s challenges with clarity and confidence.
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

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-background">
        <Marquee repeat={4} className="[--duration:60s] [--gap:1.5rem]">
          {heroImages.map((image, index) => (
            <div
              key={image.name}
              className="relative h-[400px] w-[460px] overflow-hidden rounded-[20px]"
            >
              <Image
                src={image.img}
                alt={image.name}
                fill
                className="object-cover"
                sizes="460px"
                priority={index === 0}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}