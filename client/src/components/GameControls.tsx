import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lightbulb, RotateCcw, ArrowRight } from "lucide-react";
import { useState } from "react";

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
      <div className="flex flex-col items-center gap-4 mt-8 animate-in fade-in slide-in-from-bottom-4">
        <div className="text-2xl font-display font-bold text-accent mb-2">
          Chain Completed! 🎉
        </div>
        <Button 
          size="lg" 
          onClick={onNextLevel}
          className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25"
        >
          Next Puzzle <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mt-8 space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your guess..."
          className="h-12 text-lg bg-card/50 border-white/10 focus:border-accent focus:ring-accent/20 transition-all"
        />
        <Button 
          type="submit" 
          size="lg"
          disabled={!inputValue.trim()}
          className="h-12 px-6 font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg shadow-primary/25 transition-all"
        >
          Guess
        </Button>
      </form>

      <div className="flex justify-between items-center px-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onHint}
          className="text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10"
        >
          <Lightbulb className="w-4 h-4 mr-2" />
          Hint ({hintsUsed})
        </Button>
      </div>
    </div>
  );
}
