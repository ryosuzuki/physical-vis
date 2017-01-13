let actions = {
  initState: function(state) {
    return {
      type: 'INIT_STATE',
      state: state
    }
  },
  updateData: function(data) {
    return {
      type: 'UPDATE_DATA',
      data: data
    }
  },
}

export default actions