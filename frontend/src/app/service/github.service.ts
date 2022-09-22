import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchParameters } from 'src/app/models/search-parameters';
import { ParamsOption } from '../models/params-option.enum';

@Injectable({
  providedIn: 'root',
})
export class GithubApiService {
  url = 'https://api.github.com/search';

  constructor(private readonly http: HttpClient) {}

  getRepositories(parameters?: SearchParameters): Observable<any> {
    let params = `repositories?q=${parameters?.searchBy}`;

    if (parameters?.byDescription) {
      params += ` in:description`;
    }
    if (parameters?.byName) {
      params += ` in:name`;
    }
    if (parameters?.byReadme) {
      params += ` in:readme`;
    }
    if (parameters?.topics) {
      params += ` in:topics: ${parameters.topics}`;
    }
    if (parameters?.userName) {
      params += `&q=user:${parameters.userName}`;
    }
    if (parameters?.organization) {
      params += `&q=org:${parameters.organization}`;
    }
    if (parameters?.languages) {
      params += `&q=language:${parameters.languages}`;
    }

    if (parameters?.created === ParamsOption.Equal && parameters?.created) {
      params += ` created:${parameters.created}`;
    }
    if (parameters?.created === ParamsOption.Less && parameters?.created) {
      params += ` created:<${parameters.created}`;
    }
    if (parameters?.created === ParamsOption.Greater && parameters?.created) {
      params += ` created:>${parameters.created}`;
    }
    if (parameters?.createdBy === ParamsOption.Between && parameters?.created) {
      params += ` created:${parameters.createdStart}...${parameters.createdEnd}`;
    }
    if (parameters?.sizeBy === ParamsOption.Equal && parameters?.size) {
      params += ` size:${parameters.size}`;
    }
    if (parameters?.sizeBy === ParamsOption.Less && parameters?.size) {
      params += ` size:<${parameters.size}`;
    }
    if (parameters?.sizeBy === ParamsOption.Greater && parameters?.size) {
      params += ` size:>${parameters.size}`;
    }
    if (parameters?.sizeBy === ParamsOption.Between && parameters?.size) {
      params += ` size:${parameters.sizeStart}...${parameters.sizeEnd}`;
    }
    if (parameters?.starsBy === ParamsOption.Equal && parameters?.stars) {
      params += ` stars:${parameters.stars}`;
    }
    if (parameters?.starsBy === ParamsOption.Less && parameters?.stars) {
      params += ` stars:<${parameters.stars}`;
    }
    if (parameters?.starsBy === ParamsOption.Greater && parameters?.stars) {
      params += ` stars:>${parameters.stars}`;
    }
    if (parameters?.starsBy === ParamsOption.Between && parameters?.stars) {
      params += ` stars:${parameters.starsStart}...${parameters.starsEnd}`;
    }

    params += `&order=${parameters?.orderBy ? parameters?.orderBy : 'desc'}`;
    params += `&sort=${parameters?.sortBy ? parameters?.sortBy : 'default'}`;

    params += `&per_page=20`;

    console.log('params', params);
    return this.http.get<any>(this.url + '/' + params);
  }
}
