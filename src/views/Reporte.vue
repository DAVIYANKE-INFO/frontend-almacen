<template>
<v-container fluid>
    <v-row align="center" justify="center">
    <!--**********************************1ER COMPONENTE************************************-->
             <v-col cols="8" >
                <v-card 
                :elevation="hover ? 24 : 6"
              class="ma-0 pa-0"
                    
                    max-width="1200"
                    outlined
                    >
                    <v-list-item three-line>
                        <v-list-item-content>
                        <div class="overline mb-4">REPORTE ANUAL</div>
                        <v-list-item-title class="headline mb-1">GESTIÓN</v-list-item-title>
                        <v-list-item-subtitle>Seleccione una de las siguientes opciones...</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar
                        tile
                        size="80"
                        color="red"
                        ></v-list-item-avatar>
                    </v-list-item>
                    <v-row align="center" justify="center"> 
                    <v-col class="text-center" cols="4">
                    <!--<object style="width:100%;" v-bind:data="imageUrl" type="application/pdf" width="900" height="400" v-if="imageUrl"   >
                    </object>-->
                               <!-- <object  data="imageName"></object>
                                <object src="imageUrl" height="150" v-if="imageUrl"></object> -->
                                <v-text-field label="Seleccione su archivo PDF : " @click='pickFile' v-model='imageName' prepend-icon='attach_file'>
                                </v-text-field>
                                <input
                                    type="file"
                                    style="display: none"
                                    ref="image"
                                    accept="application/pdf"
                                    @change="onFilePicked"
                                >
                    </v-col>
                      <v-col class="text-center" cols="4">
                        <v-select
                            :items="años"
                          label="Seleccione año"
                          color="red"
                          v-model="nombreinformeanual"
                          outline>
                        </v-select>
                    </v-col>
                    </v-row>
                    <v-row align="center" justify="center"> 
                        <v-col class="text-center" cols="3">
                            <v-btn text @click="subirinformepdf()">SUBIR</v-btn>
                        </v-col>
                        <v-col class="text-center" cols="3">
                            <v-btn @click="generareporteanual()" text>GENERAR</v-btn>
                        </v-col>
                    </v-row>
                    </v-card>
        </v-col>






    <!--**********************************2DO COMPONENTE************************************-->
        <v-col cols="8">
                <v-card
                    :elevation="hover ? 24 : 6"
              class="ma-0 pa-0"
                    max-width="1200"
                    outlined>
                    <v-list-item three-line>
                        <v-list-item-content>
                        <div class="overline mb-4">SALIDAS</div>
                        <v-list-item-title class="headline mb-1">REPORTES SALIDAS</v-list-item-title>
                        <v-list-item-subtitle>Seleccione una de las siguientes opciones...</v-list-item-subtitle>
                        </v-list-item-content>
                
                        <v-list-item-avatar
                        tile
                        size="80"
                        color="orange"
                        ></v-list-item-avatar>
                    </v-list-item>
                
                    
                    <v-row align="center" justify="center"> 
                        <v-col class="text-center" cols="4">
                            <v-select
                               :items="mesessalidas"
                                label="Seleccione mes..."
                                v-model="nombremessalida"
                                color="red"
                                outline
                                autocomplete>
                            </v-select>
                        </v-col>
                    </v-row>


                    <v-row align="center" justify="center">
                        <v-col align="center" justify="center" cols="6" sm="6">
                            <v-date-picker locale="es" v-model="rango_fechas_salidas" range color="orange"></v-date-picker>
                        </v-col>
                        <v-col align="center" justify="center" cols="6" sm="6">
                            <v-text-field v-model="rangotextosalidas" label="Rango de Fechas" prepend-icon="event" readonly></v-text-field>
                            <h4>model: {{ rango_fechas_salidas }}</h4>
                        </v-col>
                    </v-row>
                    <v-row align="end" justify="end"> 
                        <v-col class="text-center" cols="2">
                            <v-btn text>LIMPIAR</v-btn>
                        </v-col>
                        <v-col class="text-center" cols="2">
                            <v-btn text>ACEPTAR</v-btn>
                        </v-col>
                        <v-col class="text-center" cols="2">
                            <v-btn @click="generarsalidas()" text>GENERAR</v-btn>
                        </v-col>
                    </v-row>
                    
                 
            </v-card>
        </v-col>









    <!--**********************************3ER COMPONENTE************************************-->
 <v-col cols="8">
                <v-card
                    :elevation="hover ? 24 : 6"
              class="ma-0 pa-0"
                    max-width="1200"
                    outlined
                    >
                    <v-list-item three-line>
                        <v-list-item-content>
                        <div class="overline mb-4">ENTRADAS</div>
                        <v-list-item-title class="headline mb-1">REPORTES ENTRADAS</v-list-item-title>
                        <v-list-item-subtitle>Seleccione una de las siguientes opciones...</v-list-item-subtitle>
                        </v-list-item-content>
                
                        <v-list-item-avatar
                        tile
                        size="80"
                        color="green"
                        ></v-list-item-avatar>
                    </v-list-item>
                    <v-row align="center" justify="center"> 
                        <v-col class="text-center" cols="4">
                            <v-select
                               :items="mesesentradas"
                                label="Seleccione mes..."
                                v-model="nombremesentrada"
                                color="red"
                                outline
                                autocomplete>
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-col align="center" justify="center" cols="6" sm="6">
                            <v-date-picker locale="es" v-model="rango_fechas_entradas" range color="green"></v-date-picker>
                        </v-col>
                        <v-col align="center" justify="center" cols="6" sm="6">
                            <v-text-field v-model="rangotextoentradas" label="Rango de Fechas" prepend-icon="event" readonly></v-text-field>
                            <h4>model: {{ rango_fechas_salidas }}</h4>
                        </v-col>
                    </v-row>
                    <v-row align="end" justify="end"> 
                        <v-col class="text-center" cols="2">
                            <v-btn text>LIMPIAR</v-btn>
                        </v-col>
                        <v-col class="text-center" cols="2">
                            <v-btn text>ACEPTAR</v-btn>
                        </v-col>
                    </v-row>
                    
                 
            </v-card>
        </v-col>





    <!--**********************************4TO COMPONENTE************************************-->
 <v-col cols="8">
                <v-card
                    :elevation="hover ? 24 : 6"
              class="ma-0 pa-0"
                    max-width="1200"
                    outlined
                    >
                    <v-list-item three-line>
                        <v-list-item-content>
                        <div class="overline mb-4">SALDOS</div>
                        <v-list-item-title class="headline mb-1">REPORTES SALDOS</v-list-item-title>
                        <v-list-item-subtitle>Seleccione una de las siguientes opciones...</v-list-item-subtitle>
                        </v-list-item-content>
                
                        <v-list-item-avatar
                        tile
                        size="80"
                        color="blue"
                        ></v-list-item-avatar>
                    </v-list-item>
                 <v-row align="center" justify="center"> 
                        <v-col class="text-center" cols="4">
                            <v-select
                               :items="mesessaldos"
                                label="Seleccione mes..."
                                v-model="nombremessaldo"
                                color="red"
                                outline
                                autocomplete>
                            </v-select>
                        </v-col>
                    </v-row>
                    <v-row align="center" justify="center">
                        <v-col align="center" justify="center" cols="6" sm="6">
                            <v-date-picker locale="es" v-model="rango_fechas_saldos" range></v-date-picker>
                        </v-col>
                        <v-col align="center" justify="center" cols="6" sm="6">
                            <v-text-field v-model="rangotextosaldos" label="Rango de Fechas" prepend-icon="event" readonly></v-text-field>
                            <h4>model: {{ rango_fechas_salidas }}</h4>
                        </v-col>
                    </v-row>
                    <v-row align="end" justify="end"> 
                        <v-col class="text-center" cols="2">
                            <v-btn text>LIMPIAR</v-btn>
                        </v-col>
                        <v-col class="text-center" cols="2">
                            <v-btn text>ACEPTAR</v-btn>
                        </v-col>
                    </v-row>   
            </v-card>
        </v-col>    
  
    <!--**********************************5TO COMPONENTE************************************-->
        <v-col cols="8" >
                <v-card 
                    :elevation="hover ? 24 : 6"
              class="ma-0 pa-0"
                    max-width="1200"
                    outlined
                    >
                    <v-list-item three-line>
                        <v-list-item-content>
                        <div class="overline mb-4">GENERAL</div>
                        <v-list-item-title class="headline mb-1">REPORTE GENERAL</v-list-item-title>
                        <v-list-item-subtitle>Seleccione una de las siguientes opciones...</v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar
                        tile
                        size="80"
                        color="indigo darken-1"
                        ></v-list-item-avatar>
                    </v-list-item>
                    <v-row align="center" justify="center"> 
                        <v-col class="text-center" cols="4">
                            <v-select
                                :items="añosgeneral"
                                label="Seleccione año"
                                color="red"
                                v-model="nombreinformeanual"
                                outline>
                            </v-select>
                        </v-col>
                        <v-col class="text-center" cols="4">
                            <div class="my-2">
                                <v-btn color="success" dark large @click="generareportegeneral()">GENERAR INFORME</v-btn>
                            </div>
                        </v-col>
                    </v-row>
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
            	<object style="width:100%;" v-bind:data="'data:application/pdf;base64,'   +variable_solicitud" type="application/pdf" width="900" height="400">
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

if((f.getMonth()+1)<=9)
{
var m_hoy='0'+(f.getMonth()+1);
}
else
{
var m_hoy=f.getMonth()+1;
}

if(f.getDate()<=9)
{
  var d_hoy='0'+f.getDate();
}
else
{
  var d_hoy=f.getDate();
}

var a_hoy=f.getFullYear();
import axios from 'axios'
export default {
    data: () => ({
        dialog3:false,
        dialog2:false,
        dialog:false,
        variable_solicitud:'',
        users:[],
        nombreinformeanual:'',
        nombremessalida:'',
        nombremesentrada:'',
        nombremessaldo:'',
        variable_reporte:'',
        variable_reporte_salida:'',
        	   imageName: '',
		imageUrl: '',
		imageFile: '',
        defaultSelected:{},
        defaultSelected1:{},
        defaultSelected2:{},
        defaultSelected3:{},
        rango_fechas_salidas: [a_hoy+'-'+m_hoy+'-'+d_hoy,a_hoy+'-'+m_hoy+'-'+d_hoy],//['2019-09-10', '2019-09-20'],
        rango_fechas_entradas: [a_hoy+'-'+m_hoy+'-'+d_hoy,a_hoy+'-'+m_hoy+'-'+d_hoy],//['2019-09-10', '2019-09-20'],
        rango_fechas_saldos: [a_hoy+'-'+m_hoy+'-'+d_hoy,a_hoy+'-'+m_hoy+'-'+d_hoy],//['2019-09-10', '2019-09-20'],
        mesessalidas: ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'],
        mesesentradas: ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'],
        mesessaldos: ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'],
        años:['2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035','2036','2037','2038','2039','2040'],
        añosgeneral:['2018','2019','2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035','2036','2037','2038','2039','2040'],

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

        subirinformepdf()
        {
                        /*let compa=this;
                        axios.post(compa.store+'/subirinformeanual', 
                        { 
                        imag: compa.imageUrl,
                        nameimg:compa.imageName
                        })
                        .then(function (response) {
                                console.log(response);
                                compa.keep=response;
                                console.log(compa.keep.data);

                        })
                        .catch(function (error) 
                        {
                        console.log(error);
                        });    */             
        },
          generareporteanual()
        {
                      /*this.variable_reporte='';
                      
                      let compa = this;
                       axios.post(compa.store+'/obtieneinformeanual',{
                          nombreinfoanual:compa.nombreinformeanual
                      }).then(function (response) 
                      {
                          console.log("resp pdf-> ", response.data);//resultado = response.data;

                        // if(response.data!="")
                        // {
                            //setTimeout(compa.variable_reporte=response.data, 8000);
                            compa.variable_reporte=response.data;
                            compa.dialog3=true;
                      //   }
                      //   else
                      //   {
                        //     compa.variable_reporte="";
                       //  } 
                      }).
                          catch(function (error) 
                          {
                              console.log("error", error)
                          });*/
    },
    generarsalidas()
    {
                      
                     /* let compa = this;
                      axios.get(compa.store+'/reportesalida', 
                      {})
                      .then(function (response) 
                      {
                        console.log("JALA ",response.data);
                        compa.variable_reporte_salida=response.data;
                        compa.dialog2=true;
                      })
                      .catch(function (error) 
                      {
                        console.log(error);
                      });*/
          },
          generareportegeneral()
          {
            let comp = this;
            axios.post('/api/v1/producto/reporte1',{},{
              headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
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
