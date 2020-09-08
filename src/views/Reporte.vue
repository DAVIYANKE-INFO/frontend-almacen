<template>
<v-container>
    <v-row align="center" justify="center">

  
    <!--**********************************5TO COMPONENTE************************************-->
        <v-col cols="12" lg="6">
                <v-card class="ma-0 pa-7" max-width="100%">
                    <v-list-item three-line>
                        <v-list-item-content>
                        <v-list-item-title class="headline mb-1">REPORTE GENERAL</v-list-item-title>
                        <v-list-item-subtitle>Seleccione la fecha inicial y final</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <!-- fechas -->
                    <v-row align="center" justify="center"> 
                        <v-col class="text-center" cols="4">
                          <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            :return-value.sync="fecha_ini"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="fecha_ini"
                                label="Fecha Inicio"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                              <v-date-picker locale="es" v-model="fecha_ini" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu1.save(fecha_ini)">OK</v-btn>
                              </v-date-picker>
                            </v-menu>
                        </v-col>

                        <v-col class="text-center" cols="4">
                          <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            :return-value.sync="fecha_fin"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="fecha_fin"
                                label="Fecha Fin"
                                prepend-icon="event"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                              <v-date-picker locale="es" v-model="fecha_fin" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu2.save(fecha_fin)">OK</v-btn>
                              </v-date-picker>
                            </v-menu>
                        </v-col>

                        <v-col class="text-center" cols="4">
                            <div class="my-2">
                                <v-btn color="success" dark large @click="generareportegeneral()">GENERAR INFORME</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                  <!-- end fechas -->
                    </v-card>
        </v-col>
    </v-row>


<v-dialog
        v-model="dialog3"
        width="1000"
        height="100"
      >
        
  
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            REPORTE ALMACEN
          </v-card-title>
  
          <v-card-text>
            	<object style="width:100%;" v-bind:data="'data:application/pdf;base64,'+variable_reporte" type="application/pdf" width="900" height="400">
              </object>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>  
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog3 = false"
            >
              CERRAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


 <v-dialog
        v-model="dialog"
        width="1000"
        height="100"
      >
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            REPORTE ALMACEN
          </v-card-title>
  
          <v-card-text>
            	<object style="width:100%;" v-bind:data="'data:application/pdf;base64,'   +variable_solicitud" type="application/pdf" width="900" height="600">
              </object>
          </v-card-text>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              CERRAR
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>




</v-container>
</template>
<script>
var f = new Date();

import axios from 'axios'
export default {
    data: () => ({
        dialog3:false,
        dialog2:false,
        dialog:false,
        variable_solicitud:'',
        users:[],
        defaultSelected:{},
        defaultSelected1:{},
        defaultSelected2:{},
        defaultSelected3:{},
        menu1: false,
        menu2: false,
        fecha_ini: new Date().toISOString().substr(0, 10),
        fecha_fin: new Date().toISOString().substr(0, 10),
        }),
        computed: {
        rangotextosalidas () 
      {
        return this.rango_fechas_salidas.join(' ~ ')
      },
       rangotextoentradas () 
      {
        return this.rango_fechas_entradas.join(' ~ ')
      },
        rangotextosaldos() 
      {
        return this.rango_fechas_saldos.join(' ~ ')
      },
    },

    methods:
    {
        pickFile () {
            this.$refs.image.click()
        },
    
		onFilePicked (e) 
    {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name;
        console.log("NOMBRE : ", this.imageName);
				if(this.imageName.lastIndexOf('.') <= 0) 
        {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
          fr.addEventListener('load', () => 
          {
            this.imageUrl = fr.result
            this.imageFile = files[0] // this is an image file that can be sent to server...
                    console.log("url : ", this.imageUrl);
                    console.log("NOMBRE : ", this.imageName);
          })
			} 
      else 
      {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		},

          generareportegeneral()
          {
            var token=sessionStorage.getItem('token');
            let comp = this;
            const datos = {
              fecha_inicial : this.fecha_ini,
              fecha_fin: this.fecha_fin
            }
              console.log('datos: ', datos);
            axios.post(comp.store+'/api/v1/producto/reporte1', datos ,{
              headers: { Authorization: 'Bearer '+token }
            }).then(function (response) 
            {
                //console.log("SOLICITUDES OFICIAL ",response); 
                comp.variable_solicitud=response.data.datos.pdf;
                console.log("pdf--> ",comp.variable_solicitud);
                comp.dialog=true;
            }).
            catch(function (error) 
            {
                console.log("error", error)
            });
          },
    },
    
    created: function() 
    {
      let varia =this;    
      varia.$store.commit('SET_LAYOUT', 'panelprincipal-layout');
    },
}
</script>
