import { Component, Input, Output, EventEmitter, OnInit, HostListener } from '@angular/core';


@Component({
  selector: 'sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Input() namePage:string = '';
  @Input() display:boolean = true;

  @Output() closeEvent: EventEmitter<any> = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
    this.isSidebarDisplayed();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isSidebarDisplayed();
  }

  private isSidebarDisplayed() {
    if (window.innerWidth <= 768) {
      this.display = false;
    } else {
      this.display = true;
    }
  }

}
