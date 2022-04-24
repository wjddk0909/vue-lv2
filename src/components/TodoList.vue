<template>
    <div>
      <transition-group name="list" tag="ul">
          <li v-for="(todoItem, index) in this.storedTodoItems" v-bind:key="todoItem.item" class="shadow">
              <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todoItem.completed}" v-on:click="toggleComplete({todoItem, index})"></i> 
              <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span>
              <span class="removeBtn" v-on:click="removeTodo({todoItem, index})">
                  <i class="fas fa-trash-alt"></i>
              </span>
          </li>
      </transition-group>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations({ // 헬퍼함수들은 인자를 선언하지 않아도 함수를 호출할때 인자가 있으면 그대로 들고와서 넘겨줌, 다만 기존에 removeTodo에서는 {todoItem, index} 이렇게 인자를 하나만 넘겼는데 template에서 넘기는 인자를 보면 (todoItem, index) 이렇게 두개를 넘김 -> 그래서 ({todoItem, index}) 이렇게 객체에 넣어서 하나로 만들어 줘야 함
          removeTodo: 'removeOneItem',
          toggleComplete: 'toggleItem'
        }),
    },
    computed: {
      // todoItems() {
      //   return this.$store.getters.storedTodoItems;
      // }
      ...mapGetters(['storedTodoItems'])
      // ...mapGetters({ // 배열 말고 객체로도 넣을 수 있음 -> getters에서 가지고 있는 이름이랑 컴포넌트에서 사용하는 이름이 다를때, ex) 위 template for in 문에서 this.todoItems라고 사용할때
      //   todoItems: 'storedTodoItems'
      // })
    }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}

/* 리스트 아이템 트랜지션효과 */
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>