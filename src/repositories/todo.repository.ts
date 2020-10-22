import { model, Model, Mongoose } from 'mongoose'
import { TodoInterface } from '../entities/interfaces/data/todo.interface'
import { TodoSchema } from '../entities/schemas/todo.schema'
import { createDTO, whitelistUpdateFieldDTO } from '../entities/dtos/todo.dto'

import config from '../config/config'

class TodoRepository {
  private static instance: TodoRepository
  private _model: Model<TodoInterface>
  private _collection: string

  constructor() {
    this._collection = config.db.mongo.collection!
    this._model = model<TodoInterface>(this._collection, TodoSchema)
  }

  public static getInstance(): TodoRepository {
    if (!TodoRepository.instance) {
      TodoRepository.instance = new TodoRepository()
    }
    return TodoRepository.instance
  }

  public async findAllTodo(): Promise<TodoInterface[]> {
    const result = await this._model.find({})
    return result as TodoInterface[]
  }

  public async findAllTodosInChannel(channel: { [key: string]: string }): Promise<TodoInterface[]> {
    const result = await this._model.find(channel)
    return result as TodoInterface[]
  }

  public async findTodoById(id: string): Promise<TodoInterface | null> {
    const result: TodoInterface = (await this._model.findOne({ id }))!
    return result 
  }

  public async createTodo(todo: createDTO): Promise<string> {
    const mongooseModel = new this._model(todo)
    const result = await mongooseModel.save()
    return result.id as string
  }

  public async updateTodo(_id: string, dataUpdate: whitelistUpdateFieldDTO): Promise<number> {
    const result = await this._model.updateOne({ _id }, {
      $set: {
        ...dataUpdate,
      },
    })
    return result.n as number
  }

  public async deleteTodo(_id: string): Promise<number> {
    const result = await this._model.deleteOne({ _id })
    return result.deletedCount as number
  }
}

export default TodoRepository
