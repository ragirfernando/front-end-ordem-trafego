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

            <v-dialog v-model="dialog" max-width="95%" style="height: 0px">              <template v-slot:activator="{ on }">
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
                              <tr class="subtitle-2 Bold text">
                                <th>Marca</th>
                                <th>Modelo</th>
                                <th>Quilometragem</th>
                                <th>Placa</th>
                                <th>Cor</th>
                                <th>Ano</th>
                                <th>Categoria</th>
                                <th>Combustível</th>
                                <th>Conservação</th>
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <td>{{listaVeiculos.marca }}</td>
                                <td>{{listaVeiculos.marca }}</td>
                                <td>{{listaVeiculos.kmRodados }}</td>
                                <td>{{listaVeiculos.placa }}</td>
                                <td>{{listaVeiculos.cor }}</td>
                                <td>{{listaVeiculos.anoFabricacao }}</td>
                                <td>{{listaVeiculos.categoriaVeiculo }}</td>
                                <td>{{listaVeiculos.tipoCombustivel }}</td>
                                <td>{{listaVeiculos.estadoConservacao }}</td>
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
                                <!--<th>Modelo</th>
                                <th>Quilometragem</th>
                                <th>Placa</th>
                                <th>Cor</th>
                                <th>Ano</th>
                                <th>Categoria</th>
                                <th>Combustível</th>
                                <th>Conservação</th>-->
                              </tr>
                              </thead>
                              <tbody>
                              <tr>
                                <td>{{listaCondutores.nome }}</td>
                                <!--<td>{{listaVeiculos.marca }}</td>
                                <td>{{listaVeiculos.kmRodados }}</td>
                                <td>{{listaVeiculos.placa }}</td>
                                <td>{{listaVeiculos.cor }}</td>
                                <td>{{listaVeiculos.anoFabricacao }}</td>
                                <td>{{listaVeiculos.categoriaVeiculo }}</td>
                                <td>{{listaVeiculos.tipoCombustivel }}</td>
                                <td>{{listaVeiculos.estadoConservacao }}</td>-->
                              </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-card>
                      </v-card>
                    </v-card>
                  </v-tab-item>

                 <!-- <v-tab-item>
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
                  </v-tab-item>-->

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
import CondutorService from '../service/condutorService';
import VeiculosService from "../service/veiculoService";

export default {
  name: 'ordemTrafego',
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    entries2: [],
    isLoading: false,
    isLoading2: false,
    model: null,
    model1: null,
    /*marca: "",
    modelo: "",
    km: null,
    placa: "",
    cor: "",
    anoFabicacao: null,
    categoriaVeiculo: "",
    tipoCombustivel: "",
    estadoConservacao: "",*/

    regra: [v => !!v || "Campo é obrigatorio"],
    date: new Date().toISOString().substr(0, 10),
    filtrar: '',
    search1: null,
    search2: null,
    menu: false,
    modal: false,
    menu2: false,
    drawer: null,
    dialog: false,
    singleSelect: true,
    headers: [
      {text: "Cidade de Origem", align: "start", sortable: false, value: "origem.localidade"},
      {text: "Cidade de Destino", sortable: false, value: "destino.localidade"},
      {text: "Data", sortable: false, value: "data"},
      {text: "Condutor", sortable: false, value: "condutor.nome"},
      {text: "Veiculo", sortable: false, value: "veiculo.modelo"},
      {text: "Status", sortable: false, value: "status"},
      {text: "Distância", sortable: false, value: "distanciaPercorrer"},
      {text: "Ações", value: "acoes", sortable: false}
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
    /*listaVeiculos: [],*/
    /*listaCondutores: [],*/
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
      hora: "",
      status: "",
      data: "",
      distanciaPercorrer: ""
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
    },
    fields1() {
      if (!this.model) return []
      return Object.keys(this.model).map(key => {
        key;
        this.listaVeiculos.marca = this.model.marca;
        this.listaVeiculos.modelo = this.model.modelo;
        this.listaVeiculos.km = this.model.km;
        this.listaVeiculos.placa = this.model.placa;
        this.listaVeiculos.cor = this.model.cor;
        this.listaVeiculos.anoFabicacao = this.model.anoFabicacao;
        this.listaVeiculos.categoriaVeiculo = this.model.categoriaVeiculo;
        this.listaVeiculos.tipoCombustivel = this.model.tipoCombustivel;
        this.listaVeiculos.estadoConservacao = this.model.estadoConservacao;
        /*console.log("Lista de veículo: " + this.listaVeiculos.marca)*/
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
        this.listaCondutores.nome = this.model1.nome;

        /*console.log("Lista de veículo: " + this.listaVeiculos.marca)*/
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
    buscaOrdensTrafego() {
      OrdemTrafegoService.listar().then(resposta => {
        this.listaOrdensTrafego = resposta.data;
      });
    },
    /*buscarVeiculos() {
      VeiculoServce.listarVeiculos().then(resposta => {
        this.listaVeiculos = resposta.data;
      })
      this.buscarCondutores();
    },*/

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
