<template>
    <v-container fluid class="pa-0">

          
        <v-row style="height:50%;" class="divangular" >
          <v-col class="divimagen" >
            <h2 id="textoblanco" style="margin-left:40%;">Sistema de Gestión y Control de Almacén</h2>
            <h2 id="textoblanco" style="margin-left:40%;">Dirección Administrativa Financiera</h2>
            <img src="@/images/logo.png" width="450" height="200" alt="">
                              <!--<v-select id="textoblanco" style="width:250px;text-color:white;"
                                  :items="años"
                                  label="Seleccione año"
                                  
                                  v-model="anual"
                                  outline
                                >
                            </v-select>-->
          </v-col>
        </v-row> 
   

             <!-- <v-row style="height:50%; margin-left:30px;margin-top:100px;">
                <v-col cols="2" sm="2" offset-sm="12">
                  <v-hover
                    v-slot:default="{ hover }"
                  >
                    <v-card
                      :elevation="hover ? 12 : 2"
                      height="150"
                      max-width="250"
                      class="mx-auto"
                    >
                    <a href="#/salidas">   <v-img
                    height="100%"
                    width="100%"
                    src="@/images/almacen.png"
                  ></v-img></a>
                    </v-card>
                  </v-hover>  
                </v-col>
                <v-col cols="2" sm="2" offset-sm="12">
                  <v-hover
                    v-slot:default="{ hover }"
                  >
                    <v-card
                      :elevation="hover ? 12 : 2"
                      height="150"
                      max-width="250"
                      class="mx-auto"
                    >
                  <a href="#/reporte">  <img
                    height="100%"
                    width="100%"
                    src="@/images/reportes.png"
                  ></a>
                    </v-card>  
                  </v-hover> 
                </v-col>
                <v-col cols="2" sm="2" offset-sm="12">
                  <v-hover
                    v-slot:default="{ hover }"
                  >
                    <v-card
                      :elevation="hover ? 16 : 2"
                      height="150"
                      max-width="250"
                      class="mx-auto"
                    >
                     <a href="#/usuario">        <img
                    height="100%"
                    width="100%"
                    src="@/images/usuariosimagen.png"
                  ></a>
                    </v-card>
                  </v-hover> 
                </v-col>
                <v-col cols="2" sm="2" offset-sm="12">
                  <v-hover
                    v-slot:default="{ hover }"
                  >
                    <v-card
                      :elevation="hover ? 16 : 2"
                      height="150"
                      max-width="250"
                      class="mx-auto"
                    >
                   <a href="#/producto"> <img
                    height="100%"
                    width="100%"
                    src="@/images/mat_escritorio.jpg"
                  ></a>
                    </v-card>     
                  </v-hover>
                </v-col>
              </v-row>-->
              
    

      
    </v-container>

</template>

<script>
  export default {
    data () {
      return {
               años:['2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035','2036','2037','2038','2039','2040'],
              anual:'',
      }
    },
    
    methods: {
     
      },
    created: function() 
        {
          console.log("entra hasta aqui");
          let varia =this;    
          varia.$store.commit('SET_LAYOUT', 'panelprincipal-layout');
          console.log("PASAA");      
        }

  }
</script>

<style>
#david
{
    background-color:green;
    width: 100%;
    height: 50%;
    border-left: 680px solid #d9534f;
    border-right: 680px solid #d95000;
    border-bottom: 150px solid transparent;
}
.divangular {
  height:500px;
  background-color: RGB(39,53,166);
  margin-top: -215px;
  padding: 5% 50px; 
  -webkit-transform: skewY(8deg);
  -moz-transform: skewY(8deg);
  -ms-transform: skewY(8deg);
  -o-transform: skewY(8deg);
  transform: skewY(8deg);
}

.divimagen{
  align: center;
  margin-left: 20%;
  margin-top: 250px;
   -webkit-transform: skewY(0deg);
  -moz-transform: skewY(-8deg);
  -ms-transform: skewY(-8deg);
  -o-transform: skewY(-8deg);
  transform: skewY(-8deg);
}
#textoblanco{
  color:white;
  font-weight: normal;
}
</style>