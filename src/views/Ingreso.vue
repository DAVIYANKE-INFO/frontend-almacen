<template>
<center>
<v-form>
<v-container fluid>
<center>
<!--*******************************INICIO BUSCADOR***************************************-->
  <v-toolbar flat color="white" class="elevation-1">
      <v-toolbar-title style="font-size:25px;font-weight:bold;color:#394BCD;">INGRESOS</v-toolbar-title>
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
      :items="ingresos"
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

  data: vm => ({
    dialog: false,
    search:'',
      keeps:[{"ci":"7066868","paterno":"ALEGRIA","materno":"QUISPE"}],
      headers: [
        { text: 'NRO. INGRESO', value: 'id_ingreso'},
        { text: 'PRODUCTO', value: 'producto.nombre' },
              { text: 'FECHA INGRESO', value: 'fecha_ingreso' },
        { text: 'FECHA COMPRA', value: 'fecha_compra' },
        { text: 'MONTO', value: 'monto' },
        { text: 'CANTIDAD', value: 'cantidad' },
        { text: 'PRECIO UNITARIO', value: 'precio_unitario' },
        { text: 'NOTA DE REMISIÓN', value: 'nota_remision' },
        { text: 'COMPROBANTE', value: 'comprobante' },
        { text: 'UNIDAD', value: 'producto.unidad.nombre' },
      ],
      ingresos: [],
      ingresosaux: [],

    }),

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
                axios.get(comp.store+'/api/v1/producto/ingreso',{
                  headers: { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZF91c3VhcmlvIjozLCJ1c3VhcmlvIjoiY21hY3VjaGFwaSIsImlkX3JvbCI6MSwiaWRfcGVyc29uYSI6MywidmVuY2ltaWVudG8iOiIyMDE5LTExLTA2VDE1OjIxOjAxLjQ0NFoifQ.0ivBxGxRrCjfzF117Iby8ho6B0ZW3Eb31480tEY1WD4' }
                }).then(function (response) 
                {
                console.log("PRUEBA INGRESO OTRO SERVIDOR: ",response); 
                comp.ingresos=response.data.datos.rows;
                comp.ingresosaux=response.data.datos.rows;
                
                  for(var t=0;t<comp.ingresosaux.length;t++)
                      {
                         
                          comp.ingresos[t].fecha_ingreso=moment(comp.ingresosaux[t].fecha_ingreso).format('DD')+"-"+moment(comp.ingresosaux[t].fecha_ingreso).format('MM')+"-"+moment(comp.ingresosaux[t].fecha_ingreso).format('YYYY');//+ " | " + moment(comp.dessertsaux[t].fecha_solicitud).format('h:mm:ss');
                          comp.ingresos[t].fecha_compra=moment(comp.ingresosaux[t].fecha_compra).format('DD')+"-"+moment(comp.ingresosaux[t].fecha_compra).format('MM')+"-"+moment(comp.ingresosaux[t].fecha_compra).format('YYYY');
                      }
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });   
      },
    }
    }
</script>

<style>

</style>