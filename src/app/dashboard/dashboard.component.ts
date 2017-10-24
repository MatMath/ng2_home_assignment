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
  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngOnInit(): void {
    this.dashboardService.getResultList()
      .then(list => {
        this.resultList = list;
      });
  }

}
