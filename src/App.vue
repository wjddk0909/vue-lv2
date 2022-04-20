<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <!-- <TodoInput v-on:하위 컴포넌트에서 발생시킨 이벤트 이름="현재 컴포넌트의 메소드 명"</TodoInput> -->
    <TodoInput v-on:addTodoItem="addOneItem"></TodoInput> <!-- 하위 TodoInput에서 추가 버튼 addTodo메소드가 실행되면 $emit으로 App.vue로 addTodoItem을 올려 주고 인자로 this.newTodoItem을 보낸다. 그러면 App.vue에서는 addTodoItem에 연결된 현재 컴포넌트의 메소드 addOneItem을 실행한다. -->

    <!-- <TodoList v-bind:내려보낼 프롭스 속성 이름="현재위치의 컴포넌트 데이터 속성"></TodoList> -->
    <TodoList v-bind:propsdata="todoItems"></TodoList>
    <TodoFooter></TodoFooter>
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
  data: function() {
    return {
      todoItems: []
    }
  },
  methods: {
    addOneItem: function(todoItem) { // TodoInput에서 newTodoItem을 인자로 받아왔으니 여기에도 todoItem으로 인자를 넣어줌
      const obj = {completed: false, item: todoItem};
      localStorage.setItem(todoItem, JSON.stringify(obj));
      this.todoItems.push(obj);
    },
  },
  created: function() {
    if(localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
    }
  },
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter,
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
