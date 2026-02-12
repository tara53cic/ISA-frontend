export interface Video {
  id?: number;
  title?: string;
  description?: string;
  tags?: string[];
  thumbnail_url: string;
  video_url: string;
  created_at: string; 
  scheduled_at?: string;
  duration?: number;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}