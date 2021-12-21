import BaseError from './BaseError'

export default class UpdateError extends BaseError {
  code: number = 409
  message: string = 'An error has occurred with your update requisition'
  constructor (message?: string) {
    super()
    if (message) this.message = message
  }
}
