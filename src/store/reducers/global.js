export default {
  namespace: 'global',
  initState: { showAddModal: false, isEnd: false, current: {} },
  props: {
    toggle(state, { payload }) {
      const { key } = payload;
      return {
        ...state,
        [key]: !state[key],
      };
    },
  },
};
