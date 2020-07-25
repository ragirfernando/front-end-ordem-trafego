import {http} from './config'


export default {
    listar: () => {
        return http.get('ordemTrefego/ordensTrafego')
    },

    inserir: (ordemTrafego, idCondutor, idVeiculo) => {
        const url = `ordemTrefego/salvarOrdemTrafego/${idCondutor}/${idVeiculo}`;
        return http.post(url,  ordemTrafego)
    },

    editar: (ordemTrafego, idCondutor, idVeiculo) => {
        const url = `ordemTrefego/editarOrdemTrafego/${idCondutor}/${idVeiculo}`;
        return http.put(url,  ordemTrafego)
    },
}