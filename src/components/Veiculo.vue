<template>
  <v-container style="width: 100%">
    <div id="app" style="margin: 60px -9% ; ">
      <v-data-table :headers="nomeColunas" loading="true" :items="listaVeiculos" :search="search">
        <template v-slot:top>
          <v-toolbar flat color="#">
            <v-dialog v-model="dialogDeletarVeiculo" max-width="350">
              <v-card>
                <v-card-title class="headline">Deletar veículo</v-card-title>
                <v-card-text v-if="veiculoDeletar != null">Deseja de deletat o većulo, modelo:
                  {{ veiculoDeletar.modelo }}
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
                      @click="deletarVeiculo"
                  >Deletar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-toolbar-title>Lista de veículos</v-toolbar-title>

            <v-divider class="mx-4" inset vertical></v-divider>
            <v-card-title style="width: 85%">
              <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Filtrar"
                  single-line
                  hide-details
              ></v-text-field>
              <v-btn style="margin-left: 2%" @click="mostrarDialoFormularios">Novo veículo</v-btn>
            </v-card-title>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialogFormularios" max-width="95%">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ novoOuAtualizar }}</span>
                </v-card-title>

                <v-dialog v-model="dialogCamposObrigatorios" max-width="70%" style="margin-top: 60px">
                  <v-card color="#">
                    <v-card-title class="headline">Por favor, preencher todos os campos.
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="white"
                          text
                          @click="dialogCamposObrigatorios = false"
                      >OK
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-card-text>
                  <v-container>

                    <v-form
                        ref="form"
                        v-model="valid"
                        :lazy-validation="lazy"
                    >
                      <v-row>
                        <v-col class="d-flex" cols="12" sm="6">
                          <v-select
                              v-model="veiculo.marca"
                              :items="marcaVeiculo"
                              :rules="[v => !!v || 'Campo obrigatório']"
                              label="Selecione a marca *"
                          ></v-select>
                        </v-col>

                        <v-col class="d-flex" cols="12" sm="6">
                          <v-select
                              v-model="veiculo.cor"
                              :items="corVeiculo"
                              :rules="[v => !!v || 'Campo obrigatório']"
                              label="Selecione a cor *"
                          ></v-select>
                        </v-col>

                        <v-col class="d-flex" cols="12" sm="6">
                          <v-select
                              v-model="veiculo.anoFabricacao"
                              :items="anoVeiculo"
                              @click="preencherAnoVeiculo"
                              :rules="[v => !!v || 'Campo obrigatório']"
                              label="Selecione o ano de fabricação *"
                          ></v-select>
                        </v-col>

                        <v-col class="d-flex" cols="12" sm="6">
                          <v-select
                              v-model="veiculo.categoriaVeiculo"
                              :items="categoriaVeiculo"
                              :rules="[v => !!v || 'Campo obrigatório']"
                              label="Selecione a categoria *"
                          ></v-select>
                        </v-col>

                        <v-col class="d-flex" cols="12" sm="6">
                          <v-select
                              v-model="veiculo.estadoConservacao"
                              :items="estadoConservacao"
                              :rules="[v => !!v || 'Campo obrigatório']"
                              label="Selecione o estado de Conservação"
                          ></v-select>
                        </v-col>

                        <v-col class="d-flex" cols="12" sm="6">
                          <v-select
                              v-model="veiculo.tipoCombustivel"
                              :items="combustivelVeiculo"
                              :rules="[v => !!v || 'Campo obrigatório']"
                              label="Selecione o combustível *"
                          ></v-select>
                        </v-col>

                        <v-col class="d-flex" cols="12" sm="6">
                          <v-text-field
                              v-model="veiculo.modelo"
                              label="Modelo *"
                              :rules="[v => !!v || 'Campo obrigatório']"
                          ></v-text-field>
                        </v-col>

                        <v-col class="d-flex" cols="12" sm="6">
                          <v-text-field v-model="veiculo.kmRodados"
                                        label="Quilometragem rodada *"
                                        :rules="[v => !!v || 'Campo obrigatório']"
                          ></v-text-field>
                        </v-col>

                        <v-col class="d-flex" cols="12" sm="6">
                          <v-text-field
                              v-model="veiculo.placa"
                              label="Placa *"
                              :rules="[v => !!v || 'Campo obrigatório']"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="white" text @click="fecharDialog">Cancelar</v-btn>
                  <v-btn color="white" text :disabled="!valid" @click="inserirVeiculo">Salvar</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.acoes="{item}">
          <v-icon small class="mr-2" @click="atualizarVeiculo(item)">mdi-pencil</v-icon>
          <v-icon small @click="mostrarDialogDeletar(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="#" dark @click="listarVeiculos">Sem veículos</v-btn>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>
<script>
import VeiculoService from '../service/veiculoService';
export default {
  name: "veiculo",
  data: () => ({
    valid: true,
    lazy: false,
    dialogCamposObrigatorios: false,
    dialogDeletarVeiculo: false,
    posicao: null,
    anoAtual: "",
    search: '',
    marcaVeiculo: ["Fiat", "Chevrolet", "Ford", "Toyota"],
    corVeiculo: ["Branca", "Vermelha", "Preta", "Azul", "Amarela"],
    anoVeiculo: [],
    categoriaVeiculo: ["Passeio", "Suv", "Caminhonete", "Ônibus", "Van"],
    combustivelVeiculo: ["Diesel", "Gasolina", "Álcool", "Flex"],
    estadoConservacao: ["Novo", "Seminovo", "Usado"],
    drawer: null,
    dialogFormularios: false,
    nomeColunas: [
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
    listaVeiculos: [],
    veiculoDeletar: {},
    novoOuAtualizar: "",
    veiculo: {
      id: null,
      marca: "",
      modelo: "",
      kmRodados: 0,
      placa: "",
      cor: "",
      anoFabricacao: 0,
      categoriaVeiculo: "",
      tipoCombustivel: "",
      estadoConservacao: ""
    },
  }),

  computed: {},

  watch: {
    dialog(val) {
      val || this.fecharDialog();
    }
  },

  created() {
    this.$vuetify.theme.dark = true;
    this.listarVeiculos();
  },

  methods: {
    preencherAnoVeiculo() {
      const anoAtual = new Date().getFullYear();
      let incremento = 0;
      while (incremento <= 4) {
        this.anoVeiculo.push(anoAtual - incremento)
        incremento++;
      }
    },

    mostrarDialogDeletar(item) {
      this.veiculoDeletar = item;
      this.posicao = this.veiculoDeletar[item];
      this.dialogDeletarVeiculo = true;
    },

    mostrarDialoFormularios() {
      this.dialogFormularios = true;
      this.novoOuAtualizar = "Inserir novo veículo";
      this.veiculo = Object.assign({}, []);
    },

    retornarPrimeiraLetraMaiuscula(primeiraLetraMaiuscula) {
      return primeiraLetraMaiuscula.substring(0, 1) +
          primeiraLetraMaiuscula.toLowerCase().substring(1, primeiraLetraMaiuscula.length)
    },

    retornarPalavraMaiuscula(palavra) {
      return palavra.replace("Á", "A").replace("Ô", "O").toUpperCase();
    },

    listarVeiculos() {
      let lista = [];
      VeiculoService.listarVeiculos().then(resposta => {
        resposta.data.forEach(list => {
          list.categoriaVeiculo = this.retornarPrimeiraLetraMaiuscula(list.categoriaVeiculo);
          list.tipoCombustivel = this.retornarPrimeiraLetraMaiuscula(list.tipoCombustivel);
          list.estadoConservacao = this.retornarPrimeiraLetraMaiuscula(list.estadoConservacao);
          lista.push(list)
        })
      }).catch(error => {
        console.log(error)
      })
      this.listaVeiculos = lista;
    },

    atualizarVeiculo(item) {
      this.novoOuAtualizar = "Atualizar veículo"
      this.veiculo = Object.assign({}, item);
      this.dialogFormularios = true;
    },

    deletarVeiculo() {
      VeiculoService.deletarVeiculo(this.veiculoDeletar.id).then(resposta => {
        console.log(resposta);
      }).catch(e => {
        console.log(e);
      });
      this.listaVeiculos.splice(this.posicao, 1)
      this.dialogDeletarVeiculo = false;

    },


    inserirVeiculo() {
      this.veiculo.estadoConservacao = this.retornarPalavraMaiuscula(this.veiculo.estadoConservacao);
      this.veiculo.categoriaVeiculo = this.retornarPalavraMaiuscula(this.veiculo.categoriaVeiculo);
      this.veiculo.tipoCombustivel = this.retornarPalavraMaiuscula(this.veiculo.tipoCombustivel);

      if (this.veiculo.id == null) {
        VeiculoService.inserirVeiculo(this.veiculo).then(resposta => {
          console.log(resposta);
        }).catch(error => {
          console.log(error)
        });
      } else
        VeiculoService.atualizarVeiculo(this.veiculo).then(resposta => {
          console.log(resposta)
          this.listarVeiculos();
        }).catch(error => {
          console.log(error)
        })

      this.listarVeiculos();
      this.dialogFormularios = false;

    }
  }
};
</script>
