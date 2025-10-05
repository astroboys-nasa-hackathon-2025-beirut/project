import data from './placeholder-videos.json';

export type VideoPlaceholder = {
  id: string;
  description: string;
  videoUrl: string;
  videoHint: string;
};

export const PlaceHolderVideos: VideoPlaceholder[] = data.placeholderVideos;
