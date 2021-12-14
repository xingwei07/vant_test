const state = {
  isReady: false,
  color: ''
}

const mutations = {
  SET_IS_READY (state, isReady) {
    state.isReady = isReady
  },
  SET_STATUS_BAR_COLOR (state, color) {
    state.color = color
  }
}
const initH5Plus = (callback, commit) => {
  if (window.plus) {
    console.log('IS_READY')
    commit('SET_IS_READY', true)
    callback && callback()
  } else {
    document.addEventListener('plusready', () => {
      console.log('IS_READY')
      commit('SET_IS_READY', true)
      callback && callback()
    }, false)
  }
}
const actions = {
  initPlus ({ commit }) {
    return new Promise(resolve => {
      initH5Plus(() => {
        resolve()
      }, commit)
    })
  },
  setStatusBarColor ({ commit, state }, color, mode) {
    if (state.color === color) {
      return false
    }
    initH5Plus(() => {
      const plus = window.plus
      plus.navigator.setStatusBarBackground(color)
      plus.navigator.setStatusBarStyle(mode)
      commit('SET_STATUS_BAR_COLOR', color)
    }, commit)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
