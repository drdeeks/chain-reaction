import { cn } from "@/lib/utils";
import { Lock, Check, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ChainNodeProps {
  word: string;
  state: "completed" | "active" | "locked";
  index: number;
  total: number;
  onGuess?: (guess: string) => void;
  currentInput?: string;
  hint?: string;
  showHint?: boolean;
}

export function ChainNode({ 
  word, 
  state, 
  index, 
  total, 
  currentInput = "",
  showHint = false,
  hint 
}: ChainNodeProps) {
  const isStart = index === 0;
  const isEnd = index === total - 1;

  // Determine the display text based on state
  const displayText = () => {
    if (state === "completed") return word;
    if (state === "active") return currentInput || word[0] + "_".repeat(word.length - 1);
    return ""; // Locked shows icon
  };

  return (
    <div className="relative flex flex-col items-center group">
      {/* Connector Line (above) */}
      {index > 0 && (
        <div className={cn(
          "w-1 h-8 mb-2 transition-colors duration-500 rounded-full",
          state === "completed" || state === "active" ? "bg-primary" : "bg-muted"
        )} />
      )}

      {/* Node Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={cn(
          "relative flex items-center justify-center w-64 h-16 rounded-xl border-2 transition-all duration-300 shadow-lg",
          state === "completed" && "bg-primary/20 border-primary shadow-primary/20 text-primary-foreground",
          state === "active" && "bg-card border-accent shadow-accent/20 animate-pulse-ring",
          state === "locked" && "bg-muted/50 border-muted text-muted-foreground",
          (isStart || isEnd) && "font-bold tracking-wider uppercase bg-accent/10 border-accent text-accent"
        )}
      >
        {state === "locked" ? (
          <Lock className="w-5 h-5 opacity-50" />
        ) : (
          <div className="flex items-center gap-2">
            {state === "completed" && !isStart && !isEnd && (
              <Check className="w-5 h-5 text-green-400" />
            )}
            <span className={cn(
              "text-lg font-display",
              state === "active" ? "text-foreground" : "text-inherit"
            )}>
              {displayText()}
            </span>
          </div>
        )}

        {/* Hint Bubble */}
        {state === "active" && showHint && hint && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-full ml-4 p-3 bg-card border border-border rounded-lg shadow-xl w-48 z-10 hidden md:block"
          >
            <div className="flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground italic">{hint}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {/* Mobile Hint (below) */}
      {state === "active" && showHint && hint && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-xs text-muted-foreground italic md:hidden"
        >
          Hint: {hint}
        </motion.p>
      )}
    </div>
  );
}
