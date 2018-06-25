export default {
  Query: () => {
    return {
      status: () => {
        return 'Up'
      },
    }
  },
  Channel: () => {
    return {
      id: 666,
      title: 'Charles is cool',
      visibility: 'closed'
    }
  }
};
