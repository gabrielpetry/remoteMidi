import SerialPort from 'serialport'
import Readline from '@serialport/parser-readline'

const parser = new Readline()

export async function startSerialMonitor(rxDb) {
  const port = new SerialPort('COM3', { baudRate: 9600 }, (err) => {
    if (err) {
      console.log('Error: ', err.message)
      return err
    }
  })
  console.log('Serial port', port)

  port.pipe(parser)

  let message

  parser.on('data', async (line) => {
    message = ''
    try {
      message = JSON.parse(line)
    } catch (error) {
      console.log('Error parsing line: ', error.message)
      console.log(line)
      return
    }

    if (message.subject.includes('PushButton')) {
      console.log('Serial message', message)
      let note = message.subject.split('PushButton').pop()
      let velocity = 127
      await rxDb.items.atomicUpsert({
        key: 'pushButton',
        value: {
          button: message.subject,
          note,
          velocity,
        },
      })
      return
    }
    console.log('Unhandled serial message', message)
  })
}
