import express from 'express'
import cors from 'cors'
import { json } from 'body-parser'
import http from 'http'
import socketIo from 'socket.io'
import path from 'path'
import { getDatabase } from '../../rxDb/startDatabase'

const app: express.Application = express()

const httpServer: http.Server = http.createServer(app)
const io: socketIo = socketIo(httpServer)
let rxDb = null

io.on('connection', async (socket) => {
  rxDb = await getDatabase()
  socket.on('faderChanged', (data) => {
    // console.log(data)
    let { fader, channel, controller, value } = data
    console.dir(data)
    rxDb.items.atomicUpsert({
      key: 'faderChanged',
      value: {
        fader,
        channel,
        value,
        controller,
      },
    })
  })

  socket.on('pushButtonClicked', (data) => {
    let { buttonName, value, velocity } = data
    rxDb.items.atomicUpsert({
      key: buttonName,
      value: {
        value,
        velocity,
      },
    })
  })

  socket.on('disconnect', () => {})
})

const port: number = parseInt(process.env.port) || 6548
let server: any = null

app.use(cors())
app.use(json())

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/index.html'))
})

export function startExpressServer() {
  server = httpServer.listen(port, function () {
    console.log(`Express server is running at ${port}!`)
  })
}

export function stopExpressServer() {
  server.close()
}
