/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {

  try {
    // Xử lí dữ liệu tuỳ đặc thù project
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng Model để xử lí bản ghi newBoard vào trong Database
    const createdBoard = await boardModel.createNew(newBoard)

    // Lấy bản ghi sau khi gọi (tuỳ mục đích project xem có cần bước này hay hong)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    // Làm thêm các xử lý logic khác vì các Collection khác tuỳ đặc thù project
    // Bắn email, noti về cho Admin khi create new board

    // Tất cả các hàm Service phải có return ===> mandatory (nếu k thì req chết)
    return getNewBoard
  } catch (error) { throw error }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found!')
    }

    // Step1: Deep Clone board để tránh thay đổi giá trị của biến board khi thực hiện các thao tác khác
    //tạo ra 1 cái mới để xử lí, không ảnh hưởng tới board ban đầu, tuỳ mục đích về sau mà có cần clone hay không
    const resBoard = cloneDeep(board)
    // Step2: Đưa card về đúng column của nó
    resBoard.columns.forEach(column => {
      // Cách dùng .equals này là bởi vì chúng ta hiểu ObjectId trong MongoDB có support method .equals
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))

      // Another way to do this is convert ObjectId to string by toString() of JavaScript
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    // Step3: Xoá mảng cards khỏi board ban đầu
    delete resBoard.cards // này đơn giản, đưa hết cards vào column rồi thì xoá cái cards ở board đi

    return resBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails
}