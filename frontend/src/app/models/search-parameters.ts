export interface SearchParameters {
  searchId: string;
  searchBy: string;
  byName?: boolean;
  byDescription?: boolean;
  byReadme?: boolean;
  userName?: string;
  organization?: string;
  languages?: string[];
  topics?: string[];
  sortBy?: string;
  orderBy?: string;
  stars?: string;
  starsBy?: string;
  starsStart?: string;
  starsEnd?: string;
  created?: string;
  createdBy?: string;
  createdStart?: string;
  createdEnd?: string;
  size?: string;
  sizeBy?: string;
  sizeStart?: string;
  sizeEnd?: string;
}
