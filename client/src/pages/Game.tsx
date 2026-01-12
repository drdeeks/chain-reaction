import { useState, useEffect } from "react";
import { usePuzzles } from "@/hooks/use-puzzles";
import { ChainNode } from "@/components/ChainNode";
import { GameControls } from "@/components/GameControls";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import canvasConfetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

export default function Game() {
  const { data: puzzles, isLoading, error } = usePuzzles();
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(1); // 0 is start, length-1 is end
  const [inputValue, setInputValue] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const { toast } = useToast();

  const puzzle = puzzles?.[currentPuzzleIndex];
  const isGameWon = puzzle ? currentStep >= puzzle.chain.length - 1 : false;

  useEffect(() => {
    // Reset state when puzzle changes
    setCurrentStep(1);
    setInputValue("");
    setShowHint(false);
    setHintsUsed(0);
  }, [currentPuzzleIndex]);

  useEffect(() => {
    if (isGameWon) {
      canvasConfetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A78BFA', '#2DD4BF', '#F472B6']
      });
    }
  }, [isGameWon]);

  const handleGuess = (guess: string) => {
    if (!puzzle) return;

    const targetWord = puzzle.chain[currentStep];
    if (guess.toLowerCase().trim() === targetWord.toLowerCase()) {
      // Correct!
      toast({
        title: "Correct!",
        description: "Moving to the next link in the chain.",
        className: "bg-green-500/10 border-green-500/20 text-green-500",
      });
      setCurrentStep(prev => prev + 1);
      setInputValue("");
      setShowHint(false);
    } else {
      // Incorrect
      toast({
        variant: "destructive",
        title: "Not quite...",
        description: "Try again! Think about compound words.",
      });
      // Shake effect could be added here
    }
  };

  const handleNextLevel = () => {
    if (puzzles && currentPuzzleIndex < puzzles.length - 1) {
      setCurrentPuzzleIndex(prev => prev + 1);
    } else {
      // Loop back or show end screen (looping for now)
      setCurrentPuzzleIndex(0);
      toast({
        title: "All puzzles completed!",
        description: "Restarting from the first puzzle.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 space-y-8">
        <Skeleton className="h-12 w-64 rounded-xl" />
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-64 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || !puzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive">
        Error loading game data.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-background to-background text-foreground flex flex-col items-center py-12 px-4">
      
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12 space-y-4"
      >
        <Badge variant="outline" className="mb-4 border-primary/50 text-primary bg-primary/10 px-4 py-1">
          {puzzle.difficulty} • Level {currentPuzzleIndex + 1}
        </Badge>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-glow bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
          Chain Reaction
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Find the missing links connecting the words together.
        </p>
      </motion.div>

      {/* Game Chain */}
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto mb-12">
        <AnimatePresence mode="wait">
          {puzzle.chain.map((word, idx) => {
            let state: "completed" | "active" | "locked" = "locked";
            if (idx === 0 || idx === puzzle.chain.length - 1) state = "completed"; // Start/End always visible
            else if (idx < currentStep) state = "completed";
            else if (idx === currentStep) state = "active";
            
            // Only show hints for intermediate hidden words
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
      </div>

      {/* Controls */}
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
    </div>
  );
}
