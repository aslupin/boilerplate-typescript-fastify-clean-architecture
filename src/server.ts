import App from './app'
// import express from 'express'
// import loggerMiddleware from './middlewares/logger.middleware'
import TodoRoutes from './routes/todo.route'

const app = new App({
  routes: [TodoRoutes],
  middleWares: {
    before: [
      // loggerMiddleware,
    ],
    after: [],
  },
})

app.listen()
