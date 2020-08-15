import axios from 'axios';

export const http = axios.create({
/*
    baseURL: 'https://ragir-ordem-trafego.herokuapp.com/api/'
*/
    baseURL: 'http://localhost:8080/api/'
})