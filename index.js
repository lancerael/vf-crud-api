import express from 'express'
import bodyParser from 'body-parser'
import {
  createItems,
  readItems,
  updateItems,
  deleteItems
} from 'vf-crud-helper'

const PORT = 5000

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.get('/', (req, res) => {
//   res.send('Hello world')
// })

const handleRequest = (res, callback) => {
  callback()
    .then(items => res.send(items))
    .catch(err => res.send(`Oops something went wrong: ${err}`))
}

// CREATE
app.post('/:fileName', (req, res) => {
  handleRequest(res, () => 
    createItems(
      req.params.fileName,
      req.body.item
    )
  )
})

// READ
app.get('/:fileName', (req, res) => {
  handleRequest(res, () =>
    readItems(req.params.fileName)
  )
})

// UPDATE
app.patch('/:fileName', (req, res) => {
  handleRequest(res, () =>
    updateItems(
      req.params.fileName,
      req.body.targetItem,
      req.body.newItem
    )
  )
})

// DELETE
app.delete('/:fileName', (req, res) => {
  handleRequest(res, () =>
    deleteItems(
      req.params.fileName,
      req.body.targetItem
    )
  )
})

app.listen(PORT, () => console.log(`Server running: http://localhost:${PORT}`))
