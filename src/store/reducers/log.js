import { Map, List } from 'immutable';

export default {
  namespace: 'log',
  initState: Map({ list: List([]) }),
  props: {
    push(state, { payload }) {
      // const {
      //   project, script, status, message, data,
      // } = payload;
      // if (state.hasIn([project, script])) {
      //   return state.updateIn([project, script], list => list.push({ status, message, data }));
      // } else {
      //   return state.setIn([project, script], () => List({ status, message, data }));
      // }
      return state.update('list', list => list.push(payload));
    },
  },
};
