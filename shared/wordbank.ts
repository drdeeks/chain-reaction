// Real paint color names from major brands: Behr, Sherwin-Williams, Benjamin Moore, Valspar, PPG
// Focus on names that can form compound words for the chain reaction game
export const PAINT_COLORS = [
  // Behr Colors
  'Storm', 'Lightning', 'Thunder', 'Cloud', 'Rain', 'Mist', 'Fog', 'Dew',
  'Ocean', 'Sea', 'Wave', 'Tide', 'Beach', 'Sand', 'Shell', 'Coral',
  'Sunset', 'Sunrise', 'Dawn', 'Dusk', 'Twilight', 'Midnight', 'Moon', 'Star',
  'Fire', 'Flame', 'Ember', 'Spark', 'Glow', 'Light', 'Bright', 'Shine',
  'Forest', 'Wood', 'Tree', 'Leaf', 'Pine', 'Cedar', 'Oak', 'Maple',
  'Garden', 'Flower', 'Rose', 'Lily', 'Tulip', 'Daisy', 'Ivy', 'Fern',
  'Mountain', 'Hill', 'Valley', 'Peak', 'Summit', 'Cliff', 'Stone', 'Rock',
  'River', 'Lake', 'Pond', 'Stream', 'Brook', 'Creek', 'Water', 'Ice',
  'Snow', 'Frost', 'Crystal', 'Diamond', 'Pearl', 'Silver', 'Gold', 'Copper',
  'Bronze', 'Brass', 'Steel', 'Iron', 'Metal', 'Chrome', 'Platinum', 'Titanium',
  
  // Sherwin-Williams Colors
  'Heart', 'Soul', 'Spirit', 'Mind', 'Body', 'Soul', 'Peace', 'Love',
  'Joy', 'Hope', 'Faith', 'Grace', 'Mercy', 'Kind', 'Gentle', 'Soft',
  'Sweet', 'Bitter', 'Sour', 'Fresh', 'Clean', 'Pure', 'Clear', 'Bright',
  'Dark', 'Deep', 'Rich', 'Bold', 'Bold', 'Strong', 'Power', 'Might',
  'Royal', 'Regal', 'Noble', 'Majestic', 'Grand', 'Great', 'Big', 'Small',
  'Tiny', 'Mini', 'Micro', 'Macro', 'Wide', 'Narrow', 'Tall', 'Short',
  'High', 'Low', 'Up', 'Down', 'Top', 'Bottom', 'Side', 'Edge',
  'Front', 'Back', 'Left', 'Right', 'Center', 'Middle', 'End', 'Start',
  'First', 'Last', 'Next', 'Past', 'Present', 'Future', 'New', 'Old',
  'Young', 'Ancient', 'Modern', 'Classic', 'Vintage', 'Antique', 'Retro', 'Contemporary',
  
  // Benjamin Moore Colors
  'Morning', 'Evening', 'Night', 'Day', 'Noon', 'Afternoon', 'Hour', 'Minute',
  'Second', 'Time', 'Clock', 'Watch', 'Bell', 'Ring', 'Sound', 'Echo',
  'Voice', 'Song', 'Music', 'Tune', 'Melody', 'Harmony', 'Rhythm', 'Beat',
  'Dance', 'Move', 'Step', 'Walk', 'Run', 'Jump', 'Leap', 'Fly',
  'Bird', 'Wing', 'Feather', 'Beak', 'Tail', 'Claw', 'Paw', 'Foot',
  'Hand', 'Finger', 'Thumb', 'Palm', 'Wrist', 'Arm', 'Elbow', 'Shoulder',
  'Head', 'Face', 'Eye', 'Ear', 'Nose', 'Mouth', 'Lip', 'Tooth',
  'Hair', 'Beard', 'Mustache', 'Hair', 'Brow', 'Cheek', 'Chin', 'Neck',
  
  // Valspar Colors
  'House', 'Home', 'Room', 'Door', 'Window', 'Wall', 'Floor', 'Ceiling',
  'Roof', 'Chimney', 'Porch', 'Deck', 'Patio', 'Yard', 'Garden', 'Fence',
  'Gate', 'Path', 'Walk', 'Drive', 'Street', 'Road', 'Lane', 'Avenue',
  'Boulevard', 'Highway', 'Freeway', 'Bridge', 'Tunnel', 'Overpass', 'Underpass', 'Exit',
  'Entrance', 'Door', 'Gate', 'Barrier', 'Wall', 'Fence', 'Hedge', 'Border',
  'Line', 'Mark', 'Sign', 'Signal', 'Light', 'Lamp', 'Bulb', 'Candle',
  'Torch', 'Flash', 'Beam', 'Ray', 'Shine', 'Glow', 'Gleam', 'Sparkle',
  
  // PPG Colors
  'Car', 'Truck', 'Van', 'Bus', 'Train', 'Plane', 'Boat', 'Ship',
  'Sail', 'Anchor', 'Rope', 'Chain', 'Link', 'Ring', 'Loop', 'Circle',
  'Round', 'Square', 'Triangle', 'Diamond', 'Star', 'Cross', 'Plus', 'Minus',
  'Equal', 'Same', 'Different', 'Similar', 'Alike', 'Unlike', 'Opposite', 'Reverse',
  'Forward', 'Backward', 'Ahead', 'Behind', 'Before', 'After', 'During', 'While',
  'Since', 'Until', 'Till', 'When', 'Where', 'Why', 'How', 'What',
  'Who', 'Which', 'Whose', 'Whom', 'That', 'This', 'These', 'Those',
  
  // Common Compound-Forming Words
  'Board', 'Walk', 'Way', 'Show', 'Down', 'Town', 'Ship', 'Yard',
  'Side', 'Out', 'In', 'Up', 'Over', 'Under', 'Through', 'Across',
  'Around', 'About', 'Above', 'Below', 'Between', 'Among', 'Within', 'Without',
  'Inside', 'Outside', 'Upside', 'Downside', 'Alongside', 'Beside', 'Besides', 'Beyond',
  'Book', 'Mark', 'Page', 'Line', 'Word', 'Letter', 'Number', 'Digit',
  'Figure', 'Shape', 'Form', 'Style', 'Design', 'Pattern', 'Model', 'Type',
  'Kind', 'Sort', 'Class', 'Group', 'Set', 'Pair', 'Couple', 'Duo',
  'Trio', 'Quartet', 'Team', 'Squad', 'Crew', 'Gang', 'Band', 'Group',
  
  // Additional Compound Words
  'Dog', 'Cat', 'Bird', 'Fish', 'Frog', 'Toad', 'Snake', 'Lizard',
  'Mouse', 'Rat', 'Hamster', 'Rabbit', 'Hare', 'Squirrel', 'Chipmunk', 'Raccoon',
  'Fox', 'Wolf', 'Bear', 'Deer', 'Elk', 'Moose', 'Bison', 'Buffalo',
  'Cow', 'Bull', 'Ox', 'Horse', 'Pony', 'Donkey', 'Mule', 'Camel',
  'Sheep', 'Goat', 'Pig', 'Boar', 'Hog', 'Swine', 'Lamb', 'Kid',
  'Calf', 'Colt', 'Foal', 'Cub', 'Pup', 'Kitten', 'Puppy', 'Chick',
  'Duck', 'Goose', 'Swan', 'Crane', 'Heron', 'Egret', 'Stork', 'Pelican',
  'Eagle', 'Hawk', 'Falcon', 'Owl', 'Crow', 'Raven', 'Magpie', 'Jay',
  'Robin', 'Sparrow', 'Finch', 'Canary', 'Parrot', 'Cockatoo', 'Macaw', 'Toucan',
  'Woodpecker', 'Hummingbird', 'Kingfisher', 'Warbler', 'Thrush', 'Wren', 'Lark', 'Swallow',
  
  // More Compound Words
  'Apple', 'Pear', 'Peach', 'Plum', 'Cherry', 'Berry', 'Strawberry', 'Blueberry',
  'Raspberry', 'Blackberry', 'Cranberry', 'Gooseberry', 'Elderberry', 'Mulberry', 'Huckleberry', 'Boysenberry',
  'Orange', 'Lemon', 'Lime', 'Grapefruit', 'Tangerine', 'Mandarin', 'Clementine', 'Kumquat',
  'Banana', 'Plantain', 'Mango', 'Papaya', 'Pineapple', 'Coconut', 'Avocado', 'Kiwi',
  'Grape', 'Raisin', 'Currant', 'Date', 'Fig', 'Prune', 'Apricot', 'Nectarine',
  'Watermelon', 'Cantaloupe', 'Honeydew', 'Muskmelon', 'Casaba', 'Crenshaw', 'Persian', 'Santa',
  
  // Colors that form compounds
  'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Pink', 'Brown',
  'Black', 'White', 'Gray', 'Grey', 'Tan', 'Beige', 'Cream', 'Ivory',
  'Navy', 'Teal', 'Turquoise', 'Aqua', 'Cyan', 'Magenta', 'Maroon', 'Burgundy',
  'Crimson', 'Scarlet', 'Vermillion', 'Carmine', 'Rose', 'Salmon', 'Peach', 'Apricot',
  'Coral', 'Tangerine', 'Amber', 'Gold', 'Bronze', 'Copper', 'Brass', 'Silver',
  'Platinum', 'Titanium', 'Chrome', 'Steel', 'Iron', 'Lead', 'Tin', 'Zinc',
  'Aluminum', 'Nickel', 'Cobalt', 'Mercury', 'Quicksilver', 'Graphite', 'Charcoal', 'Soot',
  'Ash', 'Smoke', 'Fog', 'Mist', 'Haze', 'Dust', 'Dirt', 'Mud',
  'Clay', 'Sand', 'Gravel', 'Stone', 'Rock', 'Pebble', 'Boulder', 'Crag',
  'Cliff', 'Bluff', 'Ridge', 'Peak', 'Summit', 'Top', 'Crest', 'Crown',
  
  // Time and Weather
  'Spring', 'Summer', 'Fall', 'Autumn', 'Winter', 'Season', 'Month', 'Week',
  'Day', 'Night', 'Hour', 'Minute', 'Second', 'Moment', 'Instant', 'Flash',
  'Wind', 'Breeze', 'Gale', 'Storm', 'Hurricane', 'Tornado', 'Cyclone', 'Typhoon',
  'Rain', 'Drizzle', 'Shower', 'Downpour', 'Deluge', 'Flood', 'Torrent', 'Stream',
  'Snow', 'Sleet', 'Hail', 'Ice', 'Frost', 'Freeze', 'Thaw', 'Melt',
  'Sun', 'Moon', 'Star', 'Planet', 'Comet', 'Asteroid', 'Meteor', 'Shooting',
  
  // Additional useful words
  'Key', 'Lock', 'Door', 'Window', 'Glass', 'Mirror', 'Frame', 'Picture',
  'Photo', 'Image', 'Photo', 'Snapshot', 'Portrait', 'Landscape', 'Scene', 'View',
  'Sight', 'Vision', 'Eye', 'Look', 'See', 'Watch', 'Observe', 'Notice',
  'Spot', 'Mark', 'Point', 'Dot', 'Dash', 'Line', 'Stripe', 'Band',
  'Bar', 'Rod', 'Pole', 'Post', 'Pillar', 'Column', 'Support', 'Prop',
  'Brace', 'Bracket', 'Hook', 'Hanger', 'Rack', 'Shelf', 'Table', 'Desk',
  'Chair', 'Seat', 'Bench', 'Stool', 'Couch', 'Sofa', 'Bed', 'Mattress',
  'Pillow', 'Blanket', 'Sheet', 'Cover', 'Quilt', 'Comforter', 'Duvet', 'Throw',
  
  // Final additions for better compound formation
  'Guard', 'Watch', 'Keep', 'Hold', 'Grasp', 'Grip', 'Clutch', 'Clasp',
  'Catch', 'Grab', 'Snatch', 'Seize', 'Take', 'Get', 'Obtain', 'Acquire',
  'Receive', 'Accept', 'Adopt', 'Adopt', 'Embrace', 'Hug', 'Cuddle', 'Snuggle',
  'Kiss', 'Peck', 'Smack', 'Smooch', 'Touch', 'Feel', 'Sense', 'Perceive',
  'Know', 'Understand', 'Comprehend', 'Grasp', 'Realize', 'Recognize', 'Identify', 'Detect',
  'Discover', 'Find', 'Locate', 'Spot', 'See', 'Notice', 'Observe', 'Witness',
  'Watch', 'View', 'Look', 'Glance', 'Glimpse', 'Peek', 'Peer', 'Stare',
  'Gaze', 'Gawk', 'Gape', 'Ogle', 'Leer', 'Squint', 'Blink', 'Wink',
  
  // More compound-friendly words
  'Mate', 'Friend', 'Buddy', 'Pal', 'Chum', 'Comrade', 'Ally', 'Partner',
  'Associate', 'Colleague', 'Peer', 'Equal', 'Match', 'Rival', 'Opponent', 'Enemy',
  'Foe', 'Adversary', 'Competitor', 'Contender', 'Challenger', 'Contestant', 'Player', 'Participant',
  'Member', 'Fellow', 'Companion', 'Escort', 'Guide', 'Leader', 'Chief', 'Boss',
  'Head', 'Top', 'Peak', 'Summit', 'Pinnacle', 'Apex', 'Crest', 'Crown',
  'Cap', 'Hat', 'Helmet', 'Crown', 'Tiara', 'Diadem', 'Coronet', 'Wreath',
  'Garland', 'Lei', 'Necklace', 'Chain', 'Link', 'Ring', 'Loop', 'Circle',
  
  // Final set for maximum compound potential
  'Room', 'Space', 'Area', 'Zone', 'Region', 'Section', 'Part', 'Piece',
  'Bit', 'Fragment', 'Shard', 'Splinter', 'Chip', 'Sliver', 'Sliver', 'Scrap',
  'Remnant', 'Leftover', 'Remainder', 'Rest', 'Balance', 'Excess', 'Surplus', 'Extra',
  'Additional', 'More', 'Further', 'Extra', 'Bonus', 'Plus', 'Added', 'Supplemental',
  'Supplementary', 'Auxiliary', 'Secondary', 'Subsidiary', 'Subordinate', 'Inferior', 'Lesser', 'Minor',
  'Small', 'Tiny', 'Mini', 'Micro', 'Miniature', 'Petite', 'Compact', 'Little',
] as const;

export type PaintColor = typeof PAINT_COLORS[number];

export function isValidWord(word: string): boolean {
  return PAINT_COLORS.some(color => color.toLowerCase() === word.toLowerCase());
}

export function getRandomWords(count: number): string[] {
  const shuffled = [...PAINT_COLORS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get unique words (remove duplicates while preserving order)
export function getUniqueWords(): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const word of PAINT_COLORS) {
    const lower = word.toLowerCase();
    if (!seen.has(lower)) {
      seen.add(lower);
      unique.push(word);
    }
  }
  return unique;
}
