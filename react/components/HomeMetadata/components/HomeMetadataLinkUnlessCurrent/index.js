import styled from 'styled-components';

import styles from 'react/styles';

import LinkUnlessCurrent from 'react/components/UI/LinkUnlessCurrent';

export default styled(LinkUnlessCurrent)`
  display: block;
  color: ${styles.Colors.gray.regular};

  &:not([href]) {
    color: ${styles.Colors.gray.semiBold};
    cursor: default;
  }
`;
