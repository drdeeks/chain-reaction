import { cn } from "@/lib/utils";
import { Lock, Check, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

interface ChainNodeProps {
  word: string;
  state: "completed" | "active" | "locked";
  index: number;
  total: number;
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

  const displayText = () => {
    if (state === "completed") return word;
    if (state === "active") return currentInput || word[0] + "_".repeat(word.length - 1);
    return "";
  };

  return (
    <div className="relative flex flex-col items-center w-full">
      {index > 0 && (
        <div className={cn(
          "w-0.5 h-4 sm:h-6 md:h-8 mb-1 sm:mb-2 transition-colors duration-500 rounded-full",
          state === "completed" || state === "active" ? "bg-purple-500" : "bg-slate-700"
        )} />
      )}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={cn(
          "relative flex items-center justify-center w-full max-w-[280px] sm:max-w-xs md:max-w-sm h-12 sm:h-14 md:h-16 rounded-lg sm:rounded-xl border-2 transition-all duration-300 shadow-lg text-sm sm:text-base md:text-lg",
          state === "completed" && "bg-purple-500/20 border-purple-500 shadow-purple-500/20 text-white",
          state === "active" && "bg-slate-800 border-cyan-500 shadow-cyan-500/20 animate-pulse",
          state === "locked" && "bg-slate-900/50 border-slate-700 text-slate-500",
          (isStart || isEnd) && "font-bold tracking-wider uppercase bg-cyan-500/10 border-cyan-500 text-cyan-400"
        )}
      >
        {state === "locked" ? (
          <Lock className="w-4 h-4 sm:w-5 sm:h-5 opacity-50" />
        ) : (
          <div className="flex items-center gap-2">
            {state === "completed" && !isStart && !isEnd && (
              <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            )}
            <span className="font-medium">
              {displayText()}
            </span>
          </div>
        )}

        {state === "active" && showHint && hint && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-full ml-4 p-3 bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-48 z-10 hidden lg:block"
          >
            <div className="flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 italic">{hint}</p>
            </div>
          </motion.div>
        )}
      </motion.div>
      
      {state === "active" && showHint && hint && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-2 text-xs text-slate-400 italic lg:hidden px-4 text-center"
        >
          Hint: {hint}
        </motion.p>
      )}
    </div>
  );
}
