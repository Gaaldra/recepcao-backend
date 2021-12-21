import BaseError from './BaseError'

export default class InvalidRequest extends BaseError {
  code: number = 406
  message: string = 'Invalid Request'
  constructor (message?: string) {
    super()
    if (message) this.message = message
  }
}
