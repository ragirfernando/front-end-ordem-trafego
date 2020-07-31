<template>
  <v-container>
    <div id="app" style="margin: 60px -9% ; ">
      <v-card>
        <v-data-table :headers="headers" :items="listaCondutores" items-per-page="5"  :search="search" no-data-text="ss">
          <template v-slot:top style="width: 90%">
            <v-toolbar flat color="#">
              <v-toolbar-title>Lista de Condutores</v-toolbar-title>
              <v-dialog v-model="dialogDeletarVeiculo" max-width="350">
                <v-card>
                  <v-card-title class="headline">Deletar condutor</v-card-title>
                  <v-card-text v-if="condutorDeletar != null">Deseja de deletar o condutor:
                    {{ condutorDeletar.nome }}
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="darken-1"
                        text
                        @click="dialogDeletarVeiculo = false"
                    >Cancelar
                    </v-btn>
                    <v-btn
                        color="darken-1"
                        text
                        @click="deletarCondutor"
                    >Deletar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-card-title style="width: 85%">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Filtrar"
                    single-line
                    hide-details
                ></v-text-field>
                <v-btn style="margin-left: 2%" @click="mostrarDialoFormularios">Novo Condutor</v-btn>
              </v-card-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogFormularios" max-width="95%">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ novoOuAtualizar }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form
                          ref="form"
                          v-model="valid"
                          :lazy-validation="lazy"
                      >
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="condutor.nome" label="Nome" :rules="regra"></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.cnh.numeroCNH"
                                label="Número cnh"
                                :rules="regra"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-menu
                                ref="menu1"
                                v-model="menu1"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="condutor.cnh.validade"
                                    label="Validade"
                                    persistent-hint
                                    v-bind="attrs"
                                    :rules="regra"
                                    v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker locale="br" v-model="date" no-title @input="menu1 = false"></v-date-picker>
                            </v-menu>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-select
                                v-model="condutor.cnh.categoriaCNH"
                                :items="categoriaCnh"
                                :rules="[v => !!v || 'Campo obrigatório']"
                                label="Selecione a categoria da CNH *"
                            ></v-select>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="condutor.endereco.cep" label="Cep"
                                          required
                                          :rules="regra"></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="condutor.endereco.localidade" label="Cidade"
                                          required
                                          :rules="regra"></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="condutor.endereco.uf" label="Estado"
                                          required
                                          :rules="regra"></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field v-model="condutor.endereco.logradouro" label="Logradouro"
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
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white" text @click="dialogFormularios = false ">Cancelar</v-btn>
                    <v-btn color="white" :disabled="!valid" text @click="inserirCondutor">Salvar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.acoes="{ item }">
            <v-icon small class="mr-2" @click="editarCondutor(item)">mdi-pencil</v-icon>
            <v-icon small @click="mostrarDialogDeletar(item)">mdi-delete</v-icon>
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

  data: (vm) => ({
    posicao: null,
    dialogDeletarVeiculo: false,
    condutorDeletar: {},
    valid: true,
    lazy: false,
    regra: [v => !!v || "Campo é obrigatorio"],
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
    menu1: false,
    search: '',
    categoriaCnh: ["B", "C", "D", "E"],
    drawer: null,
    dialogFormularios: false,
    novoOuAtualizar: "",
    headers: [
      {text: "Nome", align: "start", sortable: false, value: "nome"},
      {text: "Número Cnh", sortable: false, value: "cnh.numeroCNH"},
      {text: "Categoria Cnh", sortable: false, value: "cnh.categoriaCNH"},
      {text: "Validade", sortable: false, value: "cnh.validade"},
      {text: "Cidade", sortable: false, value: "endereco.localidade"},
      {text: "Bairro", sortable: false, value: "endereco.bairro"},
      {text: "CPF", sortable: false, value: "cpf"},
      {text: "Matricula", sortable: false, value: "matricula"},
      {text: "Ações", value: "acoes", sortable: false}
    ],
    listaCondutores: [],
    editedIndex: -1,
    condutor: {
      id: null,
      nome: "",
      cnh: {
        numeroCNH: 0,
        categoriaCNH: "",
        validade: vm.formatDate(new Date().toISOString().substr(0, 10)),
      },
      endereco: {
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        numero: 0,
        uf: ""
      },
      cpf: "",
      matricula: ""
    },

  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo condutor" : "Atualizar condutor";
    },
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },

  watch: {
    dialog(val) {
      val || this.fecharDialog();
    },
    date(val) {
      console.log(`Data: `, val)
      this.dateFormatted = this.formatDate(this.date)
    },
  },

  created() {
    this.$vuetify.theme.dark = true;
    this.buscaCondutores();
  },

  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    buscaCondutores() {
      CondutorService.listar().then(resposta => {
        this.listaCondutores = resposta.data;
      });
    },

    mostrarDialoFormularios() {
      this.dialogFormularios = true;
      this.novoOuAtualizar = "Inserir novo veículo";
      this.veiculo = Object.assign({}, []);
    },

    /*buscaCondutores:  async  function(){
        this.listaCondutores = (await CondutorService.listar()).data
    },*/

    fecharDialog() {
      this.dialogFormularios = false;
      this.$nextTick(() => {
        this.veiculo = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    inserirCondutor() {
      if (this.condutor.id == null) {
        CondutorService.inserirVeiculo(this.condutor).then(resposta => {
          console.log(resposta);
          this.buscaCondutores();
        }).catch(error => {
          console.log(error)
        });
      } else {
        CondutorService.atualizar(this.condutor).then(resposta => {
          console.log(resposta);
          this.buscaCondutores();
        }).catch(error => {
          console.log(error)
        });
      }
      this.dialogFormularios = false;
    },
    mostrarDialogDeletar(item) {
      this.condutorDeletar = item;
      this.posicao = this.condutorDeletar[item];
      this.dialogDeletarVeiculo = true;
    },
    editarCondutor(item) {
      this.editedIndex = this.listaCondutores.indexOf(item);
      this.condutor = Object.assign({}, item);
      this.dialogFormularios = true;
    },

    deletarCondutor() {
      CondutorService.apagar(this.condutorDeletar.id).then(resposta => {
        console.log(resposta);
        this.listaCondutores.splice(this.posicao, 1)
      }).catch(e => {
            console.log(e);
      });
      this.dialogDeletarVeiculo = false;
    }
  }
}
</script>
