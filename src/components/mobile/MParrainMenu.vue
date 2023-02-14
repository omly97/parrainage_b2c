<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item
                v-for="(item, index) in items"
                :key="index"
                link
                :to="{ name: item.route }"
            >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
export default {
    name: 'MParrainMenu',
    data: () => ({
        items: [
            {
                title: 'Import parrrain',
                route: 'parrain-create'
            },
            {
                title: 'Creer un parrrain',
                route: 'parrain-create'
            },
        ],
    }),
}
</script>
