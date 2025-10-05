import data from './placeholder-audios.json';

export type AudioPlaceholder = {
  id: string;
  description: string;
  audioUrl: string;
  loop?: boolean;
  autoplay?: boolean;
};

export const PlaceHolderAudios: AudioPlaceholder[] = data.placeholderAudios;
