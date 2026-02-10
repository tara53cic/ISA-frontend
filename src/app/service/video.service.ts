import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl = 'http://localhost:8082/api/videos';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<Video[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(arr => arr.map(r => this.toVideo(r)))
    );
  }

  getVideoById(id: number | string): Observable<Video> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      map(r => this.toVideo(r))
    );
  }

  private toVideo(raw: any): Video {
    const thumb = raw?.thumbnail ? String(raw.thumbnail).replace(/\\/g, '/') : '';
    const vid = raw?.videoPath ? String(raw.videoPath).replace(/\\/g, '/') : '';
    const thumbnail_url = thumb ? (thumb.startsWith('http') ? thumb : `http://localhost:8082/${thumb}`) : '';
    const video_url = vid ? (vid.startsWith('http') ? vid : `http://localhost:8082/${vid}`) : '';

    let created_at = '';
    if (Array.isArray(raw?.createdAt)) {
      try {
        const parts = raw.createdAt;
        created_at = new Date(parts[0], (parts[1] || 1) - 1, parts[2] || 1, parts[3] || 0, parts[4] || 0, parts[5] || 0).toISOString();
      } catch {
        created_at = '';
      }
    } else if (raw?.createdAt) {
      created_at = String(raw.createdAt);
    }

    return {
      id: raw?.id,
      title: raw?.title,
      description: raw?.description,
      tags: raw?.tags,
      thumbnail_url,
      video_url,
      created_at,
      location: typeof raw?.location === 'object' ? raw.location : undefined
    } as Video;
  }
}
