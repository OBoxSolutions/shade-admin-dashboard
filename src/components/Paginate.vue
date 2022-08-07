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
        ...mapGetters('messages', ['getAllMessages', 'getCurrentPage', 'isFiltered', 'getFilterData']),
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
        ...mapMutations('messages', ['setCurrentPage', 'setFilterData']),
        ...mapActions('messages', ['loadAllMessages', 'filterMessages']),
        async paginatePage(pageNumber){
            this.loading = true
            if (!this.isFiltered){
                await this.loadAllMessages(pageNumber)
            }
            else{
                const filterData = this.getFilterData
                filterData.pageNumber = pageNumber
                this.setFilterData(filterData)
                await this.filterMessages(filterData)
            }
            this.loading = false
        }
    }
}
</script>