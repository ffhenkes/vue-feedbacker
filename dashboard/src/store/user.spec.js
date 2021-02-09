import useStore from '../hooks/useStore'
import {
  cleanCurrentUser,
  resetUserStore,
  setApiKey,
  setCurrentUser
} from './user'

describe('UserStore', () => {
  afterEach(() => {
    resetUserStore()
  })

  it('shouldSetCurrentUser', () => {
    const store = useStore()
    setCurrentUser({ name: 'John Doe' })
    expect(store.User.currentUser.name).toBe('John Doe')
  })

  it('shouldSetApiKeyOnCurrentUser', () => {
    const store = useStore()
    setApiKey('123')
    expect(store.User.currentUser.apiKey).toBe('123')
  })

  it('shouldCleanCurrentUser', () => {
    const store = useStore()
    setCurrentUser({ name: 'John Doe' })
    expect(store.User.currentUser.name).toBe('John Doe')
    cleanCurrentUser()
    expect(store.User.currentUser.name).toBeFalsy()
  })
})