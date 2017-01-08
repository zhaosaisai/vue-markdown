<template>
  <div :class="{'text-input': true, 'to-left':status.watch, 'to-right':status.edit}">
    <textarea name="input" v-model="inputValue" class="md-textarea"></textarea>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
        'status': 'getStatus'
      }),
    'inputValue': {
      set (value) {
        this.updateInputValue(value)
        this.updateRender(value)
      },
      get () {
        return this.$store.getters.getInputValue
      }
    }
  },
  created () {

  },
  attached () {},
  methods: {
    ...mapActions([
      'updateInputValue',
      'updateRender'
    ])
  },
  components: {}
}
</script>

<style lang="stylus">
.text-input
  width: 50%
  height: 500px
  position: relative
  padding: 10px 0px
  box-sizing: border-box
  overflow: hidden
  transition: all .3s ease
  &.to-right
    width: 100%
  &.to-left
    width: 0
  textarea
    resize: none
    border: none
    width: 100%
    height: 500px
    outline: none
    box-sizing: border-box
</style>
