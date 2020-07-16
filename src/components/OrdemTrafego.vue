<template>
    <v-container>
        <div id="app" style="margin-top: 60px">
            <v-data-table :headers="headers" :items="listaOrdensTrafego" class="elevation-1 subtitle-1">
                <template v-slot:top>
                    <v-toolbar flat color="#">
                        <v-toolbar-title>Lista de Ordens de tráfego</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>

                        <v-dialog v-model="dialog" max-width="900px">
                            <template v-slot:activator="{ on }">
                                <v-btn color="#" dark class="mb-2" v-on="on">Nova ordem de tráfego</v-btn>
                            </template>
                            <v-card>
                                <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="ordemTrafego.origem.bairro"
                                                              label="Bairro de origem" required
                                                              :rules="regra"></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        v-model="ordemTrafego.origem.cidade"
                                                        label="Cidade de origem"
                                                        required
                                                        :rules="regra"
                                                ></v-text-field>
                                            </v-col>


                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="ordemTrafego.origem.complemento" label="Completo Origem" required
                                                              :rules="regra"></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="ordemTrafego.origem.nunero" label="Número origem" required
                                                              :rules="regra"></v-text-field>
                                            </v-col>



                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="ordemTrafego.destino.bairro"
                                                              label="Bairro de destino" required
                                                              :rules="regra"></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field
                                                        v-model="ordemTrafego.destino.cidade"
                                                        label="Cidade de destino"
                                                        required
                                                        :rules="regra"
                                                ></v-text-field>
                                            </v-col>


                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="ordemTrafego.destino.complemento" label="Completo destino" required
                                                              :rules="regra"></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="ordemTrafego.destino.nunero" label="Número destino" required
                                                              :rules="regra"></v-text-field>
                                            </v-col>


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
                                                        <v-btn text color="primary" @click="menu = false">Cancelar
                                                        </v-btn>
                                                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK
                                                        </v-btn>
                                                    </v-date-picker>
                                                </v-menu>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="ordemTrafego.status" label="Status" required
                                                              :rules="regra"></v-text-field>
                                            </v-col>

                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="ordemTrafego.distanciaPercorrer" label="Distancia" required
                                                              :rules="regra"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="white" text @click="fecharDialog">Cancelar</v-btn>
                                    <v-btn color="white" text @click="inserirCondutor">Salvar</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.acoes="{  }">
                    <v-icon small class="mr-2" @click="editarCondutor()">mdi-pencil</v-icon>
                    <v-icon small @click="deletarCondutor()">mdi-delete</v-icon>
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
                return this.editedIndex === -1 ? "Novo condutor" : "Atualizar condutor";
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
