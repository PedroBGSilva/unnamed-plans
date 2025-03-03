import { Component, Input, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { AppEvent } from '../../interfaces/event.interface';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  @Input() user: any;

  events: AppEvent[] = [];

  constructor(
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.firestoreService.getDocuments('events', 'creator', this.user.email)
      .then((result: any) => {
        result.forEach((element: any) => {
          element.data.daytime = new Date(element.data.daytime.seconds * 1000 + Math.floor(element.data.daytime.nanoseconds / 1e6))
          this.events.push(element.data);
        });
      }).catch(() => { });
  }
}
