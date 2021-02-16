import Vue from 'vue';
import { cancel, done } from '../async-action';
import { store$ } from '../store';

export const ButtonList = Vue.extend({
  props: ['task'],
  render(CreateElement) {
    return CreateElement('span', [
      CreateElement(
        'button',
        {
          on: {
            click: () => {
              store$.dispatch(cancel(this.$props.task.id));
            },
          },
        },
        'Batal'
      ),
      CreateElement(
        'button',
        {
          on: {
            click: () => {
              store$.dispatch(done(this.$props.task.id));
            },
          },
        },
        'Selesai'
      ),
    ]);
  },
});
