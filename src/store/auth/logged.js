import store from '@/store'
import adminApi from "@/api/admin";

store.subscribe((mutation) => {
    switch (mutation.type) {
        case 'auth/setToken':
            if(mutation.payload){
                adminApi.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`
            }
        break
    }
})