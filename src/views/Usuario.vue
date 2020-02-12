<template>
<center>
<v-form>
<v-container fluid>
        <center>
<!--*******************************INICIO BUSCADOR***************************************-->
  <v-toolbar flat color="white" class="elevation-1">
      <v-toolbar-title style="font-size:25px;font-weight:bold;color:#394BCD;">USUARIOS</v-toolbar-title>
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
      :items="usuariosaux"
      :search="search"
      class="elevation-1"
      sort-by="id_usuario"
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
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on }">
            <v-container fluid>
              <v-row align="center" justify="end">
                <!--<v-col cols="8">
                  <p class="text-left" style="font-size:25px;font-weight:bold; ">usuarios ALMACEN AFCOOP</p>                
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
                      <v-text-field v-model="editedItem.persona.nombres" label="Nombres" color="indigo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.persona.primer_apellido" label="Primer Apellido" color="indigo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.persona.segundo_apellido" label="Segundo Apellido" color="indigo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.persona.documento_identidad" label="CI" color="indigo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.usuario" label="Usuario" color="indigo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.contraseña" label="Contraseña" color="indigo"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <!--<v-text-field 
                      v-model="editedItem.persona.fecha_nacimiento" 
                      label="Fecha Nacimiento" 
                      hint="AAAA/MM/DD formato" 
                      color="indigo">-->
                      </v-text-field>

                      <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="editedItem.persona.fecha_nacimiento"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="editedItem.persona.fecha_nacimiento"
              label="Fecha de Nacimiento"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker locale="es" v-model="editedItem.persona.fecha_nacimiento" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(editedItem.persona.fecha_nacimiento)">OK</v-btn>
          </v-date-picker>
        </v-menu>
                    </v-col>
                    <!--<v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.persona.sexo" label="Sexo (M ó F)" color="indigo"></v-text-field>
                    </v-col>-->
                          <v-col cols="3">
                            <v-select
                              v-model="editedItem.persona.sexo"
                              :items="sexos"
                              append-outer-icon="mdi-sports-football"
                              menu-props="auto"
                              hide-details
                              label="Sexo M ó F"
                              single-line
                            ></v-select>
                          </v-col>
                    <v-col cols="12" sm="6" md="5">
                    <!--INICIO PARA LOS ROLES DE LA SELECION MULTIPLE-->
                      <v-row>
                          <v-col cols="12">
                            
                            <v-autocomplete
                              v-model="friends"
                              :disabled="isUpdating"
                              :items="people"
                              dense
                              chips
                              color="blue-grey lighten-2"
                              label="Roles"
                              item-text="nombre"
                              item-value="id_rol"
                              multiple
                            >
                              <template v-slot:selection="data">
                                <v-chip
                                  v-bind="data.attrs"
                                  :input-value="data.selected"
                                  close
                                  @click="data.select"
                                  @click:close="remove(data.item)"
                                >
                                  
                                  {{ data.item.nombre }}
                                </v-chip>
                              </template>
                              <template v-slot:item="data">
                                <template v-if="typeof data.item !== 'object'">
                                  <v-list-item-content v-text="data.item"></v-list-item-content>
                                </template>
                                <template v-else>
                                
                                  <v-list-item-content>
                                    <v-list-item-title v-html="data.item.nombre"></v-list-item-title>
                                    <v-list-item-subtitle v-html="data.item.id_rol"></v-list-item-subtitle>
                                  </v-list-item-content>
                                </template>
                              </template>
                            </v-autocomplete>
                            
                          </v-col>
                      </v-row>
                      <!--FIN PARA LOS ROLES DE LA SELECION MULTIPLE-->                 
                      <!--<div v-for="david in editedItem.usuarios_roles">  
                        <v-text-field v-model="david.rol.nombre" label="Rol" color="indigo"></v-text-field>
                      </div>-->
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
      /*************************************INICIO SELECCIONAR VARIOS*************************************/
      autoUpdate: true,
      friends: [],
      isUpdating: false,
      nombre: '',
      people: [],
      title: 'The summer breeze',
      /*************************************FIN SELECCIONAR VARIOS****************************************/
      /**************************************PARA GENERO**************************************************/
      generos: '',
      sexos: [
        'M', 'F',
      ],
      /**********************************FIN PARA GENERO**************************************************/
    
        menu: false,

    fecha:'11/11/2014',
    dialog: false,
    search:'',
    selected:[],
      modal: false,
      menu2: false,
      dialog1: false,
      keeps:[{"ci":"7066868","paterno":"ALEGRIA","materno":"QUISPE"}],
      headers: [
        { text: 'NRO. USUARIO', value: 'id_usuario'},
        { text: 'NOMBRE', value: 'persona.nombres' },
        { text: 'PRIMER APELLIDO', value: 'persona.primer_apellido' },
        { text: 'SEGUNDO APELLIDO', value: 'persona.segundo_apellido' },
        { text: 'CI', value: 'persona.documento_identidad' },
        { text: 'USUARIO', value: 'usuario' },
       // { text: 'CONTRASEÑA', value: 'contraseña' },
        { text: 'SEXO', value: 'persona.sexo' },
        { text: 'ROL', value: 'observaciones' },
       // { text: 'ROL 2', value: 'usuarios_roles[1].rol.nombre' },
        /*{ text: 'ESTADO', value: 'cargo' },*/
        { text: 'ACCIONES', value: 'acciones', sortable: false },
      ],
      usuarios: [],
      usuariosaux: [],
      editedIndex: -1,
      editedItem: 
      {
            persona:
            {
            nombres:'',
            primer_apellido:'',
            segundo_apellido:'',
            documento_identidad:'',
            sexo:'',
            fecha_nacimiento:new Date().toISOString().substr(0, 10),
            },
            usuario:'',
            contraseña:'',
           
      },
      defaultItem: 
      {          
            persona:
            {
              nombres:'',
              primer_apellido:'',
              segundo_apellido:'',
              documento_identidad:'',
              sexo:'',
              fecha_nacimiento:'',
            },
           usuario:'',
           contraseña:'',
      },
      rolesitos:[],
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
       isUpdating (val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    },
      dialog (val) 
      {
        val || this.close()
      }
    },
      created: function()
    {
      this.inicializacargos();
      this.initialize();
      let varia =this;    
      varia.$store.commit('SET_LAYOUT', 'panelprincipal-layout');
    },
    methods: 
    {
      remove (item) 
      {
        console.log("david--> ",item.nombre);
        console.log("PEOPLE--> ",this.people);

        const index = this.friends.indexOf(item.id_rol)
        if (index >= 0) this.friends.splice(index, 1)
      },
      inicializacargos ()
      {
        var token=sessionStorage.getItem('token');
                let comp = this;
                axios.get(comp.store+'/api/v1/rol',{
                  headers: { Authorization: 'Bearer '+token }
                }).then(function (response) 
                {
                console.log("PRUEBA OTRO SERVIDOR: ",response); 
                comp.people=response.data.datos.rows;
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                }); 
      },
      initialize () 
      {
        var token=sessionStorage.getItem('token');
                let comp = this;
                axios.get(comp.store+'/api/v1/usuario',{
                  headers: { Authorization: 'Bearer '+token }
                }).then(function (response) 
                {
                console.log("PRUEBA OTRO SERVIDOR: ",response); 
                comp.usuarios=response.data.datos.rows;
                comp.usuariosaux=response.data.datos.rows;
                for(var t=0;t<comp.usuariosaux.length;t++)
                {
                  var tt="";
                  for(var g=0;g<comp.usuariosaux[t].usuarios_roles.length;g++)
                  {
                    if(g==(comp.usuariosaux[t].usuarios_roles.length-1))
                    {
                      tt=tt+comp.usuariosaux[t].usuarios_roles[g].rol.nombre;
                    }
                    else
                    {
                      tt=tt+comp.usuariosaux[t].usuarios_roles[g].rol.nombre+" , ";
                    }
                  }
                  comp.usuariosaux[t].observaciones=tt;
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
        this.editedIndex = this.usuarios.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

    deleteItem (item) 
    {
      var token=sessionStorage.getItem('token');
      let comp = this;
      console.log("USUARIO A ELIMINAR==> ",item);
      const index = this.usuarios.indexOf(item)
       if(confirm('¿ Esta seguro que desea eliminar este elemento ?') && this.usuarios.splice(index, 1))
      {
                //PARA LA ELIMINAR UNA USUARIO
                axios.delete(comp.store+'/api/v1/usuario/'+item.id_usuario,{
                  headers: { Authorization: 'Bearer '+token },
                }).then(function (response) 
                {
                console.log("RESPUESTA ELIMINAR USUARIO SERVIDOR: ",response); 
                comp.$toastr.success('USUARIO ELIMINADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });
                //FIN ELIMINAR UNA USUARIO
      }
    },
    close () 
    {
      console.log("xxx-> editItem ",this.editedItem);
      console.log("www-> defaultItem ",this.defaultItem);
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
        Object.assign(this.usuarios[this.editedIndex], this.editedItem)
                 //PARA EDITAR UNA USUARIO
                console.log("editar--> ",comp.editedItem);
                console.log("UPDATE FRIENDS--> ",this.friends);
                var t={ 'nombres':this.editedItem.persona.nombres,
                        'usuario':this.editedItem.usuario,
                        'contrasena':this.editedItem.contraseña,
                        'primer_apellido':this.editedItem.persona.primer_apellido,
                        'segundo_apellido':this.editedItem.persona.segundo_apellido,
                        'documento_identidad':this.editedItem.persona.documento_identidad,
                        'sexo':this.editedItem.persona.sexo,
                        'fecha_nacimiento':this.editedItem.persona.fecha_nacimiento,//'2019-11-10',//this.editedItem.persona.sexo,//'2019-11-10',
                        'roles':this.friends,//[1],
                      };
                axios.put(comp.store+'/api/v1/usuario/'+comp.editedItem.id_usuario, t,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjoxLCJ1c3VhcmlvIjoiYWRtaW4iLCJpZF9yb2wiOjEsImlkX3BlcnNvbmEiOjEsInZlbmNpbWllbnRvIjoiMjAxOS0xMi0xN1QyMDowMjowNi42MTlaIn0.t3slQG2tWw_JT5NHn8lnAnZsZ47ObdzkmWxifvpStkI' },
                }).then(function (response) 
                {
                console.log("RESPUESTA EDITAR USUARIO SERVIDOR: ",response); 
                comp.$toastr.success('USUARIO ACTUALIZADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                comp.initialize();
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });
                // FIN EDITAR UNA USUARIO
      } 
      else 
      {
        console.log("crear--> ",comp.editedItem);
        console.log("SAVE friends--> ",this.friends);
                //PARA LA CREACIÓN DE UNA USUARIO
                var t={ 'nombres':this.editedItem.persona.nombres,
                        'usuario':this.editedItem.usuario,
                        'contrasena':this.editedItem.contraseña,
                        'primer_apellido':this.editedItem.persona.primer_apellido,
                        'segundo_apellido':this.editedItem.persona.segundo_apellido,
                        'documento_identidad':this.editedItem.persona.documento_identidad,
                        'sexo':this.editedItem.persona.sexo,
                        'fecha_nacimiento':this.editedItem.persona.fecha_nacimiento,//'2019-11-10',
                        'roles':this.friends,
                      };
   
                console.log("guardar--> ",t);
               axios.post(comp.store+'/api/v1/usuario/', t ,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjoxLCJ1c3VhcmlvIjoiYWRtaW4iLCJpZF9yb2wiOjEsImlkX3BlcnNvbmEiOjEsInZlbmNpbWllbnRvIjoiMjAxOS0xMi0xN1QyMDowMjowNi42MTlaIn0.t3slQG2tWw_JT5NHn8lnAnZsZ47ObdzkmWxifvpStkI' },
                }).then(function (response) 
                {
                console.log("RESPUESTA GUARDAR USUARIO SERVIDOR: ",response); 
                comp.usuarios.push(comp.editedItem)
                comp.$toastr.success('USUARIO CREADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                comp.initialize();
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });
                //FIN CREACIÓN DE UA USUARIO
                
      }
      this.close()
    }, 
    }
    }
</script>

<style>

</style>