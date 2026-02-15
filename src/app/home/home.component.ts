import { Component, OnInit, OnDestroy } from '@angular/core';
import { Video } from '../models/video.model';
import { VideoService } from '../service/video.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

 

  constructor(private videoService: VideoService) {}

  recommendedVideos: Video[] = [];
  recentVideos: Video[] = [];
  private sub: Subscription | null = null;

  loadVideos() {

    this.videoService.getPopularVideos().subscribe(popular => {
      this.recommendedVideos = popular || [];
    }, () => {
      this.recommendedVideos = [];
    });

    this.videoService.getVideos().subscribe(videos => {
      this.recentVideos = [...videos].sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    });
  }

  ngOnInit() {
    this.loadVideos();
    this.sub = this.videoService.videosUpdated.subscribe(() => this.loadVideos());
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }

  isFuture(scheduledAt?: string): boolean {
    if (!scheduledAt) return false;
    return new Date(scheduledAt) > new Date();
  }

  isLive(video: Video | any): boolean {
    const scheduled = (video && (video.scheduled_at || video.scheduledAt));
    const duration = (video && (video.duration || video.duration === 0 ? video.duration : undefined));
    if (!scheduled || !duration) return false;
    const startTime = new Date(scheduled).getTime();
    const endTime = startTime + (Number(duration) * 1000);
    const now = Date.now();
    return now >= startTime && now <= endTime;
  }

  onVideoClick(video: Video | any) {
    const id = video?.id;
    if (!id) return;
  }

}
