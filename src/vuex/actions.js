import marked from 'marked'
import highlight from 'highlight.js'

marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  }
});

export default {
  updateStatus ({ commit }, status) {
    commit('UPDATE_STATUS', status)
  },
  updateInputValue ({ commit }, value) {
    commit('UPDATE_INPUT_VALUE', value)
  },
  updateRender ({ commit }, value) {
    commit('UPDATE_RENDER', marked(value))
  }
}
