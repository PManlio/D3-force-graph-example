import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'VolevaEssereUnTestConApolloGraphQL,eInvece...';

  public switch: boolean;

  constructor() { }

  ngOnInit(): void {
    this.switch = true;
  }

  public onSwitch(): boolean {
    this.switch = this.switch ? false : true;
    return this.switch
  }
}