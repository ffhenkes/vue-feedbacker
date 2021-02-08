<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <header-logged />
  </div>
  <div class="flex flex-col items-center justify-center h-64 bg-brand-gray">
    <h1 class="text-4xl font-black text-center text-gray-800">
      Feedbacks
    </h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Details from your received feedbacks
    </p>
  </div>
  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
     <div>
      <h1 class="text-3xl font-black text-brand-darkgrey">
        List
      </h1>
      <suspense>
        <template #default>
          <filters
            class="mt-8 animate__animated animate__fadeIn animate__faster"
          />
        </template>
        <template #fallback>
          <filters-loading class="mt-8" />
        </template>
      </suspense>
    </div>
    <div class="col-span-3 px-10 pt-20">
      <p
        v-if="state.hasErrors"
        class="text-lg text-center text-gray-800"
      >
        Error loading feedbacks &#128530;
      </p>
      <p
        v-if="!state.feedbacks.length && !state.isLoading"
        class="text-lg text-center text-gray-800"
      >
        No feedbacks received &#128529;
      </p>
      <feedback-card-loading v-if="state.isLoading" />
      <feedback-card
        v-else
        v-for="(feedback, index) in state.feedbacks"
        :key="feedback.id"
        :is-opened="index === 0"
        :feedback="feedback"
        class="mb-8"
      />
    </div>
   </div>
  </div>
</template>
<script>
import Filters from './Filters'
import FiltersLoading from './FiltersLoading'
import FeedbackCard from '../../components/FeedbackCard'
import FeedbackCardLoading from '../../components/FeedbackCard/Loading'
import HeaderLogged from '../../components/HeaderLogged'
import { onMounted, reactive } from 'vue'
import services from '../../services'
export default {
  components: {
    HeaderLogged,
    Filters,
    FiltersLoading,
    FeedbackCard,
    FeedbackCardLoading
  },
  setup () {
    const state = reactive({
      isLoading: false,
      feedbacks: [],
      pagination: {
        limit: 5,
        offset: 0
      },
      currentFeedbackType: '',
      hasErrors: false
    })

    onMounted(() => {
      fetchFeedbacks()
    })

    function handleErrors (error) {
      state.hasErrors = !!error
    }

    async function fetchFeedbacks () {
      try {
        state.isLoading = true
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedbackType
        })
        state.feedbacks = data.results
        state.pagination = data.pagination
        state.isLoading = false
      } catch (error) {
        handleErrors(error)
      }
    }

    return {
      state,
      fetchFeedbacks
    }
  }
}
</script>
