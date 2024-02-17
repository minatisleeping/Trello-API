import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  /**
  | * Note: Mac dinh chung ta không can phai custom message & phía BE Lam gi vi dê cho Front-end tu
   validate và custom message phía FE cho dep.
  |* Back-end chỉ cần validate đảm bảo du liệu chuẩn xác, và trả ve message mặc định từ thư viện là được.
   * Quan trong: Viêc Validate dữ liệu bắt buộc phải có ở phia Back-end vi day la điểm cuối de lưu trû dữ lieu vào Database.
   * và thông thường trong thực tê, điều tôt nhất cho hệ thông là häy luôn validate dữ Lieu & cà Back-end và Front-end nhé.
  */
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (minatisleeping)',
      'string.empty': 'Title is not allowed to be empty (minatisleeping)',
      'string.min': 'Title length must be at least 3 chars long (minatisleeping)',
      'string.max': 'Title length must be less than or equal to 5 chars long (minatisleeping)',
      'string.trim': 'Title must not have leading or trailing whitespace (minatisleeping)'
    }),
    description: Joi.string().required().min(3).max(255).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })

  try {
    // set abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false }) //json object 'abortEarly: false': gặp lỗi có dừng luôn hay không?
    next()
  } catch (error) {
    // next một cái ApiError(StatusCodes, message)
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const update = async (req, res, next) => {
  // Lưu ý: không dùng hàm required() trong trường hợp update
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(255).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE),
    columnOrderIds: Joi.array().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    )
  })

  try {
    // set abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true // cho phép validate các key không được định nghĩa trong schema
    }) //json object 'abortEarly: false': gặp lỗi có dừng luôn hay không?
    next()
  } catch (error) {
    // next một cái ApiError(StatusCodes, message)
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const moveCardToDifferentColumn = async (req, res, next) => {
  const correctCondition = Joi.object({
    currentCardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

    prevColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    prevCardOrderIds: Joi.array().required().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ),

    nextColumnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    nextCardOrderIds: Joi.array().required().items(
      Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    )
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew,
  update,
  moveCardToDifferentColumn
}

