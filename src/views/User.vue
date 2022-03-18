<template>

<div class="header">
<div class="inner-header flex">
<div class="pic">
  <img :src="userInfo.pic"/>
</div>
<div class="name">{{userInfo.name}}</div>
<div class="regmark">{{userInfo.regmark}}</div>
</div>

<!--Waves Container-->
<div>
<svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
<defs>
<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
</defs>
<g class="parallax">
<use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
<use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
<use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
<use xlink:href="#gentle-wave" x="48" y="7" fill="#f6f7f9" />
</g>
</svg>
</div>
<!--Waves end-->

</div>
</template>

<script>
import { getInfo } from '../../api/user'
export default {
  name: 'user',
  data () {
    return {
      id: '',
      userInfo: {
        name: '',
        pic: '',
        isVip: 0
      }
    }
  },
  mounted () {
    this.id = this.$route.query._id
    this._getInfo()
  },
  methods: {
    _getInfo () {
      this.userInfo = this.$store.state.userInfo
      if (this.userInfo._id === this.id || !this.id) {
        return
      }
      getInfo({ _id: this.id }).then((res) => {
        if (res.code === 200) {
          this.userInfo = res.data
        }
      })
    }
  },
  computed: {
  }
}
</script>

<style scoped>
@import url(//fonts.googleapis.com/css?family=Lato:300:400);
.pic {
  overflow: hidden;
  width: 98px;
  height: 98px;
  border-radius: 50%;
}
.pic img {
  width: 100%;
  height: 100%;
}
.name {
  margin-top:24px;
  color: white;
  font-size: 27px;
}
.regmark {
  margin-top:14px;
  color: white;
  font-size: 20px;
}
.header {
  position:relative;
  text-align:center;
  background: linear-gradient(60deg, rgba(84,58,183,1) 0%, rgba(0,172,193,1) 100%);
  color:white;
}

.inner-header {
  height:65vh;
  width:100%;
  margin: 0;
  padding: 0;
}

.flex { /*Flexbox for containers*/
  display: flex;
  padding-top: 120px;
  text-align: center;
  align-items: center;
  flex-direction: column;
}

.waves {
  position:relative;
  width: 100%;
  height:15vh;
  margin-bottom:-7px; /*Fix for safari gap*/
  min-height:100px;
  max-height:150px;
}

.content {
  position:relative;
  height:20vh;
  text-align:center;
  background-color: white;
}

/* Animation */

.parallax > use {
  animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
}
.parallax > use:nth-child(1) {
  animation-delay: -2s;
  animation-duration: 7s;
}
.parallax > use:nth-child(2) {
  animation-delay: -3s;
  animation-duration: 10s;
}
.parallax > use:nth-child(3) {
  animation-delay: -4s;
  animation-duration: 13s;
}
.parallax > use:nth-child(4) {
  animation-delay: -5s;
  animation-duration: 20s;
}
@keyframes move-forever {
  0% {
   transform: translate3d(-90px,0,0);
  }
  100%{
    transform: translate3d(85px,0,0);
  }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
  .waves {
    height:40px;
    min-height:40px;
  }
  .content {
    height:30vh;
  }
  h1 {
    font-size:24px;
  }
}
</style>
