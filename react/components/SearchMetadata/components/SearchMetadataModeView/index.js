import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pocket from 'react/components/UI/Pocket';
import HomeMetadataLinkUnlessCurrent from 'react/components/HomeMetadata/components/HomeMetadataLinkUnlessCurrent';

const SearchMetadataModeView = props => {
  const { search } = props;

  const isCurrent = ({ targetHref, currentRoute }) =>
    currentRoute.pathname === targetHref.split('?')[0];

  return (
    <Pocket title="View">
      <HomeMetadataLinkUnlessCurrent
        href={`/search/${search}`}
        predicate={isCurrent}
      >
        All
      </HomeMetadataLinkUnlessCurrent>

      <HomeMetadataLinkUnlessCurrent
        href={`/search/${search}/channels`}
        predicate={isCurrent}
      >
        Channels
      </HomeMetadataLinkUnlessCurrent>

      <HomeMetadataLinkUnlessCurrent
        href={`/search/${search}/blocks`}
        predicate={isCurrent}
      >
        Blocks
      </HomeMetadataLinkUnlessCurrent>

      <HomeMetadataLinkUnlessCurrent
        href={`/search/${search}/users`}
        predicate={isCurrent}
      >
        Users
      </HomeMetadataLinkUnlessCurrent>
    </Pocket>
  );
};

SearchMetadataModeView.propTypes = {
  search: PropTypes.string
};

SearchMetadataModeView.defaultProps = {
  search: ""
};

export default SearchMetadataModeView;
