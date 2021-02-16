import Vue from 'vue';

export const TaskList = Vue.extend({
  props: ['tasks'],
  render(CreateElement) {
    const taskList = this.$props?.tasks?.map((task) => {
      console.log(task.job);
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
        task.done
          ? CreateElement('span', 'Sudah selesai')
          : CreateElement('button', 'Selesai'),
      ]);
    });
    return CreateElement('div', taskList);
  },
})
