/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

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

export const boardService = {
  createNew
}