import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  detailView: ResultSchema;
  listView: boolean = true;
  id: string;

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
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
       this.id = params['id'];
       if (this.id) {
         this.dashboardService.getResultID(this.id)
           .then(item => {
             this.listView = false;
             this.detailView = item;
          });
       } else {
         this.dashboardService.getResultList()
           .then(list => {
             this.listView = true;
             this.resultList = list;
             this.orderedList = list;
             this.collectionSize = list.length;
           });
       }
    });
  }

  sortByItem(name: keyof ResultSchema):void {
    if(name === this.activeFilter) {
      this.reverse = !this.reverse;
    }
    this.activeFilter = name;

    const tmp = this.resultList.sort(function(prev, curr) {
      if(name) { return prev.content.resource[name].localeCompare(curr.content.resource[name])}
      return 1;
    });

    this.orderedList = (this.reverse) ? tmp.reverse() : tmp;
  }

  switchPageTo(nbr:number):void {
    this.fromNbr = (nbr - 1)*this.pageSize;
    this.toNbr = nbr*this.pageSize;
  }

  showDetails(id) {
    this.router.navigate(['/dashboard', id]);
  }

}
