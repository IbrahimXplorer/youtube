import {PersistConfig} from 'redux-persist';

import {RootState} from '@/store/store';
import { reduxStorage } from './storage';


export const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage: reduxStorage,
  whitelist: [], // Only persist specific slices
  blacklist: [], // do not persist these specific slices
};
