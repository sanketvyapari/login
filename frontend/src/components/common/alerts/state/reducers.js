import { combineReducers } from 'redux'
import { uniq } from 'ramda'
import { INIT_FLASHES, ADD_FLASHES, DELETE_FLASHES } from './actions'

function flashes(state = [], action) {
  switch (action.type) {
    case INIT_FLASHES:
      return action.flashes
    case ADD_FLASHES:
      return uniq(state.concat(action.flashes))
    case DELETE_FLASHES:
      return state.filter(f => !action.flashes.includes(f))
    default:
      return state
  }
}

const state = combineReducers({ flashes })

export default state
