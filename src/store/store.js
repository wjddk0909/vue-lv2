import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as mutations from './mutations'

Vue.use(Vuex) // use - 뷰의 플러그인, 뷰를 사용하는 모든 영역에 특정 기능을 추가해서 전역으로 사용 ex)Todo.vue에서 this.$store로 사용

const storage = { // storage라는 객체를 호출하면 
    fetch() {
        const arr = [];
        if(localStorage.length > 0) {
            for (let i = 0; i < localStorage.length; i++) {
                arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
            }
        }
        return arr; // 새로 배열에 담아서 아래 state에 넘김
    }
}

export const store = new Vuex.Store({ // export로 const store하면 밖에서 store라는 변수를 사용할 수 있다.
    state: {
        todoItems: storage.fetch()
    },
    getters,
    mutations
})