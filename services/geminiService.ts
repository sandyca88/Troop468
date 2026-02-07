
/**
 * Processes registration by opening the user's local email client 
 * pre-filled with the inquiry details for tosandy@gmail.com.
 * This uses a more robust approach to satisfy browser security policies 
 * by creating a temporary anchor element.
 */
export const processRegistration = (formData: any) => {
  const adminEmail = "tosandy@gmail.com";
  
  const subject = `[Troop 468] New Scout Inquiry: ${formData.scoutName}`;
  const body = `Hello Troop 468 Leaders,

I am interested in joining the troop! Here are my details:

Scout Name: ${formData.scoutName}
Age / Grade: ${formData.age}
Parent Email: ${formData.parentEmail}
Interests: ${formData.interests && formData.interests.length > 0 ? formData.interests.join(', ') : 'Not specified'}

Additional Note:
${formData.message || 'None provided'}

Looking forward to hearing from you!`;

  try {
    const mailtoUrl = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Create a temporary anchor element to trigger the mailto
    // This is generally more reliable than window.location.href in modern browsers
    // as it explicitly simulates a user navigation.
    const tempLink = document.createElement('a');
    tempLink.href = mailtoUrl;
    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);
    tempLink.click();
    
    // Clean up
    setTimeout(() => {
      if (document.body.contains(tempLink)) {
        document.body.removeChild(tempLink);
      }
    }, 500);

    return { 
      success: true, 
      message: "Success" 
    };
  } catch (error) {
    console.error("Registration Processing Error:", error);
    // Fallback to window.location if the anchor method fails
    try {
      window.location.href = `mailto:${adminEmail}`;
      return { success: true, message: "Fallback triggered" };
    } catch (innerError) {
      return { 
        success: false, 
        message: "We couldn't open your email app. Please email tosandy@gmail.com directly." 
      };
    }
  }
};

/**
 * Placeholder for manual count updates.
 */
export const getAlbumItemCount = async (url: string): Promise<string> => {
  return "0+";
};
