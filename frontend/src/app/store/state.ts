import { HistoryState } from './history/history-reducer';
import { SearchState } from './search/search-reducer';

export interface AppState {
  search: SearchState;
  history: HistoryState;
}
