import { random, name } from 'faker';
import { sample } from 'lodash';
import { MockList } from 'graphql-tools';

export default {
  Channel: () => {
    return {
      title: random.words(),
      visibility: sample(['closed', 'private', 'public'])
    }
  },
  Authentication: () => {
    return  {
      contacts: () => new MockList([10, 25]),
    }
  },
  User: () => {
    return {
      name: `${name.firstName()} ${name.lastName()}`,
      initials: "IOU",
      avatar: "https://dummyimage.com/100x100/000/fff&text=**",
    }
  }
};
