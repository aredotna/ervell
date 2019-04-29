import { parse } from 'qs'

export default renderFn => props =>
  renderFn({
    params: props.match.params,
    query: parse(props.location.search.slice(1)),
    originalProps: props,
  })
