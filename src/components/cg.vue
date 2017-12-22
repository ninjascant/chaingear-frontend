<template>

  <div class="ui two column grid container">
    <div class="column">
      <greetingPage/>
    </div>
    <div class="column">
      <div class="row">
        <p>Completed Tasks: {{todos.filter(todo => todo.done === true ).length }}</p>
        <p>Pending Tasks: {{todos.filter(todo => todo.done === false ).length }}</p>
      </div>
      <div class="row">
        <todo v-for="todo in todos" v-bind:todo="todo" :key="todo.id" v-on:delete-todo='deleteTodo'></todo>
      </div>
    </div>
  </div>
</template>

<script>
import Todo from './Todo'
import GreetingPage from './GreetingPage'

export default {
  props: ['todos'],
  components: {
    Todo,
    GreetingPage
  },
  methods: {
    deleteTodo (todo) {
      const todoIndex = this.todos.indexOf(todo)
      this.todos.splice(todoIndex, 1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

