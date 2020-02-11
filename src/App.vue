<template>
  <component :is="layout"></component>
</template>
<script>
  import LoginLayout from './components/layouts/Login'
  import PanelprincipalLayout from './components/layouts/Panelprincipal'
  import PrincipalLayout from './components/layouts/Principal'
  /*import PrincipalsuperusuLayout from './components/layouts/Principalsuperusu'
  import PrincipalsuperadminLayout from './components/layouts/Principalsuperadmin'
  import PrincipalapoyoLayout from './components/layouts/Principalapoyo'*/


  import {mapState} from 'vuex'
  
  export default
  {
    components: {LoginLayout, PanelprincipalLayout,PrincipalLayout},//,PrincipalsuperusuLayout,PrincipalsuperadminLayout,PrincipalapoyoLayout},
    computed: mapState(['layout'])
  }
</script>

