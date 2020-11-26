class LoginRouter {
  route (httpRequest) {
    const { email, password } = httpRequest.body
    if (!email || !password) {
      return {
        statusCode: 400
      }
    }
  }
}

describe('Login Router', () => {
  test('deve retornar 400 se o email nao for fornecido', () => {
    const sut = new LoginRouter()

    const httpRequest = {
      body: {
        password: 'senha_qualquer'
      }

    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('deve retornar 400 se o password nao for fornecido', () => {
    const sut = new LoginRouter()

    const httpRequest = {
      body: {
        email: 'email_qualquer@email.com'
      }

    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
