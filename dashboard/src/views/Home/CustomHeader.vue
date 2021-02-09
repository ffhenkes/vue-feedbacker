<template>
  <header class="header">
    <div class="header-group">
      <div class="flex items-center justify-between py-10">
        <div class="w-28 lg:w-36">
          <img
            class="w-full"
            src="../../assets/images/logo_white.png"
            alt="logo"
          />
        </div>
        <div class="flex">
          <button
            id="header-create-account-button"
            @click="() => emit('create-account')"
            class="px-6 py-2 font-bold rounded-full text-white focus:outline-none"
          >
            Sign Up
          </button>
          <button
            id="header-login-button"
            @click="() => emit('login')"
            class="px-6 py-2 font-bold bg-white rounded-full text-brand-main focus:outline-none"
          >
            Login
          </button>
        </div>
      </div>
      <div class="flex flex-col mt-28">
        <h1 class="text-4xl font-black text-white">
          Have a feedback. <br />
          Make your customers <br class="hidden lg:inline-block" />
          happier!
        </h1>
        <p class="text-lg font-medium text-white">
          Receive ideas, issues and feedbacks with a
          <br class="hidden lg:inline-block" />
          simple page widget.
        </p>
        <div>
          <button
            id="cta-create-account-button"
            @click="() => emit('create-account')"
            class="px-6 py-2 font-bold bg-white rounded-full text-brand-main focus:outline-none mt-10"
          >
            Create a free account
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  setup (_, { emit }) {
    return { emit }
  }
}
</script>

<style lang="postcss" scoped>
.header {
  @apply bg-brand-main w-full flex justify-center;
  height: 700px;
}

.header-group {
  @apply flex flex-col w-4/5 max-w-6xl;
}

@media (min-width: 640px) {
  .header-group {
    background-image: url(../../assets/images/blue_balloons.png);
    background-size: 628px;
    background-position: 90% 100%;
    background-repeat: no-repeat;
  }
}
</style>
