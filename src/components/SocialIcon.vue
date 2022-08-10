<template>
    <div>
        <v-icon large left v-if="social === 'Messanger'">mdi-facebook-messenger</v-icon>
        <v-icon large left v-if="social === 'Instagram'">mdi-instagram</v-icon>
        <v-icon large left v-if="social === 'Discord'">mdi-discord</v-icon>
        <v-icon large left v-if="social === 'Email'">mdi-email</v-icon>
    </div>
</template>

<script>
export default {
    props: ['social']
}
</script>