"use server";

// Note: import genkit dynamically to avoid TS static import issues in environments
// where the genkit package or types may not be present during typecheck.

type SummaryResult = {
  summary: string;
  isUrgent: boolean;
};

const localSummarize = (values: Record<string, unknown>): SummaryResult => {
  const parts: string[] = [];
  if (values.firstName || values.lastName) {
    parts.push(`From: ${values.firstName ?? ""} ${values.lastName ?? ""}`.trim());
  }
  if (values.email) parts.push(`Email: ${values.email}`);
  if (values.phone) parts.push(`Phone: ${values.phone}`);
  if (values.service) parts.push(`Service: ${values.service}`);
  if (values.message) parts.push(`Message: ${values.message}`);

  const text = parts.join(" | ");
  const urgentKeywords = ["urgent", "emergency", "asap", "immediately", "severe"];
  const hay = JSON.stringify(values).toLowerCase();
  const isUrgent = urgentKeywords.some(k => hay.includes(k));

  const summary = text || "No details provided.";
  return { summary, isUrgent };
};

export async function summarizeContactForm(values: Record<string, unknown>): Promise<SummaryResult> {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  
  if (!apiKey) {
    return localSummarize(values);
  }

  try {
    const prompt = `Please produce a 1-2 sentence friendly summary of the following contact/consultation request.
Also determine if this indicates an urgent or emergency situation.
Return a JSON object with keys: summary (string) and urgent (boolean).

INPUT:
${JSON.stringify(values, null, 2)}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      return localSummarize(values);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          summary: parsed.summary || text,
          isUrgent: !!parsed.urgent,
        };
      } catch {
        // fallthrough
      }
    }

    const lower = text.toLowerCase();
    const urgent = /urgent|emergency|asap|immediately|severe/.test(lower);
    return { summary: text.trim() || localSummarize(values).summary, isUrgent: urgent };
  } catch (e) {
    return localSummarize(values);
  }
}
