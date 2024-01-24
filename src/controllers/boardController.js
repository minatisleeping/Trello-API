// import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {

  try {
    // console.log('req.body: ', req.body)
    // console.log('req.query: ', req.query)
    // console.log('req.params: ', req.params)
    // console.log('req.files: ', req.files)
    // console.log('req.cookies: ', req.cookies)
    // console.log('req.jwtDecoded: ', req.jwtDecoded)

    // Điều hướng dữ liệu sang tầng Service
    const createdBoard = await boardService.createNew(req.body)

    // Có kết quả trả  về phía Client
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}