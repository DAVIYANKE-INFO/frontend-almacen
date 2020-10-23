<template>
    <v-container fluid>
        <v-card
            class="ma-5 pa-5"
            outlined
            tile
        >
            <v-card
                class="ma-3 pa-5"
                outlined
                tile
            >      
                <v-row align="center" justify="center"> 
                    <v-col class="text-center" cols="12">
                        <h1 style="color:#394BCD">Cambio de Contraseña</h1>
                    </v-col>
                </v-row>

                <v-card flat>
                    <v-form ref= "form" @submit.prevent="">
                        <v-container style="text-align:center">
                            <v-row>
                                <v-col cols="12" sm="6" md="4" lg="6">
                                    <v-text-field v-model="contrasena_antigua" label="contraseña anterior" color="indigo"></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="4" lg="6">
                                    <v-text-field v-model="contrasena_nueva" label="contraseña nueva" color="indigo"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row align="center" justify="end">            
                                <v-col class="text-center" cols="3" lg="6">
                                    <div class="my-0">
                                        <v-btn medium color="error" @click="cancelar()">Cancelar</v-btn>
                                    </div>
                                </v-col>
                                <v-col class="text-center" cols="3" lg="6">
                                    <div class="my-0">
                                        <v-btn medium color="indigo darken-2" dark @click="guardar()">Guardar</v-btn>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-form>
                </v-card>

            </v-card> 
        </v-card>
    </v-container>
</template>


<script>
import axios from 'axios'
export default { 
    data: vm => ({
        contrasena_antigua: '',
        contrasena_nueva: '',
    }),
    methods: {
        cancelar(){
            this.contrasena_antigua = '';
            this.contrasena_nueva = '';
        },

        guardar() {
            const token = sessionStorage.getItem('token');
            const usuario = sessionStorage.getItem('usuario');
            console.log('usuario: ', usuario);

            let comp = this;
            const body = {
                contrasena_antigua: this.contrasena_antigua,
                contrasena_nueva: this.contrasena_nueva
            }
            axios.post(comp.store+`/api/v1/usuario/${usuario}/cambiar_contrasena`, body, { headers: { Authorization: 'Bearer '+token } })
                .then((response) => {
                    console.log('response: ', response);
                })
                .catch((error) => {
                    console.log("error", error)
                });
        }
    }
}
</script>