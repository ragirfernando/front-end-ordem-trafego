<template>
    <v-container>
        <div id="app" style="margin-top: 60px">
            <v-card>
                <v-data-table :headers="headers" :items="listaCondutores" class="elevation-5 subtitle-1"
                              items-per-page="5" :search="search">
                    <template v-slot:top style="width: 90%">
                        <v-toolbar flat color="#">
                            <v-toolbar-title>Lista de Condutores</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-card-title style="width: 70%">
                                <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Filtrar"
                                        single-line
                                        hide-details
                                ></v-text-field>
                            </v-card-title>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="900px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" class="elevation-10 subtitle-1 mb-2" dark v-on="on">Novo Condutor</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="condutor.nome" label="Nome" required
                                                                  :rules="regra"></v-text-field>
                                                </v-col>

                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field
                                                            v-model="condutor.cnh.numeroCNH"
                                                            label="Número cnh"
                                                            required
                                                            :rules="regra"
                                                    ></v-text-field>
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
                                                                    v-model="condutor.cnh.validade"
                                                                    label="Validade"
                                                                    readonly
                                                                    required
                                                                    :rules="regra"
                                                                    v-on="on"
                                                            ></v-text-field>
                                                        </template>
                                                        <v-date-picker
                                                                v-model="condutor.cnh.validade"
                                                                no-title
                                                                scrollable
                                                                locale="br"
                                                        >
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary" @click="menu = false">Cancelar
                                                            </v-btn>
                                                            <v-btn text color="primary" @click="$refs.menu.save(date)">
                                                                OK
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-menu>
                                                </v-col>

                                                <v-col cols="12" sm="6" md="4">
                                                    <p>Categoria Cnh</p>
                                                    <v-overflow-btn
                                                            class="my-2"
                                                            v-model="condutor.cnh.categoriaCNH"
                                                            :items="categoriaCnh"
                                                            required
                                                            :rules="regra"
                                                            label="Selecione a categoria da CNH"
                                                            target="#dropdown-example"
                                                    ></v-overflow-btn>
                                                </v-col>

                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="condutor.endereco.cidade" label="Cidade"
                                                                  required
                                                                  :rules="regra"></v-text-field>
                                                </v-col>

                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="condutor.endereco.bairro" label="Bairro"
                                                                  required
                                                                  :rules="regra"></v-text-field>
                                                </v-col>

                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="condutor.endereco.numero" label="Número"
                                                                  required
                                                                  :rules="regra"></v-text-field>
                                                </v-col>

                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="condutor.endereco.complemento"
                                                                  label="Complemento" required
                                                                  :rules="regra"></v-text-field>
                                                </v-col>

                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="condutor.cpf" label="CPF" required
                                                                  :rules="regra"></v-text-field>
                                                </v-col>

                                                <v-col cols="12" sm="6" md="4">
                                                    <v-text-field v-model="condutor.matricula" label="Matricula"
                                                                  required
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
                    <template v-slot:item.acoes="{ item }">
                        <v-icon small class="mr-2" @click="editarCondutor(item)">mdi-pencil</v-icon>
                        <v-icon small @click="deletarCondutor(item)">mdi-delete</v-icon>
                    </template>
                    <template v-slot:no-data>
                        <v-btn color="primary" @click="buscaCondutores">Reset</v-btn>
                    </template>
                </v-data-table>
            </v-card>
        </div>
    </v-container>
</template>

<script>
    import CondutorService from '../service/condutorService';

    export default {
        name: 'condutor',
        data: () => ({
            regra: [v => !!v || "Campo é obrigatorio"],
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            search: '',
            categoriaCnh: ["B", "C", "D", "E"],
            drawer: null,
            dialog: false,
            headers: [
                {text: "Nome", align: "start", sortable: false, value: "nome"},
                {text: "Número Cnh", sortable: false, value: "cnh.numeroCNH"},
                {text: "Categoria Cnh", sortable: false, value: "cnh.categoriaCNH"},
                {text: "Validade", sortable: false, value: "cnh.validade"},
                {text: "Cidade", sortable: false, value: "endereco.cidade"},
                {text: "Bairro", sortable: false, value: "endereco.bairro"},
                {text: "CPF", sortable: false, value: "cpf"},
                {text: "Matricula", sortable: false, value: "matricula"},
                {text: "Ações", value: "acoes", sortable: false}
            ],
            listaCondutores: [],
            editedIndex: -1,
            condutor: {
                nome: "",
                cnh: {
                    numeroCNH: 0,
                    categoriaCNH: "",
                    validade: ""
                },
                endereco: {
                    cidade: "",
                    bairro: "",
                    nunero: 0,
                    complemento: ""
                },
                cpf: "",
                matricula: ""
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
            this.buscaCondutores();
        },

        methods: {
            // buscaCondutores() {
            //     CondutorService.listar().then(resposta => {
            //         this.listaCondutores = resposta.data;
            //     });
            // },

            buscaCondutores:  async  function(){
                this.listaCondutores = (await CondutorService.listar()).data
            },
            fecharDialog() {
                this.dialog = false;
                this.$nextTick(() => {
                    this.veiculo = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                });
            },
            inserirCondutor() {
                CondutorService.inserirVeiculo(this.condutor).then(resposta => {
                    console.log(resposta);
                    this.buscaCondutores();
                });
                /*if (this.editedIndex > -1) {
                  Object.assign(this.desserts[this.editedIndex], this.editedItem);
                } else {
                  this.desserts.push(this.editedItem);
                }*/
                this.fecharDialog();
            },
            editarCondutor(item) {
                CondutorService.atualizar(item).then(resposta => {
                    console.log(resposta);

                    this.editedIndex = this.listaCondutores.indexOf(item);
                    this.condutor = Object.assign({}, item);
                    this.dialog = true;
                });
            },

            deletarCondutor(item) {
                if (confirm("Deseja excluir o condutor " + item.nome + " ? ")) {
                    CondutorService.apagar(item)
                        .then(resposta => {
                            this.buscaCondutores();
                            console.log(resposta);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                }
            }
        }
    };

</script>
