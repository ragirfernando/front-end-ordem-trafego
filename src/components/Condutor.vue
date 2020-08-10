<template>
  <v-container>
    <div id="app" style="margin: 60px -9%;">
      <v-card>
        <v-data-table :headers="headers" :items="listaCondutores" :search="search">
          <template v-slot:top style="width: 90%">
            <v-toolbar flat color="#">
              <v-toolbar-title>Lista de Condutores</v-toolbar-title>
              <v-dialog v-model="dialogDeletarVeiculo" max-width="350">
                <v-card>
                  <v-card-title class="headline">Deletar condutor</v-card-title>
                  <v-card-text v-if="condutorDeletar != null">Deseja de deletar o condutor, nome:
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
              <v-card-title style="width: 75%">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Filtrar"
                    single-line
                    hide-details
                ></v-text-field>
                <v-btn style="margin-right: -6%; margin-left: 2%" @click="mostrarDialogFormularios">Novo Condutor
                </v-btn>
              </v-card-title>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialogFormularios" max-width="80%">
                <div>
                  <v-alert
                      v-model="alert"
                      border="left"
                      close-text="Close Alert"
                      color="deep-purple accent-4"
                      dark
                      dismissible
                  >
                    Por favor, digite um cep válido
                  </v-alert>
                </div>

                <v-card>
                  <v-card-title>
                    <span style="margin: 0px 0px -30px 10px"> {{ novoOuAtualizar }}</span>
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
                            <v-text-field
                                v-model="condutor.nome"
                                label="Nome *"
                                :rules="regra"></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.cpf"
                                label="CPF *"
                                required
                                v-mask="'###.###.###-##'"
                                :rules="regra"></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.cnh.numeroCNH"
                                label="Número da CNH *"
                                v-mask="'##########'"
                                :rules="regra"
                            ></v-text-field>

                          </v-col>

                          <v-col class="alinhaInputs" cols="12" sm="6" md="4">
                            <v-menu
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
                                    label="Date"
                                    persistent-hint
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker locale="br" v-model="date" no-title @input="menu1 = false"></v-date-picker>
                            </v-menu>
                          </v-col>

                          <v-col class="alinhaInputs" cols="12" sm="6" md="4">
                            <v-select
                                v-model="condutor.cnh.categoriaCNH"
                                :items="categoriaCnh"
                                :rules="regra"
                                label="Selecione a categoria da CNH *"
                            ></v-select>
                          </v-col>

                          <v-col class="alinhaInputs" cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.endereco.cep" label="Cep *"
                                required
                                @keyup="consultarCep"
                                v-mask="'#####-###'"
                                :rules="regra"></v-text-field>
                          </v-col>

                          <v-col class="alinhaInputs" cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.endereco.localidade"
                                label="Cidade *"
                                required
                                :rules="regra"></v-text-field>
                          </v-col>

                          <v-col class="alinhaInputs" cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.endereco.uf"
                                label="Estado *"
                                required
                                :rules="regra"></v-text-field>
                          </v-col>

                          <v-col class="alinhaInputs" cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.endereco.logradouro"
                                label="Logradouro *"
                                required
                                :rules="regra"></v-text-field>
                          </v-col>

                          <v-col class="alinhaInputs" cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.endereco.bairro"
                                label="Bairro *"
                                required
                                :rules="regra"></v-text-field>
                          </v-col>

                          <v-col class="alinhaInputs" cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.endereco.numero"
                                label="Número *"
                                required
                                v-mask="'########'"
                                :rules="regra"></v-text-field>
                          </v-col>

                          <v-col class="alinhaInputs" cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.endereco.complemento"
                                label="Complemento *"
                                required
                                :rules="regra"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                  </v-card-text>
                  <v-card-actions style="margin-top: -60px">
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
            <v-card-subtitle>Nenhum codutor para ser mostrado.</v-card-subtitle>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import CondutorService from '../service/condutorService';
import ConsultarCepService from '../service/cepService'

export default {
  name: 'condutor',
  data: () => ({
    date: "",
    dateFormatted: "",
    menu1: false,
    alert: false,
    dialogDeletarVeiculo: false,
    condutorDeletar: {},
    valid: true,
    lazy: false,
    regra: [v => !!v || "Campo é obrigatorio"],
    dataValidadeCNH: false,
    search: '',
    categoriaCnh: ["B", "C", "D", "E"],
    drawer: null,
    dialogFormularios: false,
    novoOuAtualizar: "",
    headers: [
      {text: "Nome", align: "start", sortable: false, value: "nome"},
      {text: "CPF", sortable: false, value: "cpf"},
      {text: "Matricula", sortable: false, value: "matricula"},
      {text: "Número CNH", sortable: false, value: "cnh.numeroCNH"},
      {text: "Categoria CNH", sortable: false, value: "cnh.categoriaCNH"},
      {text: "Validade da CNH", sortable: false, value: "cnh.validade"},
      {text: "UF", sortable: false, value: "endereco.uf"},
      {text: "Cidade", sortable: false, value: "endereco.localidade"},
      {text: "Bairro", sortable: false, value: "endereco.bairro"},
      {text: "Ações", value: "acoes", sortable: false}
    ],
    listaCondutores: [],
    condutor: {
      id: null,
      nome: "",
      cnh: {
        numeroCNH: "",
        categoriaCNH: "",
        validade: "",
      },
      endereco: {
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        numero: "",
        uf: ""
      },
      cpf: "",
      matricula: ""
    },

  }),

  computed: {

  },

  watch: {
    date (val) {
      console.log(val)
      this.condutor.cnh.validade = this.formatDate(this.date)
    },
  },

  created() {
    this.$vuetify.theme.dark = true;
    this.listarCondutores();
  },

  methods: {
    consultarCep() {
      this.alert = false;
      if (this.condutor.endereco.cep.length == 9) {
        ConsultarCepService.consultarCep(this.condutor.endereco.cep).then(resposta => {
          if (resposta.data.erro) {
            this.alert = true;
            this.condutor.endereco.logradouro = "";
            this.condutor.endereco.bairro = "";
            this.condutor.endereco.localidade = "";
            this.condutor.endereco.uf = "";
          } else {
            this.condutor.endereco.logradouro = resposta.data.logradouro;
            this.condutor.endereco.bairro = resposta.data.bairro;
            this.condutor.endereco.localidade = resposta.data.localidade;
            this.condutor.endereco.uf = resposta.data.uf;
          }
        }).catch(error => {
          console.log(error)
        });
      }
    },

    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    formatDateBr(date) {
      const dateFormatada = date.split('-')
      return `${dateFormatada[2]}/${dateFormatada[1]}/${dateFormatada[0]}`
    },

    listarCondutores() {
      let lista = []
      CondutorService.listar().then(resposta => {
        resposta.data.forEach(da => {
          da.cnh.validade = this.formatDateBr(da.cnh.validade)
          lista.push(da)
        })
        this.listaCondutores = lista
        console.log(this.listaCondutores)
      }).catch(error => {
        console.log(error)
      });
    },

    mostrarDialogFormularios() {
      this.dialogFormularios = true;
      this.novoOuAtualizar = "Inserir novo condutor";
      this.reset();

    },

    reset() {
      this.$refs.form.reset()
    },

    formatarDataInserir(date) {
      const dateFormatada = date.split('/')
      return `${dateFormatada[2]}-${dateFormatada[1]}-${dateFormatada[0]}`
    },

    inserirCondutor() {
      this.condutor.cnh.validade = this.formatarDataInserir(this.condutor.cnh.validade)
      this.condutor.endereco.cep = this.condutor.endereco.cep.replace("-", "");
      if (this.condutor.id == null) {
        console.log(this.condutor.id)
        CondutorService.inserirVeiculo(this.condutor).then(resposta => {
          console.log(resposta);
          this.listarCondutores();
        }).catch(error => {
          console.log(error)
        });

      } else {
        console.log(this.condutor.id)
        this.condutor.endereco.cep = this.condutor.endereco.cep.replace("-", "");
        CondutorService.atualizar(this.condutor).then(resposta => {
          console.log(resposta);
          this.listarCondutores();
        }).catch(error => {
          console.log(error)
        });
      }
      this.dialogFormularios = false;
    },

    mostrarDialogDeletar(item) {
      this.condutorDeletar = item;
      this.dialogDeletarVeiculo = true;
    },

    editarCondutor(item) {
      this.dialogFormularios = true;
      this.condutor = item;
    },

    deletarCondutor() {
      CondutorService.apagar(this.condutorDeletar.id).then(resposta => {
        console.log(resposta.data)
        this.listarCondutores()
      }).catch(e => {
        console.log(e);
      });
      this.dialogDeletarVeiculo = false;
    }
  }
}
</script>

<style>
.alinhaInputs {
  margin-top: -30px;
}
</style>
