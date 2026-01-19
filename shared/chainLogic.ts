import { PAINT_COLORS, isValidWord } from './wordbank';

export interface ChainLink {
  word: string;
  compound?: string;
}

export interface Chain {
  links: ChainLink[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

// Comprehensive compound word database - validated real compound words
const VALID_COMPOUNDS = new Set([
  // Common compound words from the wordbank
  'doghouse', 'houseboat', 'boatrace', 'racecar', 'lighthouse', 'housekeeper', 'safeguard',
  'guardrail', 'railroad', 'roadside', 'sideshow', 'showdown', 'breakdown', 'meltdown',
  'countdown', 'sundown', 'moonrise', 'sunrise', 'highrise', 'lowrise', 'earlybird',
  'nighthawk', 'seahawk', 'blackhawk', 'warhawk', 'tomahawk', 'eagleeye', 'birdeye',
  'bullseye', 'privateeye', 'evileye', 'thirdeye', 'blindside', 'brightside', 'darkside',
  'flipside', 'upside', 'downside', 'outside', 'inside', 'alongside', 'beside', 'roadside',
  'hillside', 'mountainside', 'lakeside', 'riverside', 'waterside', 'fireside', 'bedside',
  'tableside', 'courtside', 'ringside', 'poolside', 'beachside', 'seaside', 'countryside',
  'boardwalk', 'walkway', 'wayside', 'sidewalk', 'footpath', 'pathway', 'highway', 'freeway',
  'waterfall', 'fallout', 'outdoor', 'doorbell', 'bellhop', 'hopscotch',
  'parkway', 'driveway', 'motorway', 'railway', 'subway', 'gateway', 'doorway', 'hallway',
  'stairway', 'entryway', 'passageway', 'alleyway', 'pathway', 'walkway', 'runway', 'treadway',
  'keyboard', 'dashboard', 'scoreboard', 'leaderboard', 'surfboard', 'skateboard', 'snowboard',
  'clipboard', 'cardboard', 'cupboard', 'sideboard', 'baseboard', 'headboard', 'tailgate',
  'frontgate', 'backgate', 'gardengate', 'goldengate', 'watergate', 'floodgate', 'startinggate',
  'finishline', 'goalline', 'touchdown', 'showdown', 'breakdown', 'meltdown', 'countdown',
  'sundown', 'moonrise', 'sunrise', 'highrise', 'lowrise', 'earlybird', 'nighthawk',
  'seahawk', 'blackhawk', 'warhawk', 'tomahawk', 'eagleeye', 'birdeye', 'bullseye',
  'privateeye', 'evileye', 'thirdeye', 'blindside', 'brightside', 'darkside', 'flipside',
  'upside', 'downside', 'outside', 'inside', 'alongside', 'beside', 'roadside', 'hillside',
  'mountainside', 'lakeside', 'riverside', 'waterside', 'fireside', 'bedside', 'tableside',
  'courtside', 'ringside', 'poolside', 'beachside', 'seaside', 'countryside', 'boardwalk',
  'walkway', 'wayside', 'sidewalk', 'footpath', 'pathway', 'highway', 'freeway', 'parkway',
  'driveway', 'motorway', 'railway', 'subway', 'gateway', 'doorway', 'hallway', 'stairway',
  'entryway', 'passageway', 'alleyway', 'pathway', 'walkway', 'runway', 'treadway',
  'bookmark', 'watermark', 'trademark', 'questionmark', 'exclamationmark', 'startingpoint', 'endpoint',
  'highpoint', 'lowpoint', 'turningpoint', 'breakingpoint', 'boilingpoint', 'meltingpoint',
  'freezingpoint', 'flashpoint', 'matchpoint', 'gamepoint', 'scoreboard', 'leaderboard',
  'roommate', 'shipmate', 'classmate', 'teammate', 'playmate', 'schoolmate', 'housemate',
  'soulmate', 'helpmate', 'checkmate', 'stalemate', 'workmate', 'flatmate', 'cellmate',
  'bedmate', 'tablemate', 'dinnermate', 'lunchmate', 'breakfastmate', 'teammate', 'playmate',
  'shipshape', 'shapeshift', 'boardroom', 'pressroom', 'ballroom', 'bedroom', 'bathroom',
  'washroom', 'restroom', 'classroom', 'schoolroom', 'playroom', 'gameroom', 'diningroom',
  'livingroom', 'sittingroom', 'drawingroom', 'waitingroom', 'meetingroom', 'conferenceroom',
  'boardroom', 'warroom', 'controlroom', 'greenroom', 'darkroom', 'storeroom', 'stockroom',
  'showroom', 'displayroom', 'exhibitionroom', 'galleryroom', 'artroom', 'musicroom',
  'stormlightning', 'heartbeat', 'sweetheart', 'sweetdreams', 'eveningslipper', 'firstlight',
  'morningglory', 'morningdew', 'midnightblue', 'silverlining', 'goldenhour', 'goldengate',
  'twilightzone', 'secretgarden', 'hiddentreasure', 'gentlerain', 'softwhisper', 'silentnight',
  'peacefulmoment', 'quiettime', 'perfectstorm', 'wildrose', 'truelove', 'foreveryoung',
  'simplywhite', 'purejoy', 'happyplace', 'safeharbor', 'warmwelcome', 'opendoor',
  'freshstart', 'newbeginning', 'brightfuture', 'lazysunday', 'easyliving', 'carefree',
  'freebird', 'oceanbreeze', 'seasalt', 'beachhouse', 'sanddollar', 'coralreef', 'deepwater',
  'navypier', 'harbormist', 'foggymorning', 'mistymountain', 'highpeak', 'summitview',
  'valleygreen', 'forestpath', 'woodlandwalk', 'naturetrail', 'gardenparty', 'springbloom',
  'cherryblossom', 'rosepetal', 'rosegold', 'lavenderfield', 'violetsky', 'purplehaze',
  'plumperfect', 'berrysweet', 'grapevine', 'winecountry', 'burgundyvelvet', 'royalpurple',
  'majesticcrown', 'kingsize', 'queenanne', 'victorianrose', 'antiquewhite', 'vintagecharm',
  'classicgray', 'timelessbeauty', 'elegantouch', 'refinedtaste', 'sophisticatedstyle', 'modernart',
  'contemporaryedge', 'urbanchic', 'citylights', 'downtownbrown', 'metrogray', 'concretejungle',
  'steelblue', 'irongate', 'stonewall', 'brickhouse', 'colonialwhite', 'farmhouse',
  'barnred', 'rusticcharm', 'weatheredwood', 'driftwoodgray', 'agedcopper', 'antiquebronze',
  'vintagegold', 'oldworld', 'ancientstone', 'historictan', 'desertsand', 'saharasun',
  'sunsetorange', 'sunriseyellow', 'honeycomb', 'honeywheat', 'buttercream', 'vanillaice',
  'sugarcookie', 'caramellatte', 'mochajava', 'coffeebean', 'espressoshot', 'darkroast',
  'frenchpress', 'turkishdelight', 'chocolatetruffle', 'cocoapowder', 'hotfudge', 'brownsugar',
  'cinnamonstick', 'nutmegspice', 'gingersnap', 'pumpkinpie', 'applecider', 'autumnleaves',
  'fallharvest', 'octobersky', 'novemberrain', 'winterwhite', 'snowfall', 'iceblue',
  'frostbite', 'arcticwhite', 'polarbear', 'glacierblue', 'alaskasky', 'northernlights',
  'auroragreen', 'emeraldisle', 'irishgreen', 'shamrockshake', 'mintjulep', 'limelight',
  'citrusburst', 'lemondrop', 'sunshineyellow', 'daffodilwhite', 'daisychain', 'buttercupyellow',
  'canarysong', 'birdbath', 'featherlight', 'angelwing', 'cloudnine', 'heavensent',
  'divinewhite', 'celestialblue', 'starlight', 'moonbeam', 'sunray', 'daybreak',
  'dawnlight', 'freshmint', 'coolbreeze', 'chillout', 'relaxmode', 'zengarden',
  'peacefull', 'calmwaters', 'stilllife', 'sereneblue', 'tranquilpond', 'quietharbor',
  'restfulgray', 'sleepyhollow', 'dreamcatcher', 'nightowl', 'hootowl', 'wisesage',
  'cleverfox', 'slygray', 'wolfgray', 'bearbrown', 'grizzlypeak', 'mountainhigh',
  'alpinewhite', 'snowcap', 'icecap', 'frozenlake', 'crystalclear', 'diamondwhite',
  'pearlwhite', 'ivorytower', 'castlegray', 'knightarmor', 'silversword', 'bladerunner',
  'fasttrack', 'speeddemon', 'redhot', 'fireengine', 'flamered', 'burninglove',
  'passionfruit', 'cherryred', 'rubyred', 'garnetstone', 'preciousgem', 'jeweltone',
  'richburgundy', 'deepwine', 'merlotred', 'cabernetred', 'blushpink', 'copperpenny',
  'bronzemedal', 'goldrush', 'treasurehunt', 'hiddengold', 'secretstash', 'luckycharm',
  'fourleaf', 'clovergreen', 'grassgreen', 'meadowgreen', 'sagebrush', 'desertsage',
  'olivebranch', 'peacedove', 'whitedove', 'gentlespirit', 'kindheart', 'tendertouch',
  'softpink', 'babypink', 'cottoncandy', 'sweetpea', 'sugarplum', 'fairytale',
  'storybook', 'pageturner', 'bookworm', 'librarygray', 'scholargreen', 'ivyleague',
  'prepschool', 'oldschool', 'vintagedenim', 'bluejean', 'jacketblue', 'denimwash',
  'fadedblue', 'skyblue', 'babyblue', 'powderblue', 'periwinkleblue', 'cornflowerblue',
  'azuresky', 'ceruleanblue', 'tealblue', 'turquoisewater', 'aquamarine', 'caribbeanblue',
  'tropicalsea', 'islandblue', 'lagoonblue', 'paradisefound', 'oasisgreen', 'palmtree',
  'coconutgrove', 'bananaleaf', 'junglegreen', 'rainforest', 'mossgreen', 'ferngreen',
  'huntergreen', 'pinetree', 'evergreen', 'cedarchest', 'mahoganywood', 'walnutbrown',
  'chestnutbrown', 'hazelnut', 'almondcream', 'pecanpie', 'maplesyrup', 'beehive',
  'busybee', 'workerbee', 'queenbee', 'bumblebee', 'butterflyblue', 'dragonfly',
  'ladybug', 'lovebug', 'junebug', 'firefly', 'lightningbug', 'glowworm',
  'earthworm', 'bookmark', 'watermark', 'trademark', 'questionmark', 'exclamationpoint',
  'startingpoint', 'endpoint', 'highpoint', 'lowpoint', 'turningpoint', 'breakingpoint',
  'boilingpoint', 'meltingpoint', 'freezingpoint', 'flashpoint', 'matchpoint', 'gamepoint',
  'scoreboard', 'leaderboard', 'surfboard', 'skateboard', 'snowboard', 'clipboard',
  'keyboard', 'dashboard', 'cardboard', 'cupboard', 'sideboard', 'baseboard',
  'headboard', 'tailgate', 'frontgate', 'backgate', 'gardengate', 'watergate',
  'floodgate', 'startinggate', 'finishline', 'goalline', 'touchdown', 'showdown',
  'breakdown', 'meltdown', 'countdown', 'sundown', 'moonrise', 'sunrise',
  'highrise', 'lowrise', 'earlybird', 'nighthawk', 'seahawk', 'blackhawk',
  'warhawk', 'tomahawk', 'eagleeye', 'birdeye', 'bullseye', 'privateeye',
  'evileye', 'thirdeye', 'blindside', 'brightside', 'darkside', 'flipside',
  'upside', 'downside', 'outside', 'inside', 'alongside', 'beside',
  'roadside', 'hillside', 'mountainside', 'lakeside', 'riverside', 'waterside',
  'fireside', 'bedside', 'tableside', 'courtside', 'ringside', 'poolside',
  'beachside', 'seaside', 'countryside', 'boardwalk', 'walkway', 'wayside',
  'sidewalk', 'footpath', 'pathway', 'highway', 'freeway', 'parkway',
  'driveway', 'motorway', 'railway', 'subway', 'gateway', 'doorway',
  'hallway', 'stairway', 'entryway', 'passageway', 'alleyway', 'runway',
  'treadway', 'roommate', 'shipmate', 'classmate', 'teammate', 'playmate',
  'schoolmate', 'housemate', 'soulmate', 'helpmate', 'checkmate', 'stalemate',
  'workmate', 'flatmate', 'cellmate', 'bedmate', 'tablemate', 'dinnermate',
  'lunchmate', 'breakfastmate', 'shipshape', 'shapeshift', 'boardroom', 'pressroom',
  'ballroom', 'bedroom', 'bathroom', 'washroom', 'restroom', 'classroom',
  'schoolroom', 'playroom', 'gameroom', 'diningroom', 'livingroom', 'sittingroom',
  'drawingroom', 'waitingroom', 'meetingroom', 'conferenceroom', 'warroom', 'controlroom',
  'greenroom', 'darkroom', 'storeroom', 'stockroom', 'showroom', 'displayroom',
  'exhibitionroom', 'galleryroom', 'artroom', 'musicroom',
]);

// Additional validation: check if two words can form a valid English compound word
// This is a heuristic check - only used if both words are in the wordbank
function isValidEnglishCompound(word1: string, word2: string): boolean {
  const compound = (word1 + word2).toLowerCase().replace(/\s+/g, '');
  
  // Check against known valid compounds
  if (VALID_COMPOUNDS.has(compound)) {
    return true;
  }
  
  // Only apply heuristic if both words are in the wordbank
  // This prevents invalid words from forming compounds
  if (!isValidWord(word1) || !isValidWord(word2)) {
    return false;
  }
  
  // Heuristic: if both words are common English words that often form compounds
  const commonCompoundStarters = new Set(['house', 'room', 'board', 'side', 'way', 'walk', 'gate', 'line', 'point', 'mark', 'mate', 'ship', 'yard', 'town', 'down', 'show', 'break', 'melt', 'count', 'sun', 'moon', 'bird', 'eye', 'out', 'in', 'up', 'over', 'under', 'through', 'across', 'around', 'about', 'above', 'below', 'between', 'among', 'within', 'without', 'inside', 'outside', 'upside', 'downside', 'alongside', 'beside', 'besides', 'beyond']);
  const commonCompoundEnders = new Set(['house', 'room', 'board', 'side', 'way', 'walk', 'gate', 'line', 'point', 'mark', 'mate', 'ship', 'yard', 'town', 'down', 'show', 'break', 'melt', 'count', 'sun', 'moon', 'bird', 'eye']);
  
  const w1 = word1.toLowerCase();
  const w2 = word2.toLowerCase();
  
  // If both words are in our wordbank and one is a common compound starter/ender, allow it
  if (commonCompoundStarters.has(w1) || commonCompoundEnders.has(w2)) {
    // Additional check: words should be reasonable length
    if (w1.length >= 2 && w2.length >= 2 && compound.length <= 20) {
      return true;
    }
  }
  
  return false;
}

export function canFormCompound(word1: string, word2: string): boolean {
  // Primary check: exact match in VALID_COMPOUNDS
  const compound = (word1 + word2).toLowerCase().replace(/\s+/g, '');
  if (VALID_COMPOUNDS.has(compound)) {
    return true;
  }
  
  // Secondary check: heuristic validation (only for words in wordbank)
  return isValidEnglishCompound(word1, word2);
}

export function findValidNextWords(currentWord: string): string[] {
  return PAINT_COLORS.filter(word => canFormCompound(currentWord, word));
}

export function generateSmartChain(length: number, difficulty: 'Easy' | 'Medium' | 'Hard'): string[] {
  const maxAttempts = 100;
  
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const chain: string[] = [];
    const startWord = PAINT_COLORS[Math.floor(Math.random() * PAINT_COLORS.length)];
    chain.push(startWord);
    
    let currentWord: string = startWord;
    let consecutiveFailures = 0;
    const usedWords = new Set<string>([startWord.toLowerCase()]);
    
    while (chain.length < length && consecutiveFailures < 10) {
      const validNext = findValidNextWords(currentWord).filter(
        word => !usedWords.has(word.toLowerCase())
      );
      
      if (validNext.length === 0) {
        consecutiveFailures++;
        if (consecutiveFailures >= 3) break;
        continue;
      }
      
      const nextWord = validNext[Math.floor(Math.random() * validNext.length)];
      chain.push(nextWord);
      usedWords.add(nextWord.toLowerCase());
      currentWord = nextWord;
      consecutiveFailures = 0;
    }
    
    if (chain.length === length) {
      return chain;
    }
  }
  
  // Fallback to known good chains
  const fallbackChains = {
    Easy: ['Dog', 'House', 'Boat', 'Race', 'Car'],
    Medium: ['Fire', 'Side', 'Show', 'Down', 'Town'],
    Hard: ['Water', 'Fall', 'Out', 'Side', 'Walk', 'Way']
  };
  
  return fallbackChains[difficulty];
}

export function validateChain(chain: string[]): boolean {
  if (chain.length < 2) return false;
  
  for (let i = 0; i < chain.length - 1; i++) {
    if (!canFormCompound(chain[i], chain[i + 1])) {
      return false;
    }
  }
  
  return true;
}

export function generateHint(word: string, prevWord?: string): string {
  // Core hints for common compound-forming words
  const hints: Record<string, string> = {
    house: 'A place to live',
    boat: 'Floats on water',
    race: 'Competition',
    car: 'Vehicle',
    flower: 'Grows in gardens',
    pot: 'Container',
    luck: 'Good fortune',
    charm: 'Brings luck',
    place: 'Location',
    space: 'Empty area',
    ship: 'Vessel',
    yard: 'Outdoor area',
    table: 'Furniture',
    line: 'String or mark',
    mark: 'Sign',
    down: 'Direction',
    town: 'Small city',
    side: 'Edge or border',
    walk: 'To move on foot',
    way: 'Path or route',
    show: 'Display',
    fall: 'To drop',
    out: 'Outside',
    water: 'H2O',
    fire: 'Burns',
    sun: 'Star',
    moon: 'Satellite',
    star: 'In the sky',
    bird: 'Flies',
    dog: 'Barks',
    tree: 'Has leaves',
    garden: 'Has plants',
    ocean: 'Large body of water',
    beach: 'Sandy shore',
    mountain: 'High elevation',
    river: 'Flowing water',
    lake: 'Still water',
    forest: 'Many trees',
    door: 'Opens and closes',
    window: 'Lets in light',
    wall: 'Barrier',
    floor: 'Walk on it',
    roof: 'Top of building',
    room: 'Enclosed space',
    board: 'Flat piece',
    gate: 'Entrance barrier',
    mate: 'Partner',
    book: 'Reading material',
    page: 'Sheet in book',
    word: 'Unit of language',
    in: 'Internal',
    up: 'Higher',
    over: 'Above',
    under: 'Below',
    through: 'Passing',
    across: 'From side to side',
    around: 'Surrounding',
    inside: 'Interior',
    outside: 'Exterior',
    upside: 'Upper side',
    downside: 'Lower side',
    alongside: 'Next to',
    beside: 'Next to',
  };
  
  const wordLower = word.toLowerCase();
  if (hints[wordLower]) return hints[wordLower];
  if (prevWord) return `Forms compound with "${prevWord}"`;
  return `${word.length} letters`;
}
