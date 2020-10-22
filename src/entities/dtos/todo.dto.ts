interface createDTO {
  task_name: string
  task_content: string 
}

interface updateDTO {
  _id: string
  task_name?: string
  task_content?: string 
}

interface deleteDTO {
  _id: string
}

interface whitelistUpdateFieldDTO {
  task_name?: string
  task_content?: string 
}

export { createDTO, updateDTO, whitelistUpdateFieldDTO, deleteDTO }
