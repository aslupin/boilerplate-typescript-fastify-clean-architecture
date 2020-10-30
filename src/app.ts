import fastify, { FastifyInstance } from 'fastify'
import config from './config/config'
import MongoAdapter from './adapters/mongo.adapter'
import RabbitMQAdapter from './adapters/rabbitmq.adapter'

class App {
  public app: FastifyInstance
  public app_domain: string = config.app.domain
  public app_port: number = parseInt(`${config.app.port}`, 10) ?? 8080

  private databaseInfo = {
    username: config.db.mongo.username!,
    password: config.db.mongo.password!,
    host: config.db.mongo.host!,
    port: parseInt(`${config.db.mongo.port}`, 10) ?? 27017,
    dbName: config.db.mongo.name!,
    authName: config.db.mongo.auth!,
  }

  private queueInfo = {
    username: config.queue.connection.username!,
    password: config.queue.connection.password!,
    host: config.queue.connection.host!,
    port: parseInt(`${config.queue.connection.port}`, 10) ?? 5672,
  }

  constructor(appInit: { plugins: any; routes: any }) {
    this.app = fastify({ logger: true })
    // this.connectQueue()
    this.connectDatabase()
    this.register(appInit.plugins)
    this.routes(appInit.routes)
  }

  private async connectDatabase() {
    let { username, password, host, port, dbName, authName } = this.databaseInfo
    await new MongoAdapter(username, password, host, port, dbName, authName)
  }

  private async connectQueue() {
    await RabbitMQAdapter.getInstance(this.queueInfo)
  }

  private register(plugins: { forEach: (arg0: (plugin: any) => void) => void }) {
    plugins.forEach((plugin) => {
      this.app.register(plugin)
    })
  }

  public routes(routes: { forEach: (arg0: (routes: any) => void) => void }) {
    routes.forEach((route) => {
      let router = new route()
      this.app.register(router.routes, { prefix: router.prefix_route })
    })

    this.app.get('/healthcheck', async (request, reply) => { reply.send({healthcheck: "server is alive"}) })
  }

  public listen() {
    this.app.listen(this.app_port, () => {
      console.log(`App listening on the http://${this.app_domain}:${this.app_port} 🌟👻`)
    })
  }
}

export default App
