import express from 'express'
import { mapOrder } from '~/utils/sorts.js'

const app = express()

const hostname = 'localhost'
const port = 8017

app.get('/', (req, res) => {
  // Test Absolute import mapOrder
  // eslint-disable-next-line no-console
  console.log(mapOrder(
    [{ id: 'id-1', name: 'One' },
      { id: 'id-2', name: 'Two' },
      { id: 'id-3', name: 'Three' },
      { id: 'id-4', name: 'Four' },
      { id: 'id-5', name: 'Five' }],
    ['id-5', 'id-4', 'id-2', 'id-3', 'id-1'],
    'id'
  ))
  res.end('<h1>Hello World!</h1><hr>')
})

app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Hello Trung Quan Dev, I am running at http://${ hostname }:${ port }/`)
})
