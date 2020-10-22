import MongoAdapter from '../../src/adapters/mongo.adapter'

jest.mock('mongoose', () => ({
  connection: {
    on: (kind: string, fn: any) => {
      if (kind === 'error') fn(Error('error something'))
      else fn()
    },
  },
  connect: () => {
    console.log('connect')
  },
}))

describe('Mongo adapter', () => {
  test('Mongoose instance', async () => {
    // This test coverage two methods (this.connected and this.error)
    const expectedError = new Error('error something')
    expect(() => {
      new MongoAdapter('a', 'b', 'c', 1, 'd', 'e')
    }).toThrow(expectedError)
  })
})
