import { Injectable } from '@angular/core';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class MockVideoService {
  private videos: Video[] = [
    { id: 1, title: 'Video 1', thumbnail_url: 'assets/thumbnail.png', video_url: 'assets/3042473-uhd_3840_2160_30fps.mp4', created_at: '2026-01-03T10:00:00Z', description: 'Description 1', tags: ['tag1','tag2'] },
    { id: 2, title: 'Video 2', thumbnail_url: 'assets/thumbnail.png', video_url: 'assets/3042473-uhd_3840_2160_30fps.mp4', created_at: '2025-12-21T09:00:00Z', description: 'Description 2', tags: ['tag1','tag2'] },
    { id: 3, title: 'Video 3', thumbnail_url: 'assets/thumbnail.png', video_url: 'assets/3042473-uhd_3840_2160_30fps.mp4', created_at: '2025-11-10T08:00:00Z', description: 'Description 3', tags: ['tag1','tag2'] },
    { id: 4, title: 'Video 4', thumbnail_url: 'assets/thumbnail.png', video_url: 'assets/3042473-uhd_3840_2160_30fps.mp4', created_at: '2026-01-01T12:00:00Z', description: 'Description 4', tags: ['tag1','tag2'] },
    { id: 5, title: 'Video 5', thumbnail_url: 'assets/thumbnail.png', video_url: 'assets/3042473-uhd_3840_2160_30fps.mp4', created_at: '2025-10-05T14:00:00Z', description: 'Description 5', tags: ['tag1','tag2'] },
    { id: 6, title: 'Video 6', thumbnail_url: 'assets/thumbnail.png', video_url: 'assets/3042473-uhd_3840_2160_30fps.mp4', created_at: '2025-12-30T18:30:00Z', description: 'Description 6', tags: ['tag1','tag2'] },
    { id: 7, title: 'Video 7', thumbnail_url: 'assets/thumbnail.png', video_url: 'assets/3042473-uhd_3840_2160_30fps.mp4', created_at: '2024-06-15T07:20:00Z', description: 'Description 7', tags: ['tag1','tag2'] },
    { id: 8, title: 'Video 8', thumbnail_url: 'assets/thumbnail.png', video_url: 'assets/3042473-uhd_3840_2160_30fps.mp4', created_at: '2026-01-02T16:45:00Z', description: 'Description 8', tags: ['tag1','tag2'] }
  ];

  constructor() {}

  getVideos(): Video[] {
    return this.videos;
  }

  getVideoById(id: number | string): Video | undefined {
    const nid = typeof id === 'string' ? parseInt(id, 10) : id;
    return this.videos.find(v => v.id === nid);
  }
}
