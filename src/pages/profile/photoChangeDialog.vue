<template>
  <v-dialog
    v-model="isDisplayPhotoDialogVisible"
    persistent
    max-width="300"
  >
    <v-card :max-width="300">
      <v-container>
        <v-layout column align-center>
          <h3>Choose avatar</h3>
          <croppa
            v-model="croppa"
            :accept="'image/*'"
            :initial-image="avatarURL"
            :prevent-white-space="true"
            :show-loading="true"
            :canvas-color="'#ffffff'"
            :placeholder="'Touch to choose an image'"
            :placeholder-font-size="16"
            :remove-button-size="0"
            @init="onCroppaInit"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="secondary"
              flat
              @click="onCancelDialog"
            >
              Cancel
            </v-btn>
            <v-btn
              color="success"
              :loading="isProfilePhotoSaveLoading"
              :disabled="isProfilePhotoSaveLoading"
              @click="onSaveProfilePhoto"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PhotoChangeDialog',
  props: {
    avatarURL: {
      type: String,
      default: '',
      required: true
    },
    isDisplayPhotoDialogVisible: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      croppa: {},
      avatarURLValue: '',
      isProfilePhotoSaveLoading: false
    }
  },
  methods: {
    ...mapActions({
      saveAvatarBlob: 'profile/saveAvatarBlob'
    }),
    onCroppaInit () {
      this.croppa.addClipPlugin((ctx, x, y, w, h) => {
        ctx.beginPath()
        ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true)
        ctx.closePath()
      })
    },
    async onSaveProfilePhoto () {
      this.isProfilePhotoSaveLoading = true
      const blob = await this.croppa.promisedBlob()
      await this.saveAvatarBlob(blob)
      this.isProfilePhotoSaveLoading = false
      this.$emit('closeDialog')
    },
    onCancelDialog () {
      this.avatarURLValue = this.avatarURL
      this.$emit('closeDialog')
    }
  },
  created () {
    this.avatarURLValue = this.avatarURL
  }
}
</script>

<style lang="scss" scoped>
.croppa-container {
  position: relative;
  align-self: auto;

  .icon-remove {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>

