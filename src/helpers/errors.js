import logger from './logger'

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode

  const errorMessage = error.message || 'Internal Server Error'

  logger.error(new Error(errorMessage))

  res.status(statusCode)
  res.json({
    message: errorMessage,
    stack: process.env.NODE_ENV === 'production' ? '💩' : error.stack || 'No stack trace available',
  })
}
