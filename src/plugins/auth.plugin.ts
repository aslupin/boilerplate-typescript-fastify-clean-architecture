import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify'
import fastifyPlugin from 'fastify-plugin'
import fastifyJwt from 'fastify-jwt'
import config from '../config/config'
import { responseSender } from '../helper/response.handler'
import parseResponse from '../helper/response.parser'

const authPlugin = (fastify: FastifyInstance, opts: FastifyPluginOptions, done: any) => {

    fastify.register(fastifyJwt, {
        secret: config.jwt.private_route.secret.jwt_secret
    })

    fastify.decorate("authenticate", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            await request.jwtVerify()
        } catch (err) {
            responseSender(
                parseResponse(new Error(`${err.statusCode}: Unauthorize, ${err.message}`))
            , reply)
        }
    })

    done()
}

export default fastifyPlugin(authPlugin)