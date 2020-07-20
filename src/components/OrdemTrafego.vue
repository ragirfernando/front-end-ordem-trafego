<template>
    <v-container>
        <div id="app" style="margin-top: 60px">
            <v-data-table :headers="headers" :items="listaOrdensTrafego" class="elevation-1 subtitle-1">
                <template v-slot:top>
                    <v-toolbar flat color="#">
                        <v-toolbar-title>Lista de Ordens de tráfego</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>

                        <v-dialog v-model="dialog" max-width="90%">
                            <template v-slot:activator="{ on }">
                                <v-btn color="#" dark class="mb-2" v-on="on">Nova ordem de tráfego</v-btn>
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
                                                <p class="mb-0">
                                                    Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu.
                                                    Pellentesque libero tortor, tincidunt et, tincidunt eget, semper
                                                    nec, quam. Phasellus blandit leo ut odio.
                                                </p>

                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text>

                                                <p class="mb-0">
                                                    Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui
                                                    magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce
                                                    commodo aliquam arcu.
                                                </p>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text>
                                                <p class="mb-0">
                                                    Cras sagittis. Phasellus nec sem in justo pellentesque facilisis.
                                                    Proin sapien ipsum, porta a, auctor quis, euismod ut, mi.
                                                </p>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>

                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text>
                                                <p class="mb-0">
                                                    Cras sagittis. Phasellus nec sem in justo pellentesque facilisis.
                                                    Proin sapien ipsum, porta a, auctor quis, euismod ut, mi.
                                                </p>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>

                                    <v-tab-item>
                                        <v-card flat>
                                            <v-card-text>
                                                <p class="mb-0">
                                                    Cras sagittis. Phasellus nec sem in justo pellentesque facilisis.
                                                    Proin sapien ipsum, porta a, auctor quis, euismod ut, mi.
                                                </p>
                                            </v-card-text>
                                        </v-card>
                                    </v-tab-item>
                                </v-tabs>


                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="white" text @click="fecharDialog">Cancelar</v-btn>
                                    <v-btn color="white" text @click="inserirCondutor">Salvar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.acoes="{ item }">
                    <v-icon small class="mr-2" @click="editarCondutor(item)">mdi-pencil</v-icon>
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
            headers: [
                {text: "Origem", align: "start", sortable: false, value: "origem.bairro"},
                {text: "Destino", sortable: false, value: "destino.bairro"},
                {text: "Categoria Cnh", sortable: false, value: "cnh.categoriaCNH"},
                {text: "Data", sortable: false, value: "data"},
                {text: "Status", sortable: false, value: "status"},
                {text: "Distancia", sortable: false, value: "distanciaPercorrer"},
                /*{text: "CPF", sortable: false, value: "cpf"},
                {text: "Matricula", sortable: false, value: "matricula"},*/
                {text: "Ações", value: "acoes", sortable: false}
            ],
            listaOrdensTrafego: [],
            editedIndex: -1,
            ordemTrafego: {
                origem: {
                    bairro: "",
                    cidade: "",
                    complemento: "",
                    nunero: 0,
                },
                destino: {
                    bairro: "",
                    cidade: "",
                    complemento: "",
                    nunero: 0,
                }
                ,
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
            fecharDialog() {
                this.dialog = false;
                this.$nextTick(() => {
                    this.veiculo = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                });
            },
            inserirCondutor() {
                /*CondutorService.inserirVeiculo(this.condutor).then(resposta => {
                    console.log(resposta);
                    this.buscaCondutores();
                });*/
                /*if (this.editedIndex > -1) {
                  Object.assign(this.desserts[this.editedIndex], this.editedItem);
                } else {
                  this.desserts.push(this.editedItem);
                }*/
                //this.fecharDialog();
            },
            editarCondutor(/*item*/) {
                /*CondutorService.atualizar(item).then(resposta => {
                    console.log(resposta);

                    this.editedIndex = this.listaCondutores.indexOf(item);
                    this.condutor = Object.assign({}, item);
                    this.dialog = true;
                });*/
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
