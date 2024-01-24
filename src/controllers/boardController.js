// import express from 'express'
import { StatusCodes } from 'http-status-codes'

const createNew = (req, res, next) => {

  try {
    // console.log('req.body: ', req.body)
    // console.log('req.query: ', req.query)
    // console.log('req.params: ', req.params)
    // console.log('req.files: ', req.files)
    // console.log('req.cookies: ', req.cookies)
    // console.log('req.jwtDecoded: ', req.jwtDecoded)

    // Điều hướng dữ liệu sang tầng Service

    // Có kết quả trả  về phía Client
    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API created new board' })
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}