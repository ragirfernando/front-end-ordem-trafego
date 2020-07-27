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
                                <v-btn color="#" dark class="mb-2" v-on="on">Novo veículo</v-btn>
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
                                                        v-model="veiculo.anoFabicacao"
                                                        :items="anoVeiculo"
                                                        label="Selecione o ano de fabricação"
                                                ></v-select>
                                            </v-col>

                                            <v-col class="d-flex" cols="12" sm="6">
                                                <v-select
                                                        v-model="veiculo.categoriaVeiculo"
                                                        :items="categoriaVeiculoLabel"
                                                        value="categoriaVeiculoValue"
                                                        label="Selecione a categoria"
                                                ></v-select>
                                            </v-col>

                                            <v-col class="d-flex" cols="12" sm="6">
                                                <v-select
                                                        v-model="veiculo.estadoConservacao"
                                                        :items="estadoConservacaoVeiculoLabel"
                                                        value="estadoConservacaoVeiculoValue"
                                                        label="Selecione o estado de Conservação"
                                                ></v-select>
                                            </v-col>

                                            <v-col class="d-flex" cols="12" sm="6">
                                                <v-text-field v-model="veiculo.modelo" label="Modelo"></v-text-field>
                                            </v-col>

                                            <v-col class="d-flex" cols="12" sm="6">
                                                <v-text-field v-model="veiculo.kmRodados" label="Quilometragem rodada"></v-text-field>
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
                <template v-slot:item.acoes="{ item : veiculo }">
                    <v-icon small class="mr-2" @click="atualizarVeiculo(veiculo)">mdi-pencil</v-icon>
                    <v-icon small @click="deletarVeiculo(veiculo)">mdi-delete</v-icon>
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
            anoVeiculo: [/*this.anoAtual, this.anoAtual-1, this.anoAtual-2, this.anoAtual-3, this.anoAtual-4*/],
            categoriaVeiculoValue: ["PASSEIO", "SUV", "CAMINHONETE", "ONIBUS", "VAN"],
            categoriaVeiculoLabel: ["Passeio", "Suv", "Caminhonete", "Ônibus", "Van"],
            combustivelVeiculoValue: ["DIESEL", "GASOLINA", "ALCOOL", "FLEX"],
            combustivelVeiculoLabel: ["Diesel", "Gasolina", "Álcool", "Flex"],
            estadoConservacaoVeiculoValue: ["NOVO", "SEMINOVO", "USADO"],
            estadoConservacaoVeiculoLabel: ["Novo", "Seminovo", "Usado"],
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

            editedIndex: -1,
            veiculo: {
                marca: "",
                modelo: "",
                kmRodados: 0,
                placa: "",
                cor: "",
                anoFabicacao: 0,
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
                return this.editedIndex === -1 ? "Novo veiculo" : "Atualizar veiculo";
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

            retornarPrlimeiraLetraMaiuscula(primeiraLetarMaiuscula) {
                return primeiraLetarMaiuscula.substring(0, 1) +
                    primeiraLetarMaiuscula.toLowerCase().substring(1, primeiraLetarMaiuscula.length)
            },

            listarVeiculos() {
                VeiculoService.listarVeiculos().then(resposta => {
                    let lista = [];
                    resposta.data.forEach(list => {
                        list.categoriaVeiculo = this.retornarPrlimeiraLetraMaiuscula(list.categoriaVeiculo);
                        list.tipoCombustivel = this.retornarPrlimeiraLetraMaiuscula(list.tipoCombustivel);
                        list.estadoConservacao = this.retornarPrlimeiraLetraMaiuscula(list.estadoConservacao);
                        lista.push(list)
                    })
                    this.listaVeiculos = lista;
                });
            },

            atualizarVeiculo(item) {
                VeiculoService.atualizarVeiculo(item).then(resposta => {
                    console.log(resposta);

                    this.editedIndex = this.listaVeiculos.indexOf(item);
                    this.veiculo = Object.assign({}, item);
                    this.dialog = true;
                });
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
                VeiculoService.inserirVeiculo(this.veiculo).then(resposta => {
                    console.log(resposta);
                    this.listarVeiculos();
                });
                /*if (this.editedIndex > -1) {
                  Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                  this.desserts.push(this.editedItem)
                }*/
                this.fecharDialog();
            }
        }
    };
</script>
