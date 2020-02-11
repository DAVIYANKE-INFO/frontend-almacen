<template>
<center>
<v-form>
<v-container fluid>
<center>
<!--*******************************INICIO BUSCADOR***************************************-->
  <v-toolbar flat color="white" class="elevation-1">
      <v-toolbar-title style="font-size:25px;font-weight:bold;color:#394BCD;">PROVEEDORES</v-toolbar-title>
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
          color="indigo"
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
      :items="proveedores"
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
                      <v-text-field color="indigo" v-model="editedItem.direccion" label="Dirección"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field color="indigo" v-model="editedItem.telefono" label="Telefono"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field color="indigo" v-model="editedItem.nit" label="Nit"></v-text-field>
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
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.nombre}}</td>
        <td class="text-xs-center">{{ props.item.direccion }}</td>
        <td class="text-xs-center">{{ props.item.telefono }}</td>
        <td class="text-xs-center">{{ props.item.nit}}</td>
      </template>
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
    dialog: false,
    search:'',
      headers: [
       // { text: 'NRO. UNIDAD', value: 'id_grupo_contable'},
        { text: 'NOMBRE', value: 'nombre' },
        { text: 'DIRECCION', value: 'direccion' },
        { text: 'TELEFONO', value: 'telefono' },
        { text: 'NIT', value: 'nit' },
        /*{ text: 'HORA', value: 'contraseña' },
        { text: 'ESTADO', value: 'cargo' },*/
        { text: 'ACCIONES', value: 'acciones', sortable: false },
      ],
      proveedores: [],
      editedIndex: -1,
      editedItem: 
      {
            nombre: '',
            direccion:'',
            telefono:'',
            nit:'',

      },
      defaultItem: 
      {
            nombre: '',
            direccion:'',
            telefono:'',
            nit:'',

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
                axios.get('/api/v1/proveedor',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("PRUEBA OTRO SERVIDOR PROVEEDOR : ",response); 
                comp.proveedores=response.data.datos.rows;
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });   
      },
      editItem (item) 
      {
        console.log("ELEMENTO A EDITAR--> ",item);
      this.editedIndex = this.proveedores.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true

      },

    deleteItem (item) 
    {
      let comp = this;
      console.log("ELEMENTO A ELIMINAR==> ",item);
      const index = this.proveedores.indexOf(item)
      if(confirm('¿ Esta seguro que desea eliminar este elemento ?') && this.proveedores.splice(index, 1))
      {
                //PARA LA ELIMINAR UN PROVEEDOR
                axios.delete('/api/v1/proveedor/'+item.id_proveedor,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                }).then(function (response) 
                {
                console.log("RESPUESTA ELIMINAR GRUPO SERVIDOR: ",response); 
                comp.$toastr.success('PROVEEDOR ELIMINADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });
                //FIN ELIMINAR UN PROVEEDOR
      }
    },
    close () 
    {
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
        Object.assign(this.proveedores[this.editedIndex], this.editedItem)
                //PARA EDITAR UN PROVEEDOR
                console.log("editar--> ",comp.editedItem);
                axios.put('/api/v1/proveedor/'+comp.editedItem.id_proveedor, comp.editedItem,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                }).then(function (response) 
                {
                console.log("RESPUESTA EDITAR PROVEEDOR SERVIDOR: ",response); 
                comp.$toastr.success('PROVEEDOR ACTUALIZADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                comp.initialize();
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });
                //FIN EDITAR UN PROVEEDOR
      } 
      else 
      {
                
                //PARA LA CREACIÓN DE UN  PROVEEDOR
                console.log("guardar--> ",comp.editedItem);
                axios.post('/api/v1/proveedor/', comp.editedItem ,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                }).then(function (response) 
                {
                console.log("RESPUESTA GUARDAR PROVEEDOR SERVIDOR: ",response); 
                comp.$toastr.success('PROVEEDOR CREADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                comp.proveedores.push(comp.editedItem)
                comp.initialize();
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });
                //FIN CREACIÓN DE UN PROVEEDOR
      }
      this.close()
    }, 
    }
    }
</script>

<style>

</style>