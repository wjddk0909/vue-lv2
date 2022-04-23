import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // use - 뷰의 플러그인, 뷰를 사용하는 모든 영역에 특정 기능을 추가해서 전역으로 사용 ex)Todo.vue에서 this.$store로 사용

export const store = new Vuex.Store({ // export로 const store하면 밖에서 store라는 변수를 사용할 수 있다.
    state: {
        headerText: 'TO DO it!'
    }
})