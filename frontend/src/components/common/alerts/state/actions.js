export const INIT_FLASHES = 'INIT_FLASHES'

export const initFlashes = (flashes) => {
  return { type: INIT_FLASHES, flashes }
}

export const ADD_FLASHES = 'ADD_FLASHES'

export const addFlashes = (flashes) => {
  return { type: ADD_FLASHES, flashes }
}

export const DELETE_FLASHES = 'DELETE_FLASHES'

export const deleteFlashes = (flashes) => {
  return { type: DELETE_FLASHES, flashes }
}
