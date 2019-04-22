import styled from 'styled-components';

import LinkUnlessCurrent from 'react/components/UI/LinkUnlessCurrent';

export default styled(LinkUnlessCurrent)`
  display: block;
  color: ${props => props.theme.colors.gray.regular};

  &:hover {
    color: black;
  }

  &:not([href]) {
    color: ${props => props.theme.colors.gray.semiBold};
    cursor: default;
  }
`;
