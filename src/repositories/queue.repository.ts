import RabbitMQAdapter from '../adapters/rabbitmq.adapter'
import { InfoQueueDTO } from '../entities/dtos/queue.dto'
import { TodoInterface } from '../entities/interfaces/data/todo.interface'

class QueueRepository {
  public async sendTo(country: string, message: TodoInterface) {
    const queueInfo: InfoQueueDTO = {
      channel: 'twitter',
      country: country,
      queue: 'backward',
    }
    const queue = RabbitMQAdapter.getInstance()
    await queue.sendTo(queueInfo, message)
  }
}

export default QueueRepository
