<template>
  <v-dialog
    persistent
    v-model="isProfilePhoneDialogVisible"
  >
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="phoneValue"
          label="Phone number"
          type="number"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="secondary"
          flat
          @click="onCancelDialog"
        >
          Cancel
        </v-btn>
        <v-btn
          color="success"
          :loading="isProfilePhoneSaveLoading"
          :disabled="isProfilePhoneSaveDisabled"
          @click="onSaveProfilePhone"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'PhoneChangeDialog',
  props: {
    phone: {
      default: '',
      required: true
    },
    isProfilePhoneDialogVisible: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      phoneValue: this.phone,
      isProfilePhoneSaveLoading: false
    }
  },
  computed: {
    isProfilePhoneSaveDisabled () {
      return this.phoneValue === null ? true : !this.isProfilePhoneSaveLoading && this.phoneValue.length !== 12
    }
  },
  methods: {
    ...mapActions({
      savePhoneNumber: 'profile/savePhoneNumber'
    }),
    async onSaveProfilePhone () {
      this.isProfilePhoneSaveLoading = true
      await this.savePhoneNumber(this.phoneValue)
      this.isProfilePhoneSaveLoading = false
      this.$emit('closeDialog')
    },
    onCancelDialog () {
      this.phoneValue = this.phone
      this.$emit('closeDialog')
    }
  },
  created () {
    this.phoneValue = this.phone
  }
}
</script>
