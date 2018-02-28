export const READY = 0
export const LOADING = 1
export const SUCCESS = 2
export const ERROR = 3

const hasStatus = status => (data = {}) => data.status === status

export const isReady = hasStatus(READY)
export const isLoading = hasStatus(LOADING)
export const isSuccess = hasStatus(SUCCESS)
export const isError = hasStatus(ERROR)

export const map = (data, f) =>
  isSuccess(data) ? { ...data, payload: f(data.payload) } : data

const addMapMethod = data => ({ ...data, map: f => map(data, f) })

export const ready = () => addMapMethod({ status: READY })
export const loading = () => addMapMethod({ status: LOADING })
export const success = payload => addMapMethod({ status: SUCCESS, payload })
export const error = payload => addMapMethod({ status: ERROR, payload })

export const check = (handlers, data) => handlers[data.status](data.payload)
