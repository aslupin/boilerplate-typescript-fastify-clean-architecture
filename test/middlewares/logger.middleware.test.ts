import loggerMiddleware from '../../src/middlewares/logger.middleware'

describe('loggerMiddleware', () => {
  test('should success when called ', () => {
    const req: any = {
      method: 'method datas',
      path: 'path data',
    }
    const res: any = null
    const mockCallback = jest.fn(() => true)
    loggerMiddleware(req, res, mockCallback)
    expect(mockCallback).toHaveBeenCalled()
  })
})
