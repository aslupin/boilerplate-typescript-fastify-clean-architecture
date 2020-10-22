declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'test' | 'development' | 'production'
      PORT: string
      DB_USER: string
      DB_PASS: string
      DB_HOST: string
      DB_PORT: string
      DB_NAME: string
      DB_AUTH: string
      DB_COLLECTION: string
      SENTRY_DNS: string
    }
  }
}

export {}
