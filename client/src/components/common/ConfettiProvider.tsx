import { useConfetti } from "@/hooks/useConfetti";
import ReactConfetti from "react-confetti";

const ConfettiProvider = () => {
  const confetti = useConfetti();
  if (!confetti.isOpen) return null;

  return (
    <ReactConfetti className="pointer-events-none z-[100]" numberOfPieces={500} recycle={false} onConfettiComplete={() => confetti.onClose()} />
  );
};

export default ConfettiProvider;
