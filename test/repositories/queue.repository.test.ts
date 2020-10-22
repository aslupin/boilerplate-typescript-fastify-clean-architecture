import QueueRepository from '../../src/repositories/queue.repository'
import RabbitMQAdapter from '../../src/adapters/rabbitmq.adapter'
import { TodoInterface } from '../../src/entities/interfaces/data/todo.interface'

jest.mock('../../src/adapters/rabbitmq.adapter')

describe('Queue repository', () => {
  test('sendTo method', async () => {
    RabbitMQAdapter.getInstance = jest.fn().mockReturnValue(() => ({
      sendTo: () => true,
    }))

    const queueInfo = {
      channel: 'twitter',
      country: 'TH',
      queue: 'backward',
    }

    const message = {
      languages: ['tha'],
      username: 'GSBSociety',
      score: null,
      labels: [],
      deleted_at: null,
      _id: 'twitter_2898375715',
      id: '2898375715',
      channel: 'twitter',
      country: 'TH',
      display_name: 'GSB Society',
      description:
        'GSB Society Twitter Official Todo ส่งความคิดถึงและอัพเดทข่าวสารดีๆ เคล็ดลับโดนๆโปรโมชั่นเด่นๆหรือหากต้องการทราบข้อมูลเพิ่มเติม ธนาคารออมสิน ยินดีให้บริการค่ะ',
      profile_url: 'https://twitter.com/GSBSociety',
      profile_image_url: 'http://pbs.twimg.com/profile_images/924651582221721600/EGiZo65d_normal.jpg',
      statistics: {
        updated_at: new Date('2020-05-20T10:24:38.299Z'),
        followers_count: 23186,
        follows_count: 10,
      },
      tier: 500,
      status: 'enabled',
      persistent: false,
      meta: {
        latest_media_on: new Date('2020-05-20T10:24:38.299Z'),
        latest_comment_on: new Date('2020-05-20T10:24:38.299Z'),
        latest_job_sent_on: new Date('2020-05-20T10:24:38.299Z'),
        priority: 10,
        private_todo: false,
        vip: false,
        stream_status: 'free',
        country: 'TH',
      },
      info_updated_at: new Date('2020-05-20T10:24:38.299Z'),
      tier_by_criteria: 6450,
      latest_post_at: new Date('2020-05-20T10:24:38.299Z'),
      created_at: new Date('2020-05-20T10:24:38.299Z'),
      updated_at: new Date('2020-05-20T10:24:38.299Z'),
    } as TodoInterface

    expect(new QueueRepository().sendTo(queueInfo, message)).toBeTruthy()
  })
})
