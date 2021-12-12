import { Component, OnInit } from '@angular/core';
import { Grafo } from '../interfaces/grafo';
import { GraphqueriesService } from '../services/graphqueries.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {
  
  public data: Grafo;

  constructor(private dataService: GraphqueriesService) { 
    this.data = this.dataService.getData()
  }

  ngOnInit(): void {
  }

}
