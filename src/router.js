import Vue from 'vue'
import VueRouter from 'vue-router'
import Veiculo from './components/Veiculo'
import Condutor from './components/Condutor'
import OrdemTrafego from "./components/OrdemTrafego";

Vue.use(VueRouter)

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/Veiculo',
            name: 'veiculo',
            component: Veiculo
        },

        {
            path: '/Condutor',
            name: 'condutor',
            component: Condutor
        },
        {
            path: '/OrdemTrafego',
            name: 'ordemTrafego',
            component: OrdemTrafego
        }
    ]
})