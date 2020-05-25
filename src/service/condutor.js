import {http} from '/home/ragir/Sistemas-para-Internet/Novas-Tecnologias/Trafego/trafego/src/service/config'

export default{
    listar:() =>{
        return http.get('condutor/condutores')
    },
    
    inserirVeiculo:(condutor) => {
        return http.post('condutor/salvarCondutor', condutor)
    },
    
    atualizar:(condutor) => {
        return http.put('condutor/editarCondutor', condutor)
    },

    apagar:(condutor) => {        
        return http.delete('condutor/deletarCondutor', {data: condutor})
    }
}