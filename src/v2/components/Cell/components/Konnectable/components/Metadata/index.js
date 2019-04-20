import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import metadataFragment from 'v2/components/Cell/components/Konnectable/components/Metadata/fragments/metadata';

import Box from 'v2/components/UI/Box';
import Text from 'v2/components/UI/Text';
import Truncate from 'v2/components/UI/Truncate';
import MetadataFileExtension from 'v2/components/Cell/components/Konnectable/components/Metadata/components/MetadataFileExtension';
import MetadataPlay from 'v2/components/Cell/components/Konnectable/components/Metadata/components/MetadataPlay';

export default class Metadata extends PureComponent {
  static propTypes = {
    konnectable: propType(metadataFragment).isRequired,
    mode: PropTypes.oneOf(['resting', 'hover', 'overlay']),
  }

  static defaultProps = {
    mode: 'resting',
  }

  render() {
    const {
      mode,
      konnectable: {
        __typename,
        title,
        user,
        connection,
        updated_at,
        file_extension,
      },
      ...rest
    } = this.props;

    return (
      <Box pt={2} mt={6} mb={4} px={5} {...rest}>
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
