import amqp, { Connection, Channel } from 'amqplib'
import { ConnectionInfoQueueDTO, InfoQueueDTO } from '../entities/dtos/queue.dto'
import { TodoInterface } from '../entities/interfaces/data/todo.interface'
import config from '../config/config'

class RabbitMQAdapter {
  private static instance: RabbitMQAdapter
  private channel: Channel
  private connection: Connection
  private connectionInfo: ConnectionInfoQueueDTO

  constructor(connection?: ConnectionInfoQueueDTO) {
    if (connection) this.connectionInfo = { ...connection }
    this.connect(this.connectionInfo)
  }

  public static getInstance(connection?: ConnectionInfoQueueDTO): RabbitMQAdapter {
    if (connection) RabbitMQAdapter.instance = new RabbitMQAdapter(connection)
    else if (!RabbitMQAdapter.instance) RabbitMQAdapter.instance = new RabbitMQAdapter()

    return RabbitMQAdapter.instance
  }

  private async connect(connectionInfo: ConnectionInfoQueueDTO) {
    try {
      let { username, password, host, port } = connectionInfo
      this.connection = await amqp.connect(`amqp://${username}:${password}@${host}:${port}`)
      console.log('RabbitMQ has connected')
    } catch (error) {
      console.log('**** error [rabbitmq] : ', error)
      throw error
    }
  }

  private getQueueName(queueInfo: InfoQueueDTO) {
    let { channel, country, queue } = queueInfo
    return config.queue.rabbitmq[channel][country][queue]
  }

  private async createChannel() {
    this.channel = await this.connection.createChannel()
  }

  public async sendTo(queueInfo: InfoQueueDTO, message: TodoInterface) {
    let data = JSON.stringify(message)
    let queueName = this.getQueueName(queueInfo)
    await this.createChannel()
    await this.channel.assertQueue(queueName, { durable: true })
    await this.channel.sendToQueue(queueName, Buffer.from(data))
    await this.channel.close()
  }
}

export default RabbitMQAdapter
