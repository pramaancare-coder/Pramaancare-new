"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { Mail, Phone, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const socialLinks = [
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Youtube", href: "#", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="w-full px-[14px] md:w-[96%] md:mx-auto md:px-6 pt-16 pb-8">

        {/* Mobile-only: logo left aligned at top */}
        <div className="md:hidden mb-8">
          <div className="flex items-start">
            <div className="mb-4">
              <Logo variant="dark" />
            </div>
          </div>
        </div>

  {/* Desktop: logo + social icons will be shown just above the divider (inserted below) */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="font-headline text-4xl font-bold text-primary-foreground max-w-md">
              Guiding You Toward a Healthier Mind and Happier Life
            </h2>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-foreground">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="#home" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Home</Link></li>
              <li><Link href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">About Us</Link></li>
              <li><Link href="#services" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Services</Link></li>
              <li><Link href="#blog" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-foreground">Contact</h3>
            <ul className="space-y-4 text-primary-foreground/80">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary-foreground" />
                <a href="mailto:info@pramaancare.com" className="hover:text-primary-foreground transition-colors">info@pramaancare.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary-foreground" />
                <a href="tel:8800438524" className="hover:text-primary-foreground transition-colors">8800438524</a>
              </li>
            </ul>
          </div>
        </div>
        {/* Social icons for mobile: shown below the main content with extra spacing */}
        <div className="block md:hidden mt-6">
          <div className="flex items-center gap-3">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <Link key={name} href={href} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>
        {/* Desktop/tablet: logo + social icons placed just above divider */}
        <div className="hidden md:flex flex-col md:flex-row justify-between items-center mt-6 mb-0">
          <div className="flex justify-start">
            <Logo variant="dark" />
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <Link key={name} href={href} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                <Icon className="h-6 w-6" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-2 border-t border-primary-foreground/30">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                    <p className="text-sm lg:text-base xl:text-lg text-primary-foreground/80">
                        Copyright &copy; {new Date().getFullYear()} Pramaan Care. All Right Reserved.
                    </p>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
