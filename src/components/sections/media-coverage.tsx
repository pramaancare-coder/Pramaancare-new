"use client";

import Image from "next/image";

import { Calendar } from "lucide-react";

export function MediaCoverage() {
  return (
    <section className="w-full py-10 md:py-16 lg:py-24 bg-primary text-primary-foreground">
      <div className="w-full px-[14px] md:w-[96%] md:mx-auto md:px-6">
        <div className="relative">
          {/* Single Featured Media Coverage */}
          <div className="rounded-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 order-1">
                <a
                  href="https://youtu.be/fE0xeufZIng?feature=shared"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block cursor-pointer"
                >
                  <Image
                    src="/images/media-presents.webp"
                    alt="Ms. Prerna Sethi Media Coverage"
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain transform scale-105 hover:scale-110 transition-transform duration-300"
                  />
                </a>
              </div>
              <div className="space-y-4 order-2">
                <div className="flex items-center text-sm text-primary-foreground/80">
                  <Calendar className="w-4 h-4 mr-2" />
                  Recent Coverage
                </div>
                <h3 className="font-bold text-2xl md:text-3xl text-primary-foreground">
                  Expert Insights on Mental Health and Psychological Assessment
                </h3>
                <p className="text-primary-foreground/80 text-lg leading-relaxed">
                  Ms. Prerna Sethi sheds light on how narratives like Love Jihad and "Jilted Lovers Syndrome" often mask deeper psychological scars. She explains how signs of distress are dismissed as normal behavior — until rejection strikes, leaving individuals unable to cope with the emotional fallout.
                </p>
                <a
                  href="https://youtu.be/fE0xeufZIng?feature=shared"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  Watch this whole video
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}