import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import TodoUsecase from '../usecase/todo.usecase'
import responseHandler from '../helper/response.handler'
import { createDTO, updateDTO, deleteDTO } from '../entities/dtos/todo.dto'
import * as Validator from '../helper/validate.helper'

class TodoRoutes {
  public prefix_route = '/todo'

  async routes(fastify: FastifyInstance, options: FastifyPluginOptions, done: any) {

    fastify.get(`/findall`, async (request, reply) => {
      responseHandler(async () => {
        const data = await TodoUsecase.findAllTodo()
        return data
      }, reply)
      await reply
    })

    fastify.post(`/create`, async (request, reply) => {
      responseHandler(async () => {
        const reqCreate: createDTO = request.body as createDTO
        const { task_name, task_content } = reqCreate
        console.log(reqCreate)
        if (!Validator.validCheckInput(task_name, task_content)) {
          throw new Error(`400 : Invalid input, Please input field task_name and task_content`)
        }
        
        const data = await TodoUsecase.createTodo(reqCreate)
        return data
      }, reply)
      await reply
    })

    fastify.put(`/update`,async (request, reply) => {
      responseHandler(async () => {
        const reqUpdate: updateDTO = request.body as updateDTO
        const { _id, ...rawUpdate } = reqUpdate

        if (!Validator.validCheckID(_id)) {
          throw new Error(`400 : Invalid input, Please input field id`)
        }

        const errorFieldsUpdate = Validator.validUpdatedFields(rawUpdate)
        if (errorFieldsUpdate.length > 0) {
          throw new Error(`400 : Invalid Fields! ${errorFieldsUpdate.join(', ')}`)
        }

        const data = await TodoUsecase.updateTodo(reqUpdate)
        return data
      }, reply)
      await reply
    })

    fastify.delete(`/delete`, { preValidation: [(fastify as any).authenticate] }, async (request, reply) => {
      responseHandler(async () => {
        console.log(request.user)
        const data = await TodoUsecase.deleteTodo(request.body as deleteDTO)
        return data
      }, reply)
      await reply
    })

    done()

  }

}

export default TodoRoutes
