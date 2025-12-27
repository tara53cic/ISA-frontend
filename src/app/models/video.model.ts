export interface Video {
  id?: number;
  title?: string;
  description?: string;
  tags?: string[];
  thumbnail_url: string;
  video_url: string;
  created_at: string; 
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}