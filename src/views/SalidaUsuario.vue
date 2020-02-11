<template>
    <v-container fluid>
    <v-card
        class="ma-1 pa-3"
        outlined
        tile
    >

    <v-card
    :elevation="hover ? 24 : 6"
              class="ma-1 pa-3"
              outlined
              tile
            >
        <v-row align="center" justify="center"> 
            <v-col class="text-center" cols="12">
                <h1 style="color:#394BCD">SOLICITUD DE MATERIAL Y/O PRODUCTO </h1>
            </v-col>
        </v-row>



             <v-row align="center" justify="center">  
                <v-col class="text-left" cols="4">
                    <v-chip
                        class="ma-2"
                        color="indigo"
                        label
                        text-color="white"
                    >
                    <v-icon left>mdi-label</v-icon>
                        Bienvenido usuario...
                    </v-chip>
                </v-col>
                <v-col class="text-center" cols="6">
                   <h3 style="color:indigo;text-align: right;padding:0px;">  {{ nombre_usuario }}</h3>
                  <h5 style="color:indigo;text-align: right;padding:0px;">  {{ ci_usuario }}</h5>
                  <h6 style="color:indigo;text-align: right;padding:0px;">  {{ cargo_usuario }}</h6>
                </v-col>
        </v-row>  


        <v-row align="center" justify="center">
                    <v-col class="text-center" cols="10">
<v-container fluid>
    <v-card
              class="ma-0 pa-8"
              outlined
              :elevation="3"
            >        
        <v-row align="center" justify="left"> 
            <v-col class="text-left" cols="10">
                <h5 style="color:#394BCD">Seleccione su producto o material...</h5>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">

            <v-col class="text-center" cols="8">
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
                                min=0
                                type="number"
                                ></v-text-field>
                            </div>
                    </v-col>

                    <v-col cols="5" class="text-center">
                    <v-text-field
                                v-model="fechaingreso"
                                label="Fecha actual"
                                outlined
                                dense
                                disabled
                                ></v-text-field>
                 <!--   <h3>{{ dia_hoy+"/"+mes_hoy+"/"+año_hoy}}</h3>
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
            ></v-text-field>-->
             <!-- <v-text-field
                v-model="dateFormatted"
                label="Fecha"
                hint="DD/MM/YYYY formato"
                persistent-hint
                prepend-icon="event"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>-->
            <!--</template>
            <v-date-picker color="indigo" locale="es" v-model="fechaingreso" @input="menu1 = false"></v-date-picker>
          </v-menu>-->
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
        <v-row align="center" justify="left"> 
            <v-col class="text-left" cols="10">
                <h5 style="color:#394BCD">Lista de Productos/Materiales seleccionados</h5>
            </v-col>
        </v-row>


                <v-row align="start" justify="start">
                    <v-col class="text-left" cols="12" md="12">
                        <v-simple-table
                            :dense="dense"
                            :fixed-header="fixedHeader"
                            height="100%"
                            class="elevation-2"
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
                                                    min=0
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
                    
                    <v-col class="text-right" cols="12">
                        <div class="my-2">
                             <v-btn @click="guardapedidos()" color="success" >ENVIAR</v-btn>
                        </div>
                    </v-col>
                    </v-row>
 </v-card>
 


</v-container>
   




                        
                    </v-col>

                    
                    
                </v-row>
                </v-card>
                </v-card>
       
    </v-container>
</template>

<script>
var f=new Date();
var d_hoy=f.getDate();
var m_hoy=(f.getMonth() +1);
var a_hoy=f.getFullYear();   
import axios from 'axios'
  export default 
  {

      data: () =>  ({
          dia_hoy:d_hoy,
          mes_hoy:m_hoy,
          año_hoy:a_hoy,

        fechaingreso: new Date().toISOString().substr(0, 10),
        menu1: false,
        productos: [],
        isUpdating: false,
        name: '',
        producto_material: [],
        materiales:[],
        usuario_material:[],
        cargos:[],
        auxpedidos:{},
        t:[], 
        dense: false,
        fixedHeader: false,
        cargo_usuario:'',
        fid_cargo:'',

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
      ],
      nombre_usuario:'',
      ci_usuario:'',
      bandera:0,
    }),
          computed: {
     
     activeFilter () 
    {
      if (this.model == null) return undefined
      return this.filters[this.model].fn
    },
          },
        methods: 
        {
            limpiar()
            {
                this.materiales=[];
                this.productos=[];
                this.grupos=[];
                this.Usuarios=[];
                this.cantidad='';
                this.bandera=0;
            },

                consulta123()
                {
                    //console.log("mat--> ", this.materiales)
                    //console.log("-->xx ", this.productos)
                    //console.log("--> ", this.producto_material)
                    this.bandera=1;
                },
                    guardapedidos: function()
                    {
                        if(this.pedidos.length!=0)
                        {
                                this.auxpedidos={};
                                this.t=[];
                                //console.log("PED: ",this.pedidos);
                                
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
                                //console.log("fecha envia  ",date);
                                this.auxpedidos=
                                    {
                                        'fid_cargo':this.fid_cargo,
                                        'fecha_solicitud':date,
                                        'pedidos':this.t,
                                    };
                                //console.log("PEDidos: ",this.auxpedidos);
    
                                //INICIO GUARDAR PEDIDOS
                                var token=sessionStorage.getItem('token');
                               let comp = this;
                                axios.post('/api/v1/producto/pedido', comp.auxpedidos ,{
                                headers: { Authorization: 'Bearer '+token },
                                }).then(function (response) 
                                {
                                console.log("RESPUESTA GUARDAR PEDIDO SERVIDOR: ",response); 
                                comp.$toastr.success('PEDIDO GUARDADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                                comp.auxpedidos={};
                                comp.pedidos=[];
                                comp.limpiar();
                                comp.auxproductos = [];
                                //console.log("PEDidos: ",comp.auxpedidos);
                                }).
                                catch(function (error) 
                                {
                                    console.log("error", error)
                                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                                });
                        }
                        else
                        {
                            this.$toastr.info('POR FAVOR, ESCOJA PRODUCTOS O MATERIALES', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                        }
                                
                    },
                    crearPedido: function () 
                    {  

                        if((this.bandera==1)&&(this.cantidad!=''))
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
                        var token=sessionStorage.getItem('token');
                        axios.post(`/api/v1/producto/${idd}/verifica_stock`,{cantidad_solicitada:pri.cantidad},{
                        headers: { Authorization: 'Bearer '+token }
                        }).then(function (response) 
                        {
                           //console.log("errrrr ",response.data);
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

                        //console.log("pedidos despues ",pri.pedidos);
                        
                        }).
                        catch(function (error) 
                        {
                            console.log("error", error)
                            pri.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                        });

                      }
                      else
                      {
                          this.$toastr.error('POR FAVOR, RELLENE TODOS LOS CAMPOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                      }
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
            
                        // Ocultamos nuestro formulario de actualizar
                        this.formActualizar = false;
                        // Actualizamos los datos
                        this.pedidos[pedido_id].producto = this.productoActualizar;
                        this.pedidos[pedido_id].cantidad = this.cantidadActualizar;
                    },

    inicializausuarioactual()
    {   
        var token=sessionStorage.getItem('token');
                let comp = this;
                axios.get('/api/v1/usuario/'+sessionStorage.getItem('usuario'),{
                  headers: { Authorization: 'Bearer '+token }
                }).then(function (response) 
                {
                //console.log("RESPUESTA USUARIO SERVIDOR: ",response); 
                comp.nombre_usuario=response.data.datos.persona.nombres+" "+response.data.datos.persona.primer_apellido+" "+response.data.datos.persona.segundo_apellido;
                comp.ci_usuario=response.data.datos.persona.documento_identidad;
                //comp.usuario_material=response.data.datos.rows;
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });
    },

    obtener_productos()
    {
        var token=sessionStorage.getItem('token');
                let comp = this;
                axios.get('/api/v1/producto',{
                  headers: { Authorization: 'Bearer '+token }
                }).then(function (response) 
                {
                //console.log("RESPUESTA PRODUCTO SERVIDOR: ",response); 
                comp.producto_material=response.data.datos.rows;
                //console.log("prod-->: ",response.data.datos.rows);
                }).
                
                catch(function (error) 
                {
                    console.log("error", error)
                });   
       
    },
        inicializacargousuario()
        {
            var token=sessionStorage.getItem('token');
                var nrocargousuario=parseInt(sessionStorage.getItem('usuario')); 
                let comp = this;
                axios.get('/api/v1/cargo',{
                  headers: { Authorization: 'Bearer '+token }
                }).then(function (response) 
                {
                    comp.cargos=response.data.datos.rows;
                    //console.log("RESPUESTA USUARIO SERVIDOR: ",response); 
                    for(var i=0;i<comp.cargos.length;i++)
                    {
                        
                        //console.log(""+comp.cargos[i].usuario.id_usuario+" == "+nrocargousuario);
                        if(comp.cargos[i].usuario.id_usuario===nrocargousuario)
                        {
                            
                            comp.cargo_usuario=comp.cargos[i].nombre;
                            comp.fid_cargo=comp.cargos[i].id_cargo;
                            //console.log("nombre " , comp.cargo_usuario);
                        }
                    }
                }).
                
                catch(function (error) 
                {
                    console.log("error", error)
                });  
        },

      },
          created: function() 
        {
            this.inicializacargousuario();
            this.inicializausuarioactual();
            this.obtener_productos();
            let varia =this;    
            varia.$store.commit('SET_LAYOUT', 'panelprincipal-layout'); 
        }
  }
</script>
