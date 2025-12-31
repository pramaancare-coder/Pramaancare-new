"use client";

import { useActionState, useEffect, useRef, useState, startTransition } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { consultationFormSchema, type ConsultationFormValues } from "@/lib/schemas";
import { handleContactForm } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, PartyPopper, Calendar, Video, MapPin } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button 
        type="submit" 
        size="lg"
        disabled={pending} 
        className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full px-8 w-full"
        aria-label="Submit Form"
    >
      {pending ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        "Schedule Consultation"
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

const consultationTypes = [
  { value: "in-person", label: "In-Person Consultation", icon: MapPin },
  { value: "online", label: "Online Consultation", icon: Video },
];

interface ConsultationFormProps {
  trigger?: React.ReactNode;
  triggerClassName?: string;
  variant?: 'popup' | 'inline';
}

export function ConsultationForm({ trigger, triggerClassName, variant = 'popup' }: ConsultationFormProps) {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const [formState, formAction] = useActionState(handleContactForm, {
    success: false,
    message: "",
  });

  const form = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      consultationType: "",
    },
  });

  useEffect(() => {
    if (formState.message) {
      if (formState.success) {
        // Don't show toast for success, we'll show it in the dialog
        // Keep dialog open to show success message
        setIsOpen(true);
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
  }, [formState, toast]);

  const onFormSubmit = (data: ConsultationFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, String(value));
      }
    });
    
    // Use startTransition to avoid the warning
    startTransition(() => {
      formAction(formData);
    });
  };

  const resetForm = () => {
    // Reload page to reset all form state
    window.location.reload();
  };

  // Popup variant - render success or form content within Dialog
  if (variant === 'popup') {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild className={triggerClassName}>
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          {formState.success ? (
            // Success state
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <PartyPopper className="h-5 w-5 text-primary" />
                  Consultation Scheduled!
                </DialogTitle>
              </DialogHeader>
              <Alert className="bg-card">
                <Calendar className="h-4 w-4" />
                <AlertTitle>Request Received Successfully</AlertTitle>
                <AlertDescription>
                  <p className="text-sm lg:text-base xl:text-lg">
                    Your consultation request has been submitted. <strong>We will contact you shortly</strong> to confirm your preferred time and consultation details.
                  </p>
                </AlertDescription>
              </Alert>
              <div className="flex justify-center mt-4">
                <Button onClick={resetForm} variant="outline">
                  Schedule Another Consultation
                </Button>
              </div>
            </>
          ) : (
            // Form state
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Schedule Your Consultation
                </DialogTitle>
                <DialogDescription>
                  Choose your preferred consultation method and we'll contact you shortly to confirm the details.
                </DialogDescription>
              </DialogHeader>

              <div className="w-full">
                <Form {...form}>
                  <form
                      ref={formRef}
                      onSubmit={form.handleSubmit(onFormSubmit)}
                      className="space-y-4"
                      noValidate
                  >
                    {/* First Name and Last Name */}
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

                    {/* Consultation Type Selection */}
                    <FormField
                        control={form.control}
                        name="consultationType"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium">Consultation Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger className="h-12 rounded-full">
                                    <SelectValue placeholder="Choose consultation type" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {consultationTypes.map(type => {
                                    const IconComponent = type.icon;
                                    return (
                                    <SelectItem key={type.value} value={type.value}>
                                        <div className="flex items-center gap-2">
                                        <IconComponent className="h-4 w-4" />
                                        {type.label}
                                        </div>
                                    </SelectItem>
                                    );
                                })}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    
                    <div className="flex justify-center mt-6">
                      <SubmitButton />
                    </div>
                </form>
              </Form>
            </div>
          </>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  // Inline variant - show success or form
  if (formState.success) {
    return (
      <div className="space-y-6">
        <Alert className="bg-card">
          <Calendar className="h-4 w-4" />
          <AlertTitle className="flex items-center gap-2">
            <PartyPopper className="h-5 w-5 text-primary" />
            Consultation Scheduled!
          </AlertTitle>
          <AlertDescription>
            <p className="text-sm lg:text-base xl:text-lg">
              Your consultation request has been submitted. <strong>We will contact you shortly</strong> to confirm your preferred time and consultation details.
            </p>
          </AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <Button onClick={resetForm} variant="outline">
            Schedule Another Consultation
          </Button>
        </div>
      </div>
    );
  }

    return (
      <div className="w-full">
        <Form {...form}>
          <form
              ref={formRef}
              onSubmit={form.handleSubmit(onFormSubmit)}
              className="space-y-6"
              noValidate
          >
            {/* First Name and Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-sm font-medium">First Name</FormLabel>
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
                    <FormLabel className="text-sm font-medium">Last Name</FormLabel>
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
                      <FormLabel className="text-sm font-medium">Email</FormLabel>
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
                      <FormLabel className="text-sm font-medium">Phone Number</FormLabel>
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
                    <FormLabel className="text-sm font-medium">Service</FormLabel>
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

            {/* Consultation Type Selection */}
            <FormField
                control={form.control}
                name="consultationType"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-sm font-medium">Consultation Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="h-12 rounded-full">
                            <SelectValue placeholder="Choose consultation type" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {consultationTypes.map(type => {
                            const IconComponent = type.icon;
                            return (
                            <SelectItem key={type.value} value={type.value}>
                                <div className="flex items-center gap-2">
                                <IconComponent className="h-4 w-4" />
                                {type.label}
                                </div>
                            </SelectItem>
                            );
                        })}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />
            
            <div className="flex justify-center mt-6">
              <SubmitButton />
            </div>
          </form>
        </Form>
      </div>
    );
}

// Backward compatibility alias
export const ConsultationFormPopup = ConsultationForm;
