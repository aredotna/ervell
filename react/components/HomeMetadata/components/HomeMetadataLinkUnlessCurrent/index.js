import styled from 'styled-components';

import LinkUnlessCurrent from 'react/components/UI/LinkUnlessCurrent';

export default styled(LinkUnlessCurrent)`
  display: block;
  color: ${x => x.theme.colors.gray.regular};

  &:not([href]) {
    color: ${x => x.theme.colors.gray.semiBold};
    cursor: default;
  }
`;
