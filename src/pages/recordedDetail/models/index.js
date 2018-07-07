export default {
  namespace: 'recordedDetail',
  state: {},
  reducers: {},
  effects: {},
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(({pathname}) => {
        if (pathname === '/recordedDetail') {
          dispatch({
            type: 'query'
          })
        }
      })
    }
  }
}
