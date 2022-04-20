<template>
    <div>
        <ul>
            <li v-for="(todoItem, index) in todoItems" v-bind:key="todoItem.item" class="shadow"> <!-- index는 순서를 보여줌 -->
                <i class="checkBtn fas fa-check" v-bind:class="{checkBtnCompleted: todoItem.completed}" v-on:click="toggleComplete(todoItem, index)"></i> <!-- v-bind로 엮어서 class값을 동적으로 바꿔줌 -->
                <span v-bind:class="{textCompleted: todoItem.completed}">{{ todoItem.item }}</span> <!-- .item으로 객체의 item값만 뿌려줌 -->
                <span class="removeBtn" v-on:click="removeTodo(todoItem, index)">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            // localStorage에서 꺼내서 담을 데이터 선언
            todoItems: []
        }
    },
    methods: {
        removeTodo: function(todoItem, index) {
            console.log(todoItem, index); // 할일텍스트와 index값이 찍힘
            localStorage.removeItem(todoItem); // key랑 value를 똑같이 넣어놔서 todoItem으로 지우면 됨
            this.todoItems.splice(index, 1); // localStorage를 지우고 배열도 지워줘야 브라우저에 반영됨 splice -> index번째에서 1개 지움
        },
        toggleComplete: function(todoItem, index) {
            console.log(todoItem, index);
            todoItem.completed = !todoItem.completed;
            localStorage.removeItem(todoItem.item);
            localStorage.setItem(todoItem.item, JSON.stringify(todoItem));
        }
    },
    created: function() { // created(인스턴스가 생성되자마자 호출되는 라이프사이클 훅), mounted, update, destroy
        // console.log('created');
        if(localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) { // for문으로 localStorage를 가져옴
                // console.log(localStorage.key(i));
                console.log(JSON.parse(localStorage.getItem(localStorage.key(i)))); // TodoInput에서 stringify로 변환해서 넣은 값을 다시 객체로 변환(JSON.parse)해서 가져옴
                // this.todoItems.push(localStorage.key(i));
                this.todoItems.push(JSON.parse(localStorage.getItem(localStorage.key(i)))); // 객체형식으로 리스트에 뿌려짐
            }
        }

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