<template>
  <section class="page page-profile">
    <img
      :src="getUser.photoURL"
      :alt="getUser.displayName"
      class="profile__photo"
    >
    <h1 class="profile__name">{{ getUser.displayName }}</h1>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageProfile',
  computed: {
    ...mapGetters({
      getUser: 'getUser'
    })
  }
}
</script>

<style lang="scss" scoped>
.page-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.profile {
  &__photo {
    width: 60vw;
    height: 60vw;
    max-width: 400px;
    max-height: 400px;
    overflow: hidden;
    border-radius: 50%;
    object-fit: cover;
  }

  &__name {
    word-break: break-all;
  }
}
</style>

