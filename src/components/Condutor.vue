<template>
  <v-container>
    <div id="app" style="margin: 60px -9%;">
      <v-card>
        <v-alert
            v-model="alertSucesso"
            type="success"
            close-text="Close Alert"
            dismissible>
          {{ mensagemSuccess }}
        </v-alert>

        <v-alert
            v-model="alertInfo"
            type="info"
            close-text="Close Alert"
            dismissible>
          {{ mensagemInfo }}
        </v-alert>

        <v-expansion-panels popout style="margin-bottom: 10px;">
          <v-expansion-panel>
            <v-expansion-panel-header style="font-size: 25px">Consultas</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-tabs botton>
                <v-tab>
                  <v-icon left>{{ iconCategoriaCNH }}</v-icon>
                  Número da CNH
                </v-tab>

                <v-tab>
                  <v-icon left>{{ iconCategoriaCNH }}</v-icon>
                  Categoria CNH
                </v-tab>

                <v-tab>
                  <v-icon left>{{ iconnomeCondutor }}</v-icon>
                  Nome
                </v-tab>

                <v-tab-item>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                          v-model="cnhCondutor"
                          label="Digite a cnh do condutor *"
                      ></v-text-field>
                    </v-col>
                    <v-btn style="margin-top: 25px" @click="listarCondutorNumeroCnh()">Buscar condutor</v-btn>
                  </v-row>
                </v-tab-item>

                <v-tab-item>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                          v-model="categoriaCnhCondutor"
                          :items="categoriaCnh"
                          :rules="regra"
                          label="Selecione a categoria da CNH *"
                      ></v-select>
                    </v-col>
                    <v-btn style="margin-top: 25px" @click="listarCondutoresCategoriaCnh()">Buscar condutores</v-btn>
                  </v-row>
                </v-tab-item>

                <v-tab-item>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                          v-model="nomeCondutor"
                          label="Digite o nome do condutor *"
                      ></v-text-field>
                    </v-col>
                    <v-btn style="margin-top: 25px" @click="buscaCondutorNome">Buscar condutor</v-btn>
                  </v-row>
                </v-tab-item>
              </v-tabs>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-banner style="margin-bottom: 10px" v-model="dialogOrdensTrafego" single-line transition="slide-y-transition">
          <v-checkbox v-model="dialogOrdensTrafego" label="Fechar"></v-checkbox>
          <v-data-table style="margin-left: 55px" :headers="cabecalhoOrdensTrafego" :items="listaOrdensTrafego">
          </v-data-table>
        </v-banner>

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
                      type="error"
                      close-text="Close Alert"
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

                          <v-col cols="12" sm="6" md="4">
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
                                    label="Validade da CNH"
                                    persistent-hint
                                    v-bind="attrs"
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
                                :rules="regra"
                                label="Selecione a categoria da CNH *"
                            ></v-select>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.endereco.cep" label="Cep *"
                                required
                                @keyup="consultarCep"
                                v-mask="'#####-###'"
                                :rules="regra"></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.endereco.localidade"
                                label="Cidade *"
                                required
                                :rules="regra"></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.endereco.uf"
                                label="Estado *"
                                required
                                :rules="regra"></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.endereco.logradouro"
                                label="Logradouro *"
                                required
                                :rules="regra"></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.endereco.bairro"
                                label="Bairro *"
                                required
                                :rules="regra"></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                                v-model="condutor.endereco.numero"
                                label="Número *"
                                required
                                v-mask="'########'"
                                :rules="regra"></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
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
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white" text @click="dialogFormularios = false ">Cancelar</v-btn>
                    <v-btn color="white" :disabled="!valid" text @click="inserirCondutor">Salvar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.acoes="{item}">
            <v-menu
                transition="slide-x-transition"
                bottom
                right
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                    dark
                    v-bind="attrs"
                    v-on="on"
                >{{ iconClick }}
                </v-icon>
              </template>
              <v-list>
                <v-list-item @click="editarCondutor(item)">
                  <v-list-item-title>Atualizar</v-list-item-title>
                </v-list-item>

                <v-list-item @click="mostrarDialogDeletar(item)">
                  <v-list-item-title>Deletar</v-list-item-title>
                </v-list-item>

                <v-list-item @click="listarOrdensTrafegoRelacionadaCondutor(item)">
                  <v-list-item-title>Ordem tráfego veículo</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
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
import {mdiCardAccountDetailsOutline, mdiShapeOutline, mdiAccount, mdiCursorDefaultClick} from '@mdi/js';

export default {
  name: 'condutor',
  data: () => ({
    iconNumeroCNH: mdiCardAccountDetailsOutline,
    iconCategoriaCNH: mdiShapeOutline,
    iconnomeCondutor: mdiAccount,
    iconClick: mdiCursorDefaultClick,
    cnhCondutor: "",
    categoriaCnhCondutor: "",
    nomeCondutor: "",
    date: "",
    mensagemSuccess: "",
    mensagemInfo: "",
    alertSucesso: false,
    alertInfo: false,
    dateFormatted: "",
    menu1: false,
    alert: false,
    dialogDeletarVeiculo: false,
    dialogOrdensTrafego: false,
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
      {text: "Nome", class: "subtitle-1 Bold text", align: "start", sortable: false, value: "nome"},
      {text: "CPF", class: "subtitle-1 Bold text", sortable: false, value: "cpf"},
      {text: "Matricula", class: "subtitle-1 Bold text", sortable: false, value: "matricula"},
      {text: "Número CNH", class: "subtitle-1 Bold text", sortable: false, value: "cnh.numeroCNH"},
      {text: "Categoria CNH", class: "subtitle-1 Bold text", sortable: false, value: "cnh.categoriaCNH"},
      {text: "Validade da CNH", class: "subtitle-1 Bold text", sortable: false, value: "cnh.validade"},
      {text: "UF", sortable: false, class: "subtitle-1 Bold text", value: "endereco.uf"},
      {text: "Cidade", class: "subtitle-1 Bold text", sortable: false, value: "endereco.localidade"},
      {text: "Bairro", class: "subtitle-1 Bold text", sortable: false, value: "endereco.bairro"},
      {text: "Ações", class: "subtitle-1 Bold text", value: "acoes", sortable: false}
    ],
    cabecalhoOrdensTrafego: [
      {text: "Cidade de Origem", class: "subtitle-1 Bold text", sortable: false, value: "origem.localidade"},
      {text: "uf de Origem", class: "subtitle-1 Bold text", sortable: false, value: "origem.uf"},
      {text: "Cidade de Destino", class: "subtitle-1 Bold text", sortable: false, value: "destino.localidade"},
      {text: "uf de Destino", class: "subtitle-1 Bold text", sortable: false, value: "origem.uf"},
      {text: "Data", class: "subtitle-1 Bold text", sortable: false, value: "data"},
      {text: "Hora", class: "subtitle-1 Bold text", sortable: false, value: "hora"},
      {text: "Condutor", class: "subtitle-1 Bold text", sortable: false, value: "condutor.nome"},
      {text: "Veículo", class: "subtitle-1 Bold text", sortable: false, value: "veiculo.modelo"},
      {text: "Status", class: "subtitle-1 Bold text", sortable: false, value: "status"},
      {text: "Distância", class: "subtitle-1 Bold text", sortable: false, value: "distanciaPercorrer"},
    ],
    listaCondutores: [],
    listaOrdensTrafego: [],
    condutor: {
      id: null,
      nome: "",
      cnh: {
        id: null,
        numeroCNH: "",
        categoriaCNH: "",
        validade: "",
      },
      endereco: {
        id: null,
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
    ordemTrafego: {
      origem: {
        id: null,
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        numero: "",
        uf: ""
      },
      destino: {
        cep: "",
        logradouro: "",
        complemento: "",
        bairro: "",
        localidade: "",
        numero: "",
        uf: ""
      },
      id: null,
      hora: "",
      status: "",
      data: "",
      distanciaPercorrer: ""
    },

  }),

  computed: {},

  watch: {
    date(val) {
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

    formatDate(date) {
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
      }).catch(error => {
        console.log(error)
      });
    },

    listarCondutorNumeroCnh() {
      CondutorService.listarCondutorNumeroCnh(this.cnhCondutor).then(resposta => {
        if (resposta.data.length == 0) {
          this.alertInfo = true
          this.mensagemInfo = "Nenhum condutor com o número da CNH: '" + this.cnhCondutor + "' em nossa base de dados!"
          setTimeout(this.fecharAlertInfo, 5000);
        } else {
          this.listaCondutores = [];
          resposta.data.cnh.validade = this.formatDate(resposta.data.cnh.validade)
          this.listaCondutores.push(resposta.data)
        }
      }).catch(error => {
        console.log(error)
      });
    },

    listarCondutoresCategoriaCnh() {
      let lista = []
      CondutorService.listarCondutoresCategoriaCnh(this.categoriaCnhCondutor).then(resposta => {
        if (resposta.data.length == 0) {
          this.alertInfo = true
          this.mensagemInfo = "Não há condutores com a categoria da CNH: '" + this.categoriaCnhCondutor + "' em nossa base de dados!"
          setTimeout(this.fecharAlertInfo, 5000);
        } else {
          this.listaCondutores = [];
          resposta.data.forEach(da => {
            da.cnh.validade = this.formatDateBr(da.cnh.validade)
            lista.push(da)
          })
          this.listaCondutores = lista
        }
      }).catch(error => {
        console.log(error)
      });
    },

    buscaCondutorNome() {
      let lista = []
      CondutorService.buscaCondutorNome(this.nomeCondutor).then(resposta => {
        if (resposta.data.length == 0) {
          this.alertInfo = true
          this.mensagemInfo = "Não há condutor com o nome: '" + this.nomeCondutor + "' em nossa base de dados!"
          setTimeout(this.fecharAlertInfo, 5000);
        } else {
          this.listaCondutores = [];
          resposta.data.forEach(da => {
            da.cnh.validade = this.formatDateBr(da.cnh.validade)
            lista.push(da)
          })
          this.listaCondutores = lista
        }
      }).catch(error => {
        console.log(error)
      });
    },

    listarOrdensTrafegoRelacionadaCondutor(item) {
      let listaAuxiliar = [];
      CondutorService.listarOrdensTrafegoRelacionadaCondutor(item.id).then(resposta => {
        if (resposta.data.length == 0) {
          this.alertInfo = true
          this.dialogOrdensTrafego = false;
          this.mensagemInfo = "Esse condutor não está relacionado a nenhuma ordem de tráfego!"
          setTimeout(this.fecharAlertInfo, 5000);
        } else {
          resposta.data.forEach(res => {
            res.data = this.formatDate(res.data);
            listaAuxiliar.push(res);
          })
          this.listaOrdensTrafego = listaAuxiliar
          this.dialogOrdensTrafego = true;
        }
      });
    },

    fecharAlertInfo() {
      this.alertInfo = false
    },

    mostrarDialogFormularios() {
      this.dialogFormularios = true;
      this.novoOuAtualizar = "Inserir novo condutor";
      this.condutor.id = null
      this.condutor.cnh.id = null
      this.condutor.endereco.id = null
      this.reset();
      this.listarCondutores();
    },

    reset() {
      this.$refs.form.reset()
    },

    formatarDataInserir(date) {
      const dateFormatada = date.split('/')
      return `${dateFormatada[2]}-${dateFormatada[1]}-${dateFormatada[0]}`
    },

    inserirCondutor() {
      this.condutor.endereco.cep = this.condutor.endereco.cep.replace("-", "");
      this.condutor.cnh.validade = this.formatarDataInserir(this.condutor.cnh.validade);
      if (this.condutor.id == null) {
        CondutorService.inserirVeiculo(this.condutor).then(resposta => {
          console.log(resposta);
          this.listarCondutores();
          this.alertSucesso = true
          this.mensagemSuccess = "Condutor salvo com sucesso!"
          setTimeout(this.fecharAlertSucesso, 3000);
        }).catch(error => {
          console.log(error)
        });
      } else {
        CondutorService.atualizar(this.condutor).then(resposta => {
          console.log(resposta);
          this.mensagemSuccess = "Condutor atualizado com sucesso!"
          this.alertSucesso = true
          this.listarCondutores();
          setTimeout(this.fecharAlertSucesso, 3000);
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
      this.novoOuAtualizar = "Atualizar condutor";
      this.dialogFormularios = true;
      this.condutor = item;
    },

    fecharAlertSucesso() {
      this.alertSucesso = false;
    },

    deletarCondutor() {
      CondutorService.apagar(this.condutorDeletar.id).then(resposta => {
        console.log(resposta.data)
        this.listarCondutores()
        this.alertSucesso = true
        this.mensagemSuccess = resposta.data
        setTimeout(this.fecharAlertSucesso, 3000);
      }).catch(e => {
        console.log(e);
      });
      this.dialogDeletarVeiculo = false;
    }
  }
}
</script>

<style>
.c {
  background-color: beige;
}

</style>
