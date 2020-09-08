<template>
  <v-app id="sandbox">
    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
    >
      <v-list dense>

        <template v-for="item in items">
        
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>

            <v-flex
              xs6
              class="text-xs-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-flex>
          </v-layout>

          <v-list-group color="indigo darken-1"
                  v-else-if="item.children"
                  :key="item.text"
                  v-model="item.model"
                  :prepend-icon="item.model ? item.icon : item['icon-alt']"
                  append-icon=""
                >
                  <template v-slot:activator>
                    <v-list-item color="indigo darken-1">
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ item.text }}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </template>

                  <v-list-item 
                      v-for="(child, i) in item.children"
                      :key="i"
                      @click="$router.push(child.url)"
                    >
                      <v-list-item-action v-if="child.icon">
                        <v-icon>{{ child.icon }}</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title>
                        {{ child.text }}
                        </v-list-item-title>
                      </v-list-item-content>
                  </v-list-item>
            
          </v-list-group>

<!-- 
          <v-list-item color="indigo darken-1"   
            v-else :key="items.text"
            @click="$router.push(item.url)"
          >
          
            <v-list-item-action         
            >
              <v-icon>{{ item.icon }}</v-icon>

            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>

          </v-list-item> -->

        </template>
      </v-list>
    </v-navigation-drawer>

    <!--FIN NAVEGACION DRAWER-->



    <!--NAVBAR/TOOLBAR-->
    <v-app-bar
      color="indigo darken-1"
      :clipped-left="primaryDrawer.clipped"
      app
    >
      <v-app-bar-nav-icon
      style="color:white;"
        v-if="primaryDrawer.type !== 'permanent'"
        @click.stop="primaryDrawer.model = !primaryDrawer.model"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>
        <h2 id="textocolorblanco">SISALM</h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>

          <v-btn class="ma-2" outlined color="white" @click="salir()">Cerrar Sesión</v-btn>
     

      <v-btn id="textocolorblanco" class="mx-2" fab dark large
        icon
      >
             <v-avatar
          size="60px"
          item
        >
          <v-img
          width="10%"
            src="@/assets/usuario_general.jpg"
            alt="Vuetify"
          >
          </v-img>
          </v-avatar>
          </v-btn>

    </v-app-bar>
    <!--NAVBAR/TOOLBAR-->

    <!--CONTENIDO PRINCIPAL DE LA PAGINA-->
    <v-content>
    <router-view/>


    </v-content>
    <!--FIN CONTENIDO PRINCIPAL DE LA PAGINA-->

    <!--FOOTER-->
    <v-footer
    color="indigo darken-0"
      :inset="footer.inset"
      app
    >
      <span 
      style="color:white;"
      class="px-4">&copy; {{ new Date().getFullYear() }}, Unidad de Sistemas AFCOOP</span>
    </v-footer>
    <!--FIN FOOTER-->
  </v-app>

</template>

<script>
var menu=[];
  export default 
  {
    data: () => ({
      drawers: ['Default (no property)', 'Permanent', 'Temporary'],
      primaryDrawer: {
        model: false,
        type: 'default (no property)',
        clipped: true,
        floating: true,
        mini: false,
        
      },
          items: menu,
      footer: {
        inset: false,
      }
    
    }),
    created()
    {
      //var guardado = localStorage.getItem('datos');
      var t = JSON.parse(sessionStorage.getItem('datos'));
      for(var h=0;h<t.length;h++)
      {
        var r={};
        var iconitos=t[h].icon;
        var tt=iconitos.split(',');
        r={text:t[  h].text,url:t[h].url,icon:tt[1],'icon-alt':tt[0]};
        var children=[];
        for(var g=0;g<t[h].children.length;g++)
        {
          var rr={};
          rr.text=t[h].children[g].text;
          rr.url=t[h].children[g].url;
          rr.icon=t[h].children[g].icon;
          children.push(rr);
        }
        r.children=children;
        menu.push(r);
      }
    },
      methods:{
        salir()
        {
          sessionStorage.removeItem('datos');
          sessionStorage.clear();
          this.$router.push('/');
          location.reload();
        }
      }
  }
</script>

<style>

#textocolorblanco{
  color:white;
}

</style>