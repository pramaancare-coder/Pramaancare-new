
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { createWeb3FormData } from "@/lib/web3form";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Loader2, PartyPopper } from "lucide-react";

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button 
        type="submit" 
        size="lg"
        disabled={isSubmitting} 
        className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full px-8"
        aria-label="Submit Form"
    >
      {isSubmitting ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        "Submit"
      )}
    </Button>
  );
}

const services = [
  "Individual Therapy",
  "Couples Counseling",
  "Family Therapy",
  "Teen Counseling",
  "Psychological Assessment",
  "Corporate EAP",
];

export function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormValues | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
    },
  });

  const onFormSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      const web3FormData = createWeb3FormData(data, {
        formType: 'contact',
        submissionTime: new Date().toISOString(),
        source: 'contact-form'
      });

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: web3FormData,
      });

      const result = await response.json();

      if (result.success) {
        setFormData(data);
        setFormSubmitted(true);
        toast({
          title: "Success!",
          description: "Your message has been sent successfully. We will contact you shortly.",
        });
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormSubmitted(false);
    setFormData(null);
    form.reset();
  };

  if (formSubmitted && formData) {
    return (
      <Alert variant="default" className="bg-card">
        <PartyPopper className="h-4 w-4" />
        <AlertTitle>Thank you!</AlertTitle>
        <AlertDescription>
          Your appointment request has been sent. <strong>We will contact you shortly</strong> to confirm your appointment details.
          <div className="flex justify-center mt-4">
            <Button onClick={resetForm} variant="outline">
              Submit Another Request
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-4"
            noValidate
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                    <Input {...field} placeholder="First Name" required className="h-12 rounded-full" autoComplete="off" list="autocompleteOff" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                <FormItem>
                    <FormControl>
                    <Input {...field} placeholder="Last Name" required className="h-12 rounded-full" autoComplete="off" list="autocompleteOff" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                  <FormItem>
                      <FormControl>
                      <Input {...field} placeholder="Email" type="email" required className="h-12 rounded-full" autoComplete="off" list="autocompleteOff" />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                  <FormItem>
                      <FormControl>
                      <Input {...field} placeholder="Phone Number" type="tel" required className="h-12 rounded-full" autoComplete="off" list="autocompleteOff" />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />
            </div>
            
            <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="h-12 rounded-full">
                            <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {services.map(service => (
                            <SelectItem key={service} value={service}>{service}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
            
            <div className="flex justify-end">
              <SubmitButton isSubmitting={isSubmitting} />
            </div>
        </form>
      </Form>
    </div>
  );
}
