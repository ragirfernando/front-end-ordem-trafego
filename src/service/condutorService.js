
import {http} from './config'


export default{
    listar:() =>{
        return http.get('condutor/condutores')
    },
    
    inserirVeiculo:(condutor) => {
        return http.post('condutor/inserirCondutor', condutor)
    },
    
    atualizar:(condutor) => {
        return http.put('condutor/atualizarCondutor', condutor)
    },

    apagar:(id) => {
        return http.delete(`condutor/deletarCondutorId/${id}`)
    },
}