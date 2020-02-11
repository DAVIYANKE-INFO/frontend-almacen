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
      <v-toolbar-title style="font-size:25px;font-weight:bold;color:#394BCD;">UNIDADES</v-toolbar-title>
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
       :headers="headers"
      :items="unidades"
      :search="search"
      class="elevation-1"
      sort-by="id_unidad"
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
                  <p class="text-left" style="font-size:25px;font-weight:bold; ">UNIDADES ALMACEN AFCOOP</p>                
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
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field color="indigo" v-model="editedItem.nombre" label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field color="indigo" v-model="editedItem.descripcion" label="Descripcion"></v-text-field>
                    </v-col>
                  <!--  <v-col cols="12" sm="6" md="6">
                    <h6>Fecha de Modificación</h6>
                      <span>{{ $moment(editedItem._fecha_modificacion).format("DD") }}-{{ $moment(editedItem._fecha_modificacion).format("MM") }}-{{ $moment(editedItem._fecha_modificacion).format("YYYY") }}</span>
                      <span>{{ editedItem._fecha_modificacion }}</span>
                    </v-col>-->
                
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
import moment from 'moment'
export default {

  data () {
      return {
    fecha:'11/11/2014',
    dialog: false,
    search:'',
      modal: false,
      menu2: false,
      dialog1: false,
      keeps:[{"ci":"7066868","paterno":"ALEGRIA","materno":"QUISPE"}],
      headers: [
        { text: 'NRO. UNIDAD', value: 'id_unidad'},
        { text: 'NOMBRE', value: 'nombre' },
        { text: 'ESTADO', value: 'estado' },
        { text: 'FECHA DE MODIFICACIÓN', value: '_fecha_modificacion' },
        /*{ text: 'DESCRIPCION', value: 'descripcion' },
        { text: 'HORA', value: 'contraseña' },
        { text: 'ESTADO', value: 'cargo' },*/
        { text: 'ACCIONES', value: 'acciones', sortable: false },
      ],
      unidades: [],
      unidadesaux: [],
      editedIndex: -1,
      editedItem: 
      {
            nombre:'',
            descripcion:'',
            _fecha_modificacion:'',
      },
      defaultItem: 
      {          
            nombre:'',
            descripcion:'',
            _fecha_modificacion:'',
      },
    }
    },
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
      since: function(d)
      {
          return moment(d).fromNow();
      },
      initialize () 
      {
        
                let comp = this;
                axios.get(comp.store+'/api/v1/unidad',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("PRUEBA OTRO SERVIDOR: ",response); 
                comp.unidadesaux=response.data.datos.rows;
                comp.unidades=response.data.datos.rows;
                for(var t=0;t<comp.unidadesaux.length;t++)
                {
                    console.log("pasas--> ", moment(comp.unidadesaux._fecha_modificacion).format('YYYY'));
                    //this.$moment(comp.unidadesaux._fecha_modificacion).format("DD"))
                    comp.unidades[t]._fecha_modificacion=moment(comp.unidadesaux[t]._fecha_modificacion).format('DD')+"-"+moment(comp.unidadesaux[t]._fecha_modificacion).format('MM')+"-"+moment(comp.unidadesaux[t]._fecha_modificacion).format('YYYY')+ " | " + moment(comp.unidadesaux[t]._fecha_modificacion).format('h:mm:ss');
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
      this.editedIndex = this.unidades.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      },

    deleteItem (item) 
    {
      let comp = this;
      console.log("ELEMENTO A ELIMINAR==> ",item);
      const index = this.unidades.indexOf(item)
      if(confirm('¿ Esta seguro que desea eliminar este elemento ?') && this.unidades.splice(index, 1))
      {
                //PARA LA ELIMINAR UNA UNIDAD
                axios.delete(comp.store+'/api/v1/unidad/'+item.id_unidad,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                }).then(function (response) 
                {
                console.log("RESPUESTA ELIMINAR UNIDAD SERVIDOR: ",response); 
                comp.$toastr.success('UNIDAD ELIMINADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });
                //FIN ELIMINAR UNA UNIDAD
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
        Object.assign(this.unidades[this.editedIndex], this.editedItem)
                 //PARA EDITAR UNA UNIDAD
                console.log("editar--> ",comp.editedItem);
                axios.put(comp.store+'/api/v1/unidad/'+comp.editedItem.id_unidad, comp.editedItem,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                }).then(function (response) 
                {
                console.log("RESPUESTA EDITAR UNIDAD SERVIDOR: ",response); 
                comp.$toastr.success('UNIDAD ACTUALIZADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                comp.initialize();
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });
                //FIN EDITAR UNA UNIDAD
      } 
      else 
      {
        
                //PARA LA CREACIÓN DE UNA UNIDAD
                console.log("guardar--> ",comp.editedItem);
                axios.post(comp.store+'/api/v1/unidad/', comp.editedItem ,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                }).then(function (response) 
                {
                console.log("RESPUESTA GUARDAR UNIDAD SERVIDOR: ",response); 
                comp.$toastr.success('UNIDAD CREADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                comp.unidades.push(comp.editedItem)
                comp.initialize();
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });
                //FIN CREACIÓN DE UA UNIDAD
      }
      this.close()
    }, 
    }
    }
</script>

<style>

</style>