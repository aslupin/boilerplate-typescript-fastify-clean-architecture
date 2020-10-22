import * as mongoose from 'mongoose'

export const TodoSchema = new mongoose.Schema(
  {
    task_name: {type: String, required: true},
    task_content: {type: String, required: true},
  },
  {
    versionKey: false,
  },
)
