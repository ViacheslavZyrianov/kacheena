import firebase from './firebase'

firebase.auth().useDeviceLanguage()

let recaptchaId = ''
const initRecaptcha = () => {
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    'size': 'normal',
    'callback' (response) {
      recaptchaId = response
    },
    'expired-callback' () {
      console.error('Captcha fucked up :(')
    }
  })
  window.recaptchaVerifier.render()
}

export {
  initRecaptcha,
  recaptchaId
}
