<template>
    <v-container>
        <div id="app" style="margin-top: 60px">
            <v-data-table :headers="headers" :items="listaOrdensTrafego" class="elevation-1 subtitle-1" >
                <template v-slot:top>
                    <v-toolbar flat color="#">
                        <v-toolbar-title>Lista de Ordens de tráfego</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>

                        <v-dialog v-model="dialog" max-width="90%">
                            <template v-slot:activator="{ on }">
                                <v-btn color="#" dark class="mb-2" v-on="on" @click="buscarVeiculos">Nova ordem de
                                    tráfego
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-tabs botton>
                                    <v-tab show-arrows="true">
                                        <v-icon left>mdi-account</v-icon>
                                        Origem

                                    </v-tab>
                                    <v-tab>
                                        <v-icon left>mdi-lock</v-icon>
                                        Destino
                                    </v-tab>
                                    <v-tab>
                                        <v-icon left>mdi-access-point</v-icon>
                                        Veículo

                                    </v-tab>

                                    <v-tab>
                                        <v-icon left>mdi-access-point</v-icon>
                                        Condutor
                                    </v-tab>

                                    <v-tab>
                                        <v-icon left>mdi-access-point</v-icon>
                                        Salvar
                                    </v-tab>

                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text>
                                                <v-row>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="ordemTrafego.origem.cidade"
                                                                      label="Cidade"></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="ordemTrafego.origem.bairro"
                                                                      label="Bairro"></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="ordemTrafego.origem.numero"
                                                                      label="Número"></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="ordemTrafego.origem.complemento"
                                                                      label="Completo"></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text>
                                                <v-row>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="ordemTrafego.destino.cidade"
                                                                      label="Cidade"></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="ordemTrafego.destino.bairro"
                                                                      label="Bairro"></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="ordemTrafego.destino.numero"
                                                                      label="Número"></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="ordemTrafego.destino.complemento"
                                                                      label="Completo"></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text>
                                                <v-data-table
                                                        v-model="idVeiculo"
                                                        :headers="colunasVeiculo"
                                                        :items="listaVeiculos"
                                                        :single-select="singleSelect"
                                                        item-key="name"
                                                        class="elevation-1"
                                                        show-select
                                                >
                                                </v-data-table>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>

                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text>
                                                <v-card-text>
                                                    <v-data-table
                                                            v-model="idCondutor"
                                                            :headers="colunasCondutor"
                                                            :items="listaCondutores"
                                                            :single-select="singleSelect"
                                                            item-key="id"
                                                            class="elevation-1"
                                                            show-select
                                                    >
                                                    </v-data-table>
                                                </v-card-text>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>

                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text>

                                                <v-row>
                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-menu
                                                                ref="menu"
                                                                v-model="menu"
                                                                :close-on-content-click="false"
                                                                :return-value.sync="date"
                                                                transition="scale-transition"
                                                                offset-y
                                                                min-width="290px"
                                                        >
                                                            <template v-slot:activator="{ on }">
                                                                <v-text-field
                                                                        v-model="ordemTrafego.data"
                                                                        label="Data"
                                                                        readonly
                                                                        required
                                                                        :rules="regra"
                                                                        v-on="on"
                                                                ></v-text-field>
                                                            </template>
                                                            <v-date-picker
                                                                    v-model="ordemTrafego.data"
                                                                    no-title
                                                                    scrollable
                                                                    locale="br"
                                                            >
                                                                <v-spacer></v-spacer>
                                                                <v-btn text color="primary" @click="menu = false">
                                                                    Cancelar
                                                                </v-btn>
                                                                <v-btn text color="primary"
                                                                       @click="$refs.menu.save(date)">
                                                                    OK
                                                                </v-btn>
                                                            </v-date-picker>
                                                        </v-menu>
                                                    </v-col>

                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="ordemTrafego.distanciaPercorrer"
                                                                      label="Distancia "></v-text-field>
                                                    </v-col>

                                                    <v-col cols="12" sm="6" md="4">
                                                        <v-text-field v-model="ordemTrafego.status"
                                                                      label="Status "></v-text-field>
                                                    </v-col>
                                                </v-row>
                                            </v-card-text>
                                            <v-btn color="white" text @click="fecharDialog">Cancelar</v-btn>
                                            <v-btn color="white" text @click="inserirOrdemTrafego">Salvar</v-btn>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.acoes="{ item }">
                    <v-icon small class="mr-2" @click="editarOrdemTrafego(item)">mdi-pencil</v-icon>
                    <v-icon small @click="deletarCondutor(item)">mdi-delete</v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="buscaOrdensTrafego">Reset</v-btn>
                </template>
            </v-data-table>
        </div>
    </v-container>
</template>

<script>
    import OrdemTrafegoService from '../service/ordemTrafegoService';
    import VeiculoServce from '../service/veiculoService';
    import CondutorService from '../service/condutorService';

    export default {
        name: 'ordemTrafego',
        data: () => ({
            regra: [v => !!v || "Campo é obrigatorio"],
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            drawer: null,
            dialog: false,
            singleSelect: true,
            headers: [
                {text: "Cidade de Origem", align: "start", sortable: false, value: "origem.cidade"},
                {text: "Cidade de Destino", sortable: false, value: "destino.cidade"},
                {text: "Data", sortable: false, value: "data"},
                {text: "Condutor", sortable: false, value: "condutor.nome"},
                {text: "Veiculo", sortable: false, value: "veiculo.modelo"},
                {text: "Status", sortable: false, value: "status"},
                {text: "Distância", sortable: false, value: "distanciaPercorrer"},
                {text: "Ações", value: "acoes", sortable: false}
            ],
            colunasVeiculo: [
                {text: "Modelo", sortable: false, value: "modelo"},
                {text: "Placa", sortable: false, value: "placa"},
                {text: "Cor", sortable: false, value: "cor"},
                {text: "Ano", sortable: false, value: "anoFabicacao"},
                {text: "Categoria", sortable: false, value: "categoriaVeiculo"},
                {text: "Combustivel", sortable: false, value: "tipoCombustivel"},
                {text: "Conservação", sortable: false, value: "estadoConservacao"},
            ],

            colunasCondutor: [
                {text: "Nome", align: "start", sortable: false, value: "nome"},
                {text: "Categoria Cnh", sortable: false, value: "cnh.categoriaCNH"},
                {text: "Validade", sortable: false, value: "cnh.validade"},
                {text: "Cidade", sortable: false, value: "endereco.cidade"},
                {text: "Bairro", sortable: false, value: "endereco.bairro"},
                {text: "CPF", sortable: false, value: "cpf"},
                {text: "Matricula", sortable: false, value: "matricula"},
            ],
            listaOrdensTrafego: [],
            idVeiculo: [],
            idCondutor: [],
            listaVeiculos: [],
            listaCondutores: [],
            editedIndex: -1,
            ordemTrafego: {
                origem: {
                    bairro: "",
                    cidade: "",
                    complemento: "",
                    numero: 0,
                },
                destino: {
                    bairro: "",
                    cidade: "",
                    complemento: "",
                    numero: 0,
                },

                data: "",
                status: "",
                distanciaPercorrer: 0
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
                return this.editedIndex === -1 ? "Nova ordem de tráfego" : "Atualizar ordem de tráfego";
            }
        },

        watch: {
            dialog(val) {
                val || this.fecharDialog();
            }
        },

        created() {
            this.$vuetify.theme.dark = true;
            this.buscaOrdensTrafego();
        },

        methods: {
            buscaOrdensTrafego() {
                OrdemTrafegoService.listar().then(resposta => {
                    this.listaOrdensTrafego = resposta.data;
                });
            },

            buscarVeiculos() {
                VeiculoServce.listarVeiculos().then(resposta => {
                    this.listaVeiculos = resposta.data;
                })
                this.buscarCondutores();
            },
            buscarCondutores() {
                CondutorService.listar().then(resposta => {
                    this.listaCondutores = resposta.data;
                })
            },
            fecharDialog() {
                this.dialog = false;
                this.$nextTick(() => {
                    this.veiculo = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                });
            },
            inserirOrdemTrafego() {
                OrdemTrafegoService.inserir(this.ordemTrafego, this.idCondutor[0].id, this.idVeiculo[0].id).then(resposta => {
                    console.log(resposta);
                    this.buscaOrdensTrafego();
                });
                /*if (this.editedIndex > -1) {
                  Object.assign(this.desserts[this.editedIndex], this.editedItem);
                } else {
                  this.desserts.push(this.editedItem);
                }*/
                this.fecharDialog();
            },
            editarOrdemTrafego(item) {
                    this.editedIndex = this.listaOrdensTrafego.indexOf(item);
                    this.ordemTrafego = Object.assign({}, item);
                    this.idCondutor[0] = Object.assign({}, item.condutor);
                    this.idVeiculo[0] = Object.assign({}, item.veiculo);
                    this.dialog = true;
            },

            deletarCondutor(/*item*/) {
                /*if (confirm("Deseja excluir o condutor " + item.nome + " ? ")) {
                    CondutorService.apagar(item)
                        .then(resposta => {
                            this.buscaCondutores();
                            console.log(resposta);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }*/
            }
        }
    };
</script>
