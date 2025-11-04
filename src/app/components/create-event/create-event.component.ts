import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  eventForm!: FormGroup

  constructor() { }

  ngOnInit() {
    this.eventForm = new FormGroup({
      creator: new FormControl(''),
      daytime: new FormControl(new Date),
      description: new FormControl(''),
      invites: new FormArray([]),
      name: new FormControl(''),
      participants: new FormArray([])
    })
  }

}
