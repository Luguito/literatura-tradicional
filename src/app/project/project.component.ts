import { Component, OnInit, NgModule } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  goToSection(section: string) {
    let element = document.getElementById(section)
    element.scrollIntoView({ block: 'center', behavior: 'smooth' });
    element.classList.add('intoView')
  }
}