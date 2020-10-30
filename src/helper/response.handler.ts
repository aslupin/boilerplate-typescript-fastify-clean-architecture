
import { FastifyReply } from 'fastify'
import { ResponseInterface } from '../entities/interfaces/data/response.interface'
import errorHandler from './errors.handler'
import parseResponse from './response.parser'

export const responseSender = async (data: ResponseInterface, reply: FastifyReply): Promise<void> => {
  await errorHandler.reply(data, reply)
  reply.send(data)
}

const responseHandler = async (next: Function, reply: FastifyReply): Promise<void> => {
  try {
    const data: ResponseInterface = await next()
    responseSender(parseResponse(data), reply)
  } catch (error) {
    responseSender(parseResponse(error), reply)
  }
}

export default responseHandler
