import BaseError from './BaseError'

class DuplicateError extends BaseError {
  constructor (message?: string) {
    super(409, message)
  }
}

export { DuplicateError }
