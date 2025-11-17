"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { ConsultationFormPopup } from "@/components/consultation-form-popup";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services", isDropdown: true },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faqs", label: "FAQs" },
  { href: "#contact", label: "Contact" },
];

const serviceCategories = [
  { title: "For Individuals", id: "item-1" },
  { title: "For Relationships", id: "item-2" },
  { title: "For Families & Teens", id: "item-3" },
  { title: "Corporate Mental Health & Wellbeing Programs", id: "item-4" },
  { title: "Assessments", id: "item-5" }
];

export function Header() {
  const [menuState, setMenuState] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const updateActiveLink = () => {
      const headerHeight = 80;
      const scrollPos = window.scrollY + headerHeight + 100;
      
      const homeElement = document.querySelector('#home') as HTMLElement;
      const aboutElement = document.querySelector('#about') as HTMLElement;
      const servicesElement = document.querySelector('#services') as HTMLElement;
      const testimonialsElement = document.querySelector('#testimonials') as HTMLElement;
      const faqsElement = document.querySelector('#faqs') as HTMLElement;
      const contactElement = document.querySelector('#contact') as HTMLElement;
      
      let current = "#home";
      
      if (contactElement && scrollPos >= contactElement.offsetTop) {
        current = "#contact";
      } else if (faqsElement && scrollPos >= faqsElement.offsetTop) {
        current = "#faqs";
      } else if (testimonialsElement && scrollPos >= testimonialsElement.offsetTop) {
        current = "#testimonials";
      } else if (servicesElement && scrollPos >= servicesElement.offsetTop) {
        current = "#services";
      } else if (aboutElement && scrollPos >= aboutElement.offsetTop) {
        current = "#about";
      } else if (homeElement && scrollPos >= homeElement.offsetTop) {
        current = "#home";
      }
      
      setActiveLink(current);
    };

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    return () => {
      window.removeEventListener("scroll", updateActiveLink);
    };
  }, []);

  return (
    <header>
      <nav className="fixed z-20 w-full border-b bg-white transition-colors duration-150">
        <div className="w-full px-[14px] md:w-[96%] md:mx-auto md:px-6 transition-all duration-300">
          <div className="relative flex items-center justify-between gap-6 py-3 lg:py-4">
            <div className="flex-shrink-0">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <Logo variant="light" asChild />
              </Link>
            </div>

            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex gap-8 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    {link.isDropdown ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className={cn(
                              "flex items-center gap-1 duration-150",
                              activeLink === link.href ? "text-primary" : "text-muted-foreground hover:text-accent-foreground"
                            )}
                          >
                            <span>{link.label}</span>
                            <ChevronDown className="h-3 w-3" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-80" align="center">
                          {serviceCategories.map((category) => (
                            <DropdownMenuItem
                              key={category.id}
                              onClick={() => {
                                setTimeout(() => {
                                  const serviceButton = document.querySelector(`[data-service-id="${category.id}"]`) as HTMLElement;
                                  if (serviceButton) {
                                    serviceButton.click();
                                  }
                                }, 100);
                              }}
                              className="cursor-pointer"
                            >
                              <span className="font-medium">{category.title}</span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => {
                          setActiveLink(link.href);
                        }}
                        className={cn(
                          "block duration-150",
                          activeLink === link.href ? "text-primary" : "text-muted-foreground hover:text-accent-foreground"
                        )}
                      >
                        <span>{link.label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <ConsultationFormPopup
                  trigger={
                    <Button size="sm">
                      Book Appointment
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  }
                />
              </div>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 -m-2.5 block cursor-pointer p-2.5 lg:hidden"
              >
                <div className="relative w-6 h-6">
                  <Menu className={cn(
                    "absolute inset-0 m-auto size-6 transition-all duration-500 ease-in-out",
                    menuState ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
                  )} />
                  <X className={cn(
                    "absolute inset-0 m-auto size-6 transition-all duration-500 ease-in-out",
                    menuState ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
                  )} />
                </div>
              </button>
            </div>
          </div>

          <div className={cn(
            "lg:hidden absolute top-full left-0 w-full bg-white border-t transition-all duration-300 ease-in-out transform-gpu",
            menuState ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
          )}>
            <nav className="flex flex-col items-center gap-4 p-6">
              {navLinks.map((link, index) => (
                <div key={link.href}>
                  {link.isDropdown ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={cn(
                            "flex items-center justify-center gap-2 text-lg font-medium hover:text-primary duration-150",
                            activeLink === link.href ? "text-primary" : "text-foreground"
                          )}
                        >
                          <span>{link.label}</span>
                          <ChevronDown className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-80" align="center">
                        {serviceCategories.map((category) => (
                          <DropdownMenuItem
                            key={category.id}
                            onClick={() => {
                              setMenuState(false);
                              setTimeout(() => {
                                const serviceButton = document.querySelector(`[data-service-id="${category.id}"]`) as HTMLElement;
                                if (serviceButton) {
                                  serviceButton.click();
                                }
                              }, 100);
                            }}
                            className="cursor-pointer"
                          >
                            <span className="font-medium">{category.title}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "text-lg font-medium hover:text-primary block duration-150",
                        activeLink === link.href ? "text-primary" : "text-foreground"
                      )}
                      onClick={() => {
                        setMenuState(false);
                        setActiveLink(link.href);
                      }}
                    >
                      <span>{link.label}</span>
                    </Link>
                  )}
                </div>
              ))}
              
              <ConsultationFormPopup
                trigger={
                  <Button className="mt-2">
                    Book Appointment
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                }
              />
            </nav>
          </div>
        </div>
      </nav>
    </header>
  );
}
