require('./main.css');
import Vue from 'vue';
import { done, cancel, getList, add, getWorkersList } from './async-action';
import { store$, errorAction, clearErrorAction } from './store';
import { TaskList } from './components/list';

new Vue({
  el: '#task',
  components: {
    'list-task': TaskList,
  },
  render(CreateElement) {
    this.tasks = this.loadTask?.tasks;
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
          class: { error: this.loadSummary?.error },
        },
        this.loadSummary?.error
      ),
      CreateElement(
        'p',
        {
          class: { primary: this.loadSummary?.loading },
        },
        this.loadSummary?.loading ? 'memuat . . .' : ''
      ),
      CreateElement('h4', 'Buat tugas baru'),
      CreateElement('form', [
        CreateElement('label', 'Nama:'),
        CreateElement('br'),
        CreateElement('textarea', {
          attrs: {
            name: 'job',
            placeholder: 'Deskripsi pekerjaan',
            cols: '30',
            rows: '3',
          },
        }),
        CreateElement('br'),
        CreateElement('label', 'Pekerja:'),
        CreateElement('br'),
        CreateElement('select', {
          attrs: {
            name: 'assignee',
          },
        }),
        CreateElement('br'),
        CreateElement('label', 'Lampiran:'),
        CreateElement('input', {
          attrs: {
            type: 'file',
            name: 'attachment',
          },
        }),
        CreateElement('br'),
        CreateElement('button', 'kirim'),
      ]),
      CreateElement('h4', 'Daftar tugas'),
      CreateElement('hr'),
      CreateElement('list-task', { props: { tasks: this.tasks } }),
    ]);
  },
  data: {
    loadTask: {},
    tasks: [],
  },
  methods: {},
  mounted() {
    this.loadTask = store$.getState();
    store$.subscribe(() => {
      this.loadTask = store$.getState();
    });
    store$.dispatch(getList);
  },
});
