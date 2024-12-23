import { StatusCodes } from 'http-status-codes';
import ApiError from '../utils/ApiError.js';
import { env } from '../configs/enviroment.js';

// Middleware xử lý lỗi tập trung trong ứng dụng Back-end NodeJS (ExpressJS)
export const errorHandlingMiddleware = (err, req, res, next) => {
  // Kiểm tra nếu lỗi là một instance của ApiError
  if (err instanceof ApiError) {
    // Trả responseError về phía Front-end
    const responseError = err.toJSON();

    // Chỉ khi môi trường là DEV thì mới trả về Stack Trace để debug dễ dàng hơn
    if (env.BUILD_MODE !== 'dev') delete responseError.stack;

    return res.status(responseError.statusCode).json(responseError);
  }

  // Nếu không phải là ApiError, xử lý các lỗi khác
  // Nếu dev không cẩn thận thiếu statusCode thì mặc định sẽ để code 500 INTERNAL_SERVER_ERROR
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  // Tạo ra một biến responseError để kiểm soát những gì muốn trả về
  const responseError = {
    statusCode: err.statusCode,
    stack: err.stack,
  };

  // Nếu là lỗi xác thực từ Joi, thêm các thông báo lỗi vào thuộc tính errors của responseError
  if (err.isJoi) {
    responseError.errors = {};
    responseError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    err.details.forEach((detail) => {
      responseError.errors[detail.path[0]] = detail.message;
    });
  } else if (err.errors && typeof err.errors === 'object') {
    // Nếu là lỗi xác thực từ Mongoose, thêm mảng lỗi chỉ chứa các thông báo lỗi
    responseError.errors = {};
    responseError.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    Object.keys(err.errors).forEach((key) => {
      responseError.errors[key] = err.errors[key].message;
    });
  } else {
    responseError.message = err.message || StatusCodes[err.statusCode]; // Nếu lỗi mà không có message thì lấy ReasonPhrases chuẩn theo mã Status Code
  }

  // Chỉ khi môi trường là DEV thì mới trả về Stack Trace để debug dễ dàng hơn
  if (env.BUILD_MODE !== 'dev') delete responseError.stack;

  // Trả responseError về phía Front-end
  res.status(responseError.statusCode).json(responseError);
};
