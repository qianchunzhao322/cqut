import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false,
    showSidebar: Cookies.get('showSidebar') ? !!+Cookies.get('showSidebar') : true
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SHOW_SIDEBAR: (state) => {
    state.sidebar.showSidebar = !state.sidebar.showSidebar
    if(state.sidebar.showSidebar){
      Cookies.set('showSidebar', 1)
    }else{
      Cookies.set('showSidebar', 0)
    }
  },
  CLOSE_SHOW_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('showSidebar', 0)
    state.sidebar.showSidebar = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  SHOW_SHOW_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('showSidebar', 1)
    state.sidebar.showSidebar = true
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  SHOW_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = true
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  openSidebar({ commit }){
    commit('SHOW_SHOW_SIDEBAR')
  },
  toggleShowSidebar({ commit }, flag){
    // commit('TOGGLE_SHOW_SIDEBAR', flag)
  },
  closeShowSidebar({ commit }){
    commit('CLOSE_SHOW_SIDEBAR')
  },
  showSidebarOpened({ commit }){
    commit('SHOW_SIDEBAR')
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
