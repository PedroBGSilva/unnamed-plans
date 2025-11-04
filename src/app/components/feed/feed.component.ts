import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { AppEvent, AppEventData } from '../../interfaces/event.interface';

@Component({
    selector: 'feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
    standalone: false
})
export class FeedComponent implements OnInit {
  @Input() user: any;

  segmentSelected = 'future';
  eventOpen = false;
  loading = true;

  futureEvents: AppEvent[] = [];
  oldEvents: AppEvent[] = [];
  invites: AppEvent[] = [];
  selectedEvent!: AppEventData | null;

  today = new Date();

  constructor(
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    Promise.all([
      this.getCreatedEvents(),
      this.getEvents()
      // this.getInvites()
    ]).then((results) => {
      this.processEvents(results);
    }).finally(() => {
      this.loading = false;
    });
  }

  openEvent(event: AppEventData) {
    this.selectedEvent = event;
    this.eventOpen = true;
  }

  closeEvent() {
    this.eventOpen = false;
  }

  createEvent() {
    this.selectedEvent = null;
    this.eventOpen = true;
  }

  private getCreatedEvents() {
    return new Promise((resolve, reject) => {
      this.firestoreService.getDocuments('events', 'creator', this.user.email, false)
        .then((result: any) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  private getEvents() {
    return new Promise((resolve, reject) => {
      this.firestoreService.getDocuments('events', 'participants', this.user.email, true)
        .then((result: any) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        });
    });
  }

  private getInvites() {
    this.firestoreService.getDocuments('events', 'invites', this.user.email, true)
      .then((result: any) => {
        result.forEach((element: any) => {
          element.data.daytime = new Date(element.data.daytime.seconds * 1000 + Math.floor(element.data.daytime.nanoseconds / 1e6))
          this.invites.push(element.data);
        });
      }).catch(() => { });
  }

  private processEvents(results: any) {
    results.forEach((result: any) => {
      result.forEach((element: any) => {
        element.data.daytime = new Date(element.data.daytime.seconds * 1000 + Math.floor(element.data.daytime.nanoseconds / 1e6));
        if (element.data.daytime > this.today) {
          this.futureEvents.push(element);
        } else {
          this.oldEvents.push(element);
        }
      });
    });
    this.futureEvents = this.futureEvents.sort((a: any, b: any) => a.data.daytime - b.data.daytime);
    this.oldEvents = this.oldEvents.sort((a: any, b: any) => b.data.daytime - a.data.daytime);
  }
}
