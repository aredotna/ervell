import { random, name } from 'faker';
import { sample } from 'lodash';

export default {
  Channel: () => {
    return {
      title: random.words(),
      visibility: sample(['closed', 'private', 'public'])
    }
  },
  User: () => {
    return {
      name: `${name.firstName()} ${name.lastName()}`,
      initials: "IOU",
      avatar: "https://dummyimage.com/100x100/000/fff&text=**"
    }
  }
};
