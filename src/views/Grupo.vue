<template>
<center>
<v-form>
<v-container fluid>
<center>
<!--*******************************INICIO BUSCADOR***************************************-->
  <v-toolbar flat color="white" class="elevation-1">
      <v-toolbar-title style="font-size:25px;font-weight:bold;color:#394BCD;">GRUPOS</v-toolbar-title>
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
          color="indigo darken-1"
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
      :items="grupos"
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
                      <v-text-field color="indigo" v-model="editedItem.codigo" label="Codigo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field color="indigo" v-model="editedItem.nombre" label="Nombre"></v-text-field>
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
      <!--<template slot="items" slot-scope="props">
        <td>{{ props.item.id }}</td>
        <td class="text-xs-center">{{ props.item.id_unidad}}</td>
        <td class="text-xs-center">{{ props.item.nombre }}</td>
        <td class="text-xs-center">{{ props.item.estado }}</td>
        <td class="text-xs-center">{{ props.item._fecha_modificacion}}</td>
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
    dialog: false,
    search:'',
      keeps:[{"ci":"7066868","paterno":"ALEGRIA","materno":"QUISPE"}],
      headers: [
        { text: 'NRO. UNIDAD', value: 'id_grupo_contable'},
        { text: 'CODIGO', value: 'codigo' },
        { text: 'NOMBRE', value: 'nombre' },
        { text: 'ESTADO', value: 'estado' },
        { text: 'USUARIO CREACION', value: '_usuario_creacion' },
        /*{ text: 'HORA', value: 'contraseña' },
        { text: 'ESTADO', value: 'cargo' },*/
        { text: 'ACCIONES', value: 'acciones', sortable: false },
      ],
      grupos: [],
      editedIndex: -1,
      editedItem: 
      {
            id_grupo_contable: '',
            codigo:'',
            nombre:'',
            estado:'',
            _usuario_creacion:'',
      },
      defaultItem: 
      {
            id_grupo_contable: '',
            codigo:'',
            nombre:'',
            estado:'',
            _usuario_creacion:'',
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
        var token=sessionStorage.getItem('token');
                let comp = this;
                axios.get(comp.store+'/api/v1/grupo_contable',{
                  headers: { Authorization: 'Bearer '+token }
                }).then(function (response) 
                {
                console.log("PRUEBA OTRO SERVIDOR: ",response); 
                comp.grupos=response.data.datos.rows;
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });   
      },
      editItem (item) 
      {
        console.log("ELEMENTO A EDITAR--> ",item);
      this.editedIndex = this.grupos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true

      },

    deleteItem (item) 
    {
      var token=sessionStorage.getItem('token');
      let comp = this;
      console.log("ELEMENTO A ELIMINAR==> ",item);
      const index = this.grupos.indexOf(item)
      if(confirm('¿ Esta seguro que desea eliminar este elemento ?') && this.grupos.splice(index, 1))
      {                //PARA LA ELIMINAR UN  GRUPO
                axios.delete(comp.store+'/api/v1/grupo_contable/'+item.id_grupo_contable ,{
                  headers: { Authorization: 'Bearer '+token },
                }).then(function (response) 
                {
                console.log("RESPUESTA ELIMINAR GRUPO SERVIDOR: ",response);
                comp.$toastr.success('GRUPO ELIMINADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });
                //FIN ELIMINAR UN GRUPO
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
      var token=sessionStorage.getItem('token');
      let comp = this;
      if (this.editedIndex > -1) 
      {
        Object.assign(this.grupos[this.editedIndex], this.editedItem)
                //PARA EDITAR LA GRUPO DE UN GRUPO
                console.log("editar--> ",comp.editedItem.id_grupo_contable,{nombre:comp.editedItem.nombre});
                axios.put(comp.store+'/api/v1/grupo_contable/'+comp.editedItem.id_grupo_contable, comp.editedItem,{
                  headers: { Authorization: 'Bearer '+token },
                }).then(function (response) 
                {
                console.log("RESPUESTA GUARDAR GRUPO SERVIDOR: ",response);
                comp.$toastr.success('GRUPO ACTUALIZADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                comp.initialize();
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });
                //FIN EDITAR GRUPO DE UN GRUPO
      } 
      else 
      {
                
                //PARA LA CREACIÓN DE UN GRUPO 
                
                axios.post(comp.store+'/api/v1/grupo_contable/', {nombre:comp.editedItem.nombre,codigo:comp.editedItem.codigo} ,{
                  headers: { Authorization: 'Bearer '+token },
                }).then(function (response) 
                {
                console.log("RESPUESTA GUARDAR GRUPO SERVIDOR: ",response); 
                comp.$toastr.success('GRUPO CREADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                comp.grupos.push(comp.editedItem)
                comp.initialize();
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });
                //FIN CREACIÓN DE UN GRUPO
      }
      this.close()
    }, 
    }
    }
</script>

<style>

</style>