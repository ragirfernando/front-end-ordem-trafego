import {http} from "./config";

export default{
    listar:() =>{
        return http.get('veiculo/veiculos')
    },
    
    inserirVeiculo:(veiculo) => {
        return http.post('veiculo/salvarVeiculo', veiculo)
    },

    atualizar:(veiculo) => {
        return http.put('veiculo/editarVeiculo', veiculo)
    },

    apagar:(veiculo) => {        
        return http.delete('veiculo/deletarVeiculo', {data: veiculo})
    }
}