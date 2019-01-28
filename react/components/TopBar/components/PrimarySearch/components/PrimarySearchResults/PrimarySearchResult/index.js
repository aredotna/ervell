import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import primarySearchResultFragment from 'react/components/TopBar/components/PrimarySearch/components/PrimarySearchResults/PrimarySearchResult/fragments/primarySearchResult';

import Text from 'react/components/UI/Text';
import GroupBadge from 'react/components/UI/GroupBadge';

import { overflowEllipsis } from 'react/styles/mixins';
import { mixin as boxMixin } from 'react/components/UI/Box';

const Label = styled(Text)`
  font-weight: bold;
  ${overflowEllipsis}
`;

const Container = styled.a`
  ${boxMixin}
  display: flex;
  text-decoration: none;
  flex-direction: row;

  > * {
    &:after {
      content: '/';
      margin: 0 ${props => props.theme.space[4]};
      font-family: ${props => props.theme.fonts.mono};
      opacity: 0.5;
    }

    &:last-child:after {
      content: '';
      margin: 0;
    }
  }

  &:hover {
    background-color: ${props => props.theme.colors.gray.hint};
  }
`;

Container.defaultProps = {
  px: '2.5em', // Matches `<SearchInput />`
  py: 4, // Matches `<SearchInput />`
  bg: 'gray.light',
  borderTop: '1px solid',
  borderColor: 'gray.semiLight',
};

export default class PrimarySearchResult extends PureComponent {
  static propTypes = {
    result: propType(primarySearchResultFragment),
    children: PropTypes.node,
  }

  static defaultProps = {
    result: null,
    children: null,
  }

  preventBlur = (e) => {
    e.preventDefault();
  }

  render() {
    const { result, children, ...rest } = this.props;

    if (result) {
      return (
        <Container
          href={result.href}
          onMouseDown={this.preventBlur}
          {...rest}
        >
          {result.owner &&
            <Label flex="1">
              {result.owner.name}

              {result.owner.__typename === 'Group' &&
                <GroupBadge
                  f={0}
                  // Push out 1px to accomodate "overflowing" badge border
                  mr="1px"
                  visibility={result.owner.visibility}
                />
              }
            </Label>
          }

          <Label color={result.visibility ? `channel.${result.visibility}` : 'gray.base'}>
            {result.label}

            {result.__typename === 'Group' &&
              <GroupBadge f={0} visibility={result.visibility} />
            }
          </Label>
        </Container>
      );
    }

    return (
      <Container {...rest}>
        {children}
      </Container>
    );
  }
}
