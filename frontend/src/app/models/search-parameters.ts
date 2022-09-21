export interface SearchParameters {
  searchBy: string;
  byName?: boolean;
  byDescription?: boolean;
  byReadme?: boolean;
  userName?: string;
  organization?: string;
  languages?: string[];
  topic?: string[];
}
