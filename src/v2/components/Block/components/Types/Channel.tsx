import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { truncate } from 'v2/util/string';

const ChannelWrapper = styled.div`
  align-items: center;
  border-style: solid;
  border-width: 2px;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;

  ${({ visibility, theme }) => {
    const color = theme.colors.channel[visibility];

    return `
      border-color: ${color};
      color: ${color};
      &:hover {
        border-color: ${color};
      }
    `;
  }}
`;

const Title = styled.h2`
  font-weight: normal;
  padding: 15px 12px 0 12px;
  word-break: break-word;
`;

const Stats = styled.div`
  font-weight: normal;
  line-height: 1.5em;
  font-size: ${x => x.theme.fontSizesIndexed.xs};
  height: 25px;
  margin: 5px 0 0 0;
`;

interface ChannelProps {
  length: number;
  title: string;
  updatedAtAgo: string;
  username: string;
  visibility: string;
}

const Channel: React.FC<ChannelProps> = props => {
  const { length, title, updatedAtAgo, username, visibility } = props;

  const formattedTitle = truncate(title, 50) || '\u00A0';

  return (
    <ChannelWrapper visibility={visibility}>
      <div>
        <Title>{formattedTitle}</Title>
        <Stats>
          <ul>
            <li>by {username}</li>
            <li>
              {length} blocks &bull; {updatedAtAgo}
            </li>
          </ul>
        </Stats>
      </div>
    </ChannelWrapper>
  );
};

export default Channel;
