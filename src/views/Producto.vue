<template>
<center>
<v-form>
<v-container fluid>
<!--*******************************INICIO BUSCADOR***************************************-->
  <v-toolbar flat color="white" class="elevation-1">
      <v-toolbar-title style="font-size:25px;font-weight:bold;color:#394BCD;">PRODUCTOS / MATERIALES</v-toolbar-title>
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
      :items="desserts"
      sort-by="calories"
      :search="search"
      class="elevation-1"
      :items-per-page="15"
      :footer-props="{ 
      'items-per-page-text': 'Filas por pagina:',
      'items-per-page-all-text': 'Todos'}"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>{{ total_productos }} Productos / Materiales</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset 
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="#394BCD" dark class="mb-2" v-on="on">NUEVO ELEMENTO</v-btn>
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
                   <!-- <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.id_producto" label="Nro. Producto"></v-text-field>
                    </v-col>-->
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field color="indigo" v-model="editedItem.codigo" label="Codigo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field color="indigo" v-model="editedItem.nombre" label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field color="indigo" type="number" v-model="editedItem.stock" label="Stock" min="1" pattern="^[0-9]+"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                          label="Unidad"
                          :items="unidades"
                          v-model="editedItem.unidad.nombre"
                          max-height="200"
                          color="indigo" 
                          dense
                          autocomplete
                        >
                      </v-select>
                      <!--<v-text-field v-model="editedItem.unidad.nombre" label="Unidad"></v-text-field>-->
                    </v-col>
                    <!--<v-col v-if="editedItem.grupo_contable==null" cols="12" sm="6" md="4">
                      <v-select
                          label="Grupo"
                          :items="grupos"
                          v-model="pordefecto"
                          color="indigo" 
                          max-height="200"
                          dense
                          autocomplete
                        >
                      </v-select>-->
                      
                      <!--<v-text-field v-model="editedItem.grupo" label="Grupo"></v-text-field>-->
                   <!-- </v-col>
                    <v-col v-else cols="12" sm="6" md="4">
                      <v-select
                          label="Grupo"
                          :items="grupos"
                          v-model="editedItem.grupo_contable.nombre"
                          max-height="200"
                          color="indigo" 
                          dense
                          autocomplete
                          
                        >
                      </v-select>-->
                      <!--<v-text-field v-model="editedItem.grupo" label="Grupo"></v-text-field>-->
                      
                    <!--</v-col>-->
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
        </v-toolbar>
      </template>
      <template v-slot:item.acciones="{ item }">
        <v-icon
          class="mr-2"
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
      </v-container>
</v-form>
</center>
</template>

<script>
import axios from 'axios'
  export default 
{
        data: () => ({
          pordefecto:'no define',
    dialog: false,
    search:'',
    grupos:[],
    unidades:[],
    unidadesaux:[],
    gruposaux:[],
    total_productos:0,
  headers: [
        { text: 'NRO. PRODUCTO', value: 'id_producto'},
        { text: 'CODIGO', value: 'codigo' },
        { text: 'NOMBRE', value: 'nombre' },
        { text: 'STOCK', value: 'stock' },
        { text: 'UNIDAD', value: 'unidad.nombre' },
       // { text: 'GRUPO', value: 'grupo_contable.nombre' },
        { text: 'ACCIONES', value: 'acciones', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: 
      {
            id_producto: '',
            codigo:'',
            nombre:'',
            stock:0,
            unidad:{
              id_unidad:0,
              nombre:''
            },
            /*grupo_contable:{
              id_grupo_contable:'',
              nombre:''
            },*/
      },
      defaultItem: 
      {
            id_producto: '',
            codigo:'',
            nombre:'',
            stock:0,
            unidad:{
              id_unidad:0,
              nombre:''
            },  
             /*grupo_contable:{
              id_grupo_contable:'',
              nombre:''
            },*/
      },
      auxiliarprod:{},
      productoauxiliar:{},
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'NUEVO ELEMENTO' : 'EDITAR ELEMENTO'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },

  created () {
      this.initialize();
      let varia =this;    
      varia.$store.commit('SET_LAYOUT', 'panelprincipal-layout');
  },

  methods: {
    initialize () 
    {
                let comp = this;
                axios.get('/api/v1/producto',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("PRUEBA OTRO SERVIDOR: ",response); 
                comp.desserts=response.data.datos.rows;
                comp.total_productos=response.data.datos.count;
                //console.log("prod--> ",comp.productos);
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });


                axios.get('/api/v1/unidad',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("PRUEBA UNIDAD SERVIDOR: ",response);
                //console.log("xxx--> ",response.data.datos.rows.length);
                  comp.unidadesaux=response.data.datos.rows;
                //comp.grupos[0]=response.data.datos.rows[1].nombre;
                for(var i=0;i<response.data.datos.rows.length;i++)
                {
                   comp.unidades[i]=response.data.datos.rows[i].nombre;
                } 
                console.log("PRUEBA UNIDAD: ",comp.unidades); 
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });

                axios.get('/api/v1/grupo_contable',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("PRUEBA UNIDAD SERVIDOR: ",response);
                //console.log("xxx--> ",response.data.datos.rows.length);
                comp.gruposaux=response.data.datos.rows;
                //comp.grupos[0]=response.data.datos.rows[1].nombre;
                for(var i=0;i<response.data.datos.rows.length;i++)
                {
                   comp.grupos[i]=response.data.datos.rows[i].nombre;
                } 
                console.log("PRUEBA UNIDAD: ",comp.grupos); 
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });

    },

    editItem (item) 
    {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.initialize();


    },

    deleteItem (item) 
    {
      let comp = this;
      const index = this.desserts.indexOf(item)
      

      //console.log("cor ",confirm('¿ Esta seguro que desea eliminar este elemento ?'));
      if(confirm('¿ Esta seguro que desea eliminar este elemento ?') && this.desserts.splice(index, 1))
      {
                //PARA LA ELIMINAR UN PRODUCTO 
                axios.delete('/api/v1/producto/'+item.id_producto ,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                }).then(function (response) 
                {
                console.log("RESPUESTA ELIMINAR PRODUCTO SERVIDOR: ",response); 
                comp.$toastr.success('PRODUCTO ELIMINADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });
                //FIN EDILIMINAR UN PRODUCTO
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
                var defineunidad=0;
                var definegrupo=0;
                console.log("haber ",comp.unidadesaux.length);
                for(var i=0;i<comp.unidadesaux.length;i++)
                {
                   console.log("funca ",comp.unidades[i]+ " =  " +this.editedItem.unidad.nombre);
                   if(comp.unidades[i]===(this.editedItem.unidad.nombre))
                   {
                     defineunidad=comp.unidadesaux[i].id_unidad;
                     console.log("daf ", defineunidad);
                   }
                }
                console.log("EditedItem ",comp.editedItem.grupo_contable);
               var variable = comp.editedItem.grupo_contable;
                if (variable === null) 
                {
                    console.log('ok');
                }

             if(comp.editedItem.grupo_contable===null)
              {
                definegrupo=1;
              }
              else
              {
                 for(var j=0;j<comp.gruposaux.length;j++)
                {
                   console.log("funca ",comp.grupos[j]+ " =  " +this.editedItem.grupo_contable.nombre);
                   if(comp.grupos[j]===(this.editedItem.grupo_contable.nombre))
                   {
                     definegrupo=comp.gruposaux[j].id_grupo_contable;
                     console.log("daf ", definegrupo);
                   }
                }
              }     
                console.log("i--> ",defineunidad);
                console.log("j--> ",definegrupo);
      if (this.editedIndex > -1) 
      {
        console.log("PASA POR EDIT david");
        Object.assign(this.desserts[this.editedIndex], this.editedItem)

        //if(define)
                //PARA LA EDICIÓN DE UN PRODUCTO 
                 this.productoauxiliar={
                  'codigo':this.editedItem.codigo,
                  'nombre':this.editedItem.nombre,
                  'stock':this.editedItem.stock,
                  'fid_unidad':defineunidad,
                  //'fid_grupo_contable':definegrupo,
                }
                    console.log("produ--> ",comp.productoauxiliar);

                axios.put('/api/v1/producto/'+comp.editedItem.id_producto, comp.productoauxiliar ,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                  
                }).then(function (response) 
                {
                console.log("RESPUESTA EDITAR PRODUCTO SERVIDOR: ",response); 
                comp.$toastr.success('PRODUCTO ACTUALIZADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                comp.initialize();
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });
                //FIN EDICIÓN DE UN PRODUCTO
      } 
      else 
      {  
        console.log("corre Y PASA POR GUARDAR por aqui david");
          this.auxiliarprod={
          'codigo':this.editedItem.codigo,
          'nombre':this.editedItem.nombre,
          'stock':this.editedItem.stock,
          'fid_unidad':defineunidad,
          //'fid_grupo_contable':definegrupo,
        }

        

                //PARA LA GUARDAR DE UN PRODUCTO 
                //comp.editedItem.id_producto=500;
                console.log("guardar--> ",this.auxiliarprod);
                
              axios.post('/api/v1/producto/', comp.auxiliarprod ,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                  
                }).then(function (response) 
                {
                console.log("RESPUESTA GUARDAR PRODUCTO SERVIDOR: ",response); 
                comp.$toastr.success('PRODUCTO CREADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                comp.desserts.push(comp.editedItem)
                comp.initialize();
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });

               //FIN GUARDAR DE UN PRODUCTO

      }
      this.close()
      //console.log("prod-->  ",this.editedItem.nombre);
    },





  },
}
</script>

