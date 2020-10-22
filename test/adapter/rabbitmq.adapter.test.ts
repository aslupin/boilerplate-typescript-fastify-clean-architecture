import RabbitMQAdapter from '../../src/adapters/rabbitmq.adapter'
import { TodoInterface } from '../../src/entities/interfaces/data/todo.interface'
import amqp from 'amqplib'

jest.mock('amqplib')

describe('RabbitMQ adapter', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.resetModuleRegistry()
  })

  test('RabbitMQ get instance:instance not exist (getInstance method)', async () => {
    amqp.connect = jest.fn().mockResolvedValue(123)
    const queue = await RabbitMQAdapter.getInstance()
    expect(queue.constructor).toBeTruthy()
  })

  test('RabbitMQ initial instance by getInstance', async () => {
    amqp.connect = jest.fn().mockResolvedValue(123)

    const connection = {
      username: 'root',
      password: 'root',
      host: 'localhost',
      port: 123,
    }
    const queue = await RabbitMQAdapter.getInstance(connection)
    expect(queue.constructor).toBeTruthy()
  })

  test('RabbitMQ get instance:instance exist (new operand)', async () => {
    amqp.connect = jest.fn().mockResolvedValue(123)

    const connection = {
      username: 'root',
      password: 'root',
      host: 'localhost',
      port: 123,
    }
    await RabbitMQAdapter.getInstance(connection)
    const queue = await new RabbitMQAdapter()
    expect(queue.constructor).toBeTruthy()
  })

  test('RabbitMQ connect error', async () => {
    const expectedError = new Error('error something')
    amqp.connect = jest.fn().mockRejectedValue(new Error('error something'))

    const connection = {
      username: 'root',
      password: 'root',
      host: 'localhost',
      port: 123,
    }

    try {
      await RabbitMQAdapter.getInstance(connection)
    } catch (error) {
      expect(error).toThrow(expectedError)
    }
  })

  test('RabbitMQ instance exist', async () => {
    amqp.connect = jest.fn().mockResolvedValue(123)

    const connection = {
      username: 'root',
      password: 'root',
      host: 'localhost',
      port: 123,
    }
    await RabbitMQAdapter.getInstance(connection)
    const queue = await RabbitMQAdapter.getInstance()
    expect(queue.constructor).toBeTruthy()
  })

})
