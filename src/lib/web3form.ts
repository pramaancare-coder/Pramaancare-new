import useForm from "@web3forms/react";

const WEB3FORMS_ACCESS_KEY = "f2d6b307-18c0-4f96-8579-b728dd911bf9";

export interface Web3FormConfig {
  accessKey: string;
  subject?: string; 
  fromName?: string;
  emailTo?: string;
  replyTo?: string;
  redirect?: string;
  successMessage?: string;
  errorMessage?: string;
}

export const defaultWeb3FormConfig: Web3FormConfig = {
  accessKey: WEB3FORMS_ACCESS_KEY,
  emailTo: "pramaancare@gmail.com",
  fromName: "Pramaancare Website",
  subject: "New Contact Form Submission",
  successMessage: "Thank you! Your message has been sent successfully. We will contact you shortly.",
  errorMessage: "Oops! Something went wrong while submitting the form."
};

export function useWeb3Form(config: Partial<Web3FormConfig> = {}) {
  const finalConfig = { ...defaultWeb3FormConfig, ...config };
  
  return useForm({
    access_key: finalConfig.accessKey,
    onSuccess: (message: string, data: any) => {
      console.log("Web3Form success:", message, data);
    },
    onError: (message: string, data: any) => {
      console.error("Web3Form error:", message, data);
    }
  });
}

export function createWeb3FormData(formData: Record<string, any>, additionalData?: Record<string, any>) {
  const web3FormData = new FormData();
  
  // Add form fields
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      web3FormData.append(key, String(value));
    }
  });
  
  // Add additional data
  if (additionalData) {
    Object.entries(additionalData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        web3FormData.append(key, String(value));
      }
    });
  }
  
  // Add access key
  web3FormData.append('access_key', defaultWeb3FormConfig.accessKey);
  
  // Add email configuration
  if (defaultWeb3FormConfig.emailTo) {
    web3FormData.append('email_to', defaultWeb3FormConfig.emailTo);
  }
  
  if (defaultWeb3FormConfig.subject) {
    web3FormData.append('subject', defaultWeb3FormConfig.subject);
  }
  
  if (defaultWeb3FormConfig.fromName) {
    web3FormData.append('from_name', defaultWeb3FormConfig.fromName);
  }
  
  return web3FormData;
}
