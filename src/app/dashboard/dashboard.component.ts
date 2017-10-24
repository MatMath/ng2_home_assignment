import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

//custom files
import { DashboardService } from './dashboard.service';

import { ResultSchema } from '../classDefinition';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  resultList: ResultSchema[];
  orderedList: ResultSchema[];

  // Pagination param
  collectionSize: number;
  pageSize:number = 5;
  page: number = 1;
  fromNbr:number = 0;
  toNbr:number = 5;

  // Filter
  activeFilter:string;
  reverse:boolean = false;

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.dashboardService.getResultList()
      .then(list => {
        this.resultList = list;
        this.orderedList = list;
        this.collectionSize = list.length;
      });
  }

  sortByItem(name:string):void {
    if(name === this.activeFilter) {
      this.reverse = !this.reverse;
    }
    this.activeFilter = name;

    const tmp = this.resultList.sort(function(prev, curr) {
      // TODO: How to make Typescript happy with resource.[name] ???
      if(name === 'resource_type') { return prev.content.resource.resource_type.localeCompare(curr.content.resource.resource_type)}
      if(name === 'display_title') { return prev.content.resource.display_title.localeCompare(curr.content.resource.display_title)}
      if(name === 'media_type') { return prev.content.resource.media_type.localeCompare(curr.content.resource.media_type)}
      if(name === 'language') { return prev.content.resource.language.localeCompare(curr.content.resource.language)}
      return 1;
    });

    this.orderedList = (this.reverse) ? tmp.reverse() : tmp;
  }

  switchPageTo(nbr:number):void {
    this.fromNbr = (nbr - 1)*this.pageSize;
    this.toNbr = nbr*this.pageSize;
  }

}
