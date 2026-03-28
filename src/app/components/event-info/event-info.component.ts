import { Component, Input, OnInit } from '@angular/core';
import { AppEventData } from '../../interfaces/event.interface';
import { FirestoreService } from '../../services/firestore.service';

@Component({
    selector: 'event-info',
    templateUrl: './event-info.component.html',
    styleUrls: ['./event-info.component.scss'],
    standalone: false
})
export class EventInfoComponent implements OnInit {
  @Input() event!: AppEventData;

  loading = true;

  constructor(
    private firebaseStorage: FirestoreService
  ) { }

  async ngOnInit() {
    await this.processEvent();
    this.loading = false;
  }

  private async processEvent() {
    this.event.creator = await this.firebaseStorage.getUserName(this.event.creator);
    this.event.participants = await Promise.all(this.event.participants.map(
      participant => this.firebaseStorage.getUserName(participant)
    ));
  }
}