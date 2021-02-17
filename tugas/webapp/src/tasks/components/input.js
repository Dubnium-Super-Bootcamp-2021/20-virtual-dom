import Vue from 'vue';
import { add, getWorkersList } from '../async-action';
import { store$, errorAction } from '../store';

export const InputTask = Vue.extend({
  props: ['workers'],
  render(CreateElement) {
    return CreateElement('div', [
      CreateElement(
        'form',
        {
          on: {
            submit: this.submitTask,
          },
        },
        [
          CreateElement('label', 'Tugas:'),
          CreateElement('br'),
          CreateElement('textarea', {
            attrs: {
              name: 'job',
              placeholder: 'Deskripsi pekerjaan',
              cols: '30',
              rows: '3',
            },
            on: {
              input: (event) => {
                this.job = event.target.value;
              },
            },
          }),
          CreateElement('br'),
          CreateElement('label', 'Pekerja:'),
          CreateElement('br'),
          CreateElement(
            'select',
            {
              attrs: {
                name: 'assignee',
              },
              on: {
                change: (event) => {
                  this.assignee_id =
                    event.target.children[event.target.selectedIndex].value;
                },
              },
            },
            [
              this.$props.workers.map((worker) => {
                return CreateElement(
                  'option',
                  {
                    attrs: {
                      value: worker.id,
                    },
                  },
                  worker.name
                );
              }),
            ]
          ),
          CreateElement('br'),
          CreateElement('label', 'Lampiran:'),
          CreateElement('input', {
            attrs: {
              type: 'file',
              name: 'attachment',
            },
            on: {
              input: (event) => {
                this.attachment = event.target?.files[0];
              },
            },
          }),
          CreateElement('br'),
          CreateElement(
            'button',
            {
              attrs: {
                type: 'submit',
                name: 'submitButton',
              },
            },
            'kirim'
          ),
        ]
      ),
    ]);
  },
  data: {
    job: '',
    assignee_id: 0,
    attachment: null,
  },
  methods: {
    submitTask(event) {
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
});
