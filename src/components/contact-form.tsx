
"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { handleContactForm, type FormState } from "@/app/actions";
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
import { Loader2, PartyPopper, AlertTriangle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
        type="submit" 
        size="lg"
        disabled={pending} 
        className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full px-8"
        aria-label="Submit Form"
    >
      {pending ? (
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
  const formRef = useRef<HTMLFormElement>(null);

  const [formState, formAction] = useActionState(handleContactForm, {
    success: false,
    message: "",
  });

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

  useEffect(() => {
    if (formState.message) {
      if (formState.success) {
        toast({
          title: "Success!",
          description: formState.message,
        });
        form.reset();
        formRef.current?.reset();
      } else {
         // Only show toast for general server errors, not validation errors
        if (formState.message.startsWith("Invalid form data")) return;
        toast({
          title: "Error",
          description: formState.message,
          variant: "destructive",
        });
      }
    }
  }, [formState, toast, form]);

  const onFormSubmit = (data: ContactFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, String(value));
      }
    });
    formAction(formData);
  };
  
  if (formState.success) {
    return (
      <Alert variant={formState.isUrgent ? 'destructive' : 'default'} className="bg-card">
        <PartyPopper className="h-4 w-4" />
        <AlertTitle>Thank you!</AlertTitle>
        <AlertDescription>
          Your appointment request has been sent. <strong>We will contact you shortly</strong> to confirm your appointment details.
          <div className="mt-4 text-sm bg-secondary/50 p-3 rounded-md">
            <p className="font-bold text-sm lg:text-base xl:text-lg">AI Summary of your request:</p>
            <p className="italic text-sm lg:text-base xl:text-lg">"{formState.summary}"</p>
            {formState.isUrgent && (
              <p className="mt-2 font-bold text-destructive flex items-center gap-2 text-sm lg:text-base xl:text-lg">
                <AlertTriangle className="h-4 w-4" /> This has been flagged as urgent.
              </p>
            )}
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
            ref={formRef}
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
                    <Input {...field} placeholder="First Name" required className="h-12 rounded-full" />
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
                    <Input {...field} placeholder="Last Name" required className="h-12 rounded-full" />
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
                      <Input {...field} placeholder="Email" type="email" required className="h-12 rounded-full" />
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
                      <Input {...field} placeholder="Phone Number" type="tel" required className="h-12 rounded-full" />
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
              <SubmitButton />
            </div>
        </form>
      </Form>
    </div>
  );
}
