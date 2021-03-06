import Vue from 'vue';
import { add } from './async-action';
import { store$, errorAction } from './store';

export const TaskInput = Vue.extend({
    props: ['workers'],
    render(crt) {
        crt(
            'form',
            {
              on: {
                submit: this.submitNewTask,
              },
            },
            [
              crt(
                'label',
                {
                  attrs: {
                    name: 'tugas',
                  },
                },
                'Tugas:'
              ),
              crt('br'),
              crt('textarea', {
                domProps: {
                  value: this.job,
                },
                attrs: {
                  placeholder: 'deskripsi',
                  cols: 30,
                  rows: 3,
                },
                on: {
                  input: (event) => {
                    this.job = event.target.value;
                  },
                },
              }),
              crt('br'),
              crt(
                'label',
                {
                  attrs: {
                    name: 'Pekerja',
                  },
                },
                'Pekerja:'
              ),
              crt('br'),
              crt(
                'select',
                {
                  on: {
                    change: (event) => {
                      this.assignee_id =
                        event.target.children[event.target.selectedIndex].value;
                    },
                  },
                },
                [
                  this.$props.workers.map((worker) => {
                    return crt(
                      'option',
                      {
                        domProps: {
                          value: worker.id,
                        },
                      },
                      worker.name
                    );
                  }),
                ]
              ),
              crt('br'),
              crt(
                'label',
                {
                  attrs: {
                    name: 'file',
                  },
                  on: {},
                },
                'Lampiran:'
              ),
              crt('br'),
              crt('input', {
                domProps: {
                  value: this.attachment,
                },
                attrs: {
                  type: 'file',
                },
                on: {
                  input: (event) => {
                    this.attachment = event.target.files[0];
                  },
                },
              }),
              crt('br'),
              crt('button', 'kirim'),
            ]
          )
    },
    data() {
        return{
            job: '',
            attachment: null,
            assignee_id: 0,
        }
    },
    methods: {
        submitNewTask(event) {
          event.preventDefault();
          if (
            !this.job ||
            !this.assignee_id ||
            !this.attachment
          ) {
            store$.dispatch(errorAction('form isian tidak lengkap!'));
            return;
          }
          store$.dispatch(
            add({
              job: this.job,
              assignee_id: this.assignee_id,
              attachment: this.attachment,
            })
          );
          event.target.reset();
        },
      },
})
