import { Document } from 'mongoose'

interface TodoDocument extends Document {
  readonly id: string 
  readonly task_name: string
  readonly task_content: string
}

type TodoInterface = TodoDocument

export {
  TodoInterface,
}