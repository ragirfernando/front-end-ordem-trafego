<template>
  <v-container>
    <div id="app" style="margin: 60px -9% ; ">
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
                            <v-text-field v-model="ordemTrafego.origem.cep" label="Cep"
                                          required
                                          @keyup="consultarCep('origem')"
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
                    <v-card flat>
                      <v-card dark>
                        <v-card-text>
                          <v-autocomplete
                              v-model="model"
                              :items="items1"
                              :loading="isLoading"
                              :search-input.sync="search1"
                              color="white"
                              hide-no-data
                              hide-selected
                              item-text="modelo"
                              item-value="API"
                              placeholder="Digitar para pesquisar"
                              prepend-icon="mdi-database-search"
                              return-object
                          ></v-autocomplete>
                        </v-card-text>

                        <v-card>
                          <span style="display: none">{{ fields1 }}></span>
                          <v-simple-table>
                            <template v-slot:default>
                              <thead>
                              <tr>
                                <th class="subtitle-1 Bold text">Marca</th>
                                <th class="subtitle-1 Bold text">Modelo</th>
                                <th class="subtitle-1 Bold text">Quilometragem</th>
                                <th class="subtitle-1 Bold text">Placa</th>
                                <th class="subtitle-1 Bold text">Cor</th>
                                <th class="subtitle-1 Bold text">Ano de fabricação</th>
                                <th class="subtitle-1 Bold text">Categoria</th>
                                <th class="subtitle-1 Bold text">Combustível</th>
                                <th class="subtitle-1 Bold text">Conservação</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <td>{{ listaVeiculos.marca }}</td>
                                <td>{{ listaVeiculos.modelo }}</td>
                                <td>{{ listaVeiculos.kmRodados }}</td>
                                <td>{{ listaVeiculos.placa }}</td>
                                <td>{{ listaVeiculos.cor }}</td>
                                <td>{{ listaVeiculos.anoFabricacao }}</td>
                                <td>{{ listaVeiculos.categoriaVeiculo }}</td>
                                <td>{{ listaVeiculos.tipoCombustivel }}</td>
                                <td>{{ listaVeiculos.estadoConservacao }}</td>
                              </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-card>
                      </v-card>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item>
                    <v-card flat>
                      <v-card dark>
                        <v-card-text>
                          <v-autocomplete
                              v-model="model1"
                              :items="items2"
                              :loading="isLoading2"
                              :search-input.sync="search2"
                              color="white"
                              hide-no-data
                              hide-selected
                              item-text="nome"
                              item-value="API"
                              placeholder="Digitar para pesquisar"
                              prepend-icon="mdi-database-search"
                              return-object
                          ></v-autocomplete>
                        </v-card-text>

                        <v-card>
                          <span style="display: none">{{ fields2 }}></span>
                          <v-simple-table>
                            <template v-slot:default>
                              <thead>
                              <tr class="subtitle-2 Bold text">
                                <th>Nome</th>
                                <th>Categoria Cnh</th>
                                <th>Validade Cnh</th>
                                <th>Cidade</th>
                                <th>Bairro</th>
                                <th>CPF</th>
                                <th>Matricula</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <td>{{ listaCondutores.nome }}</td>
                                <td>{{ listaCondutores.cnh.categoriaCNH }}</td>
                                <td>{{ listaCondutores.cnh.validade }}</td>
                                <td>{{ listaCondutores.endereco.localidade }}</td>
                                <td>{{ listaCondutores.endereco.bairro }}</td>
                                <td>{{ listaCondutores.cpf }}</td>
                                <td>{{ listaCondutores.matricula }}</td>

                              </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-card>
                      </v-card>
                    </v-card>
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
import CondutorService from '../service/condutorService';
import VeiculosService from "../service/veiculoService";
import ConsultarCepService from "@/service/cepService";

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
    listaVeiculos: {
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
    fields1() {
      if (!this.model) return []
      return Object.keys(this.model).map(key => {
        key;
        this.listaVeiculos = this.model;
        /*this.listaVeiculos.marca = this.model.marca;
        this.listaVeiculos.modelo = this.model.modelo;
        this.listaVeiculos.modelo = this.model.modelo;
        this.listaVeiculos.kmRodados = this.model.kmRodados;
        this.listaVeiculos.placa = this.model.placa;
        this.listaVeiculos.cor = this.model.cor;
        this.listaVeiculos.anoFabricacao = this.model.anoFabricacao;
        this.listaVeiculos.categoriaVeiculo = this.model.categoriaVeiculo;
        this.listaVeiculos.tipoCombustivel = this.model.tipoCombustivel;
        this.listaVeiculos.estadoConservacao = this.model.estadoConservacao;*/
      })
    },

    items1() {
      return this.entries.map(entry => {
        const modelo = entry.modelo
        return Object.assign({}, entry, {modelo})
      })
    },

    fields2() {
      if (!this.model1) return []
      return Object.keys(this.model1).map(key => {
        key;
        this.listaCondutores = this.model1
        /*this.listaCondutores.nome = this.model1.nome;
        this.listaCondutores.cnh.categoriaCNH = this.model1.cnh.categoriaCNH;
        this.listaCondutores.cnh.validade = this.model1.cnh.validade;
        this.listaCondutores.endereco.localidade = this.model1.endereco.localidade;
        this.listaCondutores.endereco.bairro = this.model1.endereco.bairro;
        this.listaCondutores.cpf = this.model1.cpf;
        this.listaCondutores.matricula = this.model1.matricula;*/

      })
    },

    items2() {
      return this.entries2.map(entry => {
        const nome = entry.nome
        return Object.assign({}, entry, {nome})
      })
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
    search1() {
      if (this.items1.length > 0) return
      if (this.isLoading) return
      this.isLoading = true
      VeiculosService.listarVeiculos().then(res => {
        this.entries = res.data
      }).catch(err => {
        console.log(err)
      }).finally(() => (this.isLoading = false))
    },

    search2() {
      if (this.items2.length > 0) return
      if (this.isLoading2) return
      this.isLoading2 = true
      CondutorService.listar().then(res => {
        this.entries2 = res.data
      }).catch(err => {
        console.log(err)
      }).finally(() => (this.isLoading2 = false))
    },
  },

  created() {
    this.$vuetify.theme.dark = true;
    this.buscaOrdensTrafego();
  },

  methods: {
    cep(cep) {
      let enderecoRespostaApi = {};
      ConsultarCepService.consultarCep(cep).then(resposta => {
        enderecoRespostaApi = resposta.data;
      }).catch(error => {
        console.log(error)
      });

      return enderecoRespostaApi;
    },

    consultarCep(endereco) {
      if (endereco === "origem") {
        if (this.ordemTrafego.origem.cep.length == 9) {
          const enderecoCep = this.cep(this.ordemTrafego.origem.cep)

          if (enderecoCep) {
            /*console.log("endereco "+enderecoCep)*/
            this.ordemTrafego.origem.logradouro = "";
            this.ordemTrafego.origem.logradouro = "";
            this.ordemTrafego.origem.bairro = "";
            this.ordemTrafego.origem.localidade = "";
            this.ordemTrafego.origem.uf = "";
          } else {
            this.ordemTrafego.origem.logradouro = enderecoCep.logradouro;
            this.ordemTrafego.origem.bairro = enderecoCep.bairro;
            this.ordemTrafego.origem.localidade = enderecoCep.localidade;
            this.ordemTrafego.origem.uf = enderecoCep.uf;
          }
        }
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
