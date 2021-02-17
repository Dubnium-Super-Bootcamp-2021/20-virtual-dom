import Vue from 'vue';
import { done, cancel } from '../async-action';
import { store$ } from '../store';
import { ButtonList } from './button';

export const TaskList = Vue.extend({
  props: ['tasks'],
  components: {
    ButtonList: ButtonList,
  },
  render(CreateElement) {
    const taskList = this.$props?.tasks?.map((task) => {
      return CreateElement('div', [
        CreateElement(
          'a',
          {
            attrs: {
              href: task.attachment,
              target: '_blank',
            },
          },
          'lampiran'
        ),
        CreateElement('span', ` ${task.job} - `),
        CreateElement('span', `${task.assignee}  `),
        CreateElement('div', ''),
        task.done
          ? CreateElement(
              'span',
              { style: { color: 'green' } },
              'Sudah selesai'
            )
          : CreateElement('ButtonList', { props: { task: task } }),
      ]);
    });
    return CreateElement('div', taskList);
  },
  methods: {
    done() {
      store$.dispatch(done());
    },
    cancel() {
      store$.dispatch(cancel());
    },
  },
});
