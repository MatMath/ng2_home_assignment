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
        // Here we dont need to fix the standars but why not.
        const tmp = response.json().data.map(blog => {
          const standards = blog.content.resource.standards;
          if (standards && standards.standard) {
            blog.content.resource.standards.standard = this.fixStandarsObjToArray(standards.standard);
          }
          return blog;
        })
        return tmp as ResultSchema[];
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
        // API should be consistent witgh the Array vs Object.
        const standards = tmp[0].content.resource.standards
        if (standards && standards.standard) {
          tmp[0].content.resource.standards.standard = this.fixStandarsObjToArray(standards.standard);
        }
        return  tmp[0] as ResultSchema;
      })
      .catch(this.handleError);
  }

  private fixStandarsObjToArray(stnd) {
    // API is not consistent so I have to uniformise it.
    if (Array.isArray(stnd)) {
        return stnd;
    }
    return [stnd];
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
};
