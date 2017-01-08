<template>
  <div class="mask" v-if="show">
    <div class="dialog">
      <h1 class="title">
        <span>{{title}}</span>
        <i @click="hide">X</i>
      </h1>
      <input type="text" name="name" value="" class="text" :placeholder="placeholder" v-model="value">
      <div class="bottom">
        <input type="button" name="name" value="取消" class="cancel" @click="hide">
        <input type="button" name="name" value="插入" class="confirm" @click="confirm">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // show: false
    }
  },
  methods: {
    
  }
}
</script>

<style lang="stylus">
.mask
  position: fixed
  top: 0
  bottom: 0
  left: 0
  right: 0
  background-color: rgba(0, 0, 0, 0.5)
  .dialog
    width: 600px
    height: 200px
    position: absolute
    top: 100px
    left: 50%
    margin-left: -300px
    background-color: #FFF
    border-radius: 5px
    overflow: hidden
    .title
      padding: 15px
      height: 58px
      box-sizing: border-box
      background-color: #ccc
      margin: 0
      span
        float: left
        font-size: 18px
        color: #333
      i
        float: right
        font-size: 18px
        font-style: normal
        cursor: pointer
    .text
      display: block
      margin: 10px auto
      height: 40px
      box-sizing: border-box
      padding: 5px 10px
      border-radius: 5px
      outline: none
      border: solid 1px #ccc
      width: 95%
    .bottom
      position: absolute
      bottom: 0
      width: 100%
      height: 48px
      text-align: right
      input
        display: inline-block
        margin-bottom: 10px
        font-weight: normal
        text-align: center
        vertical-align: middle
        cursor: pointer
        background-image: none
        border: 1px solid transparent
        white-space: nowrap
        padding: 6px 12px
        font-size: 14px
        line-height: 1.5
        border-radius: 3px
        &.confirm
          margin-right: 10px
          background: #009a61
          color: #fff
</style>
