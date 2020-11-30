const MissingParamError = require('./missing-param-error')

module.exports = class HttpResponse {
  static badRequest (params) {
    return {
      statusCode: 400,
      body: new MissingParamError(params)
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }
}
