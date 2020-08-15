<template>
  <v-container>
    <div id="app" style="margin: 60px -7% ; ">
      <v-data-table :headers="headers" :items="listaOrdensTrafego" class="elevation-1 subtitle-1" :search="filtrar">
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

            <v-dialog v-model="dialog" max-width="95%" style="height: 0px">
              <template v-slot:activator="{ on }">
                <v-btn color="#" dark class="mb-2" v-on="on">Nova ordem de
                  tráfego
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-tabs botton>
                  <v-tab>
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
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
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
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item>
                    <v-simple-table >
                      <template v-slot:default>
                        <thead>
                        <tr>
                          <th class="text-left">Name</th>
                          <th class="text-left">Modelo</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>{{ veiculo.anoFabricacao }}</td>
                          <td>{{ veiculo.modelo }}</td>
                        </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <hr/>
                    <v-expansion-panels popout>
                      <v-expansion-panel>
                        <v-expansion-panel-header @click="listarVeiculos">Lista de veículos</v-expansion-panel-header>
                        <v-expansion-panel-content>
                           <v-text-field
                               v-model="filtrarVeiculo"
                               append-icon="mdi-magnify"
                               label="Filtrar"
                               single-line
                               hide-details
                           ></v-text-field>

                          <v-data-table :headers="colunasVeiculo" :items="listaVeiculos" :search="filtrarVeiculo">
                            <template v-slot:item.acoes="{item}">
                              <v-icon @click="selecionarVeiculo(item)">mdi-pencil</v-icon>
                            </template>
                          </v-data-table>

                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>




                  </v-tab-item>

                  <v-tab-item>
                    <!--<v-simple-table style="margin-bottom: 20px">
                      <template v-slot:default>
                        <thead>
                        <tr>
                          <th class="text-left">Name</th>
                          <th class="text-left">Modelo</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>{{ dveiculo.anoFabricacao }}</td>
                          <td>{{ dveiculo.modelo }}</td>
                        </tr>
                        </tbody>
                      </template>
                    </v-simple-table>

                    <v-expansion-panels focusable>
                      <v-expansion-panel>
                        <v-expansion-panel-header @click="f">Lista de veículos</v-expansion-panel-header>
                        <v-expansion-panel-content >
                          <v-text-field
                              v-model="filtrarCondutor"
                              append-icon="mdi-magnify"
                              label="Filtrar"
                              single-line
                              hide-details
                          ></v-text-field>
                          <v-data-table :headers="colunasCondutor" loading="true" :items="listaCondutores" :search="filtrarCondutor">
                            <template v-slot:item.acoes="{item}">
                              <v-icon @click="selecionar(item)">mdi-pencil</v-icon>
                            </template>
                            <template v-slot:no-data>
                              <v-btn color="primary" @click="buscaOrdensTrafego">Reset</v-btn>
                            </template>
                          </v-data-table>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>-->
                  </v-tab-item>

                  <v-tab-item>
                    <v-card flat>
                      <v-card-text>
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
                                    label="Date"
                                    persistent-hint
                                    v-bind="attrs"
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
                                          label="Distância "></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-select
                                v-model="ordemTrafego.status"
                                :items="statusOrdemTrafego"
                                :rules="[v => !!v || 'Campo obrigatório']"
                                label="Selecione o status *"
                            ></v-select>
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
/*import CondutorService from '../service/condutorService';
import VeiculosService from "../service/veiculoService";*/
import ConsultarCepService from "@/service/cepService";
import VeiculoService from "@/service/veiculoService";

export default {
  name: 'ordemTrafego',
  data: () => ({
    dateFormatted: "",
    descriptionLimit: 60,
    entries: [],
    statusOrdemTrafego: ["ANDAMENTO", "AGENDADA", "FINALIZADA"],
    entries2: [],
    isLoading: false,
    isLoading2: false,
    model: null,
    menu1: false,
    model1: null,
    regra: [v => !!v || "Campo é obrigatorio"],
    date: "",
    filtrar: '',
    filtrarVeiculo: '',
    filtrarCondutor: '',
    search1: null,
    search2: null,
    menu: false,
    modal: false,
    menu2: false,
    menu4: false,
    time: null,
    menu3: false,
    drawer: null,
    dialog: false,
    singleSelect: true,
    headers: [
      {
        text: "Cidade de Origem",
        align: "start",
        class: "subtitle-1 Bold text",
        sortable: false,
        value: "origem.localidade"
      },
      {text: "Cidade de Destino", class: "subtitle-1 Bold text", sortable: false, value: "destino.localidade"},
      {text: "Data", class: "subtitle-1 Bold text", sortable: false, value: "data"},
      {text: "Condutor", class: "subtitle-1 Bold text", sortable: false, value: "condutor.nome"},
      {text: "Veículo", class: "subtitle-1 Bold text", sortable: false, value: "veiculo.modelo"},
      {text: "Status", class: "subtitle-1 Bold text", sortable: false, value: "status"},
      {text: "Distância", class: "subtitle-1 Bold text", sortable: false, value: "distanciaPercorrer"},
      {text: "Ações", class: "subtitle-1 Bold text", value: "acoes", sortable: false}
    ],
    colunasVeiculo: [
      {text: "Marca", align: "start", class: "subtitle-2 Bold text", sortable: false, value: "marca"},
      {text: "Modelo", sortable: false, class: "subtitle-2 Bold text", value: "modelo"},
      {text: "Quilometragem ", class: "subtitle-2 Bold text", sortable: false, value: "kmRodados"},
      {text: "Placa", sortable: false, class: "subtitle-2 Bold text", value: "placa"},
      {text: "Cor", sortable: false, class: "subtitle-2 Bold text", value: "cor"},
      {text: "Ano", sortable: false, class: "subtitle-2 Bold text", value: "anoFabricacao"},
      {text: "Categoria", sortable: false, class: "subtitle-2 Bold text", value: "categoriaVeiculo"},
      {text: "Combustível", sortable: false, class: "subtitle-2 Bold text", value: "tipoCombustivel"},
      {text: "Conservação", sortable: false, class: "subtitle-2 Bold text", value: "estadoConservacao"},
      {text: "Ações", value: "acoes", class: "subtitle-2 Bold text", sortable: false}
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

    veiculo: {
      marca: "",
      modelo: "",
      kmRodados: "",
      placa: "",
      cor: "",
      anoFabricacao: "Por favor, clique em Lista de veículos e selecione um veículo.",
      categoriaVeiculo: "",
      tipoCombustivel: "",
      estadoConservacao: ""
    },

    listaVeiculos: [],

    /*listaVeiculos: {
      marca: "",
      modelo: "",
      kmRodados: "",
      placa: "",
      cor: "",
      anoFabricacao: "",
      categoriaVeiculo: "",
      tipoCombustivel: "",
      estadoConservacao: ""
    },*/
    listaCondutores: {
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
    editedIndex: -1,
    ordemTrafego: {
      origem: {
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
    dialog(val) {
      val || this.fecharDialog();
    },

  },

  created() {
    this.$vuetify.theme.dark = true;
    this.buscaOrdensTrafego();
  },

  methods: {
    listarVeiculos() {
      VeiculoService.listarVeiculos().then(resposta => {
        this.listaVeiculos = resposta.data;
        console.log(this.listaVeiculos)
      }).catch(error => {
        console.log(error)
      })
    },


    selecionarVeiculo(item) {
      this.veiculo = item
      console.log(item)
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
    buscaOrdensTrafego() {
      OrdemTrafegoService.listar().then(resposta => {
        resposta.data.forEach(da => {
          da.data = this.formatDate(da.data)
        })
        this.listaOrdensTrafego = resposta.data;
      });
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
      this.ordemTrafego.hora = this.time

      this.ordemTrafego.data = this.formatarDataInserir(this.ordemTrafego.data)

      console.log("Orde " + this.ordemTrafego)
      if (this.ordemTrafego.id == null) {
        OrdemTrafegoService.inserir(this.ordemTrafego, this.model1.id, this.model.id,).then(resposta => {
          console.log(resposta);
          this.buscaOrdensTrafego();
        });
        this.fecharDialog();
      } else {

        /* this.ordemTrafego.data = this.formatarDataInserir(this.ordemTrafego.data)*/
        OrdemTrafegoService.editar(this.ordemTrafego, this.model1.id, this.model.id,).then(resposta => {
          console.log(resposta);
          this.buscaOrdensTrafego();
        });
        this.fecharDialog();
      }
    },

    editarOrdemTrafego(item) {
      this.editedIndex = this.listaOrdensTrafego.indexOf(item);
      this.ordemTrafego = Object.assign({}, item);
      this.time = this.ordemTrafego.hora;

      this.model1 = Object.assign({}, item.condutor);
      this.model = Object.assign({}, item.veiculo);
      console.log(this.model)
      this.dialog = true;
    },

    deletarCondutor(item) {
      if (confirm("Deseja excluir a ordem " + item.status + " ? ")) {
        OrdemTrafegoService.deletar(item.id)
            .then(resposta => {
              this.buscaOrdensTrafego();
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
