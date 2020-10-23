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
                                    <v-text-field v-model="contrasena_antigua" 
                                                  label="contraseña anterior"
                                                  color="indigo"
                                                  prepend-icon="lock" :append-icon="eye ? 'visibility_off' : 'visibility'"
                                                  @click:append="pass1"
                                                  :type="show ? 'text' : 'password'">
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="4" lg="6">
                                    <v-text-field v-model="contrasena_nueva"
                                                  label="contraseña nueva"
                                                  color="indigo"
                                                  prepend-icon="lock" :append-icon="eye1 ? 'visibility_off' : 'visibility'"
                                                  @click:append="pass2"
                                                  :type="show1 ? 'text' : 'password'">
                                    </v-text-field>
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
        show: false,
        show1: false,
        eye: true,
        eye1: true
    }),
    methods: {
        pass1() {
            this.eye = !this.eye;
            this.show = !this.show;
        },
        pass2() {
            this.eye1 = !this.eye1;
            this.show1 = !this.show1;
        },
        cancelar(){
            this.contrasena_antigua = '';
            this.contrasena_nueva = '';
        },

        guardar() {
            const token = sessionStorage.getItem('token');
            const usuario = sessionStorage.getItem('usuario');

            let comp = this;
            const body = {
                contrasena_antigua: this.contrasena_antigua,
                contrasena_nueva: this.contrasena_nueva
            }
            axios.post(comp.store+`/api/v1/usuario/${usuario}/cambiar_contrasena`, body, { headers: { Authorization: 'Bearer '+token } })
                .then((response) => {
                    if (response.data.finalizado) {
                        comp.$toastr.success(response.data.mensaje, 'Finalizado', {timeOut: 2000});
                    } else {
                        comp.$toastr.warning('La contraseña anterior no es la misma guardada, verifique e intente denuevo.', 'Finalizado', {timeOut: 2000}); 
                    }
                })
                .catch((error) => {
                    comp.$toastr.error('Hubo un error en el sistema, vuelva a intentar mas tarde.', 'Finalizado', {timeOut: 2000});
                });
        }
    }
}
</script>