import Vue from 'vue'
import Vuex from 'vuex'

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
    mutations: {
        // App.vue의 TodoInput에서 addOneItem을 호출
        // TodoInput.vue를 확인 -> addTodo()라는 메소드가 input에서 newTodoItem이라는 값을 전달해서 App.vue로 보냄
        addOneItem(state, todoItem) { // 인자를 넣어줌, state에 접근하기위해서 첫번째 인자로 state를 넣어준다. TodoInput.vue에서 인풋에 입력된값을 this.newTodoItem에 넣어서 보내면 여기서 두번째 인자 todoItem으로 받는다.  
            const obj = {completed: false, item: todoItem};
            localStorage.setItem(todoItem, JSON.stringify(obj));
            state.todoItems.push(obj); // state로 접근 가능
        },
        removeOneItem(state, payload) {
            localStorage.removeItem(payload.todoItem.item);
            state.todoItems.splice(payload.index, 1);
            // console.log(payload.todoItem, payload.index)
        },
        toggleItem(state, payload) {
            state.todoItems[payload.index].completed = !state.todoItems[payload.index].completed;
            localStorage.removeItem(payload.todoItem.item);
            localStorage.setItem(payload.todoItem.item, JSON.stringify(payload.todoItem));
        },
        clearAllItems(state) {
            localStorage.clear();
            state.todoItems = []
        }
    }
})