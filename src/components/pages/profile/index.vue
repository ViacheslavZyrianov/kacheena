<template>
  <v-layout>
    <v-layout column>
      <avatar
        :src="avatarImg"
        alt="User avatar"
        class="profile__avatar"
      />
      <v-layout row justify-center align-center shrink>
        <h1
          v-if="this.getProfile.displayName"
          class="profile__name"
        >
          {{ this.getProfile.displayName }}
        </h1>
        <v-subheader v-else>Add your name and surname</v-subheader>
      </v-layout>
      <v-layout row justify-space-between align-center shrink>
        <v-subheader>Phone</v-subheader>
        <span>{{ getProfile.phoneNumber }}</span>
      </v-layout>
      <v-layout justify-end shrink mt-auto>
        <v-btn @click="onSignOut">
          Sign out
        </v-btn>
      </v-layout>
    </v-layout>
    <name-change-dialog
      :name="getProfile.displayName"
      :isDisplayNameDialogVisible="isDisplayNameDialogVisible"
      @closeDialog="onCancelDialog"
    />
    <phone-change-dialog
      :phone="phone"
      :isProfilePhoneDialogVisible="isProfilePhoneDialogVisible"
      @closeDialog="onCancelDialog"
    />
    <photo-change-dialog
      :avatarURL="getProfile.avatarURL"
      :isDisplayPhotoDialogVisible="isDisplayPhotoDialogVisible"
      @closeDialog="onCancelDialog"
    />
    <confirm-dialog
      :isOpened="isSignOutConfirmDialogVisible"
      title="Sign out"
      @reject="onSignOutConfirmDialogReject"
      @confirm="onSignOutConfirmDialogConfirm"
    />
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import nameChangeDialog from './nameChangeDialog'
import phoneChangeDialog from './phoneChangeDialog'
import photoChangeDialog from './photoChangeDialog'

export default {
  name: 'PageProfile',
  components: {
    phoneChangeDialog,
    nameChangeDialog,
    photoChangeDialog
  },
  data () {
    return {
      userDisplayName: '',
      isDisplayNameDialogVisible: false,
      isProfilePhoneDialogVisible: false,
      isDisplayPhotoDialogVisible: false,
      isSignOutConfirmDialogVisible: false
    }
  },
  computed: {
    ...mapGetters({
      getProfile: 'profile/getProfile'
    }),
    avatarImg () {
      return this.getProfile.avatarUrl ? this.getProfile.avatarUrl : 'default'
    },
    avatarAlt () {
      return `${this.userDisplayName || 'User'}`
    },
    phone () {
      return this.getProfile.phoneNumber.slice(1)
    }
  },
  created () {
    this.fetchAvatarURL()
    this.$root.$emit('setKebabMenu', [
      {
        title: 'Edit photo',
        click: this.changePhoto
      },
      {
        title: 'Edit name',
        click: this.showChangeDisplayNameDialog
      }
    ])
  },
  destroyed () {
    this.$root.$emit('setKebabMenu', [])
  },
  methods: {
    ...mapActions({
      signOut: 'profile/signOut',
      fetchAvatarURL: 'profile/fetchAvatarURL'
    }),
    showChangeProfilePhoneDialog (profileItem) {
      this.isProfilePhoneDialogVisible = true
    },
    showChangeDisplayNameDialog () {
      this.isDisplayNameDialogVisible = true
    },
    changePhoto () {
      this.isDisplayPhotoDialogVisible = true
    },
    onCancelDialog () {
      this.isProfilePhoneDialogVisible = false
      this.isDisplayNameDialogVisible = false
      this.isDisplayPhotoDialogVisible = false
    },
    onSignOut () {
      this.isSignOutConfirmDialogVisible = true
    },
    onSignOutConfirmDialogReject () {
      this.isSignOutConfirmDialogVisible = false
    },
    onSignOutConfirmDialogConfirm () {
      this.isSignOutConfirmDialogVisible = false
      this.signOut()
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  &__main-info {
    margin-bottom: 32px;
  }

  &__avatar {
    margin: 0 auto 16px;
  }

  &__name {
    text-align: center;
    font-size: 32px;
    font-weight: 300;
    word-break: break-all;
  }

  &__info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100vw;

    span {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      padding: 0 16px;
      text-align: right;
    }
  }
}
</style>
