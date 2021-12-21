import BaseError from './BaseError'

export default class DuplicateError extends BaseError {
  code: number = 409
  message: string = 'An duplicate error has occurred with your requisition'
  constructor (message?: string) {
    super()
    if (message) this.message = message
  }
}
