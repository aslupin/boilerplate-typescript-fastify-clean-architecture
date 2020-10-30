import App from './app'
import AuthPlugin from './plugins/auth.plugin'
import TodoRoutes from './routes/todo.route'

const app = new App({
  routes: [TodoRoutes],
  plugins: [AuthPlugin],
})

app.listen()
