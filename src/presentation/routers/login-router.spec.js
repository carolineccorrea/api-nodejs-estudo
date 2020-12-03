const LoginRouter = require('./login-router')
const MissingParamError = require('../helpers/missing-param-error')
const UnauthorizedError = require('../helpers/unauthorized-error')

// design patterns: factory
const makeSut = () => {
  class AuthUseCase {
    auth (email, password) {
      this.email = email
      this.password = password
    }
  }
  const authUseCase = new AuthUseCase()

  const sut = new LoginRouter(authUseCase)
  return {
    sut,
    authUseCase
  }
}

describe('Login Router', () => {
  test('deve retornar 400 se o email nao for fornecido', () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        password: 'senha_qualquer'
      }

    }

    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('deve retornar 400 se o password nao for fornecido', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'email_qualquer@email.com'
      }

    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('deve retornar 500 se o httpRequest nao for fornecido', () => {
    const { sut } = makeSut()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('deve retornar 500 se o httpRequest nao tiver body nenhum', () => {
    const { sut } = makeSut()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('deve chamar authUseCase com os parametros corretos', () => {
    const { sut, authUseCase } = makeSut()
    const httpRequest = {
      body: {
        email: 'email_qualquer@email.com',
        password: 'qualquer'

      }
    }

    sut.route(httpRequest)
    expect(authUseCase.email).toBe(httpRequest.body.email)
    expect(authUseCase.password).toBe(httpRequest.body.password)
  })

  test('deve retornar 401 se for passado credenciais invalidas ', () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'email_invalido@email.com',
        password: 'senha_invalida'

      }
    }

    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(401)
    expect(httpResponse.body).toEqual(new UnauthorizedError())
  })
})
