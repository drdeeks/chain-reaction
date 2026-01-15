import { PAINT_COLORS } from './wordbank';

export interface ChainLink {
  word: string;
  compound?: string; // The compound word formed with next word
}

export interface Chain {
  links: ChainLink[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

// Validate if two words can form a compound word
export function canFormCompound(word1: string, word2: string): boolean {
  const compound = word1.toLowerCase() + word2.toLowerCase();
  const knownCompounds = [
    'doghouse', 'houseboat', 'boatrace', 'racecar', 'sunflower', 'flowerpot', 
    'potluck', 'luckycharm', 'fireplace', 'placeholder', 'holderspace', 'spaceship',
    'shipyard', 'timetable', 'tablecloth', 'clothline', 'linedance', 'snowball',
    'ballpark', 'parkbench', 'benchmark', 'markdown', 'downtown', 'lighthouse',
    'housekeeper', 'safeguard', 'guardrail', 'railroad', 'roadtrip', 'tripwire',
    'wirebrush', 'brushfire', 'firework', 'workplace', 'cupboard', 'boardwalk',
    'walkway', 'wayside', 'sideshow', 'showcase', 'casebook', 'bookmark', 'markdown',
    'shipshape', 'shapeshift', 'keyboard', 'boardroom', 'roommate', 'shipmate',
    'pressroom', 'ballgame', 'gameplan', 'planhead', 'headstart', 'startline',
    'backpack', 'packrat', 'racecar', 'carwash', 'washout', 'outdoor', 'doorbell',
    'bellhop', 'hopscotch', 'scotchtape', 'tapeworm', 'wormhole', 'holepunch',
    'punchbowl', 'bowlcut', 'cutglass', 'glassware', 'eyebrow', 'browbeat',
    'beatbox', 'boxspring', 'springwater', 'waterfall', 'fallout', 'outfit',
    'testdrive', 'drivethrough', 'passthrough', 'password', 'wordplay', 'playground',
    'groundwork', 'workshop', 'shoplift', 'liftoff', 'offset', 'setback', 'backfire',
    'firefly', 'flyover', 'paperclip', 'clipboard', 'boardroom', 'roomservice'
  ];
  
  return knownCompounds.includes(compound);
}

// Generate a valid chain from word bank
export function generateChain(length: number): string[] {
  const chain: string[] = [];
  const available = [...PAINT_COLORS];
  
  // Start with a random word
  let currentWord = available[Math.floor(Math.random() * available.length)];
  chain.push(currentWord);
  
  // Try to build chain
  for (let i = 1; i < length; i++) {
    let found = false;
    
    // Shuffle to get random order
    const shuffled = available.sort(() => Math.random() - 0.5);
    
    for (const nextWord of shuffled) {
      if (canFormCompound(currentWord, nextWord)) {
        chain.push(nextWord);
        currentWord = nextWord;
        found = true;
        break;
      }
    }
    
    // If no compound found, just add a random word (fallback)
    if (!found) {
      const randomWord = available[Math.floor(Math.random() * available.length)];
      chain.push(randomWord);
      currentWord = randomWord;
    }
  }
  
  return chain;
}

// Validate an entire chain
export function validateChain(chain: string[]): boolean {
  if (chain.length < 2) return false;
  
  for (let i = 0; i < chain.length - 1; i++) {
    if (!canFormCompound(chain[i], chain[i + 1])) {
      return false;
    }
  }
  
  return true;
}

// Generate hint for a word based on its position in chain
export function generateHint(word: string, prevWord?: string, nextWord?: string): string {
  const hints: Record<string, string> = {
    'house': 'A place to live',
    'boat': 'Floats on water',
    'race': 'Competition',
    'car': 'Vehicle with wheels',
    'flower': 'Grows in gardens',
    'pot': 'Cooking container',
    'luck': 'Good fortune',
    'charm': 'Brings good luck',
    'place': 'Location or spot',
    'holder': 'Contains things',
    'space': 'Empty area',
    'ship': 'Large vessel',
    'yard': 'Outdoor area',
    'table': 'Furniture for eating',
    'cloth': 'Fabric material',
    'line': 'String or mark',
    'dance': 'Movement to music',
    'ball': 'Round object',
    'park': 'Recreation area',
    'bench': 'Seating',
    'mark': 'Sign or target',
    'down': 'Direction',
    'town': 'Small city'
  };
  
  const wordLower = word.toLowerCase();
  if (hints[wordLower]) return hints[wordLower];
  
  // Generate contextual hint
  if (prevWord) {
    return `Forms compound with "${prevWord}"`;
  }
  
  return `${word.length} letters`;
}
