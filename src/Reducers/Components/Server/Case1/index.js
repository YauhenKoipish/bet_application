import { combineReducers } from 'redux'

import { markets } from './Reducers/Markets'
import { marketsByNum } from './Reducers/MarketsByNum'
import { categories } from './Reducers/Categories'
import { sports } from './Reducers/Sports'
import { tournaments }from './Reducers/Tournaments'


export const case1 = combineReducers({
    markets,
    categories,
    sports,
    tournaments,
    marketsByNum
});
