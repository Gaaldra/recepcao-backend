import { NextFunction, Request, Response } from 'express'
import BaseError from 'src/errors/BaseError'

export default function (err: BaseError, request: Request, response: Response, next: NextFunction) {
  if (!(err instanceof BaseError)) return response.status(400).json({ message: err.message })
  response.status(err.code).json({ message: err.message })
}
