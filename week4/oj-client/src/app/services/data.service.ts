import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import { Problem } from '../data-structure/problem';
import { PROBLEMS } from '../mock-problems';

@Injectable()
export class DataService {
  // problems: Problem[] = PROBLEMS;
  private _problemSource = new BehaviorSubject<Problem[]>([]);
  constructor(private http: Http) { }

  getProblems(): Observable<Problem[]> {
    // return this.problems;
    this.http.get('/api/v1/problems')
      .toPromise()
      .then((res: Response) => {
        this._problemSource.next(res.json());
      })
      .catch(this.handleError);
    return this._problemSource.asObservable();
  }

  getProblem(id: number) {
    // return this.problems.find( (problem) => problem.id === id);
    return this.http.get(`/api/v1/problems/${id}`)
      .toPromise()
      .then((res: Response) => {
        this.getProblems();
        return res.json();
      })
      .catch(this.handleError);
  }

  // If need more than one headers, put headers and options as member variable  
  // headers: Headers = new Headers({'content-type': 'application/json'});
  // options: RequestOptions = new RequestOptions({ headers: this.headers });
  addProblem(problem: Problem) {
    // problem.id = this.problems.length + 1;
    // this.problems.push(problem);
    const headers = new Headers({'content-type': 'application/json'});
    const options = new RequestOptions({ headers: headers }); 
    
    return this.http.post('/api/v1/problems', problem, options)
      .toPromise()
      .then((res: Response) => {
        this.getProblems();
        return res.json();
      })
      .catch(this.handleError)
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error);
  }

  // // TODO: define a model
  public buildAndRun(data: any): Promise<Object> {
    const headers = new Headers({'content-type': 'application/json'});
    const options = new RequestOptions({ headers: headers }); 

    return this.http.post('/api/v1/build_and_run', data, options)
      .toPromise()
      .then((res: Response) => {
        console.log('in client side build and run ', res);
        return res.json();
      })
      .catch(this.handleError);
  }
}