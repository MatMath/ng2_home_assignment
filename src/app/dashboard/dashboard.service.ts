import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ResultSchema } from '../classDefinition';

@Injectable()
export class DashboardService {
  private resultApi = 'app/apiresult';

  constructor(private http: Http) { }

  getResultList(): Promise<Array<ResultSchema>> {
    return this.http
      .get(this.resultApi)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
};
