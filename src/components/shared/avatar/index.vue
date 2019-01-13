<template>
  <div class="avatar">
    <img
      :src="avatarSrc"
      :alt="alt"
      class="avatar__img"
    >
  </div>
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true,
      default: 'Image'
    },
    isEditable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    avatarSrc () {
      return this.src === 'default' ? '/static/img/default-avatar.svg' : this.src
    }
  }
}
</script>

<style lang="scss" scoped>
$maxAvatarSize: 400px;
$avatarSize: 60vw;

.avatar{
    overflow: hidden;
    border-radius: 50%;
    width: $avatarSize;
    height: $avatarSize;
    max-width: $maxAvatarSize;
    max-height: $maxAvatarSize;

  &__img {
    width: $avatarSize;
    height: $avatarSize;
    max-width: $maxAvatarSize;
    max-height: $maxAvatarSize;
    display: block;
    object-fit: cover;
  }
}
</style>

