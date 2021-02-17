require('./main.css');
import Vue from 'vue';
import { getList, add, getWorkersList } from './async-action';
import { store$, errorAction, clearErrorAction } from './store';
import { TaskList } from './components/list';
import { InputTask } from './components/input';

new Vue({
  el: '#task',
  components: {
    'TaskList': TaskList,
    'InputTask': InputTask,
  },
  render(CreateElement) {
    this.tasks = this.loadTask?.tasks;
    // this.workers = this.loadTask?.workers;
    return CreateElement('div', [
      CreateElement('ul', [
        CreateElement('li', [
          CreateElement(
            'a',
            {
              attrs: {
                href: 'worker.html',
              },
            },
            'pekerja'
          ),
        ]),
        CreateElement('li', [
          CreateElement(
            'a',
            {
              attrs: {
                href: 'tasks.html',
              },
            },
            'pekerjaan'
          ),
        ]),
        CreateElement('li', [
          CreateElement(
            'a',
            {
              attrs: {
                href: 'performance.html',
              },
            },
            'kinerja'
          ),
        ]),
      ]),
      CreateElement('hr'),
      CreateElement(
        'p',
        {
          class: { error: this.loadTask?.error },
        },
        this.loadTask?.error
      ),
      CreateElement(
        'p',
        {
          class: { primary: this.loadTask?.loading },
        },
        this.loadTask?.loading ? 'memuat . . .' : ''
      ),
      CreateElement('h4', 'Buat tugas baru'),
      CreateElement('InputTask', { props: { workers: this.loadTask?.workers } }),
      CreateElement('h4', 'Daftar tugas'),
      CreateElement('hr'),
      CreateElement('TaskList', { props: { tasks: this.tasks } }),
    ]);
  },
  data: {
    loadTask: {
      workers: [],
    },
    tasks: [],
    // workers: [],
  },
  mounted() {
    this.loadTask = store$.getState();
    store$.subscribe(() => {
      this.loadTask = store$.getState();
    });
    store$.dispatch(getList);
  },
});
