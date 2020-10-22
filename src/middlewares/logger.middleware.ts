import {FastifyRequest, FastifyReply} from 'fastify'

const loggerMiddleware = (request: FastifyRequest, reply: FastifyReply, next: Function) => {
  console.log('Request logged:', request.method, request.routerPath)
  next()
}

export default loggerMiddleware
