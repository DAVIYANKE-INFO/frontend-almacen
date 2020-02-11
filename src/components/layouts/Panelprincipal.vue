<template>
  <v-app id="sandbox">

    <!--NAVEGACION DRAWER-->
    <!--<v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      overflow
    >
    <div style="background-color:RGB(57, 75, 205);">
          <center>
          <img src="@/images/usuario.png" width="100" height="120" alt="">
          </center>
          </div>
          <v-divider></v-divider>
          <v-list dense>
        <template v-for="item in items">
          <v-row

            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item>
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
          <v-list-item
            v-else
            :key="item.text"
        
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>-->

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
    <!--  <div style="background-color:RGB(57, 75, 205);">
          <center>
          <img src="@/images/usuario.png" width="100" height="120" alt="">
          </center>
          </div>
          <v-divider></v-divider>   -->
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





          <v-list-item color="indigo darken-1"   
            v-else
            :key="items.text"
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

          </v-list-item>
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
        <h2 id="textocolorblanco">SISTEMA DE GESTION DE ALMACÉN</h2>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      
      <!--<v-btn id="textocolorblanco" icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn id="textocolorblanco" icon>
        <v-icon>notifications</v-icon>
      </v-btn>
      <v-btn id="textocolorblanco"
        icon
        large
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
          </v-img></v-avatar>-->
          

          <v-btn class="ma-2" outlined color="white" @click="salir()">CERRAR SESIÓN</v-btn>
     

      <v-btn id="textocolorblanco" class="mx-2" fab dark large
        icon
      >
             <v-avatar
          size="60px"
          item
        >
          <v-img
          width="10%"
            src="@/images/usuario_general.jpg"
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

    
    <!-- <v-container fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="10">
            <v-card>
              <v-card-text>
                <v-row>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <span>Scheme</span>
                    <v-switch
                      v-model="$vuetify.theme.dark"
                      primary
                      label="Dark"
                      
                    ></v-switch>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <span>Drawer</span>
                    <v-radio-group
                      v-model="primaryDrawer.type"
                      column
                    >
                      <v-radio
                        v-for="drawer in drawers"
                        :key="drawer"
                        :label="drawer"
                        :value="drawer.toLowerCase()"
                        primary
                      ></v-radio>
                    </v-radio-group>
                    <v-switch
                      v-model="primaryDrawer.clipped"
                      label="Clipped"
                      primary
                    ></v-switch>
                    <v-switch
                      v-model="primaryDrawer.floating"
                      label="Floating"
                      primary
                    ></v-switch>
                    <v-switch
                      v-model="primaryDrawer.mini"
                      label="Mini"
                      primary
                    ></v-switch>
                  </v-col>
                  <v-col
                    cols="12"
                    md="6"
                  >
                    <span>Footer</span>
                    <v-switch
                      v-model="footer.inset"
                      label="Inset"
                      primary
                    ></v-switch>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn text>Cancel</v-btn>
                <v-btn
                  text
                  color="primary"
                >Submit</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>-->
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
      class="px-4">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <!--FIN FOOTER-->
  </v-app>

</template>

<script>
var menu=[];
/*var menu=[{ icon: 'forward', text: 'CALENDARIO',url:'/calendario'},
            { icon: 'forward', text: 'INGRESO',url:'/ingreso'},
            { icon: 'receipt', text: 'SOLICITUD',url:'/solicitud'},
        { icon: 'contacts', text: 'USUARIO',url:'/usuario'},
        { icon: 'shopping_cart', text: 'PRODUCTO',url:'/producto' },
        { icon: 'content_copy', text: 'REPORTE',url:'/reporte' },
        {
          icon: 'people_alt',
          'icon-alt': 'keyboard_arrow_down',
          text: 'ADMINISTRACIÓN',
          model: false,
          children: 
          [
            { icon: 'xwork',text: 'Cargo',url:'/cargo' },
            { icon: 'xhome_work',text: 'Direccion',url:'/direccion' },
            { icon: 'xhouse',text: 'Regionales',url:'/regional' },
            { icon: 'xdescription',text: 'Roles',url:'/roles' },
          ],
        },
        {
          icon: 'chrome_reader_mode',
          'icon-alt': 'keyboard_arrow_down',
          text: 'ALMACÉN',
          model: false,
          children: [
            { icon: 'ebuild',text: 'Unidad',url:'/unidad' },
            { icon: 'edns',text: 'Grupo',url:'/grupo' },
            { icon: 'eassignment_ind',text: 'Proveedor',url:'/proveedor' },
            //{ icon: 'eassignment_ind',text: 'WProveedor',url:'/proveedores' },
            { icon: 'eshopping_cart',text: 'Producto',url:'/producto' },
            
          ],
        },
        { icon: 'unarchive', text: 'SALIDA',url:'/salidas' },
        { icon: 'archive', text: 'ENTRADA',url:'/entradas' }];*/

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
          /*[
            { icon: 'forward', text: 'CALENDARIO',url:'/calendario'},
            { icon: 'forward', text: 'INGRESO',url:'/ingreso'},
            { icon: 'receipt', text: 'SOLICITUD',url:'/solicitud'},
        { icon: 'contacts', text: 'USUARIO',url:'/usuario'},
        { icon: 'shopping_cart', text: 'PRODUCTO',url:'/producto' },
        { icon: 'content_copy', text: 'REPORTE',url:'/reporte' },
        {
          icon: 'people_alt',
          'icon-alt': 'keyboard_arrow_down',
          text: 'ADMINISTRACIÓN',
          model: false,
          children: 
          [
            { icon: 'xwork',text: 'Cargo',url:'/cargo' },
            { icon: 'xhome_work',text: 'Direccion',url:'/direccion' },
            { icon: 'xhouse',text: 'Regionales',url:'/regional' },
            { icon: 'xdescription',text: 'Roles',url:'/roles' },
          ],
        },
        {
          icon: 'chrome_reader_mode',
          'icon-alt': 'keyboard_arrow_down',
          text: 'ALMACÉN',
          model: false,
          children: [
            { icon: 'ebuild',text: 'Unidad',url:'/unidad' },
            { icon: 'edns',text: 'Grupo',url:'/grupo' },
            { icon: 'eassignment_ind',text: 'Proveedor',url:'/proveedor' },
            //{ icon: 'eassignment_ind',text: 'WProveedor',url:'/proveedores' },
            { icon: 'eshopping_cart',text: 'Producto',url:'/producto' },
            
          ],
        },
        { icon: 'unarchive', text: 'SALIDA',url:'/salidas' },
        { icon: 'archive', text: 'ENTRADA',url:'/entradas' },
      ],*/
      footer: {
        inset: false,
      }
    
    }),
    created()
    {
      //var guardado = localStorage.getItem('datos');
      var t = JSON.parse(sessionStorage.getItem('datos'));
      console.log("array ", t);
      for(var h=0;h<sessionStorage.getItem('datos').length;h++)
      {
        var r={};
        //r.text=t[h].text;
        //r.url=t[h].url;
        var iconitos=t[h].icon;
        
        //console.log("haber c-> ", iconitos);
        var tt=iconitos.split(',');
        r={text:t[h].text,url:t[h].url,icon:tt[1],'icon-alt':tt[0]};
        //r.icon=tt[1];
        //console.log("haber-> ", tt[1]);
        //var ooo="'icon-alt'";
        //r.ooo='search';
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
      
      console.log("ver ", menu);

    },
      methods:{
        salir()
        {
          //sessionStorage.clear();
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