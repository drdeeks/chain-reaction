import { useState, useEffect, lazy, Suspense } from "react";
import { usePuzzles } from "@/hooks/use-puzzles";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import canvasConfetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

const ChainNode = lazy(() => import("@/components/ChainNode").then(m => ({ default: m.ChainNode })));
const GameControls = lazy(() => import("@/components/GameControls").then(m => ({ default: m.GameControls })));

export default function Game() {
  const { data: puzzles, isLoading, error } = usePuzzles();
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const { toast } = useToast();

  const puzzle = puzzles?.[currentPuzzleIndex];
  const isGameWon = puzzle ? currentStep >= puzzle.chain.length - 1 : false;

  useEffect(() => {
    setCurrentStep(1);
    setInputValue("");
    setShowHint(false);
    setHintsUsed(0);
  }, [currentPuzzleIndex]);

  useEffect(() => {
    if (isGameWon) {
      canvasConfetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#A78BFA', '#2DD4BF', '#F472B6']
      });
    }
  }, [isGameWon]);

  const handleGuess = (guess: string) => {
    if (!puzzle) return;

    const targetWord = puzzle.chain[currentStep];
    if (guess.toLowerCase().trim() === targetWord.toLowerCase()) {
      toast({
        title: "Correct!",
        description: "Moving to next link",
        className: "bg-green-500/10 border-green-500/20 text-green-500",
      });
      setCurrentStep(prev => prev + 1);
      setInputValue("");
      setShowHint(false);
    } else {
      toast({
        variant: "destructive",
        title: "Not quite...",
        description: "Try again!",
      });
    }
  };

  const handleNextLevel = () => {
    if (puzzles && currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(prev => prev + 1);
    } else {
      setCurrentPuzzleIndex(0);
      toast({
        title: "All puzzles completed!",
        description: "Restarting from first puzzle",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading puzzles...</div>
      </div>
    );
  }

  if (error || !puzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Error loading game
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white flex flex-col items-center py-4 sm:py-8 md:py-12 px-4 safe-area-inset">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6 sm:mb-8 md:mb-12 space-y-2 sm:space-y-4"
      >
        <Badge variant="outline" className="mb-2 sm:mb-4 border-purple-500/50 text-purple-400 bg-purple-500/10 px-3 py-1 text-xs sm:text-sm">
          {puzzle.difficulty} • Level {currentPuzzleIndex + 1}
        </Badge>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          Chain Reaction
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto px-4">
          Find the missing links connecting the words
        </p>
      </motion.div>

      <div className="flex flex-col items-center w-full max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-12">
        <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
          <AnimatePresence mode="wait">
            {puzzle.chain.map((word, idx) => {
              let state: "completed" | "active" | "locked" = "locked";
              if (idx === 0 || idx === puzzle.chain.length - 1) state = "completed";
              else if (idx < currentStep) state = "completed";
              else if (idx === currentStep) state = "active";
              
              const hint = (idx > 0 && idx < puzzle.chain.length - 1) ? puzzle.hints[idx - 1] : undefined;

              return (
                <ChainNode
                  key={`${puzzle.id}-${idx}`}
                  word={word}
                  state={state}
                  index={idx}
                  total={puzzle.chain.length}
                  currentInput={idx === currentStep ? inputValue : undefined}
                  hint={hint}
                  showHint={showHint}
                />
              );
            })}
          </AnimatePresence>
        </Suspense>
      </div>

      <Suspense fallback={<div className="animate-pulse">Loading controls...</div>}>
        <GameControls
          inputValue={inputValue}
          setInputValue={setInputValue}
          onGuess={handleGuess}
          onHint={() => {
            setShowHint(true);
            setHintsUsed(prev => prev + 1);
          }}
          onReset={() => {
            setCurrentStep(1);
            setInputValue("");
          }}
          hintsUsed={hintsUsed}
          isGameWon={isGameWon}
          onNextLevel={handleNextLevel}
        />
      </Suspense>
    </div>
  );
}
