"use client";

import { MapPin, Video, Clock, Shield, ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { ConsultationFormPopup } from "@/components/consultation-form-popup";

export function ConsultationModes() {
  return (
    <motion.section
      className="w-full mt-10 md:mt-[100px] relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-primary rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-primary rounded-full"></div>
      </div>

      <div className="w-full px-[14px] md:w-[96%] md:mx-auto md:px-6 py-0 md:py-12 relative">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-headline font-bold text-foreground text-3xl md:text-4xl mb-4">
              How We Connect
            </h2>
            <p className="max-w-2xl mx-auto text-muted-foreground text-sm lg:text-base xl:text-lg">
              Choose the consultation mode that works best for you. Professional care delivered through multiple channels.
            </p>
          </motion.div>
        </div>

  {/* Main Content Layout */}
  <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Left Side - In-Person Locations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 h-full flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="font-headline text-2xl font-bold text-foreground">In-Person Sessions</h3>
            </div>

            {/* Location Cards */}
            <div className="space-y-4">
              <div className="group bg-background border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-lg mb-2">Gurgaon</h4>
                    <p className="text-muted-foreground text-sm lg:text-base xl:text-lg mb-3">
                      Face-to-face counselling with our RCI-registered Clinical Psychologist in a private, comfortable setting.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs">Flexible scheduling available</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>

              <div className="group bg-background border border-border rounded-xl p-5 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-lg mb-2">East of Kailash, Delhi NCR</h4>
                    <p className="text-muted-foreground text-sm lg:text-base xl:text-lg mb-3">
                      Convenient access to professional mental health care in our Delhi NCR location.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Shield className="h-4 w-4" />
                      <span className="text-xs">Confidential environment</span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Online Consultation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative h-full"
          >
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 lg:p-8 border border-primary/20 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Video className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-headline text-2xl font-bold text-foreground">Online Counselling</h3>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground text-sm lg:text-base xl:text-lg leading-relaxed">
                  Secure virtual therapy sessions available across India and internationally. Experience quality care from your own space.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-background/50 rounded-lg border border-primary/10">
                    <div className="text-xl font-bold text-foreground mb-1">India</div>
                    <div className="text-xs text-muted-foreground">Nationwide</div>
                  </div>
                  <div className="text-center p-3 bg-background/50 rounded-lg border border-primary/10">
                    <div className="text-xl font-bold text-foreground mb-1">Global</div>
                    <div className="text-xs text-muted-foreground">International</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground text-xs">End-to-end encrypted sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground text-xs">Secure video platform</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground text-xs">Flexible time zones</span>
                  </div>
                </div>

                <ConsultationFormPopup
                  trigger={
                    <Button className="w-full mt-4" size="default">
                      <Phone className="h-4 w-4 mr-2" />
                      Schedule Consultation
                    </Button>
                  }
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-10 pt-6 border-t border-border/50"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium">RCI Registered Psychologist</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium">Flexible Scheduling</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium">Secure & Confidential</span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
