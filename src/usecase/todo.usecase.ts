import { TodoInterface } from '../entities/interfaces/data/todo.interface'
import TodoRepository from '../repositories/todo.repository'

import {
  createDTO,
  updateDTO,
  deleteDTO,
} from '../entities/dtos/todo.dto'

async function findAllTodo(): Promise<TodoInterface[]> {
  const todoRepository = TodoRepository.getInstance()
  return await todoRepository.findAllTodo()
}

async function createTodo(reqCreate: createDTO): Promise<string> {
  const todoRepository = TodoRepository.getInstance()
  try {
    await todoRepository.createTodo(reqCreate)
    return `200 : Save data is successfully`
  } catch (err) {
    throw new Error(`400 : Save data is not successfully`)
  }
}

async function updateTodo(reqUpdate: updateDTO): Promise<string> {
  const todoRepository = TodoRepository.getInstance()
  const  { _id, ...dataUpdate } = reqUpdate
  let updateResult: number
  try {
    updateResult = await todoRepository.updateTodo(_id, dataUpdate)
  } catch (error) {
    throw new Error(`400 : Update data is not successfully`)
  }
  if (updateResult) {
    return `200 : Update data is successfully`
  } else {
    throw new Error(`400 : Page not found in database`)
  }
}

async function deleteTodo(reqDelete: deleteDTO): Promise<string> {
  const todoRepository = TodoRepository.getInstance()
  const { _id } = reqDelete
  const deleteResult: number = await todoRepository.deleteTodo(_id)
  if (deleteResult) {
    return `200 : Delete data is successfully`
  } else {
    throw new Error(`400 : Delete data is not successfully, don't have data in Database`)
  }
}

export default {
  findAllTodo,
  createTodo,
  updateTodo,
  deleteTodo
}
