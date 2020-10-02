import Easymid from 'easymidi'
import { getDatabase } from '../rxDb/startDatabase'

const midiOutput = new Easymid.Output(Easymid.getOutputs()[1])

const sendFaderCc = async (doc) => {
  console.log('FaderChanged', doc.key, doc.value)
  midiOutput.send('cc', {
    controller: parseInt(doc.value.controller),
    value: parseInt(doc.value.value),
    channel: parseInt(doc.value.channel),
  })
}

const sendPushButtonClick = async (doc) => {
  console.log('PushButtonClicked', doc.key, doc.value)
  let { note, velocity } = doc.value
  let noteAttributes = {
    note: note,
    velocity: velocity,
    channel: 0,
  }
  midiOutput.send('noteon', noteAttributes)
  midiOutput.send('noteoff', noteAttributes)
}

const sendSwitchMode = async (doc) => {
  console.log('SwitchButton', doc.key, doc.value)
  let { note, velocity, onOrOff } = doc.value
  let noteAttributes = {
    note: note,
    velocity: velocity,
    channel: 0,
  }
  midiOutput.send(`note${onOrOff}`, noteAttributes)
}

const initKeyObserverCallback = async (rxDb, keyValue: string, handlerFunction: CallableFunction) => {
  rxDb.items
    .findOne()
    .where('key')
    .eq(keyValue)
    .$.subscribe((changeEvent) => {
      if (!changeEvent) return
      handlerFunction(changeEvent)
    })
}

export function startObservers(rxDb) {
  initKeyObserverCallback(rxDb, 'faderChanged', sendFaderCc)
  initKeyObserverCallback(rxDb, 'pushButton', sendPushButtonClick)
  initKeyObserverCallback(rxDb, 'switchButton', sendSwitchMode)
}
