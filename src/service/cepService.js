import {http} from './config'

export default{
    consultarCep:(cep) => {
        return http.get(`https://viacep.com.br/ws/${cep}/json/`)
    }
}