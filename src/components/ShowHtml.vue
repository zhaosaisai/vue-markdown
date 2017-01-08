<template lang="html">
<div :class="{'text-output': true, 'fmt': true, 'move-left':status.edit, 'move-right':status.watch}" v-html="html"></div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
        'status': 'getStatus',
        'html': 'getRenderHtml'
      })
  },
  ready () {},
  attached () {},
  methods: {},
  components: {}
}
</script>

<style lang="stylus">
@import '../common/md'
.text-output
  width: 50%
  height: 500px
  position: absolute
  top: 0
  left: 50%
  background-color: #f6f6f6
  border-left: solid 1px #ccc
  box-sizing: border-box
  flex: 1
  padding: 10px 20px
  transition: all .3s ease
  &.move-left
    width: 20000px
    left: 100%
  &.move-right
    width: 100%
    left: 0
    border: none
</style>
