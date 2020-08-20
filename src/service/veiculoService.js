import {http} from "./config";

export default {
    listarVeiculos: () => {
        return http.get('veiculo/veiculos')
    },

    listarVeiculosMarca: (marca) => {
        return http.get(`veiculo/listarVeiculosMarca/${marca}`)
    },

    listarVeiculosModelo: (modelo) => {
        return http.get(`/veiculo/listarVeiculosModelo/${modelo}`)
    },

    listarVeiculosIntervaloKmRodados: (KmInicial, kmFinal) => {
        return http.get(`/veiculo/listarVeiculosIntervaloKmRodados/${KmInicial}/${kmFinal}`)
    },

    listarVeiculosEstadoConservacao: (estadoConservacao) => {
        return http.get(`/veiculo/listarVeiculosEstadoConservacao/${estadoConservacao}`)
    },

    listarOrdensTrafegoRelacionadaVeiculo: (idVeiculo) => {
        return http.get(`/veiculo/listarOrdensTrafegoVeiculo/${idVeiculo}`)
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