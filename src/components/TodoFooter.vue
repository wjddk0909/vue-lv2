<template>
    <div class="clearAllContainer">
        <span class="clearAllBtn" v-on:click="clearTodo">Clear All</span>
    </div>
</template>

<script>
export default {
    methods: {
        clearTodo: function() {
            localStorage.clear(); 
            // localStorage 지우는 api 
            // 이렇게 작성하면(삭제 뿐만 아니라 todoInput쪽 할일 추가 부분도) localStorage에서는 지워지지만(추가되지만 브라우저는 새로고침해야 반영) TodoList컴포넌트와 분리되어 있기 때문에 list에는 영향이 없다. 
            // 그래서 하위 컴포넌트(todoFooter, todoInput)에서는 event로 상위(App)에 보내고 상위에서는 해당 내용을 props로 내려줍니다.
        }
    }
};
</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 auto;
}
.clearAllBtn {
  color: #e20303;
  display: block;
}
</style>