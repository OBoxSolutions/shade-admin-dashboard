<template>
    <v-pagination
        v-model="currentPage"
        :length="lastPage"
        :total-visible="8"
    >
   </v-pagination>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
    watch: {
        currentPage(newVal){
            this.paginatePage(newVal)
        }
    },
    computed: {
        ...mapGetters('messages', ['getAllMessages', 'getCurrentPage']),
        currentPage: {
            get(){
                return this.getCurrentPage
            },
            set(value){
                this.setCurrentPage(value)
            }
        },
        lastPage: {
            get(){
                return this.getAllMessages.meta.last_page
            }
        }
    },
    methods: {
        ...mapMutations('messages', ['setCurrentPage']),
        ...mapActions('messages', ['loadAllMessages']),
        async paginatePage(pageNumber){
            this.loading = true
            await this.loadAllMessages(pageNumber)
            this.loading = false
        }
    }
}
</script>