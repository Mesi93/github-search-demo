import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GithubApiResults } from 'src/app/models/github-api-results';
import { selectResults } from 'src/app/store/search/search-selectors';
export interface tableDataModel {
  name: string;
  url: string;
  info: string;
  description: string;
  languages: string;
  date: any;
  user: string;
  avatar: string;
  ownerUrl: string;
}
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements AfterViewInit {
  repositories: tableDataModel[] = [];
  displayedColumns: string[] = [
    'name',
    'info',
    'description',
    'languages',
    'date',
    'user',
    'avatar',
  ];
  dataSource: MatTableDataSource<any>;
  githubData$!: Observable<GithubApiResults[]>;
  githubData!: GithubApiResults[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _store: Store) {
    this.dataSource = new MatTableDataSource();
    this.githubData$ = this._store.pipe(select(selectResults));
    this.githubData$.subscribe((res: any) => {
      if (res) {
        this.repositories = [];
        this.setDataSource(res.items);
      }
    });
  }

  setDataSource(data: any[]): void {
    data.forEach((d: GithubApiResults) => {
      let repo: tableDataModel = {
        name: d.full_name,
        url: d.html_url,
        ownerUrl: d.owner.html_url,
        info: 'asas',
        description: d.description,
        languages: d.language,
        date: { createdAt: d.created_at, updatedAt: d.updated_at },
        user: d.owner.login,
        avatar: d.owner.avatar_url,
      };
      this.repositories.push(repo);
      console.log('REPO', this.repositories);
      this.dataSource = new MatTableDataSource(this.repositories);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUrl(url: string): void {
    window.open(url, '_blank');
  }
}
