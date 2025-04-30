import { useState, useCallback } from "react";

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback(
    (text: string) => {
      // Stop any ongoing speech
      if (speech) {
        window.speechSynthesis.cancel();
      }

      // Create new speech instance
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0; // Speed of speech
      utterance.pitch = 1.0; // Pitch of speech
      utterance.volume = 1.0; // Volume of speech

      // Set up event listeners
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      // Start speaking
      window.speechSynthesis.speak(utterance);
      setSpeech(utterance);
    },
    [speech]
  );

  const stopSpeaking = useCallback(() => {
    if (speech) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [speech]);

  return {
    isSpeaking,
    speak,
    stopSpeaking,
  };
};
