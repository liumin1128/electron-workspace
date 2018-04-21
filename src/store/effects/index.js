// import request from '../../utils/request';
// import { setStorage } from '../../utils/store';
// import { USER_TOKEN_KEY } from '../../constants/base';
import { run } from '../../utils/common';

export default {
  test: () => {
    console.log('test effects');
  },
  // 'user/login': async ({ payload, cb }, { getState, dispatch }) => {
  //   try {
  //     const { status, token, userInfo } = await request('user/login', payload);
  //     if (status === 200) {
  //       await setStorage(USER_TOKEN_KEY, token);
  //       await dispatch({ type: 'user/save', payload: { userInfo } });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  runcommand: async ({ payload, cb }, { getState, dispatch }) => {
    console.log('test effects');
    const { project, script, path } = payload;
    await dispatch({
      type: 'log/push',
      payload: {
        project,
        script,
        status: 'loading',
        message: '运行中',
        data: script,
      },
    });

    try {
      const data = await run(script, { cwd: path });
      console.log('data');
      console.log(data);
      await dispatch({
        type: 'log/push',
        payload: {
          project,
          script,
          status: 'success',
          message: '运行成功',
          data,
        },
      });
    } catch (error) {
      console.log('error');
      console.log(error);
      await dispatch({
        type: 'log/push',
        payload: {
          project,
          script,
          status: 'error',
          message: '运行失败',
          data: error,
        },
      });
    }
  },
  // 'user/login': async ({ payload, cb }, { getState, dispatch }) => {
  //   try {
  //     const { status, token, userInfo } = await request('user/login', payload);
  //     if (status === 200) {
  //       await setStorage(USER_TOKEN_KEY, token);
  //       await dispatch({ type: 'user/save', payload: { userInfo } });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
};
