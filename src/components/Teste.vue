<template>
  <v-container>
    <div id="app" style="margin-top: 60px">
      <v-app id="inspire">
        <div>
          <v-row
              justify="center"
          >


            <v-menu
                bottom
                offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                    class="ma-2"
                    v-bind="attrs"
                    v-on="on"
                >A Menu
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                    @click="m"
                >
                  <v-list-item-title>S</v-list-item-title>
                </v-list-item>
              </v-list>

              <v-list>
                <v-list-item
                    @click="m"
                >
                  <v-list-item-title>S</v-list-item-title>
                </v-list-item>
              </v-list>

              <v-list>
                <v-list-item
                    @click="m"
                >
                  <v-list-item-title>S</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

          </v-row>
        </div>
      </v-app>

    </div>
  </v-container>
</template>
<script>


export default {
  name: 'teste',

  data() {
    return {
      dialog: false,
      dialog2: false,
      dialog3: false,
      notifications: false,
      sound: true,
      widgets: false,
      items: [
        {
          title: 'Click Me',
        },
        {
          title: 'Click Me',
        },
        {
          title: 'Click Me',
        },
        {
          title: 'Click Me 2',
        },
      ],
      select: [
        {text: 'State 1'},
        {text: 'State 2'},
        {text: 'State 3'},
        {text: 'State 4'},
        {text: 'State 5'},
        {text: 'State 6'},
        {text: 'State 7'},
      ],
    }
  },
  methods:{
    m(){
      alert("sdsf")
    }
  }



};
</script>
