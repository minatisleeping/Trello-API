/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'

const createNew = async (reqBody) => {

  try {
    // Xử lí dữ liệu tuỳ đặc thù project
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng Model để xử lí bản ghi newBoard vào trong Database
    // ...

    // Làm thêm các xử lý logic khác vì các Collection khác tuỳ đặc thù project
    // Bắn email, noti về cho Admin khi create new board

    // Tất cả các hàm Service phải có return ===> mandatory (nếu k thì req chết)
    return newBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew
}