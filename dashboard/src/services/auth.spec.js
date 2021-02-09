import mockAxios from 'axios'
import AuthService from './auth'

jest.mock('axios')

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('shouldReturnTokenWhenUserLogin', async () => {
    const token = '1234567890'
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } })
    })

    const response = await AuthService(mockAxios).login({ email: 'john.doe@fake.com', password: 'fakepasswd'})
    expect(response.data).toHaveProperty('token')
    expect(response).toMatchSnapshot()
  })

  it('shouldReturnUserOnCreation', async () => {
    const user = {
      name: 'John Doe',
      email: 'john.doe@fake.com',
      password: 'fakepasswd'
    }

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: user })
    })

    const response = await AuthService(mockAxios).register(user)
    expect(response.data).toHaveProperty('name')    
    expect(response.data).toHaveProperty('email')
    expect(response.data).toHaveProperty('password')
    expect(response).toMatchSnapshot()
  })

  it('shouldFailWhenNotFound', async () => {
    const errors = { status: 404, statusText: 'Not Found' }
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors })
    })

    const response = await AuthService(mockAxios).login({ email: 'john.doe@fake.com', password: 'fakepasswd'})
    expect(response.errors).toHaveProperty('status')
    expect(response.errors).toHaveProperty('statusText')
    expect(response).toMatchSnapshot()
  })

})