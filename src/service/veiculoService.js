import {http} from "./config";

export default {
    listarVeiculos: () => {
        return http.get('veiculo/veiculos')
    },

    inserirVeiculo: (veiculo) => {
        return http.post('veiculo/salvarVeiculo', veiculo)
    },

    atualizarVeiculo: (veiculo) => {
        return http.put('veiculo/editarVeiculo', veiculo)
    },

    deletarVeiculo: (veiculo) => {
        return http.delete('veiculo/deletarVeiculo', {data: veiculo})
    }
}