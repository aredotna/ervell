import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Truncate from 'react/components/UI/Truncate';
import MetadataFileExtension from 'react/components/Blokk/components/Metadata/components/MetadataFileExtension';
import MetadataPlay from 'react/components/Blokk/components/Metadata/components/MetadataPlay';

export default class Metadata extends Component {
  static propTypes = {
    mode: PropTypes.string,
    blokk: PropTypes.shape({ /* TODO */ }).isRequired,
  }

  static defaultProps = {
    mode: 'resting',
  }

  render() {
    const {
      mode,
      blokk: {
        __typename,
        title,
        user,
        connection,
        updated_at,
        file_extension,
      },
    } = this.props;

    return (
      <Box my={5} px={5}>
        <Text f={1} fontWeight="bold" textAlign="center" color="gray.medium">
          {mode === 'resting' &&
            <div>
              <Truncate length={40}>
                {title}
              </Truncate>

              {__typename === 'Attachment' &&
                <MetadataFileExtension ext={file_extension} />
              }

              {__typename === 'Embed' &&
                <MetadataPlay />
              }
            </div>
          }

          {mode === 'hover' &&
            <div>
              {connection &&
                <div>
                  {user.id === connection.user.id
                    ? <div>Added by {user.name}</div>
                    : <div>Connected by {connection.user.name}</div>
                  }
                  {connection.created_at}
                </div>
              }

              {!connection &&
                <div>
                  Added by {user.name}
                  <br />
                  {updated_at}
                </div>
              }
            </div>
          }
        </Text>
      </Box>
    );
  }
}
