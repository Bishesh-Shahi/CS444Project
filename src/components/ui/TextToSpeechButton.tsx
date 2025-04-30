import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { cn } from "@/lib/utils";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

interface TextToSpeechButtonProps {
  text: string;
  className?: string;
}

export const TextToSpeechButton = ({
  text,
  className,
}: TextToSpeechButtonProps) => {
  const { isSpeaking, speak, stopSpeaking } = useTextToSpeech();

  const handleClick = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(text);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "p-2 rounded-full transition-colors duration-200",
        "hover:bg-gray-100 dark:hover:bg-gray-800",
        "focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
      aria-label={isSpeaking ? "Stop reading" : "Read aloud"}
    >
      {isSpeaking ? (
        <FaVolumeMute className="w-5 h-5 text-primary" />
      ) : (
        <FaVolumeUp className="w-5 h-5 text-primary" />
      )}
    </button>
  );
};
