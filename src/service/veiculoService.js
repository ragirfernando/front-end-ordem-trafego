import {http} from "./config";

export default {
    listarVeiculos: () => {
        return http.get('veiculo/veiculos')
    },

    listarVeiculosModelo: (modelo) => {
        return http.get(`/veiculo/listarVeiculosModelo/${modelo}`)
    },

    inserirVeiculo: (veiculo) => {
        return http.post('veiculo/inserirVeiculo', veiculo)
    },

    atualizarVeiculo: (veiculo) => {
        return http.put('veiculo/atualizarVeiculo', veiculo)
    },

    deletarVeiculo: (id) => {
        return http.delete(`veiculo/deletarVeiculo/${id}`)
    }
}