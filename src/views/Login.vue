<template>

  <v-app :style="{ 'background-image' : 'url(' + image + ') ','background-repeat' : 'no-repeat','background-size': '100% 100%'  }">
    <v-content>
      <v-container
        class="fill-height"
        fluid
        
        >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="5"
            md="3"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color='#58B55E'
                dark
                flat
              >
                <v-toolbar-title>SISALM</v-toolbar-title>
               
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                 <!-- <template v-slot:activator="{ on }">
                    <v-btn
                      :href="source"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-code-tags</v-icon>
                    </v-btn>
                  </template>
                  <span>Source</span>
                </v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      large
                      href="https://codepen.io/johnjleider/pen/pMvGQO"
                      target="_blank"
                      v-on="on"
                    >
                      <v-icon>mdi-codepen</v-icon>
                    </v-btn>
                  </template>-->
                  <span>Codepen</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Usuario"
                    v-model="codigousuario"
                    name="login"
                    prepend-icon="person"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    prepend-icon="lock"
                    :append-icon="eye ? 'visibility_off' : 'visibility'"
                    @click:append="vero"
                    v-model="password"
                    label="Contraseña"
                    name="password"
                    :type="show4 ? 'text' : 'password'"
                    @keyup.enter="login()"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn style="color:white;" color="green" @click="login()">INGRESAR</v-btn>
                
                <!--<v-btn id="textblanco" color="#394BCD" @click="$router.push('/principal')">INGRESAR</v-btn>
                <v-btn block color="green" @click="CORRE()">VERIFICA</v-btn>
                <v-btn block color="red" @click="len > 0 && 1==1 ? $router.push('/principal') : alerta()">INGRESAR</v-btn>-->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
  export default 
    {     
      data()
      {
        return{
          show4:false,
          eye:true,
          codigousuario:"admin",
          password:"Developer",
          drawer: null,
          lista:[],
          image:'fondo.jpg',
    }},

  methods: 
        {
             
          vero () {
      this.eye = !this.eye;
      this.show4 = !this.show4;
    },
    login() 
    {
      sessionStorage.clear();
     let global = this;
     axios.post(global.storepublic+'/autenticar',
     {
                         username:global.codigousuario,
                         password:global.password
                      }).then(function (response) 
                      {
                         global.lista = response.data;
                         console.log("respuesta de jwt: ", response.data.token);
                         global.$toastr.info('USUARIO AUTENTICADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                         sessionStorage.setItem("token", ""+response.data.token);
                         
                        sessionStorage.setItem("usuario", response.data.datos.usuario.id_usuario);
                        
                         // console.log("local ",response.data.datos.menu.length);
                        var david_menu=[];
                        for(var p=0;p<response.data.datos.menu.length;p++)
                        {
                          
                          var t={};
                          t.text=response.data.datos.menu[p].label;
                          t.url=response.data.datos.menu[p].url;
                          t.icon=response.data.datos.menu[p].icon;
                          var children=[]; 
                          for(var k=0;k<response.data.datos.menu[p].submenu.length;k++)
                          {
                            
                            var tt={};
                            tt.text=response.data.datos.menu[p].submenu[k].label;
                            tt.url=response.data.datos.menu[p].submenu[k].url;
                            tt.icon=response.data.datos.menu[p].submenu[k].icon;
                            children.push(tt);
                          }
                          t.children=children;
                          david_menu.push(t);
                        }
                          sessionStorage.setItem("datos", JSON.stringify(david_menu));
                          global.$router.push('/principal');
                                                   
                      }).

                          catch(function (error) 
                          {
                              console.log("error", error)
                              global.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});

                          });       
                }
        },
    created () 
        {
            this.$store.commit('SET_LAYOUT', 'login-layout')
        }
  }
</script>

<style>
#textblanco
{
  color:white;
}

</style>