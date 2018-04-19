export default {
  namespace: 'project',
  initState: { list: [], isEnd: false, current: {} },
  props: {
    push({ list, ...other }, { payload }) {
      return {
        ...other,
        list: list.concat(payload.list),
        isEnd: payload.isEnd,
      };
    },
  },
};
