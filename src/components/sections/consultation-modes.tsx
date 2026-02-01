"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { consultationFormSchema, type ConsultationFormValues } from "@/lib/schemas";
import { createWeb3FormData } from "@/lib/web3form";
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

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button 
        type="submit" 
        size="lg"
        disabled={isSubmitting} 
        className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full px-8 w-full"
        aria-label="Submit Form"
    >
      {isSubmitting ? (
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
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<ConsultationFormValues | null>(null);

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

  const onFormSubmit = async (data: ConsultationFormValues) => {
    setIsSubmitting(true);
    
    try {
      const web3FormData = createWeb3FormData(data, {
        formType: 'consultation',
        submissionTime: new Date().toISOString(),
        source: variant === 'popup' ? 'consultation-popup' : 'consultation-inline'
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
          description: "Your consultation request has been sent successfully. We will contact you shortly.",
        });
        if (variant === 'popup') {
          setIsOpen(true);
        }
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

  // Popup variant - render success or form content within Dialog
  if (variant === 'popup') {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild className={triggerClassName}>
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          {formSubmitted && formData ? (
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
                  <div className="flex justify-center mt-4">
                    <Button onClick={resetForm} variant="outline">
                      Schedule Another Consultation
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
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
                      <SubmitButton isSubmitting={isSubmitting} />
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
  if (formSubmitted && formData) {
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
              <SubmitButton isSubmitting={isSubmitting} />
            </div>
          </form>
        </Form>
      </div>
    );
}

// Backward compatibility alias
export const ConsultationFormPopup = ConsultationForm;
