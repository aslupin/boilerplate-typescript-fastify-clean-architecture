import { ResponseInterface } from '../entities/interfaces/data/response.interface'
import { FastifyReply } from 'fastify'

const reply = async (replyponseData: ResponseInterface, reply: FastifyReply) => {

  reply.header('Content-Type', 'application/json;charset=utf-8').code(200)

  if ('error' in replyponseData) {
    switch (replyponseData.error.code) {
      case 400: {
        reply.header('Content-Type', 'application/json;charset=utf-8').code(replyponseData.error.code)
        break
      }
      case 403: {
        reply.header('Content-Type', 'application/json;charset=utf-8').code(replyponseData.error.code)
        break
      }
      case 404: {
        reply.header('Content-Type', 'application/json;charset=utf-8').code(replyponseData.error.code)
        break
      }
      default: {
        reply.header('Content-Type', 'application/json;charset=utf-8').code(500)
        break
      }
    }
  }
  //  return responseCode
}
export default { reply }
