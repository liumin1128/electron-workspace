import { Map, List } from 'immutable';

export default {
  namespace: 'project',
  initState: Map({ list: List([]) }),
  props: {
    push(state, { payload }) {
      // return {
      //   ...other,
      //   list: list.push(payload),
      // };
      return state.update('list', list => list.push(payload));
    },
  },
};
