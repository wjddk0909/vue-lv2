<template>
    <div class="inputBox shadow">
        <input type="text" v-model="newTodoItem" v-on:keyup.enter="addTodo">
        <span class="addContainer" v-on:click="addTodo">
            <i class="addBtn fas fa-plus" aria-hidden="true"></i>
        </span>
        <!-- ModalBox -> vuejs.org 공식 사이트 Learn > examples에서 Modal Component 참고 -->
        <ModalBox v-if="showModal" @close="showModal = false">
            <h3 slot="header"> <!-- ModalBox.vue에서 default로 넣어둔 부분을 여기에서 커스텀 할 수 있음 -->
                경고!
            </h3>
            <!-- body에 '할 일을 입력하세요' -->
            <!-- footer에 'copy right' -->
        </ModalBox>
    </div>
</template>

<script>
import ModalBox from './common/ModalBox.vue'

export default {
    data: function() {
        return {
            newTodoItem: "",
            showModal: false,
        }
    },
    methods: {
        addTodo: function() {
            if(this.newTodoItem !== '') {
                this.$emit('addTodoItem', this.newTodoItem);
                this.clearInput();
            } else {
                // input에 아무것도 입력하지 않고 addTodo 클릭 했을 때
                this.showModal = !this.showModal;
            }
        },
        clearInput: function() {
            this.newTodoItem = '';
        }
    },
    components: {
        ModalBox: ModalBox
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