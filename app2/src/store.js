import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'

// const logMiddleware = api => next => action => {
//   const result = next(action)
//   const state = api.getState()
//   console.log({ action, state })
//   return result
// }

export const configureStore = () =>
  createStore(reducer, applyMiddleware(thunkMiddleware))
