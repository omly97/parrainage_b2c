<template>
    <div>
        <v-tabs v-model="tabs" grow>
            <v-tabs-slider></v-tabs-slider>
            <v-tab
                v-for="item in tabsComponents"
                :key="item.href"
                :href="`#${item.href}`"
            >
                {{ item.title }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tabs">
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
    name: 'MLocaliteTabs',
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
