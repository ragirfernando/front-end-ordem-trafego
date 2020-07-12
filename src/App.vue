<template>
    <div id="app" style="background-color: azure">
        <v-app id="inspire">
            <v-app id="inspire">
                <v-navigation-drawer v-model="drawer" app clipped style="width: 200px">
                    <v-list dense nav>
                        <v-list-item
                                v-for="item in items"
                                :key="item.title"
                                :to="item.link"
                        >
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>

                </v-navigation-drawer>
                <router-view></router-view>
                <v-app-bar app clipped-left>
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                    <v-toolbar-title>Ordem de tráfego</v-toolbar-title>
                </v-app-bar>

                <v-footer app>
                    <span>&copy; Ragir Fernando</span>
                </v-footer>
            </v-app>
        </v-app>


    </div>
</template>

<script>
    export default {
        name: "App",
        props: {
            source: String
        },

        data: () => ({
            drawer: null,
            items: [
                {title: 'Veículo', icon: 'mdi-view-dashboard', link: '/Veiculo'},
                {title: 'Condutor', icon: 'mdi-image', link: '/Condutor'},
                {title: 'Ordem de Tráfego', icon: 'mdi-image', link: '/OrdemTrafego'}
            ],
            right: null,
        }),

        created() {
            this.$vuetify.theme.dark = true;
        }
    };
</script>
