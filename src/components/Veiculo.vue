<template>
    <v-container>
        <div id="app" style="margin-top: 60px">
            <v-data-table :headers="nomeColunas" :items="listaVeiculos" class="elevation-1 subtitle-1">
                <template v-slot:top>
                    <v-toolbar flat color="#">
                        <v-toolbar-title>Lista de veículos</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>

                        <v-dialog v-model="dialog" max-width="80%">
                            <template v-slot:activator="{ on }">
                                <v-btn color="#" dark class="mb-2" v-on="on" @click="limparListaVeiculos">Novo veículo
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ novoOuAtualizar }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col class="d-flex" cols="12" sm="6">
                                                <v-select
                                                        v-model="veiculo.marca"
                                                        :items="marcaVeiculo"
                                                        label="Selecione a marca"
                                                ></v-select>
                                            </v-col>

                                            <v-col class="d-flex" cols="12" sm="6">
                                                <v-select
                                                        v-model="veiculo.cor"
                                                        :items="corVeiculo"
                                                        label="Selecione a cor"
                                                ></v-select>
                                            </v-col>

                                            <v-col class="d-flex" cols="12" sm="6">
                                                <v-select
                                                        v-model="veiculo.anoFabricacao"
                                                        :items="anoVeiculo"
                                                        label="Selecione o ano de fabricação"
                                                ></v-select>
                                            </v-col>

                                            <v-col class="d-flex" cols="12" sm="6">
                                                <v-select
                                                        v-model="veiculo.categoriaVeiculo"
                                                        :items="categoriaVeiculo"
                                                        label="Selecione a categoria"
                                                ></v-select>
                                            </v-col>

                                            <v-col class="d-flex" cols="12" sm="6">
                                                <v-select
                                                        v-model="veiculo.estadoConservacao"
                                                        :items="estadoConservacao"
                                                        label="Selecione o estado de Conservação"
                                                ></v-select>
                                            </v-col>

                                            <v-col class="d-flex" cols="12" sm="6">
                                                <v-select
                                                        v-model="veiculo.tipoCombustivel"
                                                        :items="combustivelVeiculo"
                                                        label="Selecione o combustível"
                                                ></v-select>
                                            </v-col>

                                            <v-col class="d-flex" cols="12" sm="6">
                                                <v-text-field v-model="veiculo.modelo" label="Modelo"></v-text-field>
                                            </v-col>

                                            <v-col class="d-flex" cols="12" sm="6">
                                                <v-text-field v-model="veiculo.kmRodados"
                                                              label="Quilometragem rodada"></v-text-field>
                                            </v-col>

                                            <v-col class="d-flex" cols="12" sm="6">
                                                <v-text-field v-model="veiculo.placa" label="Placa"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="white" text @click="fecharDialog">Cancelar</v-btn>
                                    <v-btn color="white" text @click="inserirVeiculo">Salvar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.acoes="{item}">
                    <v-icon small class="mr-2" @click="atualizarVeiculo(item)">mdi-pencil</v-icon>
                    <v-icon small @click="deletarVeiculo(item)">mdi-delete</v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="listarVeiculos">Reset</v-btn>
                </template>
            </v-data-table>
        </div>
    </v-container>
</template>


<script>
    import VeiculoService from '../service/veiculoService';

    export default {
        name: "veiculo",
        data: () => ({
            anoAtual: "",
            marcaVeiculo: ["Fiat", "Chevrolet", "Ford", "Toyota"],
            corVeiculo: ["Branca", "Vermelha", "Preta", "Azul", "Amarela"],
            anoVeiculo: [],
            categoriaVeiculo: ["Passeio", "Suv", "Caminhonete", "Ônibus", "Van"],
            combustivelVeiculo: ["Diesel", "Gasolina", "Álcool", "Flex"],
            estadoConservacao: ["Novo", "Seminovo", "Usado"],
            drawer: null,
            dialog: false,
            nomeColunas: [
                {text: "Marca", align: "start", sortable: false, value: "marca"},
                {text: "Modelo", sortable: false, value: "modelo"},
                {text: "Quilometragem ", sortable: false, value: "kmRodados"},
                {text: "Placa", sortable: false, value: "placa"},
                {text: "Cor", sortable: false, value: "cor"},
                {text: "Ano", sortable: false, value: "anoFabicacao"},
                {text: "Categoria", sortable: false, value: "categoriaVeiculo"},
                {text: "Combustível", sortable: false, value: "tipoCombustivel"},
                {text: "Conservação", sortable: false, value: "estadoConservacao"},
                {text: "Ações", value: "acoes", sortable: false}
            ],
            listaVeiculos: [],
            IndexListaVeiculos: -1,
            veiculo: {
                id: null,
                marca: "",
                modelo: "",
                kmRodados: 0,
                placa: "",
                cor: "",
                anoFabricacao: 0,
                categoriaVeiculo: "",
                tipoCombustivel: "",
                estadoConservacao: ""
            },

            /*defaultItem: {
                name: "",
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0
            }*/
        }),

        computed: {
            novoOuAtualizar() {
                return this.IndexListaVeiculos === -1 ? "Novo veiculo" : "Atualizar veiculo";
            }
        },

        watch: {
            dialog(val) {
                val || this.fecharDialog();
            }
        },

        created() {
            this.preencherAnoVeiculo();
            this.$vuetify.theme.dark = true;
            this.listarVeiculos();
        },

        methods: {
            preencherAnoVeiculo() {
                const anoAtual = new Date().getFullYear();
                let incremento = 0;
                while (incremento <= 4) {
                    this.anoVeiculo.push(anoAtual - incremento)
                    incremento++;
                }
            },

            limparListaVeiculos() {
                this.veiculo.id = null;
                this.veiculo.marca = "";
                this.veiculo.modelo = "";
                this.veiculo.kmRodados = 0;
                this.veiculo.placa = "";
                this.veiculo.cor = "";
                this.veiculo.anoFabricacao = 0;
                this.veiculo.categoriaVeiculo = "";
                this.veiculo.tipoCombustivel = "";
                this.veiculo.estadoConservacao = "";

            },

            retornarPrimeiraLetraMaiuscula(primeiraLetraMaiuscula) {
                return primeiraLetraMaiuscula.substring(0, 1) +
                    primeiraLetraMaiuscula.toLowerCase().substring(1, primeiraLetraMaiuscula.length)
            },

            retornarPalavraMaiuscula(palavra) {
                return palavra.replace(/[^a-zA-Zs]/g, "").toUpperCase()
            },

            listarVeiculos() {
                VeiculoService.listarVeiculos().then(resposta => {
                    let lista = [];
                    resposta.data.forEach(list => {
                        list.categoriaVeiculo = this.retornarPrimeiraLetraMaiuscula(list.categoriaVeiculo);
                        list.tipoCombustivel = this.retornarPrimeiraLetraMaiuscula(list.tipoCombustivel);
                        list.estadoConservacao = this.retornarPrimeiraLetraMaiuscula(list.estadoConservacao);
                        lista.push(list)
                    })
                    this.listaVeiculos = lista;
                });
            },

            atualizarVeiculo(item) {
                /*VeiculoService.atualizarVeiculo(veiculo).then(resposta => {
                    console.log(resposta);*/

                this.IndexListaVeiculos = this.listaVeiculos.indexOf(item);
                this.veiculo = Object.assign({}, item);
                console.log(this.veiculo)
                this.dialog = true;
                // });
            },

            deletarVeiculo(veiculo) {
                if (confirm("Deseja excluir o veiculo " + veiculo.modelo + " ? ")) {
                    VeiculoService.deletarVeiculo(veiculo)
                        .then(resposta => {
                            this.listarVeiculos();
                            console.log(resposta);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            },

            fecharDialog() {
                this.dialog = false;
                /* this.$nextTick(() => {
                     this.veiculo = Object.assign({}, this.defaultItem);
                     this.editedIndex = -1;
                 });*/
            },

            inserirVeiculo() {
                this.veiculo.estadoConservacao = this.retornarPalavraMaiuscula(this.veiculo.estadoConservacao);
                this.veiculo.categoriaVeiculo = this.retornarPalavraMaiuscula(this.veiculo.categoriaVeiculo);
                this.veiculo.tipoCombustivel = this.retornarPalavraMaiuscula(this.veiculo.tipoCombustivel);

                console.log("ff" + this.veiculo)
                if (this.veiculo.id == null) {
                    VeiculoService.inserirVeiculo(this.veiculo).then(resposta => {
                        console.log(resposta);
                        this.listarVeiculos();
                    });
                } else
                    VeiculoService.atualizarVeiculo(this.veiculo).then(resposta => {
                        console.log(resposta)
                        this.listarVeiculos();
                    })
                this.fecharDialog();
            }
        }
    };

</script>
