<template>
  <div class="container">
    <md-title></md-title>
    <div class="content-container">
      <selections></selections>
      <div class="text-container clearfix">
          <text-input></text-input>
          <show-html></show-html>
      </div>
    </div>
  </div>
</template>

<script>
import MdTitle from 'components/MdTitle'
import Selections from 'components/Selections'
import TextInput from 'components/TextInput'
import ShowHtml from 'components/ShowHtml'
import 'components/common'

export default {
  components: {
    MdTitle,
    Selections,
    TextInput,
    ShowHtml,
  },
  computed: {

  }
}
</script>

<style lang="stylus">
html,body
  width: 100%
  height: 100%
body
  padding: 0
  margin: 0
  .container
    box-sizing: border-box
    width: 100%
    height: 100%
    padding: 30px
    min-width: 700px
    .content-container
      width: 100%
      box-sizing: border-box
      margin-top: 30px
      border: solid 1px #ccc
      .text-container
        height: 500px
        position: relative
        overflow: hidden
.clearfix
  &:after
    content:''
    display: block
    width: 0
    height: 0
    visibility: hidden
    clear: both
ul
  list-style: none
  padding: 0
  margin: 0
</style>
