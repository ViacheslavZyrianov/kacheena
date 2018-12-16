<template>
  <div class="avatar">
    <img
      :src="src"
      :alt="alt"
      class="avatar__img"
    >
  </div>
</template>

<script>
import defaultAvatar from '@/assets/img/default-avatar.svg'

export default {
  name: 'Avatar',
  props: {
    src: {
      type: String,
      required: true,
      default: defaultAvatar
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

