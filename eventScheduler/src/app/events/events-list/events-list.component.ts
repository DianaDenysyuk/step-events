import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import Event from "../../models/event";
import {EventService} from "../event.service";

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  @ViewChild('eventInput', { static: false }) eventInputRef: ElementRef;
  @ViewChild('descInput', { static: false }) descInputRef: ElementRef;
  @ViewChild('iconInput', { static: false }) iconInputRef: ElementRef;
  @ViewChild('skillInput', { static: false }) skillInputRef: ElementRef;
  @Output() getSelectedEvent = new EventEmitter<Event>();
  events: Event[];
  constructor(private eventService: EventService ) { }

  ngOnInit() {
    this.events = this.eventService.getAllEvents();
  }

  onEventSelected(event: Event){
    this.getSelectedEvent.emit(event);
  }
  onAddEvent(){
    const newEvent = this.eventInputRef.nativeElement.value;
    const newDesc = this.descInputRef.nativeElement.value;
    const newIcon = this.iconInputRef.nativeElement.value;
    const newEvents = new Event(newEvent, newDesc, newIcon, null);
    this.eventService.pushEvent(newEvents);
    this.events = this.eventService.getAllEvents();

  }

}
