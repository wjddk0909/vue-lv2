<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" v-on:removeItem="removeOneItem" v-on:toggleItem="toggleItem"></TodoList>
    <TodoFooter v-on:clearAll="clearAllItems"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

export default {
  // 각각의 컴포넌트에서 사용하던 데이터 로직들을 다 App.vue로 끌어옴
  // todoInput에 있던 내용
  data() {
    return {
      todoItems: []
    }
  },
  methods: {
    addOneItem(todoItem) { // TodoInput에서 newTodoItem을 인자로 받아왔으니 여기에도 todoItem으로 인자를 넣어줌
      const obj = {completed: false, item: todoItem};
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
    removeOneItem(todoItem, index) {
      localStorage.removeItem(todoItem.item); // removeItem(todoItem); 으로 삭제하면 객체를 지우는거라서 localStorage에서 삭제가 안됨 todoItem.item으로 삭제해줘야 함
      this.todoItems.splice(index, 1);
    },
    toggleItem(todoItem, index) {
      // todoItem.completed = !todoItem.completed; 
      // ㄴ 이렇게 하지 않는 게 좋음
      // 왜냐하면 todoItems라는 배열을 todoList에 propsdata가 props로 내려가서 props로 받아서 그걸로 접근하는 형태인데, 여기서 이벤트버스로 todoItem을 넘겨줬음. 즉, props에서 접근된 데이터를 다시 위로 올림, 다시 올려서 바꾸는 것은 좋지 않은 패턴(안티패턴), 이것보다는 App.vue라는 파일이 컨테이너의 성격을 가지고 있기 때문에 todoItems에 접근해서 조작하는 것이 좋음 
      this.todoItems[index].completed = !this.todoItems[index].completed;
      localStorage.removeItem(todoItem.item);
      localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
    },
    clearAllItems() {
      localStorage.clear();
      this.todoItems = []
    }
  },
  created() {
    if(localStorage.length > 0) {
        for (let i = 0; i < localStorage.length; i++) {
            this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
    }
  },
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter,
  }
}
</script>

<style>
body {
  text-align: center;
  background-color: #F6F6F8;
}
input {
  border-style: groove;
  width: 200px;
}
button {
  border-style: groove;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
}
</style>
