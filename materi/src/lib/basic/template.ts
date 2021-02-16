import Vue from 'vue';

const TodoItem = Vue.extend({
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>',
});

const app3 = new Vue({
  el: '#app-3',
  components: {
    'todo-item': TodoItem,
  },
  data: {
    todos: [
      { text: 'Belajar JavaScript' },
      { text: 'Belajar Vue' },
      { text: 'Bikin sesuatu' },
    ],
  },
});
