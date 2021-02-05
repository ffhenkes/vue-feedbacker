<template>
<div class="flex justify-between">
  <h1 class="text-4xl font-black text-gray-800">
    Login
  </h1>
  <button
    class="text-4xl text-gray-600 focus:outline-none"
    @click="close"
  >
    &times;
  </button>
</div>
<div class="mt-16">
  <form @submit.prevent="handleSubmit">
    <label class="block">
      <span class="text-lg font-medium text-gray-800">E-mail</span>
      <input type="email" class="block w-full px-4 py-3 text-lg bg-gray-100 border-2 border-transparent rounded" placeholder="john.doe@gmail.com"
        :class="{ 'border-brand-danger': !!state.email.errorMessage }"
        v-model="state.email.value">
      <span v-if="!!state.email.errorMessage"
        class="block font-medium text-brand-danger">
        {{ state.email.errorMessage }}
      </span>
    </label>

    <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Password</span>
        <input
          v-model="state.password.value"
          type="password"
          :class="{
            'border-brand-danger': !!state.password.errorMessage
          }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="*********"
        >
        <span
          v-if="!!state.password.errorMessage"
          class="block font-medium text-brand-danger"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

    <button type="submit" class="px-8 py-3 mt-10 text-2xl text-white font-bold rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      :disabled="state.isLoading"
      :class="{
        'opacity-50': state.isLoading
      }">
      <icon v-if="state.isLoading" name="loading" class="animate-spin"/>
      <span v-else>Enter</span>
    </button>
  </form>
</div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import { useToast } from 'vue-toastification'
import { validateEmptyAndEmail, validateEmptyAndLength3 } from '../../utils/validators'
import userModal from '../../hooks/useModal'
import Icon from '../Icon'
import services from '../../services'

export default {
  components: { Icon },
  setup () {
    const router = useRouter()
    const modal = userModal()
    const toast = useToast()

    const {
      value: emailValue,
      errorMessage: emailErrorMessage
    } = useField('email', validateEmptyAndEmail)

    const {
      value: passwordValue,
      errorMessage: passwordErrorMessage
    } = useField('password', validateEmptyAndLength3)

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage
      }
    })

    async function handleSubmit () {
      try {
        toast.clear()
        state.isLoading = true
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value
        })

        if (!errors) {
          window.localStorage.setItem('token', data.token)
          router.push({ name: 'Feedbacks' })
          state.isLoading = false
          modal.close()
          return
        }

        if (errors.status === 404) {
          toast.error('E-mail not found!')
        }

        if (errors.status === 401) {
          toast.error('E-mail/password invalid!')
        }

        if (errors.status === 400) {
          toast.error('Error signing in!')
        }

        state.isLoading = false
      } catch (error) {
        state.isLoading = false
        state.hasErrors = !!error
        toast.error('Server down!')
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit
    }
  }
}
</script>
