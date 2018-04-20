import Immutable from 'immutable';

export default {
  namespace: 'project',
  initState: { list: Immutable.List([{ name: 'xxxx' }]), isEnd: false, current: {} },
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
