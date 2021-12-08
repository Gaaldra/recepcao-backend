import BaseError from './BaseError'

class InvalidRequest extends BaseError {
  constructor (message = 'Invalid Request') {
    super(406, message)
  }
}

export { InvalidRequest }
