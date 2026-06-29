import type { Practice, PracticeCategory, Rating } from '@sharedTypes/practice';

const LIBRARY: Record<PracticeCategory, { titles: string[]; descriptions: string[] }> = {
  movement: {
    titles: ['Morning Mobility', 'Sun Salutations', 'Brisk Walk', 'Desk Stretch', 'Evening Yoga'],
    descriptions: [
      'Loosen up the spine and hips with a gentle flow to start the day.',
      'A short sequence to wake the body and build heat.',
      'Get outside and move at a pace that lets you still hold a conversation.',
    ],
  },
  breath: {
    titles: ['Box Breathing', '4-7-8 Breath', 'Coherent Breathing', 'Wim Hof Round', 'Alternate Nostril'],
    descriptions: [
      'Inhale, hold, exhale and hold for equal counts to settle the nervous system.',
      'A calming pattern that lengthens the exhale to downshift before sleep.',
      'Slow, even breaths at around six per minute to find a steady rhythm.',
    ],
  },
  reflection: {
    titles: ['Gratitude Journal', 'Daily Intention', 'Evening Review', 'Thought Download', 'Wins of the Day'],
    descriptions: [
      'Write down three things you are grateful for and why they mattered.',
      'Name one intention for the day and the first small step toward it.',
      'Look back on the day without judgement and note what you learned.',
    ],
  },
  rest: {
    titles: ['Body Scan', 'Yoga Nidra', 'Power Nap', 'Screen-Free Pause', 'Legs Up the Wall'],
    descriptions: [
      'Move attention slowly through the body, releasing tension as you go.',
      'A guided rest that brings you to the edge of sleep while staying aware.',
      'Step away from screens and let the eyes and mind soften for a few minutes.',
    ],
  },
};

const CATEGORIES: PracticeCategory[] = ['movement', 'breath', 'reflection', 'rest'];

const pick = <T>(arr: readonly T[], seed: number): T => arr[seed % arr.length] ?? (arr[0] as T);

const buildPractice = (index: number): Practice => {
  const category = pick(CATEGORIES, index);
  const lib = LIBRARY[category];
  const completed = index % 7 === 0;
  const rating: Rating = completed ? (((index % 5) + 1) as Exclude<Rating, null>) : null;

  return {
    id: `practice-${index + 1}`,
    title: `${pick(lib.titles, index)} #${index + 1}`,
    description: pick(lib.descriptions, index),
    duration_minutes: pick([5, 10, 15, 20, 30], index),
    category,
    completed_today: completed,
    rating,
  };
};

export const createSeedPractices = (count: number): Practice[] =>
  Array.from({ length: count }, (_, i) => buildPractice(i));
