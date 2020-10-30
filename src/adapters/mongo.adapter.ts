import { connect, connection, Connection } from 'mongoose'
class MongoAdapter {
  private _database: Connection

  constructor(username: string, password: string, host: string, post: number, dbName: string, authName: string) {
    // This uri use for create connection mongo on localhost without docker container. 
    connect(`mongodb://${host}:${post}/${dbName}?authSource=${authName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    // connect(`mongodb://${username}:${password}@${host}:${post}/${dbName}?authSource=${authName}`, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // })
    this._database = connection
    this._database.on('open', this.connected)
    this._database.on('error', this.error)
  }

  private connected() {
    console.log('Mongoose has connected 🎉')
  }

  private error(error: Error) {
    console.log('**** error [mongodb] : ', error)
    throw error
  }
}
export default MongoAdapter
