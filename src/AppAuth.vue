<template>
    <div>
        <layout-mobile
            v-if="$vuetify.breakpoint.mobile"
        ></layout-mobile>
        <layout-web
            v-else
        ></layout-web>
    </div>
</template>

<script>
import LayoutWeb from '@/components/layout/LayoutWeb.vue'
import LayoutMobile from '@/components/layout/LayoutMobile.vue'

export default {
    name: 'AppAuth',
    data: () => ({
        // 
    }),
    components: {
        LayoutWeb,
        LayoutMobile
    }
}
</script>
