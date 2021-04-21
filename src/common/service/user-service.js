import $jsonurl from 'config/api-url.js'

export default function userService(http) {
  return {
    login(params) {
      return http.post($jsonurl.user.login, params)
    }

  }
}
