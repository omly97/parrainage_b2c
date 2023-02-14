<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">Nom</th>
                    <th class="text-left">Region</th>
                    <th class="text-left">Departement</th>
                    <th class="text-left">arrondissement</th>
                    <th class="text-left">Commune</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in localites"
                    :key="item.id"
                    @dblclick="$router.push({ name: 'localite-show', params: {localiteId: item.id} })"
                    style="cursor: pointer"
                >
                    <td>{{ item.nom }}</td>
                    <td>{{ item.region }}</td>
                    <td>{{ item.departement }}</td>
                    <td>{{ item.arrondissement }}</td>
                    <td>{{ item.commune }}</td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
export default {
    name: 'XwLocaliteTable',
    props: {
        localites: {
            type: Array,
            required: true
        }
    }
}
</script>
