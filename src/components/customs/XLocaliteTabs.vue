<template>
    <div>
        <v-toolbar flat outlined color="transparent">
            <slot name="toolbar"></slot>

            <template v-slot:extension>
                <v-tabs v-model="tabs" :height="70">
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab
                        v-for="item in tabsComponents"
                        :key="item.href"
                        :href="`#${item.href}`"
                    >
                        <v-sheet color="transparent" class="text-capitalize text-left">
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                    <v-list-item-subtitle class="text-caption">{{ item.subtitle }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-sheet>
                    </v-tab>
                </v-tabs>
            </template>
        </v-toolbar>

        <v-tabs-items v-model="tabs" class="mt-8">
            <v-tab-item
                v-for="item in hrefs"
                :key="item"
                :value="item"
            >
                <slot :name="item"></slot>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
export default {
    name: 'XLocaliteTabs',
    data() {
        return {
            tabs: null,
            hrefs: [
                'tab1',
                'tab2',
                // 'tab3',
            ],
            tabsComponents: [
                {
                    title: "Parrains",
                    subtitle: "Liste des parrains",
                    icon: 'mdi-card-account-details-outline',
                    href: 'tab1'
                },
                {
                    title: "Users",
                    subtitle: "Liste des utilisateurs",
                    icon: 'mdi-account-circle',
                    href: 'tab2'
                },
                // {
                //     title: "Parametres",
                //     subtitle: "Parametres",
                //     icon: 'mdi-cogs',
                //     href: 'tab3'
                // }
            ]
        }
    }
}
</script>
