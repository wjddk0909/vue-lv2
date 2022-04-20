<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
        <!-- <button v-on:click="addTodo">add</button> -->
        <span class="addContainer" v-on:click="addTodo">
            <i class="addBtn fas fa-plus" aria-hidden="true"></i>
        </span>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            newTodoItem: ""
        }
    },
    methods: {
        addTodo: function() {
            if(this.newTodoItem !== '') {   // 인풋박스에 값을 넣었을때만 실행
                var obj = {completed: false, item: this.newTodoItem}; // item : text값, completed : boolean값을 넣어서 객체에 저장
                // 저장하는 로직
                // localStorage.setItem(this.newTodoItem, obj); 
                // obj를 stringify 않고 넣으면 할일을 추가했을때 localStorage에서 확인하면 key에는 잘 들어가는데 value에 [object Object]로 들어가서 객체 안에 어떤값이 들어있는지 확인 불가능
                localStorage.setItem(this.newTodoItem, JSON.stringify(obj)); 
                // stringify : 객체를 string으로 변환해서 넣기때문에 객체 안에 어떤값이 있는지 확인 가능
                this.clearInput(); // 같은 인스턴스안에 있는 메소드라서 this로 접근 가능
            }
        },
        clearInput: function() {
            this.newTodoItem = '';
        }
    }
};
</script>

<style scoped>
input:focus {
  outline: none;
}
.inputBox {
  background: white;
  height: 50px;
  line-height: 50px;
  border-radius: 5px;
}
.inputBox input {
  border-style: none;
  font-size: 0.9rem;
}
.addContainer {
  float: right;
  background: linear-gradient(to right, #6478FB, #8763FB);
  display: block;
  width: 3rem;
  border-radius: 0 5px 5px 0;
}
.addBtn {
  color: white;
  vertical-align: middle;
}
.closeModalBtn {
  color: #42b983;
}
</style>