import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchParameters } from 'src/app/models/search-parameters';

@Injectable({
  providedIn: 'root',
})
export class GithubApiService {
  url = 'https://api.github.com/search';

  constructor(private readonly http: HttpClient) {}

  getRepositories(parameters?: SearchParameters): Observable<any> {
    let params = '';
    if (parameters?.userName) {
      params += `users?q=${parameters.userName}&`;
    }
    if (parameters?.byName) {
      params += `repositories?q=${parameters.searchBy}&`;
    }
    if (parameters?.topic) {
      params += `&topics?q=${parameters.topic}&`;
    }
    console.log('params', params);
    return this.http.get<any>(this.url + '/' + params);
  }
}
