import { Record, List } from 'immutable'
import {
  CATALOG_PAGE_LOAD_FAIL,
  CATALOG_PAGE_LOAD,
  CATALOG_PAGE_LOAD_SUCCESS,
  ICatalogState,
  CatalogActionTypes,
} from './catalogTypes'

const InitialState = Record<ICatalogState>({
  title: '',
  loading: true,
  error: false,
  products: List([]),
})

const reducer = (
  state = new InitialState(),
  action: CatalogActionTypes
): ICatalogState => {
  switch (action.type) {
    case CATALOG_PAGE_LOAD:
      return state.set('loading', true).set('error', false)
    case CATALOG_PAGE_LOAD_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('products', List(action.payload.products))
        .set('title', action.payload.title)
    case CATALOG_PAGE_LOAD_FAIL:
      return state.set('loading', false).set('error', action.error)
    default:
      return state
  }
}
export default reducer
