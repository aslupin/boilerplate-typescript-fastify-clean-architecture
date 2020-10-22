import config from '../config/config'
import { whitelistUpdateFieldDTO } from '../entities/dtos/todo.dto'
import { Whitelist } from '../entities/interfaces/data/whitelist.interface'
import { whitelist } from '../entities/whitelists/whitelist.entity'

const validCheckInput = (task_named: string, task_content: string): boolean | string => {
  return task_named !== null && task_content !== null
}

const validCheckID = (id: string): boolean | string => {
  return id !== null
}

const isNotValidField = (whitelist: Whitelist, fieldList: string): boolean => {
  return !Object.keys(whitelist).includes(fieldList)
}

const validUpdatedFields = (data: whitelistUpdateFieldDTO): string[] => {
  const errorFieldsUpdate: string[] = Object.keys(data).filter((key) => isNotValidField(whitelist['todo'], key))
  return errorFieldsUpdate
}

export { validCheckInput, validCheckID, isNotValidField, validUpdatedFields  /* , validCountry */}
