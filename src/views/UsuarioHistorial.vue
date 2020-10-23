<template>
    <v-container fluid>
        <v-row>
            <v-col>
                <v-tabs
                    background-color="indigo ligth-1"
                    centered
                    dark
                    icons-and-text
                >
                    <v-tabs-slider color="yellow"></v-tabs-slider>
                        <v-tab href="#tab-1">
                            PENDIENTES
                            <v-icon>calendar_today</v-icon>
                        </v-tab>
  
                        <v-tab href="#tab-2">
                            APROBADAS
                            <v-icon>list_alt</v-icon>
                        </v-tab>

                        <v-tab-item
                            v-for="i in 2"
                            :key="i"
                            :value="'tab-' + i"
                        >
                            <div v-if="i==1">
                                <v-card>
                                    <v-card-title>
                                        <v-spacer></v-spacer>
                                        <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Buscar"
                                        single-line
                                        hide-details
                                        ></v-text-field>
                                    </v-card-title>
                                    <v-data-table
                                        :headers="headers"
                                        :items="datos_pendiente"
                                        :search="search"
                                        :expanded.sync="expanded2"
                                        show-expand
                                        single-expand
                                        :items-per-page="10"
                                        :footer-props="{  
                                            'items-per-page-text': 'Filas por pagina:',
                                            'items-per-page-all-text': 'Todos'}"                                 
                                    >
                                        <template v-slot:expanded-item="{ headers, item }">
                                            <td :colspan="5"  style="text-align: center; padding-left: 150px">
                                                <div>
                                                    <v-simple-table >
                                                        <thead style="background-color: lightyellow; color: #fff">
                                                            <tr>
                                                                <th class="text-left">Nro.</th>
                                                                <th class="text-left">Nombre</th>
                                                                <th class="text-left">Cantidad Solicitada</th>
                                                                <th class="text-left">Cantidad Aprobada</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(productos, index) in item.productos" :key="item.name">
                                                                <td>{{index + 1}}</td>
                                                                <td>{{productos.nombre}}</td>
                                                                <td>{{productos.cantidad_solicitada}}</td>
                                                                <td>{{productos.cantidad_aprobada}}</td>
                                                            </tr>
                                                        </tbody>
                                                    </v-simple-table>
                                                </div>
                                            </td>
                                        </template>
                                    
                                    </v-data-table>
                                </v-card>
                            </div>
                            <div v-if="i==2">
                                <v-card>
                                    <v-card-title>
                                        <v-spacer></v-spacer>
                                        <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Buscar"
                                        single-line
                                        hide-details
                                        ></v-text-field>
                                    </v-card-title>
                                    <v-data-table
                                        :headers="headersP"
                                        :items="datos_aprobados"
                                        :search="search"
                                        :expanded.sync="expanded"
                                        show-expand
                                        single-expand
                                        item-key="codigo_pedido"
                                        :items-per-page="10"
                                        :footer-props="{  
                                            'items-per-page-text': 'Filas por pagina:',
                                            'items-per-page-all-text': 'Todos'
                                        }"
                                    >
                                        <template v-slot:expanded-item="{ headersP, item }">
                                            <td :colspan="5"  style="text-align: center; padding-left: 150px">
                                                <div>
                                                    <v-simple-table >
                                                        <thead style="background-color: lightyellow; color: #fff">
                                                            <tr>
                                                                <th class="text-left">Nro.</th>
                                                                <th class="text-left">Nombre</th>
                                                                <th class="text-left">Cantidad Solicitada</th>
                                                                <th class="text-left">Cantidad Aprobada</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(productos, index) in item.productos" :key="item.name">
                                                                <td>{{index + 1}}</td>
                                                                <td>{{productos.nombre}}</td>
                                                                <td>{{productos.cantidad_solicitada}}</td>
                                                                <td>{{productos.cantidad_aprobada}}</td>
                                                            </tr>
                                                        </tbody>
                                                    </v-simple-table>
                                                </div>
                                            </td>
                                        </template>
                                    
                                    </v-data-table>
                                </v-card>
                            </div>
                        </v-tab-item>
                </v-tabs>
            </v-col>
        </v-row>
    </v-container>
</template>



 <script>
 import axios from 'axios';
 import moment from 'moment';

  export default {
    data: vm => ({
        search: '',
        headers: [
            { text: 'Codigo del Pedido', align: 'left', sortable: true, value: 'codigo_pedido' },
            { text: 'Estado', value: 'estado' },
            { text: 'Fecha solicitud', value: 'fecha_solicitud' },
            { text: 'Fecha aprobado', value: 'fecha_aprobacion' },
            { text: 'Cargo', value: 'cargo' },
        ],
        headersP: [
            { text: 'Codigo del Pedido', align: 'left', sortable: true, value: 'codigo_pedido' },
            { text: 'Estado', value: 'estado' },
            { text: 'Fecha solicitud', value: 'fecha_solicitud' },
            { text: 'Fecha aprobado', value: 'fecha_aprobacion' },
            { text: 'Cargo', value: 'cargo' },
        ],
        datos_pendiente: [],
        datos_aprobados: [],
        expanded: [],
        expanded2: [],

    }),
    methods: {

        inicializasolicitudes () {
            let comp = this;
            var token=sessionStorage.getItem('token');
            axios.get(this.store+'/api/v1/producto/pedido/usuario/pendiente',{
              headers: { Authorization: 'Bearer '+token }
            }).then(function (response) {

                comp.datos_pendiente = response.data.datos;
                    if(comp.datos_pendiente !== undefined) {
                        for(let t = 0;t < comp.datos_pendiente.length; t++) {
                            comp.datos_pendiente[t].fecha_aprobacion = moment(comp.datos_pendiente[t].fecha_aprobacion).format('DD')+"-"+moment(comp.datos_pendiente[t].fecha_aprobacion).format('MM')+"-"+moment(comp.datos_pendiente[t].fecha_aprobacion).format('YYYY');
                            comp.datos_pendiente[t].fecha_solicitud = moment(comp.datos_pendiente[t].fecha_solicitud).format('DD')+"-"+moment(comp.datos_pendiente[t].fecha_solicitud).format('MM')+"-"+moment(comp.datos_pendiente[t].fecha_solicitud).format('YYYY');
                        }
                    }
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                }); 
        },
        initializeaprobados () {
            var token=sessionStorage.getItem('token');
            let comp = this;
            axios.get(comp.store+'/api/v1/producto/pedido/usuario/aprobado',{
              headers: { Authorization: 'Bearer '+token }
            }).then(function (response) {
                comp.datos_aprobados = response.data.datos;
                if(comp.datos_aprobados !== undefined) {
                    for(var t = 0; t < comp.datos_aprobados.length; t++) {
                        comp.datos_aprobados[t].fecha_aprobacion = moment(comp.datos_aprobados[t].fecha_aprobacion).format('DD')+"-"+moment(comp.datos_aprobados[t].fecha_aprobacion).format('MM')+"-"+moment(comp.datos_aprobados[t].fecha_aprobacion).format('YYYY');
                        comp.datos_aprobados[t].fecha_solicitud = moment(comp.datos_aprobados[t].fecha_solicitud).format('DD')+"-"+moment(comp.datos_aprobados[t].fecha_solicitud).format('MM')+"-"+moment(comp.datos_aprobados[t].fecha_solicitud).format('YYYY');
                    }
                }
            }).
            catch(function (error) {
                console.log("error", error)
            });
        },
        format_date(value){
            if (value) {
                return moment(String(value)).format('DD-MM-YYYY')
            }
        },
    },
    created: function() {
        this.inicializasolicitudes();
        this.initializeaprobados();
        let varia =this;    
        varia.$store.commit('SET_LAYOUT', 'panelprincipal-layout'); 
    }
}
</script>