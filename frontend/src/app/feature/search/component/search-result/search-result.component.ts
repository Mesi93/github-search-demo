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
import { Observable, Subject, takeUntil } from 'rxjs';
import { GithubApiResults } from 'src/app/models/github-api-results';
import { SearchIndexService } from 'src/app/service/search-index.service';
import { selectHistoryRepoList } from 'src/app/store/history/history-selectors';
import { selectResults } from 'src/app/store/search/search-selectors';
export interface GithubRepo {
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() historyPage: boolean = false;
  unsubscribe = new Subject<void>();
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
  searchIndex$: Observable<number> = this.searchIndexService.searchIndex$;

  constructor(
    private _store: Store,
    private readonly searchIndexService: SearchIndexService
  ) {
    this.dataSource = new MatTableDataSource();
    this.getGithubData();
    this.getHistory();
  }

  ngOnDestroy() {
    this.repositories = [];
    this.dataSource = new MatTableDataSource(undefined);
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  getGithubData(): void {
    if (!this.historyPage) {
      this.githubData$ = this._store.pipe(select(selectResults));
      this.githubData$
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((res: any) => {
          if (res && res?.items) {
            this.repositories = [];
            this.totalCount = res.total_count;
            this.setDataSource(res.items);
          }
        });
    }
  }

  getHistory(): void {
    this.searchIndex$.pipe(takeUntil(this.unsubscribe)).subscribe((index) => {
      this.githubHistoryData$ = this._store.pipe(
        select(selectHistoryRepoList(index))
      );
      this.githubHistoryData$
        .pipe(takeUntil(this.unsubscribe))
        .subscribe((res: GithubApiResults[]) => {
          if (res && res.length) {
            this.repositories = [];
            this.setDataSource(res);
          }
        });
    });
  }

  setDataSource(githubResponse: GithubApiResults[]): void {
    githubResponse.forEach((repo: GithubApiResults) => {
      let repository: GithubRepo = {
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
