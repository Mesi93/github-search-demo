import { DatePipe } from '@angular/common';
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

  constructor(private readonly http: HttpClient, public datepipe: DatePipe) {}

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
    if (parameters?.topics && Array.isArray(parameters.topics.length)) {
      params += ` topic: ${
        Array.isArray(parameters.topics)
          ? parameters.topics.join(',')
          : parameters.topics
      }`;
    }
    if (parameters?.languages && Array.isArray(parameters.languages.length)) {
      params += ` language:${
        Array.isArray(parameters.languages)
          ? parameters.languages.join(',')
          : parameters.languages
      }`;
    }
    if (parameters?.createdBy === ParamsOption.Equal && parameters?.created) {
      params += ` created:${this.datepipe.transform(
        parameters.created,
        'yyyy-MM-dd'
      )}`;
    }
    if (parameters?.createdBy === ParamsOption.Less && parameters?.created) {
      params += ` created:<${this.datepipe.transform(
        parameters.created,
        'yyyy-MM-dd'
      )}`;
    }
    if (parameters?.createdBy === ParamsOption.Greater && parameters?.created) {
      params += ` created:>${this.datepipe.transform(
        parameters.created,
        'yyyy-MM-dd'
      )}`;
    }
    if (parameters?.createdBy === ParamsOption.Between && parameters?.created) {
      params += ` created:${this.datepipe.transform(
        parameters.createdStart,
        'yyyy-MM-dd'
      )}...${this.datepipe.transform(parameters.createdEnd, 'yyyy-MM-dd')}`;
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
    if (parameters?.sortBy && parameters.sizeBy !== 'default') {
      params += `&sort=${parameters?.sortBy}`;
    }
    if (parameters?.orderBy) {
      params += `&order=${parameters?.orderBy}`;
    }
    return this.http.get<any>(this.url + '/' + params);
  }
}
