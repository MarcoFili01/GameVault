export interface Game {
  id?: number;
  title: string;
  platform: string;
  genre?: string;
  tips: string[];
  saves: { name: string; note?: string }[];
}
