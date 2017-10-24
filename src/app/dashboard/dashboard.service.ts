import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { ResultSchema } from '../classDefinition';

@Injectable()
export class DashboardService {
  private resultApi = 'app/apiresult';

  constructor(private http: Http) { }

  getResultList(): Promise<Array<ResultSchema>> {
    // Normally this should be a call to a API that have only the required data (minimalist, not a dump with all details)
    return this.http
      .get(this.resultApi)
      .toPromise()
      .then((response) => {
        return response.json().data as ResultSchema[];
      })
      .catch(this.handleError);
  }

  getResultID(id: string): Promise<ResultSchema> {
    // Normally this should be a call to a API to fetch the Sub details and process in the API itself.
    return this.http
      .get(this.resultApi)
      .toPromise()
      .then((response) => {
        const tmp = response.json().data.filter(item => item.content.resource.id === id)
        return  tmp[0] as ResultSchema;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
};
