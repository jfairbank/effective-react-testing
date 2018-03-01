/* eslint-disable class-methods-use-this */

import * as R from 'ramda'

export const Ready = 0
export const Loading = 1
export const Success = 2
export const Fail = 3

const hasStatus = status => (data = {}) => data.status === status

export const isReady = hasStatus(Ready)
export const isLoading = hasStatus(Loading)
export const isSuccess = hasStatus(Success)
export const isError = hasStatus(Fail)

export const ready = () => ({ status: Ready })
export const loading = () => ({ status: Loading })
export const success = payload => ({ status: Success, payload })
export const fail = payload => ({ status: Fail, payload })

export const map = R.curry(
  (f, data) => (isSuccess(data) ? { ...data, payload: f(data.payload) } : data),
)

export const unwrap = data => (isSuccess(data) ? data.payload : null)

export const check = (handlers, data) => handlers[data.status](data.payload)
