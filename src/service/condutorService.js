
import {http} from './config'


export default{
    listar:() =>{
        return http.get('condutor/condutores')
    },

    listarCondutorNumeroCnh:(numeroCnh) =>{
        return http.get(`/condutor/listarCondutorNumeroCnh/${numeroCnh}`)
    },

    listarCondutoresCategoriaCnh:(categoriaCnhCondutor) =>{
        return http.get(`/condutor/listarCondutoresCategoriaCnh/${categoriaCnhCondutor}`)
    },

    buscaCondutorNome:(nome) =>{
        return http.get(`/condutor/buscarCondutorNome/${nome}`)
    },

    listarOrdensTrafegoRelacionadaCondutor:(id) =>{
        return http.get(`/condutor/listarOrdensTrafegoCondutor/${id}`)
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