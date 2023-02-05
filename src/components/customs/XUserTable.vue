<template>
    <div>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Prenom Nom</th>
                        <th class="text-left">Email</th>
                        <th class="text-left">Profile</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in users"
                        :key="item.id"
                        style="cursor: pointer"
                    >
                        <td>{{ `${item.prenom} ${item.nom}` }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.profile }}</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
    </div>
</template>

<script>
export default {
    name: 'XUserTable',
    props: {
        users: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            userId: ''
        }
    },
}
</script>

<style scoped>
td {
    -webkit-user-select: none; /* Safari */        
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */
}
</style>
