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
        APROBADOS
        <v-icon>calendar_today</v-icon>
      </v-tab>
  
      <v-tab href="#tab-2">
        EN VEREMOS
        <v-icon>list_alt</v-icon>
      </v-tab>
      <v-tab-item
        v-for="i in 2"
        :key="i"
        :value="'tab-' + i"
      >

        <div v-if="i==1">
            <v-row>
                <v-col cols="12">
                           <v-container fluid>
                                <v-data-table
                            :headers="headers"
                            :items="desserts"
                            sort-by="calories"
                            class="elevation-1"
                            dense
                            >
                            <template v-slot:top>
                                <v-toolbar flat color="white">
                                <v-toolbar-title>SOLICITUDES</v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                                
                                </v-toolbar>
                            </template>

                            <template v-slot:item.action="{ item }">

                            <v-row justify="center">
                            <v-col cols="10">
                            
                            <v-expansion-panels>
                            <v-expansion-panel
                                :key="1"
                                width="50%"
                            >
                                <v-expansion-panel-header>Pedidos</v-expansion-panel-header>
                                <v-expansion-panel-content>
                            
                                        <v-row>
                                            <v-col cols="12">
                                                <v-simple-table dense>
                                                <template v-slot:default>
                                                    <thead>
                                                    <tr>
                                                        <th class="text-left">Nombre</th>
                                                        <th class="text-left">Cantidad</th>
                                                        <th class="text-left">Estado</th>                                
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr v-for="(productitos, index) in item.productos" :key="item.name">
                                                    <td>
                                                        
                                                            {{ productitos.nombreproducto }}
                                                        
                                                    </td>

                                                    <td>
                                                        <span v-if="formActualizar && idActualizar == index">
                                                            <!-- Formulario para actualizar -->
                                                            <input v-model="edadActualizar" type="text" class="form-control">
                                                        </span>
                                                        <span v-else style="background-color:red;">
                                                            <!-- Dato nombre -->
                                                            {{ productitos.cantidad }}
                                                        </span>
                                                    </td>
                                                    <td>{{ productitos.estadito }}</td>

                                                    <td>
                                                        <!-- Botón para guardar la información actualizada -->
                                                        <span v-if="formActualizar && idActualizar == index">
                                                            <button @click="guardarActualizacion(index, item)" class="btn btn-success">Guardar</button>
                                                        </span>
                                                        <span v-else>
                                                            <!-- Botón para mostrar el formulario de actualizar -->
                                                            <button @click="verFormActualizar(index, item)" depressed small color="error">Actualizar</button>
                                                            <!-- Botón para borrar -->    
                                                            <button @click="borrarPaciente(index, item)" >Borrar</button>
                                                        </span>
                                                    </td>
                                                    
                        
                                                        <!--<td>{{ productitos.nombreproducto }}</td>
                                                        <td>{{ productitos.cantidad }}</td>-->
                                                    
                                                    </tr>
                                                    </tbody>
                                                </template>
                                                </v-simple-table> 
                                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                                <v-spacer></v-spacer>
                                                <v-btn class="text-center" color="blue darken-1" text @click="solicitud(item)">generar solicitud</v-btn>                 </v-row>     
                                        </v-expansion-panel-content>
                            </v-expansion-panel>
                            </v-expansion-panels>
                            </v-col>
                            </v-row> 
                            </template>
                            </v-data-table>
                            </v-container>        
                </v-col> 
            </v-row>
        </div>      

        <div v-if="i==2">
            <v-row>
                <v-col cols="12">
                                
                </v-col> 
            </v-row>
        </div>
      </v-tab-item>
    </v-tabs>
    </v-col>
    </v-row>    
</v-container>
</template>
<script>
import axios from 'axios'
export default 
{
    data: vm => ({
        dialog: false,
    

            // Input nombre
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
            pacientes: [],



    headers: [
      {
        text: 'Nro.',
        align: 'left',
        sortable: false,
        value: 'id_solicitud',
      },
      { text: 'NOMBRE', value: 'nombreusuario' },
      { text: 'FECHA', value: 'fecha' },
      { text: 'ESTADO', value: 'estado' },
     // { text: 'Protein (g)', value: 'protein' },
     // { text: 'Properties' , value: 'objetos' },
      { text: 'Acciones', value: 'action', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    veraItem: [{
      id_producto: '',
      nombreproducto: '',
      cantidad: '',
      estadito:'',
    }],
    editedItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: '',
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },

      
    }),
    computed: {
        formTitle () {
        return this.editedIndex === -1 ? 'MATERIALES/PRODUCTOS' : 'Edit Item'
        },
    },

    watch: {
        dialog (val) {
        val || this.close()
        },
    },
    methods: {








    verFormActualizar: function (paciente_id,fila) 
    {
      console.log("FILA",this.desserts.indexOf(fila));
      console.log("ID_PROD",paciente_id);
                // Antes de mostrar el formulario de actualizar, rellenamos sus campos
                this.idActualizar = paciente_id;
                this.nombreActualizar = this.desserts[this.desserts.indexOf(fila)].productos[paciente_id].nombreproducto;
                this.edadActualizar = this.desserts[this.desserts.indexOf(fila)].productos[paciente_id].cantidad;
                // Mostramos el formulario
                this.formActualizar = true;
            },
            borrarPaciente: function (paciente_id,fila) {
                // Borramos de la lista
                this.desserts[this.desserts.indexOf(fila)].productos.splice(paciente_id, 1);
            },
            guardarActualizacion: function (paciente_id,fila) {
                // Ocultamos nuestro formulario de actualizar
                this.formActualizar = false;
                // Actualizamos los datos
                this.desserts[this.desserts.indexOf(fila)].productos[paciente_id].nombreproducto = this.nombreActualizar;
                this.desserts[this.desserts.indexOf(fila)].productos[paciente_id].cantidad = this.edadActualizar;
                console.log("hab--> ",this.desserts[paciente_id].productos);
            },













      inicializasolicitudes ()
      {
                let comp = this;
                axios.get(comp.store+'/obtienesolicitudes',
                {}).then(function (response) 
                {
                console.log("SOLICITUDES ",response.data); 
                comp.desserts=response.data;
                }).
                catch(function (error) 
                {
                    console.log("error", error)
                });
/*comp.desserts=[
  {
    "id_solicitud": "1",
    "nombreusuario": "MARIA DEL PILAR CERVANTES DONOSO",
    "fecha": "2019-12-08",
    "estado": "solicitado",
    "cargo": "RESPONSABLE DE PLANIFICACIÓN",
    "productos": [
      {
        "id_producto": "AFCOOP-A-001",
        "nombreproducto": "ARCHIVADOR DE PALANCA DE LOMO ANCHO",
        "cantidad": 2,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-B-001",
        "nombreproducto": "BANDERITAS GRUESAS",
        "cantidad": 3,
        "estadito": "si"
      }
    ]
  },
  {
    "id_solicitud": "2",
    "nombreusuario": "PAOLA XIMENA CARDENAS MENDOZA",
    "fecha": "2019-12-08",
    "estado": "solicitado",
    "cargo": "ANALISTA DE FISCALIZACIÓN Y MONITOREO",
    "productos": [
      {
        "id_producto": "AFCOOP-A-001",
        "nombreproducto": "ARCHIVADOR DE PALANCA DE LOMO ANCHO",
        "cantidad": 2,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-B-001",
        "nombreproducto": "BANDERITAS GRUESAS",
        "cantidad": 3,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-B-006",
        "nombreproducto": "BINDER CLIP N° 19 MM ",
        "cantidad": 6,
        "estadito": "si"
      }
    ]
  },
  {
    "id_solicitud": "3",
    "nombreusuario": "DAVID ALEGRIA QUISPE",
    "fecha": "2019-12-08",
    "estado": "solicitado",
    "cargo": "ANALISTA DE SISTEMAS",
    "productos": [
      {
        "id_producto": "AFCOOP-C-002",
        "nombreproducto": "CORRECTOR EN CINTA",
        "cantidad": 4,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-F-001",
        "nombreproducto": "FASTENER",
        "cantidad": 5,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-G-004",
        "nombreproducto": "GRAPAS 24\/6",
        "cantidad": 9,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-H-013",
        "nombreproducto": "CARTULINA HILADA T\/CARTA",
        "cantidad": 2,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-H-017",
        "nombreproducto": "PAPEL RECICLADO TAMAÑO OFICIO",
        "cantidad": 3,
        "estadito": "si"
      }
    ]
  },
  {
    "id_solicitud": "4",
    "nombreusuario": "WINSTON QUISPE YUJRA",
    "fecha": "2019-12-08",
    "estado": "solicitado",
    "cargo": "ANALISTA UTI SISTEMAS",
    "productos": [
      {
        "id_producto": "AFCOOP-A-001",
        "nombreproducto": "ARCHIVADOR DE PALANCA DE LOMO ANCHO",
        "cantidad": 1,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-A-008",
        "nombreproducto": "ARCHIVADOR DE PALANCA MEDIO LOMO AZUL",
        "cantidad": 2,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-B-005",
        "nombreproducto": "BOLIGRAFO COLOR ROJO",
        "cantidad": 3,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-C-008",
        "nombreproducto": "CUADERNO CUADRICULADO T\/CARTA ESPIRAL",
        "cantidad": 4,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-E-002",
        "nombreproducto": "ESTILETES DE VARIOS COLORES",
        "cantidad": 5,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-F-002",
        "nombreproducto": "FOLDER AMARILLO T\/CARTA",
        "cantidad": 6,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-F-009",
        "nombreproducto": "FILES",
        "cantidad": 7,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-G-005",
        "nombreproducto": "GRIMPING RJ-45 RJ-11",
        "cantidad": 8,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-H-006",
        "nombreproducto": "CARTULINA HILADA T\/OFICIO DE 100 UNIDADES",
        "cantidad": 9,
        "estadito": "si"
      },
      {
        "id_producto": "AFCOOP-C-001",
        "nombreproducto": "CANASTILLAS DE PLASTICO",
        "cantidad": 10,
        "estadito": "si"
      }
    ]
  },
  {
    "id_solicitud": "5",
    "nombreusuario": "GUNNER FREDY RIOJA GEMIO",
    "fecha": "2019-12-08",
    "estado": "solicitado",
    "cargo": "DIRECTOR DE CONTROL Y FISCALIZACION",
    "productos": [
      {
        "id_producto": "AFCOOP-C-003",
        "nombreproducto": "CINTA DE EMBALAJE TRANSPARENTE",
        "cantidad": 20,
        "estadito": "si"
      }
    ]
  }
];*/
    console.log("--> ",this.desserts)

      },
    initialize () {
      this.aprobados = [
        {
          id_solicitud: 'Frozen Yogurt',
          nombreusuario: '159',
          fecha: '6.0',
          estado: '24',
          cargo: '4.0',
        },
      ];
      this.desserts = [
        /*{
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          objetos:[{"propiedad1":"DAVID ALEGRIA",
                   "propiedad2":"2019-11-22"},
                   {"propiedad1":"RENE ADUVIRI",
                   "propiedad2":"2019-09-10"},
                   {"propiedad1":"RENE ADUVIRI",
                   "propiedad2":"2019-09-10"}],
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
            objetos:[{"propiedad1":"DAVID ALEGRIA",
                   "propiedad2":"2019-11-22"},
                   {"propiedad1":"RENE ADUVIRI",
                   "propiedad2":"2019-09-10"},
                   {"propiedad1":"RENE ADUVIRI",
                   "propiedad2":"2019-09-10"},
                   {"propiedad1":"RENE ADUVIRI",
                   "propiedad2":"2019-09-10"}],
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
              objetos:[{"propiedad1":"DAVID ALEGRIA",
                   "propiedad2":"2019-11-22"},
                   {"propiedad1":"RENE ADUVIRI",
                   "propiedad2":"2019-09-10"},
                   {"propiedad1":"RENE ADUVIRI",
                   "propiedad2":"2019-09-10"},
                   {"propiedad1":"RENE ADUVIRI",
                   "propiedad2":"2019-09-10"},
                   {"propiedad1":"RENE ADUVIRI",
                   "propiedad2":"2019-09-10"}],
        },*/
      ]
    },
    
    verItem (obj) 
    {
      this.editedIndex = this.desserts.indexOf(obj)
      for(var i=0;i<obj.length;i++)
      {
          this.veraItem[i] = Object.assign({}, obj[i])
          console.log("OBJ : " +i+ " " , obj[i]);
      }
      this.dialog = true;
    },
    close () 
    {
      this.dialog = false
      this.veraItem= [{
      propiedad1: '',
      propiedad2: '',
    }],
      this.itemes={},
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    solicitud(itemes)
    {
      console.log("david--> ", itemes.nombreusuario);
      var doc = new jsPDF('p','mm','letter');
      
      doc.setDrawColor(0)
      doc.setFillColor(255, 255, 255)
      doc.setLineWidth(0.8)
      doc.roundedRect(136, 20, 58, 15, 3, 3, 'FD')
      doc.setFontType('normal')
        doc.setFontSize(9)
      doc.text("CODIGO : FORM - BYS - ALM - 002",139,26)
      doc.text("VERSIÓN : 001",139,32)
      doc.setLineWidth(0.4)
       doc.setFontType('bold')
        doc.setFontSize(14)
      doc.rect(150, 40, 50, 10)
      doc.text("N°",162,47)

      var imgData = 'data:image/png;base64,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xCZtZWsijZiueA1CijqEPnzzaLR81Q2PM7NlOygHFi3lTZ//Ac2incqyFqpKa0w9LZE1KWhQriIx41LeEOHNVx9B817VAHz+8//L//3fC7M68msjEz0z3PDxB9h0/yDJQIyxiVHKFknO+dbr2fNVplDj9Mw0Z55x5k7F5j9fXHXVVZx//vl85zvf4W9/+xuhUKjgInXzQWuN67rEYjEmJia44oorOOCAA9DJJMp1YyIQ+DPplZj1c4yRJg8b227zMOyEa8ONq7zNJvbVpN4TohallkohFuM4qRjwkZER7rr7bn77299y5x137HRJET9WrlzJa449ljedeSZHHXVU+gPXjSut1yPEWszq0p8t7NeobMvoMoSoRqkl2XJv3baNm2+6iV/+8pc88cQTBbVBzUZTUxOHHXYY73zXuzjiiCOo9nfeSyantRDPadjiXROrJdqJza+BWAKx+S+VaN0IdEohuvzyb968mZtvvplrfvlLnnrySdOkaifR3NzMEUccwTve8Q6OOOIIKioqUp/pZHIaIbZ64a/++mVBIKSVWiGlLBeOw4MPPsiV3/seQggikQgBx9klCzaNMecm4nGmp6dZvd9+fPSjHyXoOLjxuBaOcx9CPInXiI90w25LINkZ5W7W36mCiT5neU6tw4//KAKBefNELInYBKxqsnqsC2PSakOy//09UxWv+esaotuMg+p1v7qLpVPVVJW3UhGqwnECBBwH7Qs6UElNfCZJ10H1nPWTo3BCkoSb4PTTTueWm295Qc9799135/4H7qe6shqAf/5wDXdc/ThHXLAHR7x7r9T3PvWpS/jqV3ed2lwo3vzmN1NXV0cwGCQcDvPa176WY4899oU9qO1aqNS0CAR+S7qfjD+r1j5Ifu3DrthT4cakfWqWSGowi5JqfNnYAtqBxULKKi+BLIVYLMZAXx9PPPUU9913H/39/USjUaanp5mYnCQWjRIMBlMJXyWRCIsXL2b16tXstddeNDc1mZavaWiUGtVK9XhJXxOkydCf7JVNIDYb22SUC1EhtF4soBUpK7PlHhsfZ91zz3H33Xezdu1a4t5kNT4+TjQapaKigsrKSsLhMGVlZey3//4cdcQRtLW1ZctrSmOYfijrtLkW1h5vZfeTn9VAcvk2bQa5kV+pLiFlK0LsIP/o2BjPrV3LXXfdxbp160gkEjnlj0QilJWV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'
      doc.addImage(imgData, 'JPEG', 10, 10, 70, 30)
      //doc.text('Hello world!', 10, 10)
        doc.setFont('helvetica')
        doc.setFontType('bold')
        doc.setFontSize(15)
        doc.text("SOLICITUD DE MATERIALES",70, 60)
        doc.setLineWidth(0.4)
        doc.line(70, 61, 143, 61) // horizontal line
        doc.setFontSize(12)
        doc.text("DE : ",25, 76)
                                      
        doc.text("CARGO : ",25, 86)
                                        
        doc.setLineWidth(0.2)
        doc.line(55, 77, 165, 77)
        doc.line(55, 87, 165, 87)

        //AQUI EMPIEZA TABLA
        doc.rect(10, 97, 196, 94)
        
        doc.setLineWidth(0.2)
        doc.text("CODIGO",16, 105)
        doc.text("DESCRIPCÍON",85, 105)
        doc.text("CANTIDAD",170, 102)
        doc.setFontSize(10)
        doc.text("SOLICITADO",157, 109)
        doc.text("ENTREGADO",182, 109)
        var espacio=16;
        doc.line(155, 104, 206, 104)
        for(var i=1;i<=11;i++)
        {
          doc.line(10, 95+espacio, 206, 95+espacio)
          espacio+=8;
          doc.line(40, 97, 40, 191)
          doc.line(155, 97, 155, 191)
          doc.line(181, 104, 181, 191)
        }
                             
        //doc.text(""+item.productos.id_producto,25,111)
        doc.setFontType('normal')
        doc.setFontSize(11)
        doc.text("La Paz, 22 de Noviembre de 2019",20, 215)
        doc.setFontType('bold')
        doc.text("SOLICITADO",20,260)
        doc.text("RECIBIDO",175,260)
        doc.text("VERIFICADO",70,260)
        doc.text("AUTORIZADO DAF",120,260)


        doc.setFontType('normal')
        doc.setFont('times')
        doc.setFontSize(11)
        doc.text(""+itemes.nombreusuario,70,76)
        doc.text(""+itemes.cargo,70,86)
        var renglon=8;
                              for(var j=0;j<itemes.productos.length;j++)
                              {
                                doc.text(""+itemes.productos[j].id_producto,12,108+renglon)
                                doc.text(""+itemes.productos[j].nombreproducto,43,108+renglon)
                                renglon+=8;
                              }
        
        doc.save('solicitud.pdf')
        itemes={};
        this.close();
    },
  },
    created: function() 
    {
        this.inicializasolicitudes();
      this.initialize();
      let varia =this;    
      varia.$store.commit('SET_LAYOUT', 'panelprincipal-layout'); 
    }
}
</script>