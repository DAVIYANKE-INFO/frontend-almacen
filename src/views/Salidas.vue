<template>
    <v-container fluid>
    <v-card
        class="ma-1 pa-3"
        outlined
        tile
    >

    <v-card
    :elevation="hover ? 24 : 6"
              class="ma-3 pa-3"
              outlined
              tile
            >
        <v-row align="center" justify="center"> 
            <v-col class="text-center" cols="12">
                <h1 style="color:#394BCD">USUARIO</h1>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">  
                <v-col class="text-center" cols="6">
                 <!--   <v-autocomplete
                        v-model="nombrescompletosusers"
                        color="#394BCD"
                        label="Usuarios"
                        :items="nombresusuarios"
                        :filter="activeFilter"
                        filled
                        rounded
                        dense
                    ></v-autocomplete>-->

<v-autocomplete
              v-on:change="consulta123()"
                v-model="materiales"
                :items="usuario_material"
                color="blue-grey lighten-2"
                label="Seleccione el usuario"
                item-text="nombre"
                item-value="id_cargo"
                :filter="activeFilter"
                filled
                rounded
                dense
                
              >
                <template v-slot:selection="data">  
                    {{ data.item.usuario.persona.nombres }} {{ data.item.usuario.persona.primer_apellido }}  {{ data.item.usuario.persona.segundo_apellido }} 
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                  <!--  <v-list-item-avatar>
                      <img :src="data.item.avatar">
                    </v-list-item-avatar>-->
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.usuario.persona.nombres+' '+data.item.usuario.persona.primer_apellido+' '+data.item.usuario.persona.segundo_apellido"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.nombre"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>



                </v-col>
              <!--  <v-col class="text-center" cols="4">
                    <v-autocomplete
                        v-model="ciusers"
                        color="#394BCD"
                        label="C.I."
                        :items="cis"
                        :filter="activeFilter"
                        filled
                        rounded
                        dense
                    ></v-autocomplete>
                </v-col>-->
        </v-row>  
        
        <v-row align="center" justify="center"> 
            <v-col class="text-left" cols="10">
                <h5 style="color:#394BCD">Seleccione su material...</h5>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
                    <!--<v-col cols="3">
                        <v-autocomplete
                            v-model="texto_grupo"
                            color="#394BCD"
                            label="Grupo"
                            :items="grupos"
                            :filter="activeFilter"
                            filled
                            rounded
                            dense
                        ></v-autocomplete>
                    </v-col>-->

                    <v-col class="text-center" cols="10">

              <v-autocomplete
              v-on:change="consulta123()"
                v-model="productos"
                :items="producto_material"
                color="blue-grey lighten-2"
                label="Producto/material"
                item-text="nombre"
                item-value="id_producto"
                :filter="activeFilter"
                filled
                rounded
                dense
              >
                <template v-slot:selection="data">  
                    {{ data.item.nombre }} <!--{{ data.item.id_producto }}-->
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                  <!--  <v-list-item-avatar>
                      <img :src="data.item.avatar">
                    </v-list-item-avatar>-->
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.nombre"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.codigo"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
           
    

                    </v-col>
                    <v-col class="text-center" cols="5">
                        <div class="my-2">
                            <v-text-field
                                v-model="cantidad"
                                label="Cantidad"
                                outlined
                                dense
                                min="0"
                                type="number"
                                ></v-text-field>
                            </div>
                    </v-col>

                    <v-col cols="5">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
            <v-text-field
              v-model="fechaingreso"
              color="indigo"
              label="Fecha"
              prepend-icon="event"
              readonly
              v-on="on"
              required
            ></v-text-field>
             <!-- <v-text-field
                v-model="dateFormatted"
                label="Fecha"
                hint="DD/MM/YYYY formato"
                persistent-hint
                prepend-icon="event"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>-->
            </template>
            <v-date-picker color="indigo" locale="es" v-model="fechaingreso" @input="menu1 = false"></v-date-picker>
          </v-menu>
        </v-col>

        <v-row align="center" justify="end">            
                    <v-col class="text-center" cols="3" lg="6">
                        <div class="my-0">
                            <v-btn medium color="error" @click="limpiar()">LIMPIAR</v-btn>
                        </div>
                    </v-col>
                    <v-col class="text-center" cols="3" lg="6">
                        <div class="my-0">
                            <v-btn medium color="indigo darken-2" dark @click="crearPedido()">AÑADIR</v-btn>
                        </div>
                    </v-col>
        </v-row>

        </v-row>
   
                <v-row align="center" justify="center">
                    <v-col class="text-center" cols="10">
                        <!-- Tabla donde se muestran los datos -->

                       <!-- <v-row align="center" justify="center">
                            <v-col cols="4" md="4">
                                <v-switch v-model="dense" label="Toggle dense" class="mx-4"></v-switch>
                            </v-col>
                            <v-col cols="4" md="4">
                                <v-switch v-model="fixedHeader" label="Toggle fixed-header" class="mx-4"></v-switch>
                            </v-col>
                        </v-row>-->



<v-container fluid>
    <v-card
              class="ma-1 pa-3"
              outlined
              tile
              width="100%"
            >
                <v-row align="start" justify="start">
                    <v-col class="text-left" cols="12" md="12">
                        <v-simple-table
                            :dense="dense"
                            :fixed-header="fixedHeader"
                            height="100%"
                        >
                            <template v-slot:default>
                            <thead>
                                <tr>
                                        <th scope="col">Codigo</th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Opciones</th>
                                        <th scope="col">Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(pedido, index) in pedidos">
                                <td>{{ pedido.codigo }}</td>
                                        <td>
                                            <span v-if="formActualizar && idActualizar == index">
                                                <!-- Formulario para actualizar -->
                                               <!-- <v-text-field
                                                v-model="productoActualizar"
                                                type="text" 
                                                class="form-control"
                                                    solo
                                                    ></v-text-field>
                                                <input v-model="productoActualizar" type="text" class="form-control">-->
                                                {{ pedido.producto }}
                                            </span>
                                            <span v-else>
                                                <!-- Dato nombre -->
                                                {{ pedido.producto }}
                                            </span>
                                        </td>
                                        <td>
                                  
                                            <span style="text-align: center;" v-if="formActualizar && idActualizar == index">
                                                <!-- Formulario para actualizar -->
                                                <v-text-field
                                                    v-model="cantidadActualizar"
                                                    class="form-control"
                                                    solo
                                                    type="number"
                                                    ></v-text-field>
                                                <!--<input v-model="cantidadActualizar" type="text" class="form-control">-->
                                            </span>
                                           
                                            <span v-else>
                                                <!-- Dato edad -->
                                                {{ pedido.cantidad }}
                                            </span>
                                        </td>
                                        <td>
                                            <!-- Botón para guardar la información actualizada -->
                                            <span v-if="formActualizar && idActualizar == index">
                                                <v-btn @click="guardarActualizacion(index)" class="btn btn-success" text icon color="blue lighten-1">
                                                    <v-icon>save</v-icon>
                                                </v-btn>
                                            
                                              <!--  <button @click="guardarActualizacion(index)" class="btn btn-success">Guardar</button>-->
                                            </span>
                                            <span v-else>
                                                <!-- Botón para mostrar el formulario de actualizar -->
                                                <v-btn class="ma-2" text icon color="green lighten-1"  @click="verFormActualizar(index)">
                                                    <v-icon>edit</v-icon>
                                                </v-btn>
                                                <!-- Botón para borrar -->
                                                <v-btn @click="borrarPaciente(index)" class="ma-2" text icon color="red lighten-1">
                                                    <v-icon>delete</v-icon>
                                                </v-btn>
                                            </span>
                                        </td>   
                                        <td style="color:red;font-weight: bold;" v-if="pedido.estado=='Sin stock'">
                                            {{ pedido.estado }}
                                        </td>
                                        <td style="color:yellow;font-weight: bold;" v-else-if="pedido.estado=='puede stock'">
                                            {{ pedido.estado }}
                                        </td>
                                        <td style="color:green;font-weight: bold;" v-else>
                                            {{ pedido.estado }}
                                        </td>
                     
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                    </v-row>

                        <!--   <table border="1px">
                                <thead>
                                    <tr>
                                        <th scope="col">id</th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Opciones</th>
                                        <th scope="col">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(pedido, index) in pedidos">
                                        <td>{{ pedido.id }}</td>
                                        <td>
                                            <span v-if="formActualizar && idActualizar == index">
                                                Formulario para actualizar
                                                <input v-model="productoActualizar" type="text" class="form-control">
                                            </span>
                                            <span v-else>
                                                Dato nombre
                                                {{ pedido.producto }}
                                            </span>
                                        </td>
                                        <td>
                                            <span v-if="formActualizar && idActualizar == index">
                                                Formulario para actualizar
                                                <input v-model="cantidadActualizar" type="text" class="form-control">
                                            </span>
                                            <span v-else>
                                                Dato edad
                                                {{ pedido.cantidad }}
                                            </span>
                                        </td>
                                        <td>
                                            Botón para guardar la información actualizada
                                            <span v-if="formActualizar && idActualizar == index">
                                                <button @click="guardarActualizacion(index)" class="btn btn-success" style="background-color:yellow;">Guardar</button>
                                            </span>
                                            <span v-else>
                                                Botón para mostrar el formulario de actualizar
                                                <button @click="verFormActualizar(index)" class="btn btn-warning" style="background-color:yellow;">Actualizar</button>
                                                Botón para borrar
                                                <button @click="borrarPaciente(index)" class="btn btn-danger" style="background-color:red;">Borrar</button>
                                            </span>
                                        </td>
                                        <td>
                                            {{ pedido.estado }}
                                        </td>
                                        <td v-if="variabledefinestock==2">
                                            <v-icon color="red">search</v-icon>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>-->
 </v-card>
 
</v-container>
   




                        
                    </v-col>

                    <v-col class="text-right" cols="12">
                        <div class="my-2">
                             <v-btn @click="guardapedidos()" color="success" >ENVIAR</v-btn>
                        </div>
                    </v-col>
                    
                </v-row>
                </v-card>
                </v-card>
       
    </v-container>
</template>

<script>
import axios from 'axios'
  export default 
  {
      data: vm => ({
    fechaingreso: new Date().toISOString().substr(0, 10),
    //dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,

        autoUpdate: true,
      productos: [],
      isUpdating: false,
      name: '',
      producto_material: [
        /*{ header: 'Group 1' },
        { name: 'Sandra Adams', group: 'ANALISTA DJ', avatar: srcs[1],'id':1 },
        { name: 'Ali Connors', group: 'ANALISTA DCF', avatar: srcs[2],'id':2 },
        { name: 'Trevor Hansen', group: 'ANALISTA DGE', avatar: srcs[3],'id':3 },
        { name: 'Tucker Smith', group: 'ANALISTA DAF', avatar: srcs[2],'id':4 },
        { divider: true },
        { header: 'Group 2' },
        { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4],'id':5 },
        { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5],'id':6 },
        { name: 'John Smith', group: 'Group 2', avatar: srcs[1],'id':7 },
        { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3],'id':8 },*/
      ],
      materiales:[],
      usuario_material:[],
      cargos:[],
      auxpedidos:{},
      t:[],
      title: 'The summer breeze',


    //data: () => ({  
        
        textprueba:'',
        dense: false,
        fixedHeader: false,
        desserts: [
        {
            name: 'Frozen Yogurt',
            calories: 159,
        },
        {
            name: 'Ice cream sandwich',
            calories: 237,
        },
        {
            name: 'Eclair',
            calories: 262,
        },
        {
            name: 'Cupcake',
            calories: 305,
        },
        
        ],
                   /* // Input nombre
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
                    pacientes: [],*/

                    //nombre producto
                    producto:'',
                    //cantidad
                    cantidad:'',
                     // Ver o no ver el formulario de actualizar
                    formActualizar: false,
                    // La posición de tu lista donde te gustaría actualizar 
                    idActualizar: -1,
                    // Input nombre dentro del formulario de actualizar
                    productoActualizar: '',
                    // Input edad dentro del formulario de actualizar
                    cantidadActualizar: '',
                    // Lista de pacientes
                    //Lista Pedidos
                    pedidos:[],


                    r:{},

                    texto_grupo:'',
                    texto_unidad:'',
                    texto_marca:'',
                    grupos:[],
                    unidades:[],
                    marcas:[],
                   // productos:[],
                    material:'',
                    variabledefinestock:'',
                    prueba:{},
                    nombrescompletosusers:'',
                    ciusers:'',
                    nombresusuarios:[],
                    cis:[], 
                    nombresusers:[],
                    filters: [
        /*{
          value: 0,
          fn: (item, queryText, itemText) => item.indexOf(queryText) > -1,
          text: 'Exact Match',
        },
        {
          value: 1,
          fn: (item, queryText, itemText) => queryText.length > 2 && item.toLowerCase().indexOf(queryText) > -1,
          text: 'Search Length > 2 & Loose Match',
        },*/
      ],
       // }),
    }),


  /*watch: {
    date (val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },*/


          computed: {
              /*computedDateFormatted () {
      return this.formatDate(this.date)
    },*/
     activeFilter () 
    {
      if (this.model == null) return undefined
      return this.filters[this.model].fn
    },
          },
        methods: 
        {
           /* formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    parseDate (date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },*/
            limpiar()
            {
                this.materiales=[];
                this.productos=[];
                this.grupos=[];
                this.Usuarios=[];
                this.cantidad='';
            },

                consulta123()
                {
                    console.log("mat--> ", this.materiales)
                    console.log("-->xx ", this.productos)
                    console.log("--> ", this.producto_material)
                },
                    guardapedidos: function()
                    {
                                this.auxpedidos={};
                                console.log("PED: ",this.pedidos);
                                
                                for(var k=0;k<this.pedidos.length;k++)
                                {
                                    this.r={
                                        'fid_producto':this.pedidos[k].id,
                                        'cantidad_solicitada':parseInt(this.pedidos[k].cantidad),
                                    }
                                    this.t.push(this.r);                                
                                }
                                 var fechita=this.fechaingreso.split('-');
                                var date=fechita[0]+"-"+fechita[1]+"-"+fechita[2];
                                console.log("fecha envia  ",date);
                                this.auxpedidos=
                                    {
                                        'fid_cargo':this.materiales,
                                        'fecha_solicitud':this.date,
                                        'pedidos':this.t,
                                    };
                                console.log("PEDidos: ",this.auxpedidos);
    
                                //INICIO GUARDAR PEDIDOS
                               let comp = this;
                                axios.post('/api/v1/producto/pedido', comp.auxpedidos ,{
                                headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' },
                                }).then(function (response) 
                                {
                                console.log("RESPUESTA GUARDAR PEDIDO SERVIDOR: ",response); 
                                comp.$toastr.success('PEDIDO GUARDADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                                comp.auxpedidos={};
                                comp.pedidos={};
                                comp.materiales=[];
                                comp.productos=[];
                                //location.reload();
                                comp.initialize();
                                
                                }).
                                catch(function (error) 
                                {
                                    console.log("error", error)
                                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                                });
                                //FIN GUARDAR PEDIDOS
                    },
                    crearPedido: function () 
                    {  
                        var cod='';
                        var prod=0;
                        var idd;                  
                        let pri = this;
                        var codigito='';
                        for(var i=0;i<this.producto_material.length;i++)
                        {
                            var primerValor=this.producto_material[i].id_producto;
                            var segundoValor=pri.productos;
                            if(parseInt(primerValor)==parseInt(segundoValor))
                            {
                                cod=pri.producto_material[i].id_producto;
                                prod=pri.producto_material[i].nombre;
                                idd=pri.producto_material[i].id_producto;
                                codigito=pri.producto_material[i].codigo;
                            }
                        }
                        //console.log("id ",idd);

                        axios.post(`/api/v1/producto/${idd}/verifica_stock`,{cantidad_solicitada:pri.cantidad},{
                        headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                        }).then(function (response) 
                        {
                           console.log("errrrr ",response.data);
                           pri.$toastr.info('MATERIAL AGREGADO CORRECTAMENTE', 'HECHO', {timeOut: 1500});
                           pri.variabledefinestock=response.data.datos.mensaje;
                           // Anyadimos a nuestra lista
                        pri.pedidos.push(
                            {
                                codigo:codigito,
                                id: cod,//pri.producto_material[4].codigo,//+ new Date(),
                                producto: prod, //pri.producto_material[4].id_producto,
                                cantidad: pri.cantidad,
                                estado:pri.variabledefinestock,
                            });
                        // Vaciamos el formulario de añadir
                        pri.producto = '';
                        pri.cantidad = '';
                        pri.variabledefinestock='';
                        pri.productos=[];

                        console.log("pedidos despues ",pri.pedidos);
                        
                        }).
                        catch(function (error) 
                        {
                            console.log("error", error)
                            pri.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                        });
                    },
                    verFormActualizar: function (pedido_id) 
                    {
                        /*// Antes de mostrar el formulario de actualizar, rellenamos sus campos
                        this.idActualizar = paciente_id;
                        this.nombreActualizar = this.pacientes[paciente_id].nombre;
                        this.edadActualizar = this.pacientes[paciente_id].edad;
                        // Mostramos el formulario
                        this.formActualizar = true;*/

                        // Antes de mostrar el formulario de actualizar, rellenamos sus campos
                        this.idActualizar = pedido_id;
                        this.productoActualizar = this.pedidos[pedido_id].producto;
                        this.cantidadActualizar = this.pedidos[pedido_id].cantidad;
                        // Mostramos el formulario
                        this.formActualizar = true;
                    },
                    borrarPaciente: function (pedido_id) {
                       /* // Borramos de la lista
                        this.pacientes.splice(paciente_id, 1);*/

                        // Borramos de la lista
                        this.pedidos.splice(pedido_id, 1);
                    },
                    guardarActualizacion: function (pedido_id) 
                    {
                       /*// Ocultamos nuestro formulario de actualizar
                        this.formActualizar = false;
                        // Actualizamos los datos
                        this.pacientes[paciente_id].nombre = this.nombreActualizar;
                        this.pacientes[paciente_id].edad = this.edadActualizar;*/

                        // Ocultamos nuestro formulario de actualizar
                        this.formActualizar = false;
                        // Actualizamos los datos
                        this.pedidos[pedido_id].producto = this.productoActualizar;
                        this.pedidos[pedido_id].cantidad = this.cantidadActualizar;
                    },
                    initialize () 
    {
                    console.log('funciona   ',this.texto_grupo);
                      let pri = this;
                      axios.get(pri.store+'/obtiene_grupos',{
                      }).then(function (response) 
                      {
                         console.log("errrrr ",response.data);
                         pri.grupos=response.data; 
                      }).
                      catch(function (error) 
                      {
                          console.log("error", error)
                      });

                 /*     axios.get(pri.store+'/obtiene_unidades',{
                      }).then(function (response) 
                      {
                         console.log("errrrr_22 ",response.data);
                         
                         pri.unidades=response.data; 
                      }).
                      catch(function (error) 
                      {
                          console.log("error", error)
                      });

                      axios.get(pri.store+'/obtiene_marcas',{
                      }).then(function (response) 
                      {
                         console.log("errrrr_22 ",response.data);
                         
                         pri.marcas=response.data; 
                      }).
                      catch(function (error) 
                      {
                          console.log("error", error)
                      });

                        axios.get(pri.store+'/obtiene_materiales_con_id',{
                        }).then(function (response) 
                        {                        
                            console.log("MATERIAL: ", response.data)
                            pri.productos = response.data;
                        }).
                            catch(function (error) {
                                console.log("error", error)
                        });*/

                                this.auxproductos = []

    },
    inicializausuarios()
    {   
           /* let comp = this;
            axios.get(comp.store+'/obtiene_nombre_usuarios',{
            }).then(function (response) 
            {                        
                console.log("NOMBRES COMPLETOS: ", response.data)
                comp.nombresusuarios = response.data;
            }).
                catch(function (error) {
                    console.log("error", error)
            });

            axios.get(comp.store+'/obtiene_ci_usuarios',{
            }).then(function (response) 
            {                        
                console.log("CIS: ", response.data)
                comp.cis = response.data;
            }).
                catch(function (error) {
                    console.log("error", error)
            });*/

            let comp = this;
                axios.get('/api/v1/cargo',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("RESPUESTA PRODUCTO SERVIDOR: ",response); 
                comp.usuario_material=response.data.datos.rows;
                //console.log("prod-->: ",response.data.datos.rows);
                //console.log("xxxx  ",comp.usuario_material);


                  /*  comp.usuario_material= [
                                { header: 'Group 1' },
                                { name: 'Sandra Adams', group: 'Group 1' },
                                { name: 'Ali Connors', group: 'Group 1' },
                                { name: 'Trevor Hansen', group: 'Group 1' },
                                { name: 'Tucker Smith', group: 'Group 1' },
                                { divider: true },
                                { header: 'Group 2' },
                                { name: 'Britta Holt', group: 'Group 2' },
                                { name: 'Jane Smith ', group: 'Group 2' },
                                { name: 'John Smith', group: 'Group 2' },
                                { name: 'Sandra Williams', group: 'Group 2' },
                            ];*/



              /*  comp.usuario_material[0]={
                                        'id_usuario': 6,
                                        'usuario': 'aquispe',
                                        'observaciones': null,
                                        'persona': {
                                        'documento_identidad': '4875444',
                                        'fecha_nacimiento': '1988-04-05T04:00:00.000Z',
                                        'nombres': 'Alex',
                                        'primer_apellido': 'Quispe',
                                        'segundo_apellido': 'Fuentes',
                                        'sexo': 'M'
                                        },
                                        'usuarios_roles': [
                                        {
                                            'id_usuario_rol': 6,
                                            'rol': {
                                            'id_rol': 1,
                                            'nombre': ''
                                            }
                                        }
                                        ]
                                    };
                                    comp.usuario_material[1]={
                                        'id_usuario': 63,
                                        'usuario': 'aqussispe',
                                        'observaciones': null,
                                        'persona': {
                                        'documento_identidad': '4875444',
                                        'fecha_nacimiento': '1988-04-05T04:00:00.000Z',
                                        'nombres': 'Alex',
                                        'primer_apellido': 'Quispe',
                                        'segundo_apellido': 'Fuentes',
                                        'sexo': 'M'
                                        },
                                        'usuarios_roles': [
                                        {
                                            'id_usuario_rol': 6,
                                            'rol': {
                                            'id_rol': 1,
                                            'nombre': ''
                                            }
                                        }
                                        ]
                                    };

                                      comp.usuario_material[2]={
                                        'id_usuario': 631,
                                        'usuario': 'aqussispeasf',
                                        'observaciones': null,
                                        'persona': {
                                        'documento_identidad': '4875444',
                                        'fecha_nacimiento': '1988-04-05T04:00:00.000Z',
                                        'nombres': 'Alex',
                                        'primer_apellido': 'Quispe',
                                        'segundo_apellido': 'Fuentes',
                                        'sexo': 'M'
                                        },
                                        'usuarios_roles': [
                                        {
                                            'id_usuario_rol': 6,
                                            'rol': {
                                            'id_rol': 1,
                                            'nombre': ''
                                            }
                                        }
                                        ]
                                    };*/


                         /*           var p={};
                    for(var i=0;i<response.data.datos.rows.length;i++)
                    {
                        var agarra=response.data.datos.rows[i];  
                        for(var j=0;j<agarra.usuarios_roles.length;j++)
                        {
                            var rol=agarra.usuarios_roles[j].id_usuario_rol;
                        }
                        console.log("-->  ",comp.cargos.length);
                        for(var k=0;k<comp.cargos.length;k++)
                        {
                            if(rol===comp.cargos[k].id_cargo)
                            {
                                var rola=comp.cargos[k].nombre;
                            }
                        }*/
                        /*p={'id_usuario':agarra.id_usuario,
                            'usuario':agarra.usuario,
                            'id_usuario':agarra.usuario.persona.id_usuario,
                            'nombres':agarra.usuario.persona.nombres,
                            'primer_apellido':agarra.persona.primer_apellido,
                            'id_cargo':agarra.id_cargo,
                            'id_usuario_rol':agarra.nombre,//se necesita este formato
                        };
                        comp.usuario_material.push(p);
                    }
                    console.log(" ",comp.usuario_material);*/

                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });   
    },
    obtener_grupos()
    {
            
                let comp = this;
                axios.get('/api/v1/grupo_contable',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("RESPUESTA GRUPO SERVIDOR: ",response); 
                //comp.auxproductos=response.data.datos.rows;
                console.log("TOTAL-->: ",response.data.datos.rows.length);
                    for(var i=0;i<response.data.datos.rows.length;i++)
                    {
                        //console.log("==>",comp.auxproductos[i]);
                        comp.grupos.push(response.data.datos.rows[i].nombre);
                    }
                }).
                
                catch(function (error) 
                {
                    console.log("error", error)
                });  
    },
    obtener_productos()
    {
        //console.log('GRUPO: ',this.texto_grupo);
        //console.log('UNIDAD: ',this.texto_unidad);
        //console.log('MARCA: ',this.texto_marca);
        /*let comp = this;
        axios.post(comp.store+'/producto',{
        grupoprod : comp.texto_grupo+'',
        unidadprod : comp.texto_unidad+'',
        marcaprod : comp.texto_marca+''
        }).then(function (response) 
        {
           console.log("PRODUCTOS ",response.data); 
           comp.productos=response.data;
        }).
        catch(function (error) 
        {
            console.log("error", error)
        });*/



                let comp = this;
                axios.get('/api/v1/producto',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("RESPUESTA PRODUCTO SERVIDOR: ",response); 
                comp.producto_material=response.data.datos.rows;
                console.log("prod-->: ",response.data.datos.rows);
                   /* for(var i=0;i<response.data.datos.rows.length;i++)
                    {
                        //console.log("==>",comp.auxproductos[i]);
                        comp.productos.push(response.data.datos.rows[i].nombre);
                    }*/
                }).
                
                catch(function (error) 
                {
                    console.log("error", error)
                });   





                      /*      this.auxproductos = [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ];
      console.log("XXX-->: ",this.auxproductos);*/
       
    },
        inicializacargos()
        {
                let comp = this;
                axios.get('/api/v1/cargo',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                comp.cargos=response.data.datos.rows;
                }).
                
                catch(function (error) 
                {
                    console.log("error", error)
                });   

        },

      },
          created: function() 
        {

               /*  let comp = this;
                axios.get('/api/v1/producto',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("PRUEBA OTRO SERVIDOR: ",response); 
                
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });
                
            this.initialize();*/
            this.inicializacargos();
            this.inicializausuarios();
            this.obtener_productos();
            this.obtener_grupos();
          let varia =this;    
          varia.$store.commit('SET_LAYOUT', 'panelprincipal-layout'); 
        }
  }
  
</script>
