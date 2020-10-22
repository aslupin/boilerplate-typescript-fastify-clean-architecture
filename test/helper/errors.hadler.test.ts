import ErrorHandler from '../../src/helper/errors.handler'
import MockExpressResponse from 'mock-express-response'

describe('Error handler', () => {
  test('Should return success: 200 when call function response()', () => {
    const res = new MockExpressResponse()
    const expectedData = res.header('Content-Type', 'application/json;charset=utf-8').status(200)
    const data = {
      success: {
        code: 200,
        message: '200 : Save data is successfully',
      },
    }
    const result = ErrorHandler.response(data, res)
    expect(result).toBe(expectedData)
  })

  test('Should return error: 400 when call function response()', () => {
    const res = new MockExpressResponse()
    const expectedData = res.header('Content-Type', 'application/json;charset=utf-8').status(400)
    const data = {
      error: {
        code: 400,
        message: '400 : Save is not successfully',
      },
    }
    const result = ErrorHandler.response(data, res)
    expect(result).toBe(expectedData)
  })

  test('Should return error: 403 when call function response()', () => {
    const res = new MockExpressResponse()
    const expectedData = res.header('Content-Type', 'application/json;charset=utf-8').status(403)
    const data = {
      error: {
        code: 403,
        message: '403 : Forbidden',
      },
    }
    const result = ErrorHandler.response(data, res)
    expect(result).toBe(expectedData)
  })

  test('Should return error: 404 when call function response()', () => {
    const res = new MockExpressResponse()
    const expectedData = res.header('Content-Type', 'application/json;charset=utf-8').status(404)
    const data = {
      error: {
        code: 404,
        message: '404 : Not found',
      },
    }
    const result = ErrorHandler.response(data, res)
    expect(result).toBe(expectedData)
  })

  test('Should return error: 500 when call function response()', () => {
    const res = new MockExpressResponse()
    const expectedData = res.header('Content-Type', 'application/json;charset=utf-8').status(500)
    const data = {
      error: {
        code: 500,
        message: '500 : Internal Server Error',
      },
    }
    const result = ErrorHandler.response(data, res)
    expect(result).toBe(expectedData)
  })
})
