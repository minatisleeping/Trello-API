import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoutes } from '~/routes/v1/boardRoutes'

const Router = express.Router()

/** Check APIs v1/status */
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs V1 are ready to use!'
  })
})

/** Board APIs */
Router.use('/boards', boardRoutes)

export const API_V1 = Router // cách này thì dùng object destructuring (có dạng { .. } )
// export default Router
