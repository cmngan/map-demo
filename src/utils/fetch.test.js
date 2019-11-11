import * as config from '../config'
import _fetch, { NO_API_ENDPOINT_ERROR } from './fetch'

const mockEndpoint = 'https://foo.bar.org'

const mockFetchOnce = (status, jsonOrText) => jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
  new Promise((resolve, reject) => {
    resolve({
      status,
      json: () => jsonOrText,
      text: () => jsonOrText,
    })
  })
)

beforeEach(() => {
  config.BACKEND_API_ENDPOINT = mockEndpoint
})

describe('custom fetch', () => {
  it('should throw error when there is no api endpoint', () => {
    config.BACKEND_API_ENDPOINT = ''
    expect(() => _fetch('/foo')).toThrowError(NO_API_ENDPOINT_ERROR)
  })
  it('should throw error when server response with status code >= 400', async () => {
    const errorMessage = 'error foo'
    mockFetchOnce(500, errorMessage)
    await _fetch('/foo').catch(e => expect(e.message).toMatch(errorMessage))
    expect(global.fetch).toHaveBeenCalledTimes(1)
    global.fetch.mockClear()
  })
  it('should throw error if get failure status', async () => {
    const errorMessage = 'error foo'
    mockFetchOnce(200, {
      status: 'failure',
      error: errorMessage
    })
    await _fetch('/foo').catch(e => expect(e.message).toBe(errorMessage))
    expect(global.fetch).toHaveBeenCalledTimes(1)
    global.fetch.mockClear()
  })
  it('should retry if get in progress status', async () => {
    mockFetchOnce(200, { status: 'in progress' })
    mockFetchOnce(200, { status: 'in progress' })
    mockFetchOnce(200, {})
    await _fetch('/foo')
    expect(global.fetch).toHaveBeenCalledTimes(3)
    global.fetch.mockClear()
  })
  it('should get response successfully', async () => {
    mockFetchOnce(200, {})
    await _fetch('/foo')
    expect(global.fetch).toHaveBeenCalledTimes(1)
    global.fetch.mockClear()
  })
})