import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lightbulb, RotateCcw, ArrowRight } from "lucide-react";

interface GameControlsProps {
  onGuess: (guess: string) => void;
  onHint: () => void;
  onReset: () => void;
  inputValue: string;
  setInputValue: (val: string) => void;
  hintsUsed: number;
  isGameWon: boolean;
  onNextLevel: () => void;
}

export function GameControls({ 
  onGuess, 
  onHint, 
  onReset, 
  inputValue, 
  setInputValue,
  hintsUsed,
  isGameWon,
  onNextLevel
}: GameControlsProps) {
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onGuess(inputValue);
    }
  };

  if (isGameWon) {
    return (
      <div className="flex flex-col items-center gap-4 mt-4 sm:mt-6 md:mt-8 animate-in fade-in slide-in-from-bottom-4 w-full max-w-md px-4">
        <div className="text-xl sm:text-2xl font-bold text-cyan-400 mb-2">
          Chain Completed! 🎉
        </div>
        <Button 
          size="lg" 
          onClick={onNextLevel}
          className="w-full sm:w-auto bg-cyan-500 text-black hover:bg-cyan-400 shadow-lg shadow-cyan-500/25"
        >
          Next Puzzle <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mt-4 sm:mt-6 md:mt-8 space-y-3 sm:space-y-4 px-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your guess..."
          className="h-10 sm:h-12 text-base sm:text-lg bg-slate-800/50 border-slate-700 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all"
        />
        <Button 
          type="submit" 
          size="lg"
          disabled={!inputValue.trim()}
          className="h-10 sm:h-12 px-4 sm:px-6 font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-lg shadow-purple-500/25 transition-all"
        >
          Guess
        </Button>
      </form>

      <div className="flex justify-between items-center px-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onReset}
          className="text-slate-400 hover:text-white text-xs sm:text-sm"
        >
          <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Reset
        </Button>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onHint}
          className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10 text-xs sm:text-sm"
        >
          <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Hint ({hintsUsed})
        </Button>
      </div>
    </div>
  );
}
