import { PAINT_COLORS } from './wordbank';

export interface ChainLink {
  word: string;
  compound?: string;
}

export interface Chain {
  links: ChainLink[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

// Comprehensive compound word database
const VALID_COMPOUNDS = new Set([
  'stormlightning', 'heartbeat', 'sweetheart', 'sweetdreams', 'eveningslipper', 'firstlight',
  'morningglory', 'morningdew', 'midnightblue', 'silverlining', 'goldenhour', 'goldengate',
  'twilightzone', 'secretgarden', 'hiddentreasure', 'gentlerain', 'softwhisper', 'silentnight',
  'peacefulmoment', 'quiettime', 'perfectstorm', 'wildrose', 'truelove', 'foreveryoung',
  'simplywhite', 'purejoy', 'happyplace', 'safeharbor', 'warmwelcome', 'opendoor',
  'freshstart', 'newbeginning', 'brightfuture', 'lazysunday', 'easyliving', 'carefree',
  'freebird', 'oceanbreeze', 'seasalt', 'beachhouse', 'beachside', 'sanddollar',
  'coralreef', 'deepwater', 'navypier', 'harbormist', 'foggymorning', 'mistymountain',
  'highpeak', 'summitview', 'valleygreen', 'forestpath', 'woodlandwalk', 'naturetrail',
  'gardenparty', 'springbloom', 'cherryblossom', 'rosepetal', 'rosegold', 'lavenderfield',
  'violetsky', 'purplehaze', 'plumperfect', 'berrysweet', 'grapevine', 'winecountry',
  'burgundyvelvet', 'royalpurple', 'majesticcrown', 'kingsize', 'queenanne', 'victorianrose',
  'antiquewhite', 'vintagecharm', 'classicgray', 'timelessbeauty', 'elegantouch', 'refinedtaste',
  'sophisticatedstyle', 'modernart', 'contemporaryedge', 'urbanchic', 'citylights', 'downtownbrown',
  'metrogray', 'concretejungle', 'steelblue', 'irongate', 'stonewall', 'brickhouse',
  'colonialwhite', 'countryside', 'farmhouse', 'barnred', 'rusticcharm', 'weatheredwood',
  'driftwoodgray', 'agedcopper', 'antiquebronze', 'vintagegold', 'oldworld', 'ancientstone',
  'historictan', 'desertsand', 'saharasun', 'sunsetorange', 'sunriseyellow', 'honeycomb',
  'honeywheat', 'buttercream', 'vanillaice', 'sugarcookie', 'caramellatte', 'mochajava',
  'coffeebean', 'espressoshot', 'darkroast', 'frenchpress', 'turkishdelight', 'chocolatetruffle',
  'cocoapowder', 'hotfudge', 'brownsugar', 'cinnamonstick', 'nutmegspice', 'gingersnap',
  'pumpkinpie', 'applecider', 'autumnleaves', 'fallharvest', 'octobersky', 'novemberrain',
  'winterwhite', 'snowfall', 'iceblue', 'frostbite', 'arcticwhite', 'polarbear',
  'glacierblue', 'alaskasky', 'northernlights', 'auroragreen', 'emeraldisle', 'irishgreen',
  'shamrockshake', 'mintjulep', 'limelight', 'citrusburst', 'lemondrop', 'sunshineyellow',
  'daffodilwhite', 'daisychain', 'buttercupyellow', 'canarysong', 'birdbath', 'featherlight',
  'angelwing', 'cloudnine', 'heavensent', 'divinewhite', 'celestialblue', 'starlight',
  'moonbeam', 'sunray', 'daybreak', 'dawnlight', 'freshmint', 'coolbreeze',
  'chillout', 'relaxmode', 'zengarden', 'peacefull', 'calmwaters', 'stilllife',
  'sereneblue', 'tranquilpond', 'quietharbor', 'restfulgray', 'sleepyhollow', 'dreamcatcher',
  'nightowl', 'hootowl', 'wisesage', 'cleverfox', 'slygray', 'wolfgray',
  'bearbrown', 'grizzlypeak', 'mountainhigh', 'alpinewhite', 'snowcap', 'icecap',
  'frozenlake', 'crystalclear', 'diamondwhite', 'pearlwhite', 'ivorytower', 'castlegray',
  'knightarmor', 'silversword', 'bladerunner', 'fasttrack', 'racecar', 'speeddemon',
  'redhot', 'fireengine', 'flamered', 'burninglove', 'passionfruit', 'cherryred',
  'rubyred', 'garnetstone', 'preciousgem', 'jeweltone', 'richburgundy', 'deepwine',
  'merlotred', 'cabernetred', 'blushpink', 'copperpenney', 'bronzemedal', 'goldrush',
  'treasurehunt', 'hiddengold', 'secretstash', 'luckycharm', 'fourleaf', 'clovergreen',
  'grassgreen', 'meadowgreen', 'sagebrush', 'desertsage', 'olivebranch', 'peacedove',
  'whitedove', 'gentlespirit', 'kindheart', 'tendertouch', 'softpink', 'babypink',
  'cottoncandy', 'sweetpea', 'sugarplum', 'fairytale', 'storybook', 'pageturn',
  'bookworm', 'librarygray', 'scholargreen', 'ivyleague', 'prepschool', 'oldschool',
  'vintagedenim', 'bluejean', 'jacketblue', 'denimwash', 'fadedblue', 'skyblue',
  'babyblue', 'powderblue', 'periwinkleblue', 'cornflowerblue', 'azuresky', 'ceruleanblue',
  'tealblue', 'turquoisewater', 'aquamarine', 'caribbeanblue', 'tropicalsea', 'islandblue',
  'lagoonblue', 'paradisefound', 'oasisgreen', 'palmtree', 'coconutgrove', 'bananaleaf',
  'junglegreen', 'rainforest', 'mossgreen', 'ferngreen', 'huntergreen', 'pinetree',
  'evergreen', 'cedarchest', 'mahogonywood', 'walnutbrown', 'chestnutbrown', 'hazelnut',
  'almondcream', 'pecanpie', 'maplesyrup', 'beehive', 'busybee', 'workerbee',
  'queenbee', 'bumblebee', 'butterflyblue', 'dragonfly', 'ladybug', 'lovebug',
  'junebug', 'firefly', 'lightningbug', 'glowworm', 'earthworm', 'bookmark',
  'watermark', 'trademark', 'questionmark', 'exclamationpoint', 'startingpoint', 'endpoint',
  'highpoint', 'lowpoint', 'turningpoint', 'breakingpoint', 'boilingpoint', 'meltingpoint',
  'freezingpoint', 'flashpoint', 'matchpoint', 'gamepoint', 'scoreboard', 'leaderboard',
  'surfboard', 'skateboard', 'snowboard', 'clipboard', 'keyboard', 'dashboard',
  'cardboard', 'cupboard', 'sideboard', 'baseboard', 'headboard', 'tailgate',
  'frontgate', 'backgate', 'gardengate', 'watergate', 'floodgate', 'startinggate',
  'finishline', 'goalline', 'touchdown', 'showdown', 'breakdown', 'meltdown',
  'countdown', 'sundown', 'moonrise', 'sunrise', 'highrise', 'lowrise',
  'earlybird', 'nighthawk', 'seahawk', 'blackhawk', 'warhawk', 'tomahawkred',
  'mohawkbrown', 'falcongray', 'eagleeye', 'birdeye', 'bullseye', 'privateeye',
  'evileye', 'thirdeye', 'blindside', 'brightside', 'darkside', 'flipside',
  'upside', 'downside', 'outside', 'inside', 'alongside', 'besidemanor',
  'roadside', 'hillside', 'mountainside', 'lakeside', 'riverside', 'waterside',
  'fireside', 'bedside', 'tableside', 'courtside', 'ringside', 'poolside',
  'doghouse', 'houseboat', 'boatrace', 'lighthouse', 'housekeeper', 'safeguard',
  'guardrail', 'railroad', 'roadtrip', 'tripwire', 'wirebrush', 'brushfire',
  'firework', 'workplace', 'boardwalk', 'walkway', 'wayside', 'sideshow',
  'showcase', 'casebook', 'markdown', 'shipshape', 'shapeshift', 'boardroom',
  'roommate', 'shipmate', 'pressroom', 'ballgame', 'gameplan', 'planhead',
  'headstart', 'startline', 'backpack', 'packrat', 'carwash', 'washout',
  'outdoor', 'doorbell', 'bellhop', 'hopscotch', 'scotchtape', 'tapeworm',
  'wormhole', 'holepunch', 'punchbowl', 'bowlcut', 'cutglass', 'glassware',
  'eyebrow', 'browbeat', 'beatbox', 'boxspring', 'springwater', 'waterfall',
  'fallout', 'outfit', 'testdrive', 'drivethrough', 'passthrough', 'password',
  'wordplay', 'playground', 'groundwork', 'workshop', 'shoplift', 'liftoff',
  'offset', 'setback', 'backfire', 'paperclip'
]);

export function canFormCompound(word1: string, word2: string): boolean {
  const compound = (word1 + word2).toLowerCase().replace(/\s+/g, '');
  return VALID_COMPOUNDS.has(compound);
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
    
    let currentWord = startWord;
    let consecutiveFailures = 0;
    
    while (chain.length < length && consecutiveFailures < 10) {
      const validNext = findValidNextWords(currentWord);
      
      if (validNext.length === 0) {
        consecutiveFailures++;
        // BUG FIX #1: Break and restart chain if stuck
        if (consecutiveFailures >= 3) break;
        continue;
      }
      
      const nextWord = validNext[Math.floor(Math.random() * validNext.length)];
      chain.push(nextWord);
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
  const hints: Record<string, string> = {
    house: 'A place to live', boat: 'Floats on water', race: 'Competition',
    car: 'Vehicle', flower: 'Grows in gardens', pot: 'Container',
    luck: 'Good fortune', charm: 'Brings luck', place: 'Location',
    holder: 'Contains things', space: 'Empty area', ship: 'Vessel',
    yard: 'Outdoor area', table: 'Furniture', cloth: 'Fabric',
    line: 'String or mark', dance: 'Movement', ball: 'Round object',
    park: 'Recreation area', bench: 'Seating', mark: 'Sign',
    down: 'Direction', town: 'Small city', side: 'Edge or border',
    walk: 'To move on foot', way: 'Path or route', show: 'Display',
    fall: 'To drop', out: 'Outside', water: 'H2O'
  };
  
  const wordLower = word.toLowerCase();
  if (hints[wordLower]) return hints[wordLower];
  if (prevWord) return `Forms compound with "${prevWord}"`;
  return `${word.length} letters`;
}
