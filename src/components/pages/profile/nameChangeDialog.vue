<template>
  <v-dialog
    persistent
    v-model="isDisplayNameDialogVisible"
  >
    <v-card>
      <v-card-text>
        <v-text-field
          v-model="nameValue"
          label="Name"
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
          :loading="isDisplayNameSaveLoading"
          :disabled="isDisplayNameSaveDisabled"
          @click="onSaveDisplayName"
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
  name: 'NameChangeDialog',
  props: {
    name: {
      default: '',
      required: true
    },
    isDisplayNameDialogVisible: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  data () {
    return {
      nameValue: '',
      isDisplayNameSaveLoading: false
    }
  },
  computed: {
    isDisplayNameSaveDisabled () {
      return this.nameValue === null ? true : !this.isDisplayNameSaveLoading && this.nameValue.length < 2
    }
  },
  methods: {
    ...mapActions({
      saveDisplayName: 'profile/saveDisplayName'
    }),
    async onSaveDisplayName () {
      this.isDisplayNameSaveLoading = true
      await this.saveDisplayName(this.nameValue)
      this.isDisplayNameSaveLoading = false
      this.$emit('closeDialog')
    },
    onCancelDialog () {
      this.nameValue = this.name
      this.$emit('closeDialog')
    }
  },
  created () {
    this.nameValue = this.name
  }
}
</script>
