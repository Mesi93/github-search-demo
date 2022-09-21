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
}
