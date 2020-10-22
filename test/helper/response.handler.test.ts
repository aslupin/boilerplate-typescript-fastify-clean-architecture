import responseHandler from '../../src/helper/response.handler'
import errorHandler from '../../src/helper/errors.handler'

jest.mock('../../src/helper/errors.handler')

describe('Response Handler', () => {
  test('should success when pass data', () => {
    const mockData = '200 : success'
    const res: any = {
      status: 200,
      body: {
        data: mockData,
      },
      send: jest.fn((data) => undefined),
    }

    const mockCallback = jest.fn(() => mockData)
    errorHandler.response = jest.fn().mockImplementation((data) => data)

    responseHandler(mockCallback, res)

    expect(res).toHaveProperty('status')
    expect(res).toHaveProperty('body')
    expect(res).toHaveProperty('send')
    expect(mockCallback.mock.calls.length).toBe(1)
    expect(mockCallback.mock.results[0].value).toBe(mockData)
  })

  test('should error when pass data and error on response handler method', async () => {
    const mockData = '200 : success'
    const res: any = {
      status: 200,
      body: {
        data: mockData,
      },
      send: jest.fn((data) => undefined),
    }

    const mockCallback = jest.fn(async () => {
      throw new Error('500 : Get profile from social api error')
    })
    errorHandler.response = jest.fn().mockImplementation((data) => data)

    responseHandler(mockCallback, res)

    expect(res).toHaveProperty('status')
    expect(res).toHaveProperty('body')
    expect(res).toHaveProperty('send')
    expect(mockCallback.mock.calls.length).toBe(1)
    await expect(mockCallback.mock.results[0].value).rejects.toThrow(Error('500 : Get profile from social api error'))
  })
})
