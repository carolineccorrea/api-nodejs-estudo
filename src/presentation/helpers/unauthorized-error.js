module.exports = class UnauthorizedError extends Error {
  constructor (paramName) {
    super('não autorizado')
    this.name = 'UnauthorizedError'
  }
}
