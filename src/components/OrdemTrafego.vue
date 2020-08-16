<template>
  <v-container>
    <div id="app" style="margin: 60px -7% ; ">
      <v-data-table :headers="cabecalhoOrdensTrafego" :items="listaOrdensTrafego" class="elevation-1 subtitle-1"
                    :search="filtrar">
        <template v-slot:top>
          <v-toolbar flat color="#">
            <v-toolbar-title>Lista de Ordens de tráfego</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-card-title style="width: 45%">
              <v-text-field
                  v-model="filtrar"
                  append-icon="mdi-magnify"
                  label="Filtrar"
                  single-line
                  hide-details
              ></v-text-field>
            </v-card-title>
            <v-spacer></v-spacer>
            <v-btn @click="novaOrdemTrafego">Nova ordem de tráfego</v-btn>
            <v-dialog
                v-model="dialogoDeletar"
                max-width="90%"
            >
              <v-card>
                <v-card-title>
                  <span>Deseja deletar essa ordem de tráfego?</span>
                </v-card-title>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                      color="primary"
                      text
                      @click="dialogoDeletar = false"
                  >
                    Fecha
                  </v-btn>

                  <v-btn
                      color="primary"
                      text
                      @click="deletarOrdemTrafego"
                  >
                    Deletar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialog" max-width="95%" style="height: 0px">
              <v-card>
                <div>
                  <v-alert
                      v-model="alert"
                      type="error"
                      close-text="Close Alert"
                      dismissible
                  >
                    {{ mesagemError }}
                  </v-alert>
                </div>
                <v-card-title>
                  <span class="headline">{{ editarOuAtualizar }}</span>
                </v-card-title>
                <v-form
                    ref="form"
                    v-model="valid"
                    :lazy-validation="lazy"
                >
                  <v-tabs botton>
                    <v-tab>
                      <v-icon left>{{ iconVeiculo }}</v-icon>
                      Veículo
                    </v-tab>

                    <v-tab>
                      <v-icon left>{{ iconCondutor }}</v-icon>
                      Condutor
                    </v-tab>

                    <v-tab>
                      <v-icon left>{{ iconOrigem }}</v-icon>
                      Origem
                    </v-tab>

                    <v-tab>
                      <v-icon left>{{ iconDestino }}</v-icon>
                      Destino
                    </v-tab>

                    <v-tab>
                      <v-icon left>{{ iconSalvar }}</v-icon>
                      Salvar
                    </v-tab>

                    <v-tab-item>
                      <hr/>
                      <v-data-table :headers="cabecalhoVeiculoSelecionado" :items="veiculoSelecionado" :rules="regra">
                        <template v-slot:no-data>
                          <v-card-subtitle>Nenhum veículo adicionado</v-card-subtitle>
                        </template>
                      </v-data-table>
                      <hr/>
                      <v-expansion-panels popout>
                        <v-expansion-panel>
                          <v-expansion-panel-header style="font-size: 25px" @click="listarVeiculos">
                            Lista de veículos
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-text-field
                                v-model="filtrarVeiculo"
                                append-icon="mdi-magnify"
                                label="Filtrar"
                                single-line
                                hide-details
                            ></v-text-field>
                            <hr/>
                            <v-data-table :headers="cabecalhoVeiculos" :items="listaVeiculos" :search="filtrarVeiculo">
                              <template v-slot:item.acoes="{item}">
                                <v-icon @click="selecionarVeiculo(item)">{{ iconSelecionar }}</v-icon>
                              </template>
                            </v-data-table>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-tab-item>

                    <v-tab-item>
                      <hr/>
                      <v-data-table :headers="cabecalhoCondutorSelecionado" :items="condutorSelecionado" :rules="regra">
                        <template v-slot:no-data>
                          <v-card-subtitle>Nenhum condutor adicionado</v-card-subtitle>
                        </template>
                      </v-data-table>
                      <hr/>
                      <v-expansion-panels popout>
                        <v-expansion-panel>
                          <v-expansion-panel-header @click="listarCondutores" style="font-size: 25px">Lista de
                            condutores
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <v-text-field
                                v-model="filtrarCondutor"
                                append-icon="mdi-magnify"
                                label="Filtrar"
                                single-line
                                hide-details
                            ></v-text-field>
                            <hr/>
                            <v-data-table :headers="cabecalhoCondutores" :items="listaCondutores"
                                          :search="filtrarCondutor">
                              <template v-slot:item.acoes="{item}">
                                <v-icon @click="selecionarCondutor(item)">{{ iconSelecionar }}</v-icon>
                              </template>
                            </v-data-table>

                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-tab-item>

                    <v-tab-item>
                      <v-card flat>
                        <v-card-text>
                          <v-form
                              ref="formOrigem"
                              v-model="valid1"
                              :lazy-validation="lazy1"
                          >
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.origem.cep" label="Cep"
                                              required
                                              @keyup="consultarCepOrigem"
                                              v-mask="'#####-###'"
                                              :rules="regra"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.origem.localidade" label="Cidade"
                                              required
                                              :rules="regra"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.origem.uf" label="Estado"
                                              required
                                              :rules="regra"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.origem.logradouro" label="Logradouro"
                                              required
                                              :rules="regra"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.origem.bairro" label="Bairro"
                                              required
                                              :rules="regra"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.origem.numero" label="Número"
                                              required
                                              v-mask="'###############'"
                                              :rules="regra"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.origem.complemento"
                                              label="Complemento" required
                                              :rules="regra"></v-text-field>
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-tab-item>

                    <v-tab-item>
                      <v-card flat>
                        <v-card-text>
                          <v-form
                              ref="formDestino"
                              v-model="valid2"
                              :lazy-validation="lazy2"
                          >
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.destino.cep" label="Cep"
                                              required
                                              @keyup="consultarCepDestino"
                                              v-mask="'#####-###'"
                                              :rules="regra"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.destino.localidade" label="Cidade"
                                              required
                                              :rules="regra"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.destino.uf" label="Estado"
                                              required
                                              :rules="regra"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.destino.logradouro" label="Logradouro"
                                              required
                                              :rules="regra"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.destino.bairro" label="Bairro"
                                              required
                                              :rules="regra"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.destino.numero" label="Número"
                                              required
                                              :rules="regra"></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.destino.complemento"
                                              label="Complemento" required
                                              :rules="regra"></v-text-field>
                              </v-col>
                            </v-row>
                          </v-form>
                        </v-card-text>
                      </v-card>
                    </v-tab-item>

                    <v-tab-item>
                      <v-card flat>
                        <v-card-text>
                          <!--<v-form
                              ref="formStatus"
                              v-model="valid3"
                              :lazy-validation="lazy3"
                          >-->
                            <v-row>
                              <v-col cols="12" sm="6" md="4">
                                <v-menu
                                    ref="menu"
                                    v-model="menu3"
                                    :close-on-content-click="false"
                                    :nudge-right="40"
                                    :return-value.sync="time"
                                    transition="scale-transition"
                                    offset-y
                                    max-width="290px"
                                    min-width="290px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="time"
                                        label="Hora"
                                        readonly
                                        :rules="regra"
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-time-picker
                                      v-if="menu3"
                                      v-model="time"
                                      format="24hr"
                                      full-width
                                      @click:minute="$refs.menu.save(time)"
                                  ></v-time-picker>
                                </v-menu>
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
                                        v-model="ordemTrafego.data"
                                        label="Data"
                                        persistent-hint
                                        v-bind="attrs"
                                        :rules="regra"
                                        v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                      locale="br"
                                      v-model="date"
                                      no-title
                                      @input="menu1 = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-text-field v-model="ordemTrafego.distanciaPercorrer"
                                              :rules="regra"
                                              label="Distância "></v-text-field>
                              </v-col>

                              <v-col cols="12" sm="6" md="4">
                                <v-select
                                    v-model="ordemTrafego.status"
                                    :items="statusOrdemTrafego"
                                    :rules="regra"
                                    label="Selecione o status *"
                                ></v-select>
                              </v-col>
                            </v-row>
                          <!--</v-form>-->
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="white" text @click="fecharDialog">Cancelar</v-btn>
                          <v-btn color="white" :disabled="!valid" text @click="inserirOrdemTrafego">Salvar</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-tab-item>
                  </v-tabs>
                </v-form>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.acoes="{ item }">
          <v-icon small class="mr-2" @click="editarOrdemTrafego(item)">mdi-pencil</v-icon>
          <v-icon small @click="dialogoDeletarOrdemTrafego(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="listarOrdensTrafego">Reset</v-btn>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script>
import {mdiHomeFloor1, mdiHomeFloor2, mdiCarBack, mdiCardAccountDetails, mdiContentSaveAll, mdiPlusBox} from '@mdi/js';
import OrdemTrafegoService from '../service/ordemTrafegoService';
import CondutorService from '../service/condutorService';
import ConsultarCepService from "@/service/cepService";
import VeiculoService from "@/service/veiculoService";

export default {
  name: 'ordemTrafego',
  data: () => ({
    alert: false,
    mesagemError: "",
    valid: true,
    lazy: false,
    valid1: true,
    lazy1: false,
    valid2: true,
    lazy2: false,
    valid3: false,
    lazy3: true ,
    iconOrigem: mdiHomeFloor1,
    iconDestino: mdiHomeFloor2,
    iconVeiculo: mdiCarBack,
    iconCondutor: mdiCardAccountDetails,
    iconSalvar: mdiContentSaveAll,
    iconSelecionar: mdiPlusBox,
    idAuxiliar: "",
    statusOrdemTrafego: ["ANDAMENTO", "AGENDADA", "FINALIZADA"],
    model: null,
    menu1: false,
    model1: null,
    regra: [v => !!v || "Campo é obrigatorio"],
    date: "",
    filtrar: '',
    filtrarVeiculo: '',
    filtrarCondutor: '',
    menu: false,
    time: null,
    menu3: false,
    drawer: null,
    dialog: false,
    dialogoDeletar: false,
    cabecalhoOrdensTrafego: [
      {text: "Cidade de Origem", class: "subtitle-1 Bold text", sortable: false, value: "origem.localidade"},
      {text: "Cidade de Destino", class: "subtitle-1 Bold text", sortable: false, value: "destino.localidade"},
      {text: "Data", class: "subtitle-1 Bold text", sortable: false, value: "data"},
      {text: "Hora", class: "subtitle-1 Bold text", sortable: false, value: "hora"},
      {text: "Condutor", class: "subtitle-1 Bold text", sortable: false, value: "condutor.nome"},
      {text: "Veículo", class: "subtitle-1 Bold text", sortable: false, value: "veiculo.modelo"},
      {text: "Status", class: "subtitle-1 Bold text", sortable: false, value: "status"},
      {text: "Distância", class: "subtitle-1 Bold text", sortable: false, value: "distanciaPercorrer"},
      {text: "Ações", class: "subtitle-1 Bold text", value: "acoes", sortable: false}
    ],
    cabecalhoVeiculos: [
      {text: "Marca", align: "start", class: "subtitle-1 Bold text", sortable: false, value: "marca"},
      {text: "Modelo", sortable: false, class: "subtitle-1 Bold text", value: "modelo"},
      {text: "Quilometragem ", class: "subtitle-1 Bold text", sortable: false, value: "kmRodados"},
      {text: "Placa", sortable: false, class: "subtitle-1 Bold text", value: "placa"},
      {text: "Cor", sortable: false, class: "subtitle-1 Bold text", value: "cor"},
      {text: "Ano", sortable: false, class: "subtitle-1 Bold text", value: "anoFabricacao"},
      {text: "Categoria", sortable: false, class: "subtitle-1 Bold text", value: "categoriaVeiculo"},
      {text: "Combustível", sortable: false, class: "subtitle-1 Bold text", value: "tipoCombustivel"},
      {text: "Conservação", sortable: false, class: "subtitle-1 Bold text", value: "estadoConservacao"},
      {text: "Ações", value: "acoes", class: "subtitle-2 Bold text", sortable: false}
    ],
    cabecalhoVeiculoSelecionado: [
      {text: "Marca", align: "start", class: "subtitle-1 Bold text", sortable: false, value: "marca"},
      {text: "Modelo", sortable: false, class: "subtitle-1 Bold text", value: "modelo"},
      {text: "Quilometragem ", class: "subtitle-1 Bold text", sortable: false, value: "kmRodados"},
      {text: "Placa", sortable: false, class: "subtitle-1 Bold text", value: "placa"},
      {text: "Cor", sortable: false, class: "subtitle-1 Bold text", value: "cor"},
      {text: "Ano", sortable: false, class: "subtitle-1 Bold text", value: "anoFabricacao"},
      {text: "Categoria", sortable: false, class: "subtitle-1 Bold text", value: "categoriaVeiculo"},
      {text: "Combustível", sortable: false, class: "subtitle-1 Bold text", value: "tipoCombustivel"},
      {text: "Conservação", sortable: false, class: "subtitle-1 Bold text", value: "estadoConservacao"},
    ],
    cabecalhoCondutores: [
      {text: "Nome", align: "start", class: "subtitle-1 Bold text", sortable: false, value: "nome"},
      {text: "Categoria Cnh", class: "subtitle-1 Bold text", sortable: false, value: "cnh.categoriaCNH"},
      {text: "Validade", class: "subtitle-1 Bold text", sortable: false, value: "cnh.validade"},
      {text: "Cidade", class: "subtitle-1 Bold text", sortable: false, value: "endereco.localidade"},
      {text: "Bairro", class: "subtitle-1 Bold text", sortable: false, value: "endereco.bairro"},
      {text: "CPF", class: "subtitle-1 Bold text", sortable: false, value: "cpf"},
      {text: "Matricula", class: "subtitle-1 Bold text", sortable: false, value: "matricula"},
      {text: "Ações", value: "acoes", class: "subtitle-1 Bold text", sortable: false}
    ],
    cabecalhoCondutorSelecionado: [
      {text: "Nome", class: "subtitle-1 Bold text", align: "start", sortable: false, value: "nome"},
      {text: "Categoria Cnh", class: "subtitle-1 Bold text", sortable: false, value: "cnh.categoriaCNH"},
      {text: "Validade", class: "subtitle-1 Bold text", sortable: false, value: "cnh.validade"},
      {text: "Cidade", class: "subtitle-1 Bold text", sortable: false, value: "endereco.localidade"},
      {text: "Bairro", class: "subtitle-1 Bold text", sortable: false, value: "endereco.bairro"},
      {text: "CPF", class: "subtitle-1 Bold text", sortable: false, value: "cpf"},
      {text: "Matricula", class: "subtitle-1 Bold text", sortable: false, value: "matricula"},
    ],
    listaOrdensTrafego: [],
    veiculoSelecionado: [],
    listaVeiculos: [],
    condutorSelecionado: [],
    listaCondutores: [],
    veiculo: {
      marca: "",
      modelo: "",
      kmRodados: "",
      placa: "",
      cor: "",
      anoFabricacao: "",
      categoriaVeiculo: "",
      tipoCombustivel: "",
      estadoConservacao: ""
    },
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
    editarOuAtualizar: "",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nova ordem de tráfego" : "Atualizar ordem de tráfego";
    },
  },

  watch: {
    date(val) {
      console.log(val)
      this.ordemTrafego.data = this.formatDate(this.date)
    },
  },

  created() {
    this.$vuetify.theme.dark = true;
    this.listarOrdensTrafego();
  },

  methods: {
    listarOrdensTrafego() {
      let listaAuxiliar = [];
      OrdemTrafegoService.listar().then(resposta => {
        resposta.data.forEach(da => {
          da.data = this.formatDate(da.data)
          da.condutor.cnh.validade = this.formatDate(da.condutor.cnh.validade)
          listaAuxiliar.push(da)
        })
        this.listaOrdensTrafego = listaAuxiliar;
      });
    },

    listarVeiculos() {
      VeiculoService.listarVeiculos().then(resposta => {
        this.listaVeiculos = resposta.data;
        console.log(this.listaVeiculos)
      }).catch(error => {
        console.log(error)
      })
    },

    listarCondutores() {
      let listaAuxiliar = []
      CondutorService.listar().then(resposta => {
        resposta.data.forEach(da => {
          da.cnh.validade = this.formatDate(da.cnh.validade)
          listaAuxiliar.push(da)
        })
        this.listaCondutores = listaAuxiliar
      }).catch(error => {
        console.log(error)
      })
    },

    selecionarVeiculo(item) {
      this.veiculoSelecionado = []
      this.veiculoSelecionado.push(item)
    },

    selecionarCondutor(item) {
      this.condutorSelecionado = []
      this.condutorSelecionado.push(item)
    },
    consultarCepOrigem() {
      if (this.ordemTrafego.origem.cep.length == 9) {
        ConsultarCepService.consultarCep(this.ordemTrafego.origem.cep).then(resposta => {
          if (resposta.data.erro) {
            this.ordemTrafego.origem.logradouro = "";
            this.ordemTrafego.origem.bairro = "";
            this.ordemTrafego.origem.localidade = "";
            this.ordemTrafego.origem.uf = "";
          } else {
            this.ordemTrafego.origem.logradouro = resposta.data.logradouro;
            this.ordemTrafego.origem.bairro = resposta.data.bairro;
            this.ordemTrafego.origem.localidade = resposta.data.localidade;
            this.ordemTrafego.origem.uf = resposta.data.uf;
          }
        }).catch(error => {
          console.log(error)
        });
      }
    },

    consultarCepDestino() {
      if (this.ordemTrafego.destino.cep.length == 9) {
        ConsultarCepService.consultarCep(this.ordemTrafego.destino.cep).then(resposta => {
          if (resposta.data.erro) {
            this.ordemTrafego.destino.logradouro = "";
            this.ordemTrafego.destino.bairro = "";
            this.ordemTrafego.destino.localidade = "";
            this.ordemTrafego.origem.uf = "";
          } else {
            this.ordemTrafego.destino.logradouro = resposta.data.logradouro;
            this.ordemTrafego.destino.bairro = resposta.data.bairro;
            this.ordemTrafego.destino.localidade = resposta.data.localidade;
            this.ordemTrafego.destino.uf = resposta.data.uf;
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

    parseDate(date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },

    novaOrdemTrafego() {
      this.ordemTrafego.id = null;
      this.ordemTrafego.origem.id = null;
      this.ordemTrafego.destino.id = null;
      this.dialog = true;
      this.reset()
      this.listarOrdensTrafego();
    },

    reset() {
      this.$refs.formOrigem.reset()
      this.$refs.formDestino.reset()
      this.$refs.formStatus.reset()
    },

    fecharDialog() {
      this.dialog = false;
    },

    formatarDataInserir(date) {
      console.log(date)
      const dateFormatada = date.split('/')
      return `${dateFormatada[2]}-${dateFormatada[1]}-${dateFormatada[0]}`
    },

    inserirOrdemTrafego() {
      if (this.veiculoSelecionado.length <= 0 || this.condutorSelecionado.length <= 0) {
        this.alert = true;
        this.mesagemError = "Por favor, selecione o veículo e condutor!"
      } else {
        this.alert = false;
        this.mesagemError = "";

        this.ordemTrafego.hora = this.time
        this.ordemTrafego.data = this.formatarDataInserir(this.ordemTrafego.data)


        if (this.ordemTrafego.id == null) {
          OrdemTrafegoService.inserir(this.ordemTrafego, this.condutorSelecionado[0].id, this.veiculoSelecionado[0].id).then(resposta => {
            console.log(resposta);
            this.listarOrdensTrafego();
          });
        } else {
          this.ordemTrafego.condutor.cnh.validade = this.formatarDataInserir(this.ordemTrafego.condutor.cnh.validade)
          OrdemTrafegoService.editar(this.ordemTrafego, this.condutorSelecionado[0].id, this.veiculoSelecionado[0].id).then(resposta => {
            console.log(resposta);
            this.listarOrdensTrafego();
          });
        }
        this.dialog = false;
      }
    },

    editarOrdemTrafego(item) {
      this.ordemTrafego = item;
      this.time = this.ordemTrafego.hora;

      this.veiculoSelecionado = [];
      this.condutorSelecionado = [];

      this.veiculoSelecionado.push(item.veiculo);
      this.condutorSelecionado.push(item.condutor)

      this.dialog = true;
    },

    dialogoDeletarOrdemTrafego(item) {
      this.idAuxiliar = item.id
      this.dialogoDeletar = true;
    },

    deletarOrdemTrafego() {
      OrdemTrafegoService.deletar(this.idAuxiliar).then(resposta => {
        this.listarOrdensTrafego();
        console.log(resposta);
      }).catch(e => {
        console.log(e);
      });
      this.idAuxiliar = "";
      this.dialogoDeletar = false;
    }

  }
};
</script>
