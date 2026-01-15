// Paint color names from major brands (Behr, Sherwin-Williams, Benjamin Moore)
export const PAINT_COLORS = [
  // Behr colors
  'Polar', 'Bear', 'Frost', 'Silver', 'Lining', 'Cloud', 'Nine', 'Whisper', 'White', 'Cotton',
  'Ball', 'Snow', 'Fall', 'Winter', 'Mint', 'Condition', 'Ocean', 'Breeze', 'Sky', 'Blue',
  'Navy', 'Pier', 'Midnight', 'Express', 'Thunder', 'Storm', 'Rain', 'Forest', 'Green', 'Sage',
  'Brush', 'Olive', 'Branch', 'Garden', 'Path', 'Stone', 'Wall', 'Castle', 'Gray', 'Slate',
  'Tile', 'Pewter', 'Mug', 'Coffee', 'Bean', 'Chocolate', 'Truffle', 'Mocha', 'Latte', 'Cream',
  'Vanilla', 'Ice', 'Cream', 'Peach', 'Fuzz', 'Coral', 'Reef', 'Sunset', 'Orange', 'Peel',
  'Tangerine', 'Dream', 'Catcher', 'Rose', 'Petal', 'Pink', 'Blush', 'Cherry', 'Blossom', 'Red',
  'Wine', 'Burgundy', 'Velvet', 'Rope', 'Purple', 'Haze', 'Lavender', 'Field', 'Violet', 'Storm',
  
  // Sherwin-Williams colors
  'Pure', 'White', 'Alabaster', 'Dove', 'Wing', 'Agreeable', 'Gray', 'Repose', 'Gray', 'Mindful',
  'Gray', 'Passive', 'Gray', 'Colonnade', 'Gray', 'Sea', 'Salt', 'Rain', 'Washed', 'Watery', 'Blue',
  'Naval', 'Indigo', 'Batik', 'Salty', 'Dog', 'Smoky', 'Blue', 'Distance', 'Refuge', 'Retreat',
  'Evergreen', 'Fog', 'Clary', 'Sage', 'Softened', 'Green', 'Liveable', 'Green', 'Cascade', 'Green',
  'Rookwood', 'Dark', 'Green', 'Ripe', 'Olive', 'Urbane', 'Bronze', 'Turkish', 'Coffee', 'French',
  'Roast', 'Black', 'Bean', 'Iron', 'Ore', 'Tricorn', 'Black', 'Caviar', 'Urbane', 'Bronze',
  'Accessible', 'Beige', 'Kilim', 'Beige', 'Balanced', 'Beige', 'Natural', 'Tan', 'Latte', 'Whole',
  'Wheat', 'Bread', 'Basket', 'Beige', 'Sand', 'Dollar', 'Beach', 'House', 'Boat', 'Deck',
  
  // Benjamin Moore colors  
  'Simply', 'White', 'Chantilly', 'Lace', 'Decorator', 'White', 'Swiss', 'Coffee', 'Cloud', 'White',
  'Moonlight', 'White', 'Paper', 'White', 'Linen', 'White', 'Ivory', 'White', 'Classic', 'Gray',
  'Stonington', 'Gray', 'Revere', 'Pewter', 'Edgecomb', 'Gray', 'Balboa', 'Mist', 'Silver', 'Marlin',
  'Hale', 'Navy', 'Gentleman', 'Gray', 'Kendall', 'Charcoal', 'Chelsea', 'Gray', 'Anchor', 'Gray',
  'Palladian', 'Blue', 'Quiet', 'Moments', 'Breath', 'Fresh', 'Air', 'Iceberg', 'Polar', 'Sky',
  'Woodlawn', 'Blue', 'Van', 'Deusen', 'Blue', 'Old', 'Navy', 'Hale', 'Navy', 'Newburyport', 'Blue',
  'Saybrook', 'Sage', 'October', 'Mist', 'Kittery', 'Point', 'Green', 'Caldwell', 'Green', 'Hunter',
  'Green', 'Forest', 'Hills', 'Green', 'Tarrytown', 'Green', 'Backwoods', 'Wenge', 'Espresso',
  'Bean', 'Mink', 'Coat', 'Chocolate', 'Sundae', 'Hot', 'Cocoa', 'Brown', 'Sugar', 'Caramel',
  'Corn', 'Silk', 'Golden', 'Honey', 'Butter', 'Cream', 'Pale', 'Oak', 'Wood', 'Grain',
  
  // Additional compound-friendly words
  'Light', 'House', 'Keeper', 'Safe', 'Guard', 'Rail', 'Road', 'Trip', 'Wire', 'Brush',
  'Fire', 'Place', 'Holder', 'Cup', 'Cake', 'Walk', 'Way', 'Side', 'Show', 'Case',
  'Book', 'Mark', 'Down', 'Town', 'Ship', 'Yard', 'Stick', 'Ball', 'Park', 'Bench',
  'Press', 'Room', 'Mate', 'Ship', 'Shape', 'Shift', 'Key', 'Board', 'Walk', 'Over',
  'Time', 'Table', 'Cloth', 'Line', 'Dance', 'Floor', 'Board', 'Game', 'Plan', 'Ahead',
  'Start', 'Line', 'Back', 'Pack', 'Rat', 'Race', 'Car', 'Wash', 'Out', 'Door',
  'Bell', 'Hop', 'Scotch', 'Tape', 'Worm', 'Hole', 'Punch', 'Bowl', 'Cut', 'Glass',
  'Eye', 'Brow', 'Beat', 'Box', 'Spring', 'Water', 'Fall', 'Out', 'Fit', 'Ness',
  'Test', 'Drive', 'Through', 'Pass', 'Word', 'Play', 'Ground', 'Work', 'Shop', 'Lift',
  'Off', 'Set', 'Back', 'Fire', 'Fly', 'Paper', 'Clip', 'Board', 'Room', 'Service'
] as const;

export type PaintColor = typeof PAINT_COLORS[number];

// Helper to check if a word exists in the bank
export function isValidWord(word: string): boolean {
  return PAINT_COLORS.some(color => color.toLowerCase() === word.toLowerCase());
}

// Helper to get random words for chain generation
export function getRandomWords(count: number): string[] {
  const shuffled = [...PAINT_COLORS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
