import "dotenv/config"; 
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import AppDataSource from './db.js';
import indexRouter from './Routers/indexRouter.js';
import { cors } from "hono/cors";

const app = new Hono();

app.use('*', cors({
  origin: "http://localhost:3000",
  credentials: true, 
}))
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

app.route('/api/', indexRouter)

serve({
  fetch: app.fetch,
  port: 8000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
