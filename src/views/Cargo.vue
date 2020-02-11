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
      <v-toolbar-title style="font-size:25px;font-weight:bold;color:#394BCD;">CARGOS</v-toolbar-title>
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
          color="indigo"
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
      :items="cargos"
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
                  <p class="text-left" style="font-size:25px;font-weight:bold; ">cargos ALMACEN AFCOOP</p>                
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

                  <!--***********************************************INICIO V-IF**************************************-->
                  <v-row v-if="editedIndex === -1">

                  <v-col cols="12" sm="12" md="12">
                      <v-select
                          label="Nombres Completos"
                          :items="nombres_completos"
                          v-model="editedItem.usuario.persona.nombres"
                          max-height="200"
                          color="indigo"
                          dense
                          autocomplete
                        >
                      </v-select>
                    </v-col>



                  <!--<v-col cols="12" sm="6" md="4">
                      <v-select
                          label="Nombres"
                          :items="nombress"
                          v-model="editedItem.usuario.persona.nombres"
                          max-height="200"
                          dense
                          autocomplete
                        >
                      </v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                    <v-select
                          label="Paterno"
                          :items="paternoss"
                          v-model="editedItem.usuario.persona.primer_apellido"
                          max-height="200"
                          dense
                          autocomplete
                        >
                      </v-select>

                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                        <v-select
                          label="Materno"
                          :items="maternoss"
                          v-model="editedItem.usuario.persona.segundo_apellido"
                          max-height="200"
                          dense
                          autocomplete
                        >
                      </v-select>
                    </v-col>-->
                    <v-col cols="12">
                  
                      <v-text-field color="indigo" v-model="editedItem.nombre" label="Nombre Cargo"></v-text-field>
                    </v-col>
                    </v-row>


                    <v-row v-else>
                        <!-- <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="editedItem.usuario.persona.id_usuario" label="Id. Persona"></v-text-field>
                          </v-col>
                        <v-col cols="12">
                        <v-select
                              label="Nombres Usuarios"
                              :items="nombres_completos"
                              color="indigo"
                              :v-model="editedItem.usuario.persona.nombres+' '+editedItem.usuario.persona.primer_apellido+' '+editedItem.usuario.persona.segundo_apellido"
                              max-height="200"
                              dense
                              autocomplete
                            >
                          </v-select>
                        </v-col>-->
                        <v-col cols="12">
                    <v-select
                              label="Cargos"
                              :items="solocargos"
                              color="indigo"
                              v-model="editedItem.nombre"
                              max-height="200"
                              dense
                              autocomplete
                            >
                          </v-select>
                    </v-col>
                    </v-row>

                    <v-col cols="12">
                        <v-select
                              label="Direcciones"
                              :items="direcciones"
                              color="indigo"
                              v-model="editedItem.direccion.nombre"
                              max-height="200"
                              dense
                              autocomplete
                            >
                          </v-select>
                     <!-- <v-text-field v-model="editedItem.direccion.nombre" label="Direccion"></v-text-field>-->
                   <!-- </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                            label="regionales"
                            :items="regionales"
                            v-model="editedItem.direccion.regional.nombre"
                            max-height="200"
                            dense
                            autocomplete
                          >
                        </v-select>-->
                     <!-- <v-text-field v-model="editedItem.direccion.regional.nombre" label="Regional"></v-text-field>-->
                    </v-col>
                  </v-row>

                  <!--***********************************************FIN V-IF**************************************-->



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
        { text: 'NRO. CARGO', value: 'id_cargo'},
        { text: 'NOMBRE', value: 'nombre' },
        { text: 'DIRECCION', value: 'direccion.nombre' },
        { text: 'REGIONAL', value: 'direccion.regional.nombre' },
        //{ text: 'ID USUARIO', value: 'usuario.id_usuario' },
        { text: 'NOMBRES', value: 'usuario.persona.nombres' },
        { text: 'PRIMER APELLIDO', value: 'usuario.persona.primer_apellido' },
        { text: 'SEGUNDO APELLIDO', value: 'usuario.persona.segundo_apellido' },
        /*{ text: 'HORA', value: 'contraseña' },
        { text: 'ESTADO', value: 'cargo' },*/
        { text: 'ACCIONES', value: 'acciones', sortable: false },
      ],
      cargos: [],

      nombress:[],
      paternoss:[],
      maternoss:[],
      solocargos:[],
      nombres_completos:[],
      usuariovale:[],
      direcciones:[],
      regionales:[],
      auxmandardatos:{},
      auxmandardatos_1:{},
      direccionaux:[],
      editedIndex: -1,
      editedItem: 
      {
            id_cargo:'',
            nombre:'',
            direccion:{
                nombre:'',
                regional:{
                  nombre:'',
                }
            },
            usuario:{
                  id_usuario:'',
              persona:{
                    nombres:'', 
                    primer_apellido:'',
                    segundo_apellido:'',
              }
            }
      },
      defaultItem: 
      {          
                  id_cargo:'',
            nombre:'',
            direccion:{
                id_persona:0,
                nombre:'',
                regional:{
                  nombre:'',
                }
            },
            usuario:{
               id_usuario:'',
              persona:{
                    nombres:'', 
                    primer_apellido:'',
                    segundo_apellido:'',
              }
            }
      },
                 

    }},
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
                axios.get(comp.store+'/api/v1/cargo',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("PRUEBA OTRO SERVIDOR: ",response); 
                comp.cargos=response.data.datos.rows;
                for(var i=0;i<response.data.datos.rows.length;i++)
                {
                    comp.solocargos[i]=response.data.datos.rows[i].nombre;
                }
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });


                  axios.get(comp.store+'/api/v1/usuario',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("PRUEBA UNIDAD SERVIDOR: ",response);
                comp.usuariovale=response.data.datos.rows;
                console.log("xxx--> ",comp.usuariovale);
                for(var i=0;i<response.data.datos.rows.length;i++)
                {
                comp.nombres_completos[i]=response.data.datos.rows[i].persona.nombres + " " + response.data.datos.rows[i].persona.primer_apellido + " " + response.data.datos.rows[i].persona.segundo_apellido;
                }
                for(var m=0;m<response.data.datos.rows.length;m++)
                {
                   comp.nombress[m]=response.data.datos.rows[m].persona.nombres;
                   comp.paternoss[m]=response.data.datos.rows[m].persona.primer_apellido;
                   comp.maternoss[m]=response.data.datos.rows[m].persona.segundo_apellido;
                } 
                console.log("PRUEBA NOMBRES: ",comp.nombress); 
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });



                
                axios.get(comp.store+'/api/v1/regional',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("PRUEBA OTRO SERVIDOR: ",response); 
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


                axios.get(comp.store+'/api/v1/direccion',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("PRUEBA DIRECCION OTRO SERVIDOR: ",response); 
                comp.direccionaux=response.data.datos.rows;
                //comp.regionales=response.data.datos.rows;
                for(var i=0;i<response.data.datos.rows.length;i++)
                {
                   comp.direcciones[i]=response.data.datos.rows[i].nombre + " - " +response.data.datos.rows[i].regional.nombre;
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
      this.editedIndex = this.cargos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      },

    deleteItem (item) 
    {
      let comp = this;
      console.log("ELEMENTO A ELIMINAR==> ",item);
      const index = this.cargos.indexOf(item)
      if(confirm('¿ Esta seguro que desea eliminar este elemento ?') && this.cargos.splice(index, 1))
      {
                //PARA LA ELIMINAR UN CARGO
                axios.delete(comp.store+'/api/v1/cargo/'+item.id_cargo,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                }).then(function (response) 
                {
                console.log("RESPUESTA ELIMINAR CARGO SERVIDOR: ",response);
                comp.$toastr.success('CARGO ELIMINADO EXITOSAMENTE', 'HECHO', {timeOut: 2000}); 
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('REVISE SUS DATOS POR FAVOR', 'ERROR', {timeOut: 2000});
                });
                //FIN ELIMINAR UN CARGO
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
      var variable_id_usuario=0;
                var variable_id_direccion=0;
      let comp = this;
      if (this.editedIndex > -1) 
      {
        Object.assign(this.cargos[this.editedIndex], this.editedItem)
                 //PARA EDITAR UN CARGO
                 console.log("ANTES DE edit--> ",comp.editedItem);
          
               console.log("cunato ",this.editedItem.usuario.persona.nombres);
            for(var j=0;j<comp.usuariovale.length;j++)
              {
               //   console.log("--> "+ (comp.usuariovale[j].persona.nombres) + " " + (comp.usuariovale[j].persona.primer_apellido) + " " + (comp.usuariovale[j].persona.segundo_apellido) +" == " + (this.editedItem.usuario.persona.nombres)+" "+(this.editedItem.usuario.persona.primer_apellido)+" "+(this.editedItem.usuario.persona.segundo_apellido));
                  if(((comp.usuariovale[j].persona.nombres)===(this.editedItem.usuario.persona.nombres))&&((comp.usuariovale[j].persona.primer_apellido)===(this.editedItem.usuario.persona.primer_apellido))&&((comp.usuariovale[j].persona.segundo_apellido)===(this.editedItem.usuario.persona.segundo_apellido)))
                  {
                     variable_id_usuario=comp.usuariovale[j].id_usuario;
                  //   console.log("ingresas ");
                  }
              }
                console.log("haber ",variable_id_usuario);

                for(var l=0;l<comp.direccionaux.length;l++)
              {
               console.log("--> "+ (comp.direccionaux[l].nombre) +" == " + (this.editedItem.direccion.nombre));
                  if((comp.direccionaux[l].nombre+" - "+comp.direccionaux[l].regional.nombre)===(this.editedItem.direccion.nombre))
                  {
                     variable_id_direccion=comp.direccionaux[l].id_direccion;
                  //   console.log("ingresas ");
                  }
              }
                console.log("haber ",variable_id_direccion);

               this.auxmandardatos_1={
                  'fid_usuario':variable_id_usuario,
                  'fid_direccion':variable_id_direccion,
                  'nombre':comp.editedItem.nombre
                }

                axios.put(comp.store+'/api/v1/cargo/'+comp.editedItem.id_cargo, comp.auxmandardatos_1,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                }).then(function (response) 
                {
                console.log("RESPUESTA EDITAR CARGO SERVIDOR: ",response); 
                comp.$toastr.success('USUARIO ACTUALIZADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                comp.initialize();
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('REVISE SUS DATOS POR FAVOR', 'ERROR', {timeOut: 2000});
                });
                //FIN EDITAR UN CARGO


                console.log("editaDO--> ",comp.editedItem);




      } 
      else 
      {
                

                 
               console.log("cunato ",this.editedItem);
            for(var n=0;n<comp.usuariovale.length;n++)
              {
               //   console.log("--> "+ (comp.usuariovale[j].persona.nombres) + " " + (comp.usuariovale[j].persona.primer_apellido) + " " + (comp.usuariovale[j].persona.segundo_apellido) +" == " + (this.editedItem.usuario.persona.nombres)+" "+(this.editedItem.usuario.persona.primer_apellido)+" "+(this.editedItem.usuario.persona.segundo_apellido));
                  if((comp.usuariovale[n].persona.nombres+" "+comp.usuariovale[n].persona.primer_apellido+" "+comp.usuariovale[n].persona.segundo_apellido)===(this.editedItem.usuario.persona.nombres))
                  {
                     variable_id_usuario=comp.usuariovale[n].id_usuario;
                  //   console.log("ingresas ");
                  }
              }
                console.log("haber ",variable_id_usuario);

                for(var m=0;m<comp.direccionaux.length;m++)
              {
               console.log("--> "+ (comp.direccionaux[m].nombre) +" == " + (this.editedItem.direccion.nombre));
                  if((comp.direccionaux[m].nombre+" - "+comp.direccionaux[m].regional.nombre)===(this.editedItem.direccion.nombre))
                  {
                     variable_id_direccion=comp.direccionaux[m].id_direccion;
                  //   console.log("ingresas ");
                  }
              }
                console.log("haber ",variable_id_direccion);

               this.auxmandardatos={
                  'fid_usuario':variable_id_usuario,
                  'nombre':comp.editedItem.nombre,
                  'fid_direccion':variable_id_direccion
                }
                //PARA LA CREACIÓN DE UN CARGO
                console.log("guardar--> ",comp.auxmandardatos);
                axios.post(comp.store+'/api/v1/cargo/', comp.auxmandardatos ,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                }).then(function (response) 
                {
                console.log("RESPUESTA GUARDAR CARGO SERVIDOR: ",response); 
                comp.$toastr.success('USUARIO CREADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                comp.cargos.push(comp.editedItem)
                comp.initialize();
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                     comp.$toastr.error('REVISE SUS DATOS POR FAVOR', 'ERROR', {timeOut: 2000});
                });
                //FIN CREACIÓN DE UN CARGO
      }
      this.close()
    }, 
    }
    }
</script>

<style>

</style>