<template>
    <v-container>
        <div id="app" style="margin-top: 60px">
            <v-app id="inspire">
                <v-card dark>
                    <v-card-title>Pesquisar APIs públicas</v-card-title>
                    <v-card-text>
                        <v-autocomplete
                                v-model="model"
                                :items="items"
                                :loading="isLoading"
                                :search-input.sync="search"
                                color="white"
                                hide-no-data
                                hide-selected
                                item-text="modelo"
                                item-value="API"
                                label="APIs públicas"
                                placeholder="Comece a digitar na Pesquisa"
                                prepend-icon="mdi-database-search"
                                return-object
                        ></v-autocomplete>
                    </v-card-text>
                    <!--                    <v-expand-transition style="height: 600px">-->
                    <!--<v-card>


                            <v-row>
                                <h2>{{estadoConservacao}}</h2>
                                <h2>{{marca}}</h2>
                                <h2>{{modelo}}</h2>
                                <h2>{{km}}</h2>
                                <h2>{{placa}}</h2>
                                <h2>{{cor}}</h2>
                                <h2>{{anoFabicacao}}</h2>
                                <h2>{{categoriaVeiculo}}</h2>
                                <h2>{{tipoCombustivel}}</h2>
                            </v-row>
                    </v-card>-->
                    <v-card>
                        <span class="e">{{ fields }}></span>
                        <v-simple-table style="border: 5px solid red;">
                            <template v-slot:default >
                                <thead>
                                <tr>
                                    <th>Modelo</th>
                                    <th>Marca</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{{ modelo }}</td>
                                    <td><h2>{{marca}}</h2></td>
                                </tr>
                                </tbody>
                            </template>
                        </v-simple-table>
                    </v-card>
                </v-card>
            </v-app>
        </div>
    </v-container>
</template>
<script>
    import VeiculosService from "../service/veiculosService";
    //import Veiculos from "../service/veiculosService";

    export default {
        name: 'teste',
        data: () => ({
            descriptionLimit: 60,
            entries: [],
            isLoading: false,
            model: null,
            search: null,
            marca: "",
            modelo: "",
            km: null,
            placa: "",
            cor: "",
            anoFabicacao: null,
            categoriaVeiculo: "",
            tipoCombustivel: "",
            estadoConservacao: "",

        }),

        computed: {
            fields() {
                if (!this.model) return []
                return Object.keys(this.model).map(key => {
                    key;
                    this.marca = this.model.marca;
                    this.modelo = this.model.modelo;
                    this.km = this.model.km;
                    this.placa = this.model.placa;
                    this.cor = this.model.cor;
                    this.anoFabicacao = this.model.anoFabicacao;
                    this.categoriaVeiculo = this.model.categoriaVeiculo;
                    this.tipoCombustivel = this.model.tipoCombustivel;
                    this.estadoConservacao = this.model.estadoConservacao;
                })
            },

            items() {
                return this.entries.map(entry => {
                    const modelo = entry.modelo
                    return Object.assign({}, entry, {modelo})
                })
            },
        },

        watch: {
            search() {
                if (this.items.length > 0) return
                if (this.isLoading) return
                this.isLoading = true
                VeiculosService.listar().then(res => {
                    this.entries = res.data
                }).catch(err => {
                    console.log(err)
                }).finally(() => (this.isLoading = false))
            },
        },
    };
</script>

<style>
    .e {
        display: none;
    }
</style>