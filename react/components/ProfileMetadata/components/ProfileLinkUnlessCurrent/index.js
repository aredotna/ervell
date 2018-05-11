import styled from 'styled-components';

import Styles from 'react/styles';

import LinkUnlessCurrent from 'react/components/UI/LinkUnlessCurrent';

export default styled(LinkUnlessCurrent)`
  display: block;
  color: ${Styles.Colors.gray.regular};

  &:not([href]) {
    color: ${Styles.Colors.gray.semiBold};
    cursor: default;
  }
`;
