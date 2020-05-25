import {http} from '/home/ragir/Sistemas-para-Internet/Novas-Tecnologias/Trafego/trafego/src/service/config'

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