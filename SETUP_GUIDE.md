# Gemini AI + Email Integration Setup Guide

## Overview
Your contact form is now integrated with Google Gemini AI. When users submit the form, the AI processes the information and sends an email to your inbox.

## Setup Steps

### 1. Configure Email (Gmail)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Create a new app password for "Mail"
   - Copy the 16-character password

3. **Update `.env` file**:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
EMAIL_FROM=your-email@gmail.com
```

### 2. Gemini API (Already Configured)
Your API key is already set in `.env`:
```env
GOOGLE_GENAI_API_KEY=AIzaSyAuI3EM_J2h9FWhVy6fKxdffSrZV5QfulY
```

### 3. Change Email Recipient
In `src/app/actions.ts` line 73, update the email address:
```typescript
await sendMail({
  to: 'your-email@gmail.com', // Change this to your email
  subject: `New contact form submission${isUrgent ? ' (URGENT)' : ''}`,
  // ...
});
```

## How It Works

1. **User fills form** → Clicks "OK"
2. **Form validation** → Checks all required fields
3. **AI Processing** → Gemini AI creates a summary and detects urgency
4. **Email sent** → You receive an email with:
   - AI-generated summary
   - All form data
   - URGENT tag (if applicable)

## Testing

1. Fill out the contact form on your website
2. Click submit
3. Check your inbox for the email

## Troubleshooting

**Email not sending?**
- Verify Gmail app password is correct
- Check SMTP settings in `.env`
- Look at server logs for errors

**AI not working?**
- Verify API key is valid
- Check API quota at: https://console.cloud.google.com/
- Falls back to local summary if API fails

## Email Format

Subject: `New contact form submission (URGENT)`

Body:
```
Summary:
[AI-generated summary of the request]

Form data:
firstName: John
lastName: Doe
email: john@example.com
phone: 1234567890
service: Individual Counselling
message: I need help with anxiety
```

## Security Notes

- Never commit `.env` file to git
- Keep your API key and email password secure
- The `.env` file is already in `.gitignore`
