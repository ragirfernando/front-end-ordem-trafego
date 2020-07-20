<template>
    <v-container>
        <div id="app" style="margin-top: 60px">
            <v-app id="inspire">
                <v-card>
                    <v-toolbar flat color="#">
                        <v-toolbar-title>Cadastrar Ordem de tráfego</v-toolbar-title>
                    </v-toolbar >
                    <v-tabs  botton>
                        <v-tab show-arrows="true">
                            <v-icon  left>mdi-account</v-icon>
                            Origem

                        </v-tab>
                        <v-tab >
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

                        <v-tab-item >
                            <v-card flat>
                                <v-card-text>
                                    <p class="mb-0">
                                        Phasellus dolor. Fusce neque. Fusce fermentum odio nec arcu. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Phasellus blandit leo ut odio.
                                    </p>

                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>

                                    <p class="mb-0">
                                        Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu.
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
                                   <p class="mb-0">
                                        Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi.
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>

                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
                                    <p class="mb-0">
                                        Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi.
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>

                        <v-tab-item>
                            <v-card flat>
                                <v-card-text>
                                   <p class="mb-0">
                                        Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi.
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-card>
            </v-app>
        </div>
    </v-container>
</template>

<script>

    export default {
        name: 'teste',


    };

</script>

<style>
    /* Helper classes */
    .basil {
        background-color: #FFFBE6 !important;
    }

    .basil--text {
        color: #356859 !important;
    }
</style>
