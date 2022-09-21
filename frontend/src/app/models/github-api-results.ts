export interface GithubApiResults {
  name: string;
  full_name: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  created_at: string;
  updated_at: string;
  language: string;
  description: string;
  forks: number;
  stargazers_count: number;
  open_issues_count: number;
  watchers: number;
}
