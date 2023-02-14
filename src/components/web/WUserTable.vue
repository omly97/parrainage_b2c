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
    name: 'WUserTable',
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
