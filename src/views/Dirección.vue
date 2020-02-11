<template>
<center>
<v-form>
<v-container fluid>
    <!--  <v-row align="center" justify="center">
        <v-col cols="5">
            <div class="chartjs-size-monitor">
              <v-card>
                <center><v-card-text class="px-0"><h1 style="color:#394BCD;font-family:roboto;font-size:35px;" @click="asigna()">SALIDAS ALMACÉN</h1></v-card-text></center>
              </v-card>
            </div>
        </v-col>
      </v-row>
  <br>-->
        <center>


<!--*******************************INICIO BUSCADOR***************************************-->
  <v-toolbar flat color="white" class="elevation-1">
      <v-toolbar-title style="font-size:25px;font-weight:bold;color:#394BCD;">DIRECCIONES</v-toolbar-title>
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
          color="indigo"
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
      :items="direcciones"
      :search="search"
      class="elevation-1"
      sort-by="id_producto"
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
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
            <v-container fluid>
              <v-row align="center" justify="end">
                <!--<v-col cols="8">
                  <p class="text-left" style="font-size:25px;font-weight:bold; ">direcciones ALMACEN AFCOOP</p>                
                </v-col>-->
                <v-col cols="2">
                  <v-btn color="indigo darken-1" dark class="mb-2" v-on="on">NUEVO</v-btn>
                </v-col>
              </v-row>
            </v-container>
            </template>
            <v-card>
               <v-card-title style="color:white;"
                  class="headline indigo"   
                  primary-title
                  dark    
            >
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field color="indigo" v-model="editedItem.sigla" label="Sigla"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-text-field color="indigo" v-model="editedItem.nombre" label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                    <v-select
                          label="Regional"
                          :items="regionales"
                          v-model="editedItem.regional.nombre"
                          max-height="200"
                          color="indigo" 
                          dense
                          autocomplete
                        >
                      </v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="indigo darken-1" text @click="close">CANCELAR</v-btn>
                <v-btn color="indigo darken-1" text @click="save">GUARDAR</v-btn>
              </v-card-actions>
              
            </v-card>
          </v-dialog>
      </template>
    <!--  <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.id_unidad}}</td>
        <td class="text-xs-center">{{ props.item.nombre }}</td>
        <td class="text-xs-center">{{ props.item.estado }}</td>
        <td class="text-xs-center">{{ someDate | moment("dddd, MMMM Do YYYY") }}</td>
      </template>-->
      <template v-slot:item.acciones="{ item }">
        <v-icon
          class="mr-1"
          @click="editItem(item)"
        >
          edit
        </v-icon>
        <v-icon 
          @click="deleteItem(item)"
        >
          delete
        </v-icon>
      </template>
      
     
    </v-data-table>

         
      </center>
  </v-container>
</v-form>
</center>
</template>

<script>
import axios from 'axios'
export default {

  data: vm => ({
    fecha:'11/11/2014',
    dialog: false,
    search:'',
      modal: false,
      menu2: false,
      dialog1: false,
      keeps:[{"ci":"7066868","paterno":"ALEGRIA","materno":"QUISPE"}],
      headers: [
        { text: 'NRO. DIRECCION', value: 'id_direccion'},
        { text: 'SIGLA', value: 'sigla' },
        { text: 'NOMBRE', value: 'nombre' },
        { text: 'REGIONAL', value: 'regional.nombre' },
        /*{ text: 'DESCRIPCION', value: 'descripcion' },
        { text: 'HORA', value: 'contraseña' },
        { text: 'ESTADO', value: 'cargo' },*/
        { text: 'ACCIONES', value: 'acciones', sortable: false },
      ],
      direcciones: [],
      regionales:[],
      desserts:[],
      auxiliardir:{},
      editedIndex: -1,
      editedItem: 
      {
        id_direccion:0,
            sigla:'',
            nombre:'',
            regional:{
              nombre:'',
            }
      },
      defaultItem: 
      {          
        id_direccion:0,
              sigla:'',
            nombre:'',
            regional:{
              nombre:'',
            }
      },

                 

    }),
    computed: 
    {
      formTitle () 
      {
        return this.editedIndex === -1 ? 'NUEVO ELEMENTO' : 'EDITAR ELEMENTO'
      }
    },
    watch: 
    {
      dialog (val) 
      {
        val || this.close()
      }
    },
      created: function()
    {
      this.initialize();
      let varia =this;    
      varia.$store.commit('SET_LAYOUT', 'panelprincipal-layout');
    },
    methods: 
    {
      initialize () 
      {
        
                let comp = this;
                axios.get('/api/v1/direccion',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("PRUEBA OTRO SERVIDOR: ",response); 
                comp.direcciones=response.data.datos.rows;
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });




                axios.get('/api/v1/regional',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("PRUEBA OTRO SERVIDOR: ",response); 
                comp.desserts=response.data.datos.rows;
                //comp.regionales=response.data.datos.rows;
                for(var i=0;i<response.data.datos.rows.length;i++)
                {
                   comp.regionales[i]=response.data.datos.rows[i].nombre;
                } 
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });   
      },
      editItem (item) 
      {
        console.log("ELEMENTO A EDITAR--> ",item);
      this.editedIndex = this.direcciones.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      },

    deleteItem (item) 
    {
      let comp = this;
      console.log("ELEMENTO A ELIMINAR==> ",item);
      const index = this.direcciones.indexOf(item)
      if(confirm('¿ Esta seguro que desea eliminar este elemento ?') && this.direcciones.splice(index, 1))
      {
                //PARA LA ELIMINAR UNA DIRECCION
                axios.delete('/api/v1/direccion/'+item.id_direccion,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                }).then(function (response) 
                {
                console.log("RESPUESTA ELIMINAR DIRECCION SERVIDOR: ",response); 
                comp.$toastr.success('DIRECCION ELIMINADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });
                //FIN ELIMINAR UNA DIRECCION
      }
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () 
    {
      let comp = this;
      if (this.editedIndex > -1) 
      {
        Object.assign(this.direcciones[this.editedIndex], this.editedItem)
                 //PARA EDITAR UNA DIRECCION
                console.log("editar--> ",comp.editedItem);
                axios.put('/api/v1/direccion/'+comp.editedItem.id_direccion, comp.editedItem,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                }).then(function (response) 
                {
                console.log("RESPUESTA EDITAR DIRECCION SERVIDOR: ",response);
                comp.$toastr.success('DIRECCION ACTUALIZADA EXITOSAMENTE', 'HECHO', {timeOut: 2000}); 
                comp.initialize();
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });
                //FIN EDITAR UNA DIRECCION
      } 
      else 
      {
        var defineregional=0;

        //console.log("DESSERTS--> ",this.editedItem.regional.nombre);
           for(var j=0;j<comp.desserts.length;j++)
          {
                   if((comp.desserts[j].nombre)===(this.editedItem.regional.nombre))
                   {
                     defineregional=comp.desserts[j].id_regional;
                   }
          } 
          this.auxiliardir={
          'sigla':this.editedItem.sigla,
          'nombre':this.editedItem.nombre,
          'fid_regional':defineregional,
           }


                //PARA LA CREACIÓN DE UNA DIRECCION
                console.log("guardar--> ",comp.auxiliardir); 
                axios.post('/api/v1/direccion/', comp.auxiliardir ,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                }).then(function (response) 
                {
                console.log("RESPUESTA GUARDAR DIRECCION SERVIDOR: ",response); 
                comp.$toastr.success('DIRECCION CREADA EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                comp.direcciones.push(comp.editedItem)
                comp.initialize();
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });
                //FIN CREACIÓN DE UA DIRECCION
      }
      this.close()
    }, 
    }
    }
</script>

<style>

</style>