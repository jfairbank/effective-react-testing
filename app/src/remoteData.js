import * as R from 'ramda'

export const Ready = 0
export const Loading = 1
export const Success = 2
export const Fail = 3

const hasStatus = R.propEq('status')

export const isReady = hasStatus(Ready)
export const isLoading = hasStatus(Loading)
export const isSuccess = hasStatus(Success)
export const isFail = hasStatus(Fail)

export const ready = () => ({ status: Ready })
export const loading = () => ({ status: Loading })
export const success = payload => ({ status: Success, payload })
export const fail = error => ({ status: Fail, error })

const payloadLens = R.lensProp('payload')
const getPayload = R.view(payloadLens)
const mapPayload = R.over(payloadLens, R.__)

export const map = R.curry(
  // (f, data) => (isSuccess(data) ? { ...data, payload: f(data.payload) } : data),
  (f, data) => (isSuccess(data) ? mapPayload(f, data) : data),
)

// export const payload = data => (isSuccess(data) ? data.payload : null)
export const payload = R.ifElse(isSuccess, getPayload, R.always(null))
export const error = R.ifElse(isFail, R.prop('error'), R.always(null))
export const status = R.prop('status')

export const check = (handlers, data) => handlers[data.status](data.payload)
