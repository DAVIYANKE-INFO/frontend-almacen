import Vue from 'vue'
import Router from 'vue-router'

import Login from './views/Login.vue'
import Principal from './views/Principal.vue'
import Producto from './views/Producto.vue'
import Unidad from './views/Unidad.vue'
import Grupo from './views/Grupo.vue'
import Reporte from './views/Reporte.vue'
import Proveedor from './views/Proveedor.vue'
import Cargo from './views/Cargo.vue'
import Dirección from './views/Dirección.vue'
import Regional from './views/Regional.vue'
import Salidas from './views/Salidas.vue'
import Usuario from './views/Usuario.vue'
import Solicitud from './views/Solicitud.vue'
import Entradas from './views/Entradas.vue'
import Rol from './views/Rol.vue'
import Ingreso from './views/Ingreso.vue'
import SalidaUsuario from './views/SalidaUsuario.vue'
import UsuarioHistorial from './views/UsuarioHistorial.vue'

const router = new Router({ });

/*router.beforeEach((to, from, next) => {
    // ...
});
router.beforeEach((to, from, next) => {
  // ...
});

router.beforeEach((to, from, next) => {
  // ...
});*/
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/principal',
      name: 'principal',
      component: Principal
    },
    {
      path: '/admin/producto',
      name: 'producto',
      component: Producto
    },
    {
      path: '/admin/almacen/unidad',
      name: 'unidad',
      component: Unidad
    },
    {
      path: '/admin/almacen/grupo',
      name: 'grupo',
      component: Grupo
    },
    {
      path: '/admin/reporte',
      name: 'reporte',
      component: Reporte
    },
    {
      path: '/admin/almacen/proveedor',
      name: 'proveedor',
      component: Proveedor
    },
    {
      path: '/admin/administracion/cargo',
      name: 'cargo',
      component: Cargo
    },
    {
      path: '/admin/administracion/dirección',
      name: 'dirección',
      component: Dirección
    },
    {
      path: '/admin/administracion/regional',
      name: 'regional',
      component: Regional
    },
    {
      path: '/admin/salidas',
      name: 'salidas',
      component: Salidas
    },
    {
      path: '/admin/usuario',
      name: 'usuario',
      component: Usuario
    },
    {
      path: '/admin/solicitud',
      name: 'solicitud',
      component: Solicitud
    },
    {
      path: '/admin/entradas',
      name: 'entradas',
      component: Entradas
    },
    {
      path: '/admin/administracion/rol',
      name: 'roles',
      component: Rol
    },
    {
      path: '/admin/ingreso',
      name: 'ingreso',
      component: Ingreso
    },
    {
      path: '/usuario/solicitud',
      name: 'salida_usuario',
      component: SalidaUsuario
    },
    {
      path: '/usuario/historial',
      name: 'usuario_historial',
      component: UsuarioHistorial
    },
  ]
})
