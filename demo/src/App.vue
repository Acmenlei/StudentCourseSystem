<template>
  <div id="app">
  <router-view name="login" />
  <div class="nav">
<keep-alive>
    <router-view name="home"/>
</keep-alive>
    </div>
  </div>
</template>
<script>

export default {
  name: 'app',
  data() {
    return {
      wdithX:0,
      heightY:0,
      num:0,
      name:"",
      element:null,
    }
  },
  mounted() {
    document.onclick=(e) => {
      this.wdithX=e.clientX
      this.heightY=e.clientY
      this.num++;
      if(this.num>12) {
        this.num=1;
      }
      switch (this.num) {
        case 1:
          this.name="富强";
          break;
          case 2:
          this.name="民主"
          break;
          case 3:
          this.name="文明"
          break;
          case 4:
          this.name="和谐"
          break;
          case 5:
          this.name="自由"
          break;
          case 6:
          this.name="平等"
          break;
          case 7:
          this.name="公正"
          break;
          case 8:
          this.name="法制"
          break;
          case 9:
          this.name="爱国"
          break;
          case 10:
          this.name="敬业"
          break;
          case 11:
          this.name="诚信"
          break;
          case 12:
          this.name="友善"
          break;
      }
     this.createEle(this.name);
    }
  },
  methods: {
    createEle(name) {
      this.element=document.createElement('star');
      document.querySelector('body').appendChild(this.element);
      this.element.style.position="absolute";
      this.element.style.left=this.wdithX+'px';
      this.element.style.top=this.heightY+'px';
       this.element.innerText=name;
        setTimeout(() => {
              this.removenode();
                setTimeout(() => {
                  var stars=document.querySelectorAll('star');
                for(var i=0;i<stars.length;i++) {
                  document.querySelector('body').removeChild(stars[i]);
                }
              }, 400);
            }, 150);
    },
    removenode() {
     this.element.style.transition="all 1s";
      this.element.style.transform="translateY(-100px)";
    }
  },
}
</script>

<style>

body,html{
  width: 100%;
  height: 100%;
}
*{
  margin: 0;padding: 0;
  list-style-type: none;
}
.nav{
  padding-left: 300px;
    
}
body{
  background: #f2f2f2;
}
star{
  color: orangered;
  font-weight: bold;
  user-select:none;
}
</style>
