import * as R from 'ramda'
import * as RemoteData from 'src/remoteData'

describe('map', () => {
  let subject

  beforeEach(() => {
    subject = RemoteData.map
  })

  it('maps over success values', () => {
    const data = RemoteData.success('hello')

    const result = subject(R.toUpper, data)

    expect(result.payload).toEqual('HELLO')
  })

  it('ignores other values', () => {
    const dataItems = {
      ready: RemoteData.ready(),
      loading: RemoteData.loading(),
      fail: RemoteData.fail(new Error('Uh oh')),
    }

    const result = R.map(subject(() => 'bad'), dataItems)

    expect(result.ready.payload).toBeUndefined()
    expect(result.loading.payload).toBeUndefined()
    expect(result.fail.payload).toBe(dataItems.fail.payload)
  })
})

describe('payload', () => {
  it('returns payload from success', () => {
    const data = RemoteData.success(42)

    const result = RemoteData.payload(data)

    expect(result).toEqual(42)
  })

  it('returns null for others', () => {
    const dataItems = {
      ready: RemoteData.ready(),
      loading: RemoteData.loading(),
      fail: RemoteData.fail(new Error('Uh oh')),
    }

    const result = R.map(RemoteData.payload, dataItems)

    expect(result.ready).toBeNull()
    expect(result.loading).toBeNull()
    expect(result.fail).toBeNull()
  })
})

describe('error', () => {
  it('returns error from fail', () => {
    const data = RemoteData.fail('Uh oh')

    const result = RemoteData.error(data)

    expect(result).toEqual('Uh oh')
  })

  it('returns null for others', () => {
    const dataItems = {
      ready: RemoteData.ready(),
      loading: RemoteData.loading(),
      success: RemoteData.success(42),
    }

    const result = R.map(RemoteData.error, dataItems)

    expect(result.ready).toBeNull()
    expect(result.loading).toBeNull()
    expect(result.success).toBeNull()
  })
})
