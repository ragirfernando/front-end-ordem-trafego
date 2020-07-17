<template>
    <v-container>
        <div id="app" style="margin-top: 60px">
            <v-data-table :headers="headers" :items="desserts" class="elevation-1 subtitle-1">
                <template v-slot:top>
                    <v-toolbar flat color="#">
                        <v-toolbar-title>Lista de veiculos</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>

                        <v-dialog v-model="dialog" max-width="900px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="#" dark class="mb-2" v-on="on">Novo veículo</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="3" md="4">
                                                <p>Marca</p>
                                                <v-overflow-btn
                                                        class="my-2"
                                                        v-model="veiculo.marca"
                                                        :items="marcaVeiculo"
                                                        label="Selecione uma marca"
                                                        target="#dropdown-example"
                                                ></v-overflow-btn>
                                            </v-col>

                                            <v-col cols="12" sm="3" md="4">
                                                <p>Cor</p>
                                                <v-overflow-btn
                                                        class="my-2"
                                                        v-model="veiculo.cor"
                                                        :items="corVeiculo"
                                                        label="Selecione a cor"
                                                        target="#ropdown-example"
                                                ></v-overflow-btn>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <p>Ano</p>
                                                <v-overflow-btn
                                                        class="my-2"
                                                        v-model="veiculo.anoFabicacao"
                                                        :items="anoVeiculo"
                                                        label="Selecione o ano"
                                                        target="#dropdown-example"
                                                ></v-overflow-btn>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <p>Categoria</p>
                                                <v-overflow-btn
                                                        class="my-2"
                                                        v-model="veiculo.categoriaVeiculo"
                                                        :items="categoriaVeiculo"
                                                        label="Selecione a categoria"
                                                        target="#dropdown-example"
                                                ></v-overflow-btn>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <p>Combustivel</p>
                                                <v-overflow-btn
                                                        class="my-2"
                                                        v-model="veiculo.tipoCombustivel"
                                                        :items="combustivelVeiculo"
                                                        label="Selecione o combustivel"
                                                        target="#dropdown-example"
                                                ></v-overflow-btn>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <p>Estado de Conservação</p>
                                                <v-overflow-btn
                                                        class="my-2"
                                                        v-model="veiculo.estadoConservacao"
                                                        :items="estadoConservacaoVeiculo"
                                                        label="Selecione o estado de Conservação"
                                                        target="#dropdown-example"
                                                ></v-overflow-btn>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="veiculo.modelo" label="Modelo"></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="veiculo.km" label="Km"></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="veiculo.placa" label="Placa"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="white" text @click="close">Cancelar</v-btn>
                                    <v-btn color="white" text @click="save">Salvar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.acoes="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                    <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                </template>
            </v-data-table>
        </div>
    </v-container>
</template>

<script>
    import Veiculos from '../service/veiculosService';

    export default {
        name: "veiculo",
        data: () => ({
            marcaVeiculo: ["FIAT", "CHEVROLET", "FORD", "TOYOTA"],
            corVeiculo: ["BRANCA", "VERMELHA", "PRETA", "AZUL", "AMARELA"],
            anoVeiculo: ["2017", "2018", "2019", "2020"],
            categoriaVeiculo: ["PASSEIO", "SUV", "CAMINHONETE", "ONIBUS", "VAN"],
            combustivelVeiculo: ["DIESEL", "GASOLINA", "ALCOOL", "FLEX"],
            estadoConservacaoVeiculo: ["NOVO", "SEMINOVO", "VELHO"],
            drawer: null,
            dialog: false,
            headers: [
                {text: "Marca", align: "start", sortable: false, value: "marca"},
                {text: "Modelo", sortable: false, value: "modelo"},
                {text: "Km", sortable: false, value: "km"},
                {text: "Placa", sortable: false, value: "placa"},
                {text: "Cor", sortable: false, value: "cor"},
                {text: "Ano", sortable: false, value: "anoFabicacao"},
                {text: "Categoria", sortable: false, value: "categoriaVeiculo"},
                {text: "Combustivel", sortable: false, value: "tipoCombustivel"},
                {text: "Conservação", sortable: false, value: "estadoConservacao"},
                {text: "Ações", value: "acoes", sortable: false}
            ],
            desserts: [],
            editedIndex: -1,
            veiculo: {
                marca: "",
                modelo: "",
                km: 0,
                placa: "",
                cor: "",
                anoFabicacao: 0,
                categoriaVeiculo: "",
                tipoCombustivel: "",
                estadoConservacao: ""
            },
            defaultItem: {
                name: "",
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0
            }
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? "Novo veiculo" : "Atualizar veiculo";
            }
        },

        watch: {
            dialog(val) {
                val || this.close();
            }
        },

        created() {
            this.$vuetify.theme.dark = true;
            this.initialize();
        },

        methods: {
            initialize() {
                Veiculos.listar().then(resposta => {
                    this.desserts = resposta.data;
                });
            },

            editItem(item) {
                Veiculos.atualizar(item).then(resposta => {
                    console.log(resposta);

                    this.editedIndex = this.desserts.indexOf(item);
                    this.veiculo = Object.assign({}, item);
                    this.dialog = true;
                });
            },

            deleteItem(item) {
                if (confirm("Deseja excluir o veiculo " + item.modelo + " ? ")) {
                    Veiculos.apagar(item)
                        .then(resposta => {
                            this.initialize();
                            console.log(resposta);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            },

            close() {
                this.dialog = false;
                this.$nextTick(() => {
                    this.veiculo = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                });
            },

            save() {
                Veiculos.inserirVeiculo(this.veiculo).then(resposta => {
                    console.log(resposta);
                    this.initialize();
                });
                /*if (this.editedIndex > -1) {
                  Object.assign(this.desserts[this.editedIndex], this.editedItem)
                } else {
                  this.desserts.push(this.editedItem)
                }*/
                this.close();
            }
        }
    };
</script>
