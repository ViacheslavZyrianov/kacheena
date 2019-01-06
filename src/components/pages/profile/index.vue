<template>
  <v-container fill-height>
    <v-layout column>
      <avatar
        :src="avatarUrl"
        alt="User avatar"
        class="profile__avatar"
      />
      <v-btn @click="onChangePhoto">Change photo</v-btn>
      <v-layout
        row align-center shrink
        :justify-space-between="getUser.displayName"
        :justify-center="!getUser.displayName"
      >
        <template v-if="getUser.displayName">
          <h1 class="profile__name">{{ this.getUser.displayName }}</h1>
          <v-btn
            color="info"
            @click="onShowChangeDisplayNameDialog"
          >
            Edit
          </v-btn>
        </template>
        <v-btn
          v-else
          color="info"
          @click="onShowChangeDisplayNameDialog"
        >
          Add name
        </v-btn>
      </v-layout>
      <v-layout row justify-space-between align-center shrink>
        <v-subheader>Phone</v-subheader>
        <template v-if="getUser.phoneNumber">
          <span>{{ getUser.phoneNumber }}</span>
          <v-btn
            color="info"
            @click="onShowChangeProfilePhoneDialog"
          >
            Edit
          </v-btn>
        </template>
        <v-btn
          v-else
          color="info"
          @click="onShowChangeProfilePhoneDialog"
        >
          Add
        </v-btn>
      </v-layout>
      <v-layout
        justify-end shrink
        mt-auto
      >
        <v-btn @click="signOut">
          Sign out
        </v-btn>
      </v-layout>
    </v-layout>
    <name-change-dialog
      :name="getUser.displayName"
      :isDisplayNameDialogVisible="isDisplayNameDialogVisible"
      @closeDialog="onCancelDialog"
    />
    <phone-change-dialog
      :phone="getUser.phoneNumber"
      :isProfilePhoneDialogVisible="isProfilePhoneDialogVisible"
      @closeDialog="onCancelDialog"
    />
    <photo-change-dialog
      v-if="getUser.photoURL"
      :photoUrl="getUser.photoURL"
      :isDisplayPhotoDialogVisible="isDisplayPhotoDialogVisible"
      @closeDialog="onCancelDialog"
    />
  </v-container>
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
      isDisplayPhotoDialogVisible: false
    }
  },
  computed: {
    ...mapGetters({
      getUser: 'getUser'
    }),
    avatarUrl () {
      return this.getUser.photoURL || ''
    },
    avatarAlt () {
      return `${this.userDisplayName || 'User'}'s avatar`
    }
  },
  created () {
    this.fetchPhotoUrl()
  },
  methods: {
    ...mapActions({
      signOut: 'profile/signOut',
      fetchPhotoUrl: 'profile/fetchPhotoUrl'
    }),
    onShowChangeProfilePhoneDialog (profileItem) {
      this.isProfilePhoneDialogVisible = true
    },
    onShowChangeDisplayNameDialog () {
      this.isDisplayNameDialogVisible = true
    },
    onChangePhoto () {
      this.isDisplayPhotoDialogVisible = true
    },
    onCancelDialog () {
      this.isProfilePhoneDialogVisible = false
      this.isDisplayNameDialogVisible = false
      this.isDisplayPhotoDialogVisible = false
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
