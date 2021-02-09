<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Credentials
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Credentials creation and instalation guide
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-bold font-black text-brand-graydark">
        Installation and configuration
      </h1>
      <p class="mt-10 text-lg text-grey-800 font-regular">
        This is your api key
      </p>

      <content-loader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50px"
      />

      <div class="flex py-3 pl-5 mt-2 justify-between rounded items-center bg-brand-grey w-full lg:w-1/2">
        <span v-if="state.hasErrors">Error loading apiKey</span>
        <span
          id="api-key"
          v-else
        >
          {{ store.User.currentUser.apiKey }}
        </span>
        <div class="flex ml-20 mr-5" v-if="!state.hasErrors">
          <icon
            @click="handleCopy"
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <icon
            id="generate-api-key"
            @click="handleGenerateApiKey"
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
          />
        </div>
      </div>
        <p class="mt-5 text-lg text-grey-800 font-regular">
          Copy and paste the script below on your site to start receiving feedbacks
        </p>
        <content-loader
          v-if="store.Global.isLoading || state.isLoading"
          class="rounded"
          width="600px"
          height="50px"
        />

        <div
          v-else
          class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll">
          <span v-if="state.hasErrors">Error loading script</span>
          <pre v-else>&lt;script src="http://ffhenkes-feedbacker-widget.netlify.app?api_key={{ store.User.currentUser.apiKey }}"&gt;&lt;/script&gt;</pre>
        </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch } from 'vue'
import HeaderLogged from '../../components/HeaderLogged'
import ContentLoader from '../../components/ContentLoader'
import Icon from '../../components/Icon'
import userStore from '../../hooks/useStore'
import palette from '../../../pallete'
import services from '../../services'
import { setApiKey } from '../../store/user'
import { useToast } from 'vue-toastification'

export default {
  components: { ContentLoader, HeaderLogged, Icon },
  setup () {
    const store = userStore()
    const toast = useToast()
    const state = reactive({
      hasErrors: false,
      isLoading: false
    })

    watch(() => store.User.currentUser, () => {
      if (!store.Global.isLoading && !store.User.currentUser.apiKey) {
        handleError(true)
      }
    })

    function handleError (error) {
      state.isLoading = false
      state.hasErrors = !!error
    }

    async function handleGenerateApiKey () {
      try {
        state.isLoading = true
        const { data } = await services.users.generateApiKey()
        setApiKey(data.apiKey)
        state.isLoading = false
      } catch (error) {
        handleError(error)
      }
    }

    async function handleCopy () {
      toast.clear()

      try {
        await navigator.clipboard.writeText(store.User.currentUser.apiKey)
        toast.success('Copied!')
      } catch (error) {
        handleError(error)
      }
    }

    return {
      state,
      store,
      brandColors: palette.brand,
      handleGenerateApiKey,
      handleCopy
    }
  }
}
</script>
