export interface Favorite {
  id: number;
  profileId: number;
  videoId: number;
  addedAt: Date;
  video?: VideoInfo;
}

export interface VideoInfo {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  trailerUrl?: string;
  duration: string;
  type: VideoType;
  categoryName: string;
  averageRating?: number;
  totalViews?: number;
}

export interface AddFavoriteDto {
  profileId: number;
  videoId: number;
}

export interface FavoriteResponse {
  message: string;
}

export enum VideoType {
  Movie = 0,
  Series = 1,
  Documentary = 2
}