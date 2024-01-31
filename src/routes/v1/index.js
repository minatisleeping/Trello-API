import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'
import { columnRoute } from '~/routes/v1/columnRoute'
import { cardRoute } from '~/routes/v1/cardRoute'

const Router = express.Router()

/** Check APIs v1/status */
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs V1 are ready to use!'
  })
})

/** Board APIs */
Router.use('/boards', boardRoute)

/** Board Column */
Router.use('/columns', columnRoute)

/** Board Card */
Router.use('/cards', cardRoute)

export const API_V1 = Router // cách này thì dùng object destructuring (có dạng { .. } )
// export default Router
