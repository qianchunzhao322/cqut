import { login, logout, getInfo, resetInfo, resetPwd } from '@/api/user'
import { getToken, setToken, removeToken, setUserRealId, setUserInfo, removeUserInfo, getUserInfo } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    userId: '',
    userInfo: {},
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_USER: (state, data) => {
    state.userInfo = data
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, id) => {
    state.userId = id
  },
  SET_USERREALID: (state, realId) => {
    state.userRealId = realId
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USERInfo: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  setToken({ commit }, token) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', token)
      setToken(token)
      resolve()
    })
  },
  setUserDetail({ commit, state }, data) {
    return new Promise((resolve, reject) => {
      commit('SET_USER', data)
      resolve(data)
    })
  },
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        const { data } = response
        if (response.code === 200) {
          console.log(data)
          commit('SET_USERInfo', data)
          setUserInfo(data)
          commit('SET_USER', data)
          commit('SET_NAME', data.realName)
          commit('SET_USERID', data.id)
          commit('SET_USERREALID', data.userId)
          commit('SET_TOKEN', data.token)
          setUserRealId(data.userId)
          setToken(data.token)
          resolve(response)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const user = getUserInfo()
      console.log('user', user)
      commit('SET_NAME', user.realName)
      commit('SET_USER', user)
      commit('SET_USERID', user.id)
      commit('SET_USERREALID', user.userId)
      commit('SET_ROLES', [user.permissionCode])
      setUserInfo(user)
      resolve(user)
    })
  },

  // reset user info
  resetInfo({ commit, state }, userInfo) {
    return new Promise((resolve, reject) => {
      resetInfo({ ...userInfo }).then(response => {
        setUserInfo(userInfo)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // reset user pwd
  resetPwd({ commit, state }, pwd) {
    return new Promise((resolve, reject) => {
      resetPwd({ ...pwd, id: state.userInfo.id }).then(response => {
        if (response.code !== 200) {
          return reject('Verification option.')
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      removeUserInfo()
      resetRouter()
      commit('RESET_STATE')
      commit('SET_ROLES', [])
      resolve()

      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   removeUserInfo()
      //   resetRouter()
      //   commit('RESET_STATE')
      //   commit('SET_ROLES', [])
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

