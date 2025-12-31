"use client";

import { useEffect } from "react";

export function StructuredData() {
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const delay = isMobile ? 3000 : 0;
    
    const injectSchemas = () => {
      const schemas = [
      {
        "@context": "https://schema.org",
        "@type": ["Organization","MedicalOrganization","LocalBusiness"],
        "name": "Pramaan Care",
        "url": "https://www.pramaancare.com/",
        "email": "info@pramaancare.com",
        "telephone": "+91-8860590449",
        "logo": "https://www.pramaancare.com/images/light logo.svg",
        "image": "https://www.pramaancare.com/images/light logo.svg",
        "areaServed": [
          {"@type":"AdministrativeArea","name":"Gurgaon"},
          {"@type":"AdministrativeArea","name":"Delhi NCR"},
          {"@type":"Country","name":"India"},
          {"@type":"Country","name":"International"}
        ],
        "medicalSpecialty": "Psychiatric",
        "contactPoint": [{
          "@type": "ContactPoint",
          "contactType": "Patient enquiries",
          "telephone": "+91-8860590449",
          "email": "info@pramaancare.com",
          "areaServed": "IN",
          "availableLanguage": ["en","hi"]
        }]
      },
      {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Ms. Prerna Sethi",
        "alternateName": ["Prerna Sethi Psychologist", "Ms Prerna Sethi Clinical Psychologist Delhi"],
        "jobTitle": "RCI-Registered Clinical Psychologist",
        "affiliation": {
          "@type": "Organization",
          "name": "Pramaan Care",
          "url": "https://www.pramaancare.com/"
        },
        "hasCredential": "RCI Registration; M.Phil. Clinical Psychology",
        "knowsAbout": [
          "Cognitive Behavioral Therapy (CBT)",
          "Dialectical Behavior Therapy (DBT)",
          "Exposure and Response Prevention (ERP)",
          "Motivational Enhancement Therapy (MET)",
          "Expressive Arts Therapy",
          "Anxiety treatment Delhi",
          "Depression counseling",
          "Child psychology",
          "Relationship counseling"
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Online Therapy Session with Ms. Prerna Sethi",
        "image": "https://www.pramaancare.com/images/light logo.svg",
        "description": "Professional online therapy session with experienced clinical psychologist Ms. Prerna Sethi. Specializing in anxiety treatment, depression counseling, relationship issues, and child psychology.",
        "brand": {
          "@type": "Organization",
          "name": "Pramaan Care"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "35",
          "bestRating": "5"
        },
        "offers": {
          "@type": "Offer",
          "url": "https://www.pramaancare.com/",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "name": "Anxiety Treatment Delhi",
            "alternateName": "Individual Counselling",
            "serviceType": "Psychological therapy",
            "provider": {"@type":"Organization","name":"Pramaan Care"},
            "areaServed": "India"
          },
          {
            "@type": "Service",
            "name": "Relationship Counseling Delhi",
            "alternateName": "Couples / Relationship Counselling",
            "serviceType": "Psychological therapy",
            "provider": {"@type":"Organization","name":"Pramaan Care"},
            "areaServed": "India"
          },
          {
            "@type": "Service",
            "name": "Child Psychologist Delhi",
            "alternateName": "Family & Teen Counselling",
            "serviceType": "Psychological therapy",
            "provider": {"@type":"Organization","name":"Pramaan Care"},
            "areaServed": "India"
          },
          {
            "@type": "Service",
            "name": "Corporate Mental Health & Wellbeing Programs",
            "serviceType": "Corporate wellbeing & assessments",
            "provider": {"@type":"Organization","name":"Pramaan Care"},
            "areaServed": "India"
          },
          {
            "@type": "Service",
            "name": "Cognitive Behavioral Therapy Delhi",
            "alternateName": "Psychological Assessments",
            "serviceType": "Clinical assessment",
            "provider": {"@type":"Organization","name":"Pramaan Care"},
            "areaServed": "India"
          }
        ]
      }
    ];

      schemas.forEach((schema, index) => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        script.id = `schema-${index}`;
        document.head.appendChild(script);
      });
    };

    setTimeout(() => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(injectSchemas, { timeout: 5000 });
      } else {
        setTimeout(injectSchemas, 100);
      }
    }, delay);
  }, []);

  return null;
}