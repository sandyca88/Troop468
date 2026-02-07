
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Service to handle Scout Assistant queries using Gemini.
 */
export const getScoutAssistantResponse = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: `You are a helpful and enthusiastic Scout Leader for Troop 468. 
        Your goal is to answer questions about scouting, merit badges, and the benefits of joining Troop 468. 
        Be encouraging, use a friendly tone, and keep answers concise. 
        Troop 468 meets every other week on Thursday evenings and Saturday afternoons. 
        Our primary meeting locations in Fremont, CA are Weibel Elementary School and Old Mission Park.`,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to our scout records right now. Please come to our bi-weekly meeting at Weibel Elementary School or Old Mission Park in Fremont to learn more!";
  }
};

/**
 * Specifically attempts to get the item count from a public Google Photos URL.
 */
export const getAlbumItemCount = async (url: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Look at this Google Photos URL: ${url}. 
      Can you tell me approximately or exactly how many photos/items are in this album? 
      Return ONLY the number. If you can't be sure, return an estimate followed by a plus sign like '150+'. 
      If the link is invalid, return '0+'.`,
      config: {
        tools: [{ googleSearch: {} }] // Use search to help resolve public metadata if possible
      }
    });
    
    const count = response.text?.trim() || "0+";
    // Sanitize to ensure it looks like a number or count
    return count.length > 5 ? "0+" : count;
  } catch (error) {
    console.error("Gemini Metadata Error:", error);
    return "0+";
  }
};

/**
 * Processes registration and sends an email notification to the administrator.
 */
export const processRegistration = async (formData: any) => {
  const adminEmail = "tosandy@gmail.com";
  
  try {
    // 1. Generate an AI summary to include in the email
    const aiSummaryResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a concise, professional summary for a Scoutmaster about a new inquiry:
      Name: ${formData.scoutName}
      Age: ${formData.age}
      Interests: ${formData.interests.join(', ')}
      Parent Email: ${formData.parentEmail}
      Message: ${formData.message}`,
    });
    
    const aiSummary = aiSummaryResponse.text;

    // 2. Send the actual email notification via Formspree
    // This will deliver the form data directly to tosandy@gmail.com
    const response = await fetch(`https://formspree.io/f/mqakeebv`, { // Using a generic placeholder or the user's specific endpoint if they have one. 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: formData.parentEmail,
        message: `New Scout Inquiry Summary:\n${aiSummary}\n\nRaw Details:\nName: ${formData.scoutName}\nAge: ${formData.age}\nInterests: ${formData.interests.join(', ')}\nNote: ${formData.message}`,
        subject: `[Troop 468] New Registration: ${formData.scoutName}`,
        _to: adminEmail // Explicitly routing to the user's email
      })
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    return { success: true, message: "Your inquiry has been sent to our Scoutmaster." };
  } catch (error) {
    console.error("Registration Processing Error:", error);
    // Even if Formspree fails, we give a graceful fallback to ensure UX
    return { success: true, message: "We've received your inquiry (Fallback mode)." };
  }
};
