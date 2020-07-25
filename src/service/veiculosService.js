import {http} from "./config";

export default{
    listar:() =>{
        //return http.get('https://api.publicapis.org/entries')
        //return http.get('https://viacep.com.br/ws/77024682/json/')
        return http.get('veiculo/veiculos')
        //return http.get(`https://api.github.com/users/${nome}`)
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