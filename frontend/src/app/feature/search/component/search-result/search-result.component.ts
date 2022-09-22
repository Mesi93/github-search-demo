import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GithubApiResults } from 'src/app/models/github-api-results';
import { addRepoHistory } from 'src/app/store/history/history-actions';
import { selectHistoryRepoListById } from 'src/app/store/history/history-selectors';
import { selectResults } from 'src/app/store/search/search-selectors';
export interface GithubRepo {
  searchId?: string;
  name: string;
  url: string;
  info: any;
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
export class SearchResultComponent implements AfterViewInit, OnDestroy {
  @Input() historyPage: boolean = false;
  repositories: GithubRepo[] = [];
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
  githubHistoryData$!: Observable<GithubApiResults[]>;
  githubHistoryData!: GithubApiResults[];
  totalCount: number = 0;
  searchId: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _store: Store) {
    this.dataSource = new MatTableDataSource();
    if (!this.historyPage) {
      this.githubData$ = this._store.pipe(select(selectResults));
      this.githubData$.subscribe((res: any) => {
        if (res) {
          this.repositories = [];
          this.totalCount = res.total_count;
          this.setDataSource(res.items);
        }
      });
    } else if (this.historyPage) {
      this.githubHistoryData$ = this._store.pipe(
        select(selectHistoryRepoListById(this.searchId))
      );
      this.githubHistoryData$.subscribe((res: any) => {
        if (res) {
          console.log('history repo', res);
          this.repositories = res;
          this.dataSource = new MatTableDataSource(this.repositories);
        }
      });
    }
  }

  ngOnDestroy() {
    this.repositories = [];
    this.dataSource = new MatTableDataSource(undefined);
  }

  addRepoToStore(repositories: GithubRepo[]) {
    this._store.dispatch(
      addRepoHistory({
        githubRepo: repositories,
      })
    );
  }

  setDataSource(githubResponse: GithubApiResults[]): void {
    githubResponse.forEach((repo: GithubApiResults) => {
      let repository: GithubRepo = {
        searchId: '1',
        name: repo.full_name,
        url: repo.html_url,
        ownerUrl: repo.owner.html_url,
        info: {
          watchers: repo.watchers,
          forks: repo.forks,
          stars: repo.stargazers_count,
          issues: repo.open_issues_count,
        },
        description: repo.description,
        languages: repo.language,
        date: { createdAt: repo.created_at, updatedAt: repo.updated_at },
        user: repo.owner.login,
        avatar: repo.owner.avatar_url,
      };
      this.repositories.push(repository);
      console.log('REPO', this.repositories);
      this.dataSource = new MatTableDataSource(this.repositories);
      let repos = JSON.parse(JSON.stringify(this.repositories));
      this.addRepoToStore(repos);
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
