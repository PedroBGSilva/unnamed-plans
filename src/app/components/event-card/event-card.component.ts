import { Component, Input, OnInit } from '@angular/core';
import { AppEvent } from 'src/app/interfaces/event.interface';

@Component({
  selector: 'event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent implements OnInit {
  @Input() data!: AppEvent;

  constructor() { }

  ngOnInit() { }

}
