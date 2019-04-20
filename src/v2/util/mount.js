import ReactDOM from 'react-dom';

export default (Component, mountNode) => {
  if (!mountNode) return;

  ReactDOM.render(Component, !mountNode.jquery ? mountNode : mountNode[0]);
};
