<template>
    <div>
        <ul>
            <!-- <li>1</li>
            <li>2</li>
            <li>3</li> -->
            <li v-for="todoItem in todoItems" v-bind:key="todoItem">
                {{ todoItem }}
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
    created: function() { // created(인스턴스가 생성되자마자 호출되는 라이프사이클 훅), mounted, update, destroy
        // console.log('created');
        if(localStorage.length > 0) {
            for (var i = 0; i < localStorage.length; i++) { // for문으로 localStorage를 가져옴
                // console.log(localStorage.key(i));
                this.todoItems.push(localStorage.key(i));
            }
        }

    }
};
</script>

<style scoped>

</style>