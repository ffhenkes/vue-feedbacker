import { shallowMount } from '@vue/test-utils'
import { routes } from '../../router'
import HeaderLogged from '.'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

const mockStore = { currentUser: {} }
jest.mock('../../hooks/useStore', () => {
  return () => {
    return mockStore
  }
})

describe('<HeaderLogged />', () => {
  it('shouldRenderHeaderLogged', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('shouldRenderThreeDotsWhenUserNotLogged', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })
    const buttonLogout = wrapper.find('#logout-button')
    expect(buttonLogout.text()).toBe('...')
  })

  it('shouldRenderUserNameWhenLogged', async () => {
    router.push('/')
    await router.isReady()
    mockStore.currentUser.name = 'John Doe'
    const wrapper = shallowMount(HeaderLogged, {
      global: {
        plugins: [router]
      }
    })
    const buttonLogout = wrapper.find('#logout-button')
    expect(buttonLogout.text()).toBe('John Doe (logout)')    
  })
})