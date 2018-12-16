<template>
  <v-dialog
    persistent
    v-model="isDisplayPhotoDialogVisible"
  >
    <v-card>
      <v-layout column align-center p-3>
        <h1>Choose avatar</h1>
        <croppa
          v-model="croppa"
          :accept="'image/*'"
          :initial-image="photoUrl"
          :prevent-white-space="true"
          :show-loading="true"
          :canvas-color="'#ffffff'"
          :placeholder="'Touch to choose an image'"
          :placeholder-font-size="16"
          :remove-button-size="32"
          @init="onCroppaInit"
        />
        <v-card-actions>
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
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PhotoChangeDialog',
  props: {
    photoUrl: {
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
      photoUrlValue: '',
      isProfilePhotoSaveLoading: false
    }
  },
  methods: {
    ...mapActions({
      savePhotoBlob: 'profile/savePhotoBlob'
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
      await this.savePhotoBlob(blob)
      this.isProfilePhotoSaveLoading = false
      this.$emit('closeDialog')
    },
    onCancelDialog () {
      this.photoUrlValue = this.photoUrl
      this.$emit('closeDialog')
    }
  },
  created () {
    this.photoUrlValue = this.photoUrl
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

