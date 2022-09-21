import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchParameters } from 'src/app/models/search-parameters';

@Injectable({
  providedIn: 'root',
})
export class GithubApiService {
  // https://api.github.com/search/repositories?q=language:Java+created:>=2013-04-11T00:00:00Z&order=asc
  url = 'https://api.github.com/search';

  constructor(private readonly http: HttpClient) {}

  getRepositories(parameters?: SearchParameters): Observable<any> {
    let params = `repositories?q=${parameters?.searchBy}&`;
    if (parameters?.userName) {
      params += `users?q=${parameters.userName}&`;
    }

    if (parameters?.languages) {
      params += `language:Java&`;
    }
    if (parameters?.topic) {
      params += `topics?q=${parameters.topic}&`;
    }
    params += `order=${parameters?.orderBy ? parameters?.orderBy : 'desc'}&`;
    params += `sort=${parameters?.sortBy ? parameters?.sortBy : 'default'}&`;

    if (parameters?.byDescription) {
      params += ` in:description`;
    }
    if (parameters?.byName) {
      params += ` in:name`;
    }
    if (parameters?.byReadme) {
      params += ` in:readme`;
    }
    params += `&per_page=5`;

    console.log('params', params);
    return this.http.get<any>(this.url + '/' + params);
  }
}
