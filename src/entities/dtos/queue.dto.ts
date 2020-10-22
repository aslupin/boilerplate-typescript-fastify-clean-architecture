interface ConnectionInfoQueueDTO {
  username: string
  password: string
  host: string
  port: number
}

interface InfoQueueDTO {
  channel: string
  country: string
  queue: string
}

export { ConnectionInfoQueueDTO, InfoQueueDTO }
