export default abstract class BaseError extends Error {
  code = 400
  message = 'An Error was ocorred in your requisition'
}
