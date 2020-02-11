<template>
<v-container fluid>
<v-row>
<v-col>
    <v-tabs
     background-color="indigo ligth-1"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider color="yellow"></v-tabs-slider>
  
      <v-tab href="#tab-1">
        PARA REVISAR
        <v-icon>calendar_today</v-icon>
      </v-tab>
  
      <v-tab href="#tab-2">
        APROBADOS
        <v-icon>list_alt</v-icon>
      </v-tab>
      <v-tab-item
        v-for="i in 2"
        :key="i"
        :value="'tab-' + i"
      >

        <div v-if="i==1">
            <v-row>
                <v-col cols="12">
                           <v-container fluid>

                          <!--*******************************INICIO BUSCADOR***************************************-->
                          <v-toolbar flat color="white" class="elevation-1">
                              <v-toolbar-title style="font-size:25px;font-weight:bold;color:#394BCD;">SOLICITUDES PENDIENTES</v-toolbar-title>
                              <v-divider
                                class="mx-2"
                                inset
                                vertical
                              ></v-divider>
                              <v-spacer></v-spacer>
                                <v-text-field
                                  v-model="search_2"
                                  append-icon="search"
                                  label="Buscar..."
                                  single-line
                                  hide-details
                                ></v-text-field>
                                <v-divider
                                class="mx-2"
                                inset
                                vertical
                              ></v-divider>    
                            </v-toolbar>
                        <!--*******************************FIN BUSCADOR***************************************-->


                                <v-data-table
                            :headers="headers"
                            :items="desserts"
                            sort-by="codigo_pedido" 
                            sort-desc="true"
                            :search="search_2"
                            class="elevation-1"
                            :items-per-page="15"
                              :footer-props="{  
                              'items-per-page-text': 'Filas por pagina:',
                              'items-per-page-all-text': 'Todos'}"
                            dense
                            >
                            <template v-slot:top>
                                
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                                
                            </template>

                            <template v-slot:item.action="{ item }">

                            <v-row justify="center">
                            <v-col cols="10">
                            
                            <v-expansion-panels>
                            <v-expansion-panel
                                :key="1"
                                width="50%"
                                v-model="panel_david"
                            >
                                <v-expansion-panel-header>Pedidos</v-expansion-panel-header>
                                <v-expansion-panel-content>
                            
                                        <v-row>
                                            <v-col cols="12">



                                                <v-simple-table dense>
                                                <template v-slot:default>
                                                    <thead>
                                                    <tr>
                                                    <th class="text-left">Codigo</th>
                                                        <th class="text-left">Nombre</th>
                                                        <th class="text-left">Cantidad Solicitada</th>
                                                        <th class="text-left">Stock actual</th>
                                                        <th class="text-left">Stock a Quedar</th>
                                                        <th class="text-left">Unidad</th>                       
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="(productitos, index) in item.productos" :key="item.name">
                                                    <td>{{ productitos.id_pedido }}</td>
                                                    <td>
                                                            {{ productitos.nombre}}
                                                    </td>

                                                    <td>
                                                        <span v-if="formActualizar && idActualizar == index">
                                                            <!-- Formulario para actualizar -->
                                                            <input style="background-color:#F9EDAF;" v-model="edadActualizar" type="text" class="form-control">
                                                        </span>
                                                        <span v-else>
                                                            <!-- Dato nombre -->
                                                            {{ productitos.cantidad_solicitada }}
                                                        </span>
                                                    </td>
                                                    <td>{{ productitos.stock }}</td>
                                                    <td style="color:red;">{{ productitos.stock - productitos.cantidad_solicitada }}</td>
                                                    <td>{{ productitos.unidad }}</td>

                                                    <td>
                                                        <!-- Botón para guardar la información actualizada -->
                                                        <span v-if="formActualizar && idActualizar == index">
                                                        <v-btn class="btn btn-success" text icon color="blue lighten-1" @click="guardarActualizacion(index, item)">
                                                        <v-icon>save</v-icon></v-btn>
                                                            
                                                        </span>
                                                        
                                                        <span v-else>
                                                            <!-- Botón para mostrar el formulario de actualizar -->
                                                            <v-btn class="ma-0" text icon color="green lighten-1" @click="verFormActualizar(index, item)">
                                                            <v-icon>edit</v-icon></v-btn>
                                                            <!-- Botón para borrar -->    
                                                            <v-btn class="ma-0" text icon color="red lighten-1" @click="borrarPaciente(index, item)">
                                                            <v-icon>delete</v-icon></v-btn>
                                                             <v-btn x-small color="indigo ligth-1" dark @click="enviadatosdeentradas(index, item)">Guardar</v-btn>
                                                        </span>
                                                        
                                                    </td>
                                                        <!--<td>{{ productitos.nombreproducto }}</td>
                                                        <td>{{ productitos.cantidad }}</td>-->
                                                    </tr>
                                                    </tbody>
                                                </template>
                                                </v-simple-table> 
                                                </v-col>
                                              </v-row>
                                                <!--<v-row justify="center">
                                                    <v-spacer></v-spacer>
                                                    <v-btn class="text-center" color="blue darken-1" text @click="solicitud(index, item)">ACEPTAR</v-btn>                 
                                                </v-row>  -->  
                                        </v-expansion-panel-content>
                            </v-expansion-panel>
                            </v-expansion-panels>
                            </v-col>
                            </v-row> 
                            <v-row justify="center">
                                                    <v-spacer></v-spacer>
                                                    <v-btn class="text-center" color="indigo darken-1" text @click="solicitud(item)">ACEPTAR</v-btn>                 
                                                </v-row>  



                            
                            </template>
                            </v-data-table>
                            </v-container>        
                </v-col> 
            </v-row>
        </div>      

        <div v-if="i==2">
            <v-row>
                <v-col cols="12">
                       <center>
                        <v-form>
                        <v-container fluid>
                          
                                <center>
                        <!--*******************************INICIO BUSCADOR***************************************-->
                          <v-toolbar flat color="white" class="elevation-1">
                              <v-toolbar-title style="font-size:25px;font-weight:bold;color:#394BCD;">SOLICITUDES APROBADAS</v-toolbar-title>
                              <v-divider
                                class="mx-2"
                                inset
                                vertical
                              ></v-divider>
                              <v-spacer></v-spacer>
                                <v-text-field
                                  v-model="search"
                                  append-icon="search"
                                  label="Buscar..."
                                  single-line
                                  hide-details
                                ></v-text-field>
                                <v-divider
                                class="mx-2"
                                inset
                                vertical
                              ></v-divider>    
                            </v-toolbar>
                        <!--*******************************FIN BUSCADOR***************************************-->
                            <v-data-table
                              :headers="headers_para_aprobados"
                              :items="aprobados"
                              :search="search"
                              class="elevation-1"
                              sort-by="codigo_pedido"
                              :items-per-page="15"
                              :footer-props="{  
                              'items-per-page-text': 'Filas por pagina:',
                              'items-per-page-all-text': 'Todos'}"
                              >
                              <template v-slot:top>
                                  <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                  ></v-divider> 
                              </template>
                            
                              <template v-slot:item.action="{ item }">
                              
                                <v-icon
                                  class="mr-1"
                                  @click="generar_solicitud_porusuario(item)"
                                >
                                  print
                                </v-icon>
                              </template> 

   

                            </v-data-table>
   <v-dialog
        v-model="dialog"
        width="80%"
        heigth="500px"
      >
       <v-card>
              <v-card-title style="color:white;"
              class="headline indigo"
               
            primary-title
            dark    
            >
            Solicitud de Material
          </v-card-title>
          <v-card-text>
            <object style="width:100%;" v-bind:data="'data:application/pdf;base64,'+variable_solicitud" type="application/pdf"  height="400">
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
                              </center>
                          </v-container>
                        </v-form>
                        </center>         
                </v-col> 
            </v-row>
        </div>
      </v-tab-item>
    </v-tabs>
    </v-col>
    </v-row>  
</v-container>
</template>
<script>
import axios from 'axios'
import moment from 'moment'
export default 
{
    data: vm => ({
      panel_david:true,

/*************************************ESTO ES PARA APROBADOS**********************************************/
    search:'',
    search_2:'',
      headers_para_aprobados: [
      {
        text: 'Nro.',
        align: 'left',
       // sortable: false,
        value: 'codigo_pedido',
      },
      { text: 'NOMBRE', value: 'usuario' },
      { text: 'FECHA', value: 'fecha_aprobacion' },
      { text: 'ESTADO', value: 'estado' },
      { text: 'CARGO', value: 'cargo_usuario' },
     // { text: 'Properties' , value: 'objetos' },
      { text: 'Acciones', value: 'action', sortable: false },
    ],
      aprobados: [],
       //  editedIndex: -1,
      editedItemaprobados: 
      {
            codigo_pedido:'',
            usuario:'',
            fecha_solicitud:'',
            estado:'',
            cargo_usuario:''
      },
      defaultItemaprobados: 
      {          
        codigo_pedido:'',
            usuario:'',
            fecha_solicitud:'',
            estado:'',
            cargo_usuario:''
      },
      variable_solicitud:'',
      dialog:false,
/*************************************FIN ESTO ES PARA APROBADOS**********************************************/

            // Input nombre
            nombre: '',
            // Input edad
            edad: '',
            // Ver o no ver el formulario de actualizar
            formActualizar: false,
            // La posición de tu lista donde te gustaría actualizar 
            idActualizar: -1,
            // Input nombre dentro del formulario de actualizar
            nombreActualizar: '',
            // Input edad dentro del formulario de actualizar
            edadActualizar: '',
            // Lista de pacientes
            pacientes: [],

    headers: [
      {
        text: 'Nro.',
        align: 'left',
        //sortable: false,
        value: 'id_pedido',
      },
      { text: 'NOMBRE', value: 'usuario' },
      { text: 'FECHA', value: 'fecha_solicitud' },
      { text: 'ESTADO', value: 'estado' },
     // { text: 'Protein (g)', value: 'protein' },
     // { text: 'Properties' , value: 'objetos' },
      { text: 'Acciones', value: 'action', sortable: false },
    ],
    desserts: [],
    dessertsaux:[],
    editedIndex: -1,
    veraItem: [{
      id_producto: '',
      nombreproducto: '',
      cantidad: '',
      estadito:'',
    }],
     
    }),
    methods: 
    {
      solicitud:function(item)
      {
        //console.log("que llega--> ",index);
        const index = this.desserts.indexOf(item)
      this.desserts.splice(index, 1)
         // this.desserts.splice(index, 1);
      },
      enviadatosdeentradas(index,item)
      {
      // console.log("obrtiene id --> ",this.desserts[this.desserts.indexOf(item)].id_pedido);
      // var tt= this.desserts[this.desserts.indexOf(item)].id_pedido;
      //console.log("ssas ", tt)
       console.log("producto a enviar--> ",item.productos[index].id_pedido)
      /*console.log("llega-->  ",index);
      console.log("llegaccc-->  ",item);*/
                let comp = this;
                axios.post(comp.store+`/api/v1/producto/pedido/${item.productos[index].id_pedido}/aprobar`,{cantidad_aprobada :item.productos[index].cantidad_solicitada},{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                    console.log("SOLICITUDES ",response); 
                     comp.$toastr.success('PEDIDO APROBADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                     comp.initializeaprobados();
                     comp.desserts[comp.desserts.indexOf(item)].productos.splice(index, 1);
                   // comp.desserts=response.data.datos;
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOSs', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                }); 
      },
            verFormActualizar: function (paciente_id,fila) 
            {
                console.log("FILA",this.desserts.indexOf(fila));
                console.log("ID_PROD",paciente_id);
                // Antes de mostrar el formulario de actualizar, rellenamos sus campos
                this.idActualizar = paciente_id;
              //  this.nombreActualizar = this.desserts[this.desserts.indexOf(fila)].productos[paciente_id].nombre;
                this.edadActualizar = this.desserts[this.desserts.indexOf(fila)].productos[paciente_id].cantidad_solicitada;
                // Mostramos el formulario
                console.log("gen--> ",this.desserts.indexOf());
                if(this.desserts.indexOf(fila)==this.desserts.indexOf(fila))
                {
                  this.formActualizar = true;
                }
                else{
                  this.formActualizar = false;
                }
            },
            borrarPaciente: function (paciente_id,fila) 
            {
                // Borramos de la lista
                this.desserts[this.desserts.indexOf(fila)].productos.splice(paciente_id, 1);
            },
            guardarActualizacion: function (paciente_id,fila) 
            {
                console.log("FILA p--> ",this.desserts.indexOf(fila));
                console.log("ID_PROD p--> ",paciente_id);
                // Ocultamos nuestro formulario de actualizar
                this.formActualizar = false;
                // Actualizamos los datos
                //this.desserts[this.desserts.indexOf(fila)].productos[paciente_id].nombre = this.nombreActualizar;
                this.desserts[this.desserts.indexOf(fila)].productos[paciente_id].cantidad_solicitada = this.edadActualizar;
                console.log("hab--> ",this.desserts[paciente_id].productos);
            },
            
      generar_solicitud_porusuario(item)
      {
        console.log("aprobado --> ",item);
        
        let comp = this;
        axios.get(comp.store+'/api/v1/producto/pedido/'+item.codigo_pedido+'/reporte',{
          headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
        }).then(function (response) 
        {
            //console.log("SOLICITUDES OFICIAL ",response); 
            comp.variable_solicitud=response.data.datos;
            console.log("pdf--> ",comp.variable_solicitud);
            comp.dialog=true;
        }).
        catch(function (error) 
        {
            console.log("error", error)
        });
      },

      inicializasolicitudes ()
      {

                let comp = this;
                axios.get(comp.store+'/api/v1/producto/pedido',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                    console.log("SOLICITUDES OFICIALes ",response.data.datos); 
                    comp.dessertsaux=response.data.datos; 
                    comp.desserts=response.data.datos;
                    if(comp.dessertsaux===undefined)
                    {
                      console.log("vacio []");
                      
                    }
                    else
                    {
                      console.log("NO vacio []");
                      for(var t=0;t<comp.dessertsaux.length;t++)
                      {
                         // console.log("pasas--> ", moment(comp.dessertsaux[t].fecha_solicitud).format('DD')+"-"+moment(comp.dessertsaux[t].fecha_solicitud).format('MM')+"-"+moment(comp.dessertsaux.fecha_solicitud).format('YYYY')+ " | " + moment(comp.dessertsaux.fecha_solicitud).format('h:mm:ss'));
                          //this.$moment(comp.dessertsaux._fecha_modificacion).format("DD"))
                          comp.desserts[t].fecha_solicitud=moment(comp.dessertsaux[t].fecha_solicitud).format('DD')+"-"+moment(comp.dessertsaux[t].fecha_solicitud).format('MM')+"-"+moment(comp.dessertsaux[t].fecha_solicitud).format('YYYY');//+ " | " + moment(comp.dessertsaux[t].fecha_solicitud).format('h:mm:ss');
                      }
                    }
                console.log("--> ",comp.desserts)
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                }); 

console.log("--> ",this.desserts)

      },
    initializeaprobados () 
    {
      this.aprobados=[];
              let comp = this;
                axios.get(comp.store+'/api/v1/producto/pedido/aprobado',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                  console.log("SOLICITUDES APROBADAS--> ",response.data.datos); 
                  comp.aprobados=response.data.datos;
                  comp.aprobadosaux=response.data.datos;
                  if(comp.aprobadosaux===undefined)
                    {
                      console.log("vacio []");
                      
                    }
                    else
                    {
                      console.log("NO vacio []");
                      for(var t=0;t<comp.aprobadosaux.length;t++)
                      {
                         // console.log("apro pasas--> ", moment(comp.aprobadosaux[t].fecha_aprobacion).format('DD')+"-"+moment(comp.aprobadosaux[t].fecha_aprobacion).format('MM')+"-"+moment(comp.aprobadosaux.fecha_aprobacion).format('YYYY')+ " | " + moment(comp.aprobadosaux.fecha_aprobacion).format('h:mm:ss'));
                          //this.$moment(comp.dessertsaux._fecha_modificacion).format("DD"))
                          comp.aprobados[t].fecha_aprobacion=moment(comp.aprobadosaux[t].fecha_aprobacion).format('DD')+"-"+moment(comp.aprobadosaux[t].fecha_aprobacion).format('MM')+"-"+moment(comp.aprobadosaux[t].fecha_aprobacion).format('YYYY');//+ " | " + moment(comp.dessertsaux[t].fecha_solicitud).format('h:mm:ss');
                      }
                    }
                    
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                }); 
                console.log("--> ",this.aprobados)
    },
    
    verItem (obj) 
    {
      this.editedIndex = this.desserts.indexOf(obj)
      for(var i=0;i<obj.length;i++)
      {
          this.veraItem[i] = Object.assign({}, obj[i])
          console.log("OBJ : " +i+ " " , obj[i]);
      }
    },
    close () 
    {
      this.veraItem= [{
      propiedad1: '',
      propiedad2: '',
    }],
      this.itemes={},
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
  
  },
    created: function() 
    {
      this.inicializasolicitudes();
      this.initializeaprobados();
      let varia =this;    
      varia.$store.commit('SET_LAYOUT', 'panelprincipal-layout'); 
    }
}
</script>