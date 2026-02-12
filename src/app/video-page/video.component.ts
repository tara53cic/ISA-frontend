import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from '../models/video.model';
import { VideoService } from '../service/video.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, OnDestroy {
  video?: Video;
  liked = false;
  disliked = false;
  countdownDisplay: string = '';
  private countdownSub: Subscription | null = null;
  private streamSub: Subscription | null = null;
  isLiveFlag = false;

  @ViewChild('player', { static: false }) playerRef?: ElementRef<HTMLVideoElement>;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.videoService.getVideoById(id).subscribe(v => {
        this.video = v;
        if (this.isFuture(v?.scheduled_at)) {
          this.startCountdown(v!.scheduled_at!);
        }
      });

      this.streamSub = this.videoService.getStreamInfo(id).subscribe(info => {
        if (info && info.type === 'LIVE_SIMULATION') {
          this.isLiveFlag = true;
          setTimeout(() => {
            const el = this.playerRef?.nativeElement || (document.querySelector('video') as HTMLVideoElement | null);
            if (el && typeof info.offset === 'number') {
              try { el.currentTime = info.offset; } catch {}
            }
          }, 50);
        }
      }, () => {});
    }
  }

  ngOnDestroy(): void {
    if (this.countdownSub) { this.countdownSub.unsubscribe(); }
    if (this.streamSub) { this.streamSub.unsubscribe(); }
  }

  toggleLike() {
    this.liked = true;
    this.disliked = false;
  }

  toggleDislike() {
    this.disliked = true;
    this.liked = false;
  }

  public isFuture(scheduledAt?: string): boolean {
    if (!scheduledAt) return false;
    return new Date(scheduledAt).getTime() > Date.now();
  }

  private startCountdown(scheduledAt: string) {
    if (this.countdownSub) { this.countdownSub.unsubscribe(); }
    const target = new Date(scheduledAt).getTime();
    this.countdownSub = interval(1000).subscribe(() => {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        this.countdownDisplay = 'Starting...';
        this.countdownSub?.unsubscribe();
        const id = this.route.snapshot.paramMap.get('id');
        if (id) { this.videoService.getVideoById(id).subscribe(v => this.video = v); }
        return;
      }
      const s = Math.floor(diff / 1000) % 60;
      const m = Math.floor(diff / 60000) % 60;
      const h = Math.floor(diff / 3600000);
      this.countdownDisplay = (h ? h + 'h ' : '') + (m ? m + 'm ' : '') + s + 's';
    });
  }
}
