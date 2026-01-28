
"use server";

import { contactFormSchema, consultationFormSchema } from "@/lib/schemas";
import { summarizeContactForm } from "@/ai/flows/summarize-contact-form";
import { sendMail } from "@/lib/email";

export type FormState = {
  success: boolean;
  message: string;
  summary?: string;
  isUrgent?: boolean;
};

export async function handleContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const values = {
    ...Object.fromEntries(formData.entries()),
  };

  // Try consultation form schema first (has more fields), then fall back to contact form schema
  let validatedFields = consultationFormSchema.safeParse({
    ...values,
    date: new Date(values.date as string),
  });

  let isConsultationForm = true;

  if (!validatedFields.success) {
    // Try with contact form schema if consultation form validation fails
    const contactValidation = contactFormSchema.safeParse({
      ...values,
      date: new Date(values.date as string),
    });
    
    if (contactValidation.success) {
      validatedFields = contactValidation as any;
      isConsultationForm = false;
    }
  }

  if (!validatedFields.success) {
    const errorMessages = validatedFields.error.issues.map(issue => issue.message).join(', ');
    return {
      success: false,
      message: `Invalid form data: ${errorMessages}. Please check your inputs.`,
    };
  }
  
  const formRecord: Record<string, string> = {};
  for(const key in validatedFields.data) {
    const value = (validatedFields.data as any)[key];
    if (value) {
      if (key === 'date' && value instanceof Date) {
        formRecord[key] = value.toLocaleDateString();
      } else {
        formRecord[key] = String(value);
      }
    }
  }

  try {
    // Return success immediately to user
    const successMessage = isConsultationForm
      ? 'Your consultation request has been received. We will contact you shortly to confirm your appointment!'
      : 'We will contact you shortly!';

    // Process AI summary and email in the background (non-blocking)
    // This prevents the user from waiting for these slow operations
    (async () => {
      try {
        // Create AI summary of the submission
        const { summary, isUrgent } = await summarizeContactForm(validatedFields.data as any);

        // Prepare email body
        const lines: string[] = [];
        lines.push(`Summary:\n${summary}\n`);
        lines.push(`Form data:`);
        for (const k in formRecord) {
          lines.push(`${k}: ${formRecord[k]}`);
        }

        // Send email to the requested address
        await sendMail({
          to: 'pramaancare@gmail.com',
          subject: `New contact form submission${isUrgent ? ' (URGENT)' : ''}`,
          text: lines.join('\n'),
          html: `<pre>${lines.map(l => l.replace(/</g,'&lt;')).join('<br/>')}</pre>`,
        });
      } catch (bgError) {
        console.error('Background processing error (AI/Email):', bgError);
        // Log but don't fail - user already got success response
      }
    })();

    return {
      success: true,
      message: successMessage,
    };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
}
