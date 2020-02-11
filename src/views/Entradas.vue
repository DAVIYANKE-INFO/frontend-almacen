<template>
<v-container fluid>

 <v-card
        class="ma-1 pa-3"
        outlined
        tile
    >
<!--***********************************ESTE ES EL INICIO DE FORM FACTURA******************************************-->
    <v-card
    :elevation="hover ? 24 : 6"
              class="ma-3 pa-3"
              outlined
              tile
            >
           
    
  <v-row align="center" justify="center">
    <v-col class="text-center" cols="10">
      
      <v-form
        ref="form"
        v-model="valid"
      >
      <v-row align="center" justify="center"> 
              <v-col class="text-center" cols="9">
                  <h1 style="color:#394BCD">INGRESO DE ALMACENES</h1>
              </v-col>
              <v-col class="text-center" cols="3">
                  <v-text-field 
                  align="center"
                  type="number" 
                  v-model="comprobante" 
                  label="Nro. de Comprobante"
                  min="0" 
                  :rules="comprobanteRules"
                  outlined 
                  dense 
                  required>
                  </v-text-field>
                  <!--<h6>Nro. comprobante</h6>-->
              </v-col>
            </v-row>
       <v-row align="center" justify="center">  
      <v-col cols="4">
        <h3 id="colortexto">NRO. DE FACTURA : </h3>
      </v-col>
      <v-col cols="6">
        <v-text-field
          color="indigo"
          v-model="factura"
          :counter="50"
          :rules="facturaRules"
          label="Nro de Factura"
          required
        ></v-text-field>
      </v-col>
      </v-row>
      <v-row align="center" justify="center">
      <v-col cols="4">
        <h3 id="colortexto">NRO. DE NOTA DE REMISIÓN : </h3>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="remision"
          :rules="remisionRules"
          label="Nro. de Remisión"
          required
        ></v-text-field>
      </v-col>
      </v-row>

      <v-row align="center" justify="center">
      <v-col cols="4">
        <h3 id="colortexto">PROVEEDOR : </h3>
      </v-col>
      <v-col cols="6">
     <!-- <v-select multiple
        v-for="group in items"
        :value.sync="selected"
        :options="[{label: group.group_name, value: group.id}]">
      </v-select>
        <v-select
          v-model="select"
          :items="items[0].val"
          :rules="[v => !!v || 'Este elemento es requerido']"
          label="Proveedor"
          required
        ></v-select>-->
        <v-autocomplete
                v-model="friends"
                :items="proveedores"
                color="blue-grey lighten-2"
                label="Proveedor"
                :rules="[v => !!v || 'El campo Proveedor es requerido']"
                item-value="id_proveedor"
                item-text="nombre"
                required
              >
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content v-text="data.item"></v-list-item-content>
                  </template>
                  <template v-else>
                
                    <v-list-item-content>
                      <v-list-item-title v-html="data.item.nombre"></v-list-item-title>
                      <v-list-item-subtitle v-html="data.item.telefono"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
      </v-col>
      </v-row>





       <v-row align="center" justify="left">
      <v-col class="text-center" cols="6">
        <v-menu
        color="indigo"
          v-model="menu1"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="fechaingreso"
              :rules="[v => !!v || 'La fecha de Ingreso es requerida']"
              color="indigo"
              label="Fecha ingreso almacenes"
              prepend-icon="event"
              readonly
              v-on="on"
              required
            ></v-text-field>
          </template>
          <v-date-picker color="indigo" locale="es" v-model="fechaingreso" @input="menu1 = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-col class="text-center" cols="6">
        <v-menu
        color="indigo"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="fechacompra"
              color="indigo"
              label="Fecha de Compra"
              :rules="[v => !!v || 'La fecha de Compra es requerida']"
              prepend-icon="event"
              readonly
              v-on="on"
              required
            ></v-text-field>
          </template>
          <v-date-picker color="indigo" locale="es" v-model="fechacompra" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>

        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'Debes Aceptar y Continuar!']"
          label="¿Estas de Acuerdo?"
          required
        ></v-checkbox>

        <v-row justify="space-around">
        <v-switch v-model="valid" class="ma-4" label="Válido" readonly></v-switch>
      </v-row>

        <!--<v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Enviar
        </v-btn>-->
<v-row align="center" justify="end">            
                    <v-col class="text-center" cols="2">
                        <div class="my-0">
        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Limpiar
        </v-btn>
</div>
                    </v-col>
        </v-row>

        <!--<v-btn
          color="warning"
          @click="resetValidation"
        >
          Restablecer Validación
        </v-btn>-->
      </v-form>
          
      </v-col>
  </v-row>
  </v-card>
  <!--***********************************ESTE ES EL FIN DE FORM FACTURA******************************************-->



<!--***********************************ESTE ES EL INICIO DE AGREGA PRODUCTOS******************************************-->
     <v-card
      :elevation="hover ? 24 : 6"
              class="ma-3 pa-3"
              outlined
              tile
            > 
        <v-row align="center" justify="center"> 
            <v-col class="text-center" cols="12">
                <h2 style="color:#394BCD">INGRESO DE MATERIALES / PRODUCTOS</h2>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">  
               <v-col class="text-center" cols="11">
                        <div class="my-2">

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

                            </div>
                    </v-col>
                   <!-- <v-col class="text-center" cols="3">
                        <div class="my-2">
                            <v-text-field
                                v-model="codigito"
                                label="Introduzca su codigo"
                                outlined
                                dense
                                ></v-text-field>
                            </div>
                    </v-col>-->
               
                    
                    <v-col class="text-center" cols="2">
                        <div class="my-2">
                            <v-text-field
                                v-model="cantidad"
                                label="Cantidad"
                                outlined
                                min="0"
                                dense
                                type="number"
                                ></v-text-field>
                            </div>
                    </v-col>
                    <v-col class="text-center" cols="2">
                       <div class="my-2">
                              <v-text-field
                                  v-model="costo_unitario"
                                  disabled="true"
                                  label="Precio unitario"
                                  outlined
                                  dense
                                  ></v-text-field>
                            </div>
                       
                    </v-col>
                     <v-col class="text-center" cols="3">
                          <div class="my-2">
                            <v-text-field
                                v-model="total"
                                label="Total compra"
                                outlined
                                min="0"
                                dense
                                type="number"
                                ></v-text-field>
                            </div>
                    </v-col>
</v-row>
        <v-row align="center" justify="end">            
                    <v-col class="text-center" cols="2">
                        <div class="my-0">
                            <v-btn medium color="error" @click="limpiar()">LIMPIAR</v-btn>
                        </div>
                    </v-col>
                    <v-col class="text-center" cols="2">
                        <div class="my-0">
                            <v-btn medium color="indigo darken-2" dark @click="crearPedido()">AÑADIR</v-btn>
                        </div>
                    </v-col>
        </v-row>

        <v-divider></v-divider>


                <v-row align="center" justify="center">
                    <v-col class="text-center" cols="12">
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
                                        <th scope="col">Id</th>
                                        <th scope="col">Codigo</th>
                                        <th scope="col">Producto</th>  
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Precio Unitario</th> 
                                        <th scope="col">Precio Total</th>   
                                        <th scope="col">Stock en Almacen</th>  
                                        <th scope="col">Stock Actual</th>                                    
                                        <th scope="col">Opciones</th>
                                       

                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(pedido, index) in pedidos">
                                <td>{{ pedido.id }}</td>
                                <td>{{ pedido.codigo }}</td>
                                        <td>
                                            <span v-if="formActualizar && idActualizar == index">
                                                <!-- Formulario para actualizar -->
                                            
                                                {{ pedido.nombre }}
                                            </span>
                                            <span v-else>
                                                <!-- Dato nombre -->
                                                {{ pedido.nombre }}
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
                                                {{ pedido.costo_unitario }}    
                                        </td>
                                        <td>


                                        <span v-if="formActualizar && idActualizar == index">
                                                <!-- Formulario para actualizar -->
                                                <v-text-field
                                                v-model="precioActualizar"
                                                class="form-control"
                                                type="number"
                                                    solo
                                                    ></v-text-field>
                                        
                                            </span>
                                            <span v-else>
                                                <!-- Dato nombre -->
                                                {{pedido.costo_total}}
                                            </span>
                                                
                                        </td>
                                        <td style="color:red;font-weight: bold;" v-if="pedido.stock===0">
                                                {{ pedido.stock }}
                                        </td>
                                        <td style="color:green;font-weight: bold;" v-else>
                                                {{ pedido.stock }}
                                        </td>
                                 
                                        <td style="color:blue;font-weight: bold;" >
                                              {{ pedido.stock }} + {{ pedido.cantidad }} = {{ pedido.suma }}
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
                                                <v-btn class="ma-1" text icon color="green lighten-1"  @click="verFormActualizar(index)">
                                                    <v-icon>edit</v-icon>
                                                </v-btn>
                                                <!-- Botón para borrar -->
                                                <v-btn @click="borrarPaciente(index)" class="ma-1" text icon color="red lighten-1">
                                                    <v-icon>delete</v-icon>
                                                </v-btn>
                                                <v-btn x-small color="indigo ligth-1" dark @click="enviadatosdeentradas(index)">Guardar</v-btn>
                                            </span>
                                        </td>   
                                    
                     
                                </tr>
                            </tbody>
                            </template>
                        </v-simple-table>
                    </v-col>
                    </v-row>       
 </v-card>
</v-container>         
                    </v-col>

                    
                </v-row>
                </v-card>
                
<!--***********************************ESTE ES EL FIN DE PRODUCTOS******************************************-->


  </v-card>
  
  
                <!--***********************************ESTE ES EL FIN DE PRODUCTOS******************************************-->
</v-container>
</template>

<script>
import axios from 'axios'
  export default {

    
    data: () => ({  

      //nombre producto
      producto:'',
      //cantidad
        // Ver o no ver el formulario de actualizar
      //formActualizar: false,
      // La posición de tu lista donde te gustaría actualizar 
      idActualizar: -1,
      // Input nombre dentro del formulario de actualizar
      predioActualizar: '',
      // Input edad dentro del formulario de actualizar
      cantidadActualizar: '',
      // Lista de pacientes

/**************************************INICIO PARA MATERIALES/PRODUCTOS***************************************/
      productito:'CUADERNOS ENGRAPADOS',
      //codigito:'AFCOOP-009',
      
    //  unidades:[],
     // unidad:[],
      costo_unitario:'0',
      //total:'',
      cantidad:'',
      pedidos:[],
      total:'',
      //cantidadActualizar: '',
      formActualizar:false,
        productos: [],
        bandera:0,
      producto_material: [],
/**************************************FIN PARA MATERIALES/PRODUCTOS***************************************/


      fechaingreso: new Date().toISOString().substr(0, 10),
    menu1: false,
      fechacompra: new Date().toISOString().substr(0, 10),
    menu2: false,
         comprobante:null,
      comprobanteRules: [
        v => !!v || 'El Nro de Comprobante es requerido',
      ],
      proveedores:[],
      friends: [],
      valid: true,
      factura: '',
      facturaRules: [
        v => !!v || 'El nombre es requerido',
        v => (v && v.length <= 50) || 'El nombre debe tener menos de 50 caracteres.',
      ],
      remision: '',
      remisionRules: [
        v => !!v || 'El Nro de Nota de Remisión es requerido',
        v => (v && v.length <= 50) || 'La Nota de Remisión debe tener menos de 50 caracteres.',
      ],
      select: [],
      items: [
        {'val':'6'},
        {'val':'7'},
        {'val':'8'},
        {'val':'9'},  
      ],
      checkbox: false,
    }),
    methods: {
      limpiar()
            {
                this.productos=[];
                this.cantidad='';
                this.total='';
                this.bandera=0;
            },
             verFormActualizar: function (pedido_id) 
                    {
                        // Antes de mostrar el formulario de actualizar, rellenamos sus campos
                        this.idActualizar = pedido_id;
                        this.precioActualizar = this.pedidos[pedido_id].costo_total;
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
                        
                        this.pedidos[pedido_id].cantidad = this.cantidadActualizar;
                        this.pedidos[pedido_id].costo_unitario = (parseInt(this.precioActualizar)/parseFloat(this.cantidadActualizar)).toFixed(2);
                        this.pedidos[pedido_id].costo_total=this.precioActualizar;
                        this.pedidos[pedido_id].suma=(parseInt(this.cantidadActualizar)+parseInt(this.pedidos[pedido_id].stock));

                        this.costo_unitario=this.pedidos[pedido_id].costo_unitario;
                        this.cantidad=this.pedidos[pedido_id].cantidad;
                        this.total=this.pedidos[pedido_id].costo_total;
                    },
            
       crearPedido: function () 
                    {  
                      if((this.bandera==1)&&(this.cantidad!='')&&(this.total)!='')
                      {
                      this.$toastr.info('MATERIAL AGREGADO CORRECTAMENTE', 'HECHO', {timeOut: 1500});
                        var cod='';
                        var prod=0;
                        var idd;       
                        var stocksito=0;  
                       // var suma=0;         
                        let pri = this;
                        var codigito;
                        for(var i=0;i<this.producto_material.length;i++)
                        {
                            var primerValor=this.producto_material[i].id_producto;
                            var segundoValor=pri.productos;
                            if(parseInt(primerValor)==parseInt(segundoValor))
                            {
                                cod=pri.producto_material[i].codigo;
                                prod=pri.producto_material[i].nombre;
                                idd=pri.producto_material[i].id_producto;
                                codigito=pri.producto_material[i].codigo;
                                stocksito=pri.producto_material[i].stock;
                            }
                        }
                        var preciounito=(parseInt(pri.total)/parseFloat(pri.cantidad)).toFixed(2);
                        console.log("precio unito--> ",preciounito);
                        pri.costo_unitario=preciounito;
                        pri.pedidos.push(
                            {
                                id:idd,
                                codigo:cod,
                                nombre:prod,
                                //unidad:'PIEZA', 
                                costo_unitario:preciounito,
                                cantidad: pri.cantidad,
                                costo_total:pri.total,
                                stock:stocksito,
                                suma:(parseInt(stocksito)+parseInt(pri.cantidad)),
                            });
                            
                        // Vaciamos el formulario de añadir
                       /* pri.precio_unitario = '';
                        pri.cantidad = '';
                        pri.costo_total='';*/
                        console.log("pedidos despues ",pri.pedidos);
                        this.limpiar();
                           }
                      else
                      {
                        this.$toastr.error('POR FAVOR, RELLENE TODOS LOS CAMPOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                      }
                    },
      enviadatosdeentradas(indexa)
      {
        console.log("factura ", this.factura);
        console.log("remision ", this.remision);
        console.log("proveedor  ", this.friends);
        console.log("fecha 1  ", this.fechaingreso);
        console.log("fecha 2  ", this.fechacompra);
        console.log("producto  ", this.productos);
        console.log("cantidad  ", this.cantidad);
        console.log("Costo total  ", this.total);
        console.log("pedidos ",this.pedidos[indexa]);
        console.log("FILA ",indexa);
        var ingreso_compra={
          'cantidad':this.pedidos[indexa].cantidad,
          'comprobante':this.comprobante,
          'monto':this.pedidos[indexa].costo_total,
          'fid_producto':this.pedidos[indexa].id,
          'factura':this.factura,
          'nota_remision':this.remision,
          'fecha_compra':this.fechacompra,
          'fecha_ingreso':this.fechaingreso,
          'fid_proveedor':this.friends,

        };

                let comp = this;
                axios.post('/api/v1/producto/ingreso',ingreso_compra,{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("PRUEBA OTRO SERVIDOR GUARDA ENTRADAS: ",response); 
                comp.$toastr.success('INGRESO GUARDADO EXITOSAMENTE', 'HECHO', {timeOut: 2000});
                comp.pedidos.splice(indexa, 1);
                //comp.proveedores=response.data.datos.rows;
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                    comp.$toastr.error('POR FAVOR, REVISE SUS DATOS', 'ERROR', {positionClass:"toast-bottom-center",timeOut: 2000});
                });   


      },
      validate () 
      {
        /*if((this.$refs.form.validate())&&(false)) 
        {
          this.snackbar = true
        }*/
      },
      reset () 
      {
        console.log("fecha 1  ", this.fechaingreso);
        console.log("fecha 2  ", this.fechacompra);
        this.$refs.form.reset()  
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      consulta123()
                {
                console.log("-->PRODUCTOS ", this.productos)
                console.log("-->PRODUCTOS_MATERIAL ", this.producto_material)
                console.log("prod--> ",this.producto_material.indexOf(this.productos));
                this.bandera=1;
                },
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
    /*  iniciaunidades()
      {
        let comp = this;
                axios.get('/api/v1/unidad',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("RESPUESTA PRODUCTO SERVIDOR: ",response); 
                comp.unidad=response.data.datos.rows;
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });
      },*/
  obtener_productos()
    {
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
       
    },
    },

     created: function() 
        {
          this.obtener_productos();
          //this.iniciaunidades();
          this.initialize();
          let varia =this;    
          varia.$store.commit('SET_LAYOUT', 'panelprincipal-layout'); 
        }
  }
</script>

<style>
  #colortexto{
    color:#394BCD;
  }



</style>