import cardElements from '../constants/cardElements.json';

export interface CardContent {
  title: string;
  description: string;
  pseudocode: string;
}

export function getRandomCardContent(): CardContent {
  const elements = cardElements.elements;
  const randomIndex = Math.floor(Math.random() * elements.length);
  return elements[randomIndex];
}

export function getRandomCardContents(count: number): CardContent[] {
  const elements = cardElements.elements;
  const shuffled = [...elements].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
} 