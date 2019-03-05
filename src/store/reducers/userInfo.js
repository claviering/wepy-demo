import { handleActions } from 'redux-actions'
import { SETINFO } from '../types/userInfo'

export default handleActions({
  [SETINFO] (state, res) {
    console.log('store res', res)
    return {
      ...state,
      avatarUrl: res.payload.userInfo.avatarUrl,
      city: res.payload.userInfo.city,
      country: res.payload.userInfo.country,
      gender: res.payload.userInfo.gender,
      language: res.payload.userInfo.language,
      nickName: res.payload.userInfo.nickName,
      iv: res.payload.iv,
      signature: res.payload.signature,
    }
  }
}, {
  avatarUrl: '',
  city: '',
  country: '',
  gender: 0,
  language: '',
  nickName: '',
  iv: '',
  signature: '',
})