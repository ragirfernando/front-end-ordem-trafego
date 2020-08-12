import {http} from './config'


export default {
    listar: () => {
        return http.get('ordemTrafego/ordensTrafego')
    },

    inserir: (ordemTrafego, idCondutor, idVeiculo) => {
        const url = `ordemTrafego/inserirOrdemTrafego/${idCondutor}/${idVeiculo}`;
        return http.post(url,  ordemTrafego)
    },

    editar: (ordemTrafego, idCondutor, idVeiculo) => {
        const url = `ordemTrafego/atualizarOrdemTrafego/${idCondutor}/${idVeiculo}`;
        return http.put(url,  ordemTrafego)
    },

    deletar: (id) => {
        const url = `ordemTrafego/deletarOrdemTrafego/${id}`;
        return http.delete(url)
    },
}