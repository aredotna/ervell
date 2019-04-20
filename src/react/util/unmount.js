import ReactDOM from 'react-dom';

export default (mountNode) => {
  if (!mountNode) return;

  ReactDOM.unmountComponentAtNode(!mountNode.jquery ? mountNode : mountNode[0]);
};
