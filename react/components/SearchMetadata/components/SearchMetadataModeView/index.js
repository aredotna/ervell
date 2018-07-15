import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pocket from 'react/components/UI/Pocket';
import HeaderMetadataLinkUnlessCurrent from 'react/components/UI/HeaderMetadata/HeaderMetadataLinkUnlessCurrent';

const SearchMetadataModeView = props => {
  const { search } = props;

  const isCurrent = ({ targetHref, currentRoute }) =>
    currentRoute.pathname === targetHref.split('?')[0];

  return (
    <Pocket title="View">
      <HeaderMetadataLinkUnlessCurrent
        href={`/search/${search}`}
        predicate={isCurrent}
      >
        All
      </HeaderMetadataLinkUnlessCurrent>

      <HeaderMetadataLinkUnlessCurrent
        href={`/search/${search}/channels`}
        predicate={isCurrent}
      >
        Channels
      </HeaderMetadataLinkUnlessCurrent>

      <HeaderMetadataLinkUnlessCurrent
        href={`/search/${search}/blocks`}
        predicate={isCurrent}
      >
        Blocks
      </HeaderMetadataLinkUnlessCurrent>

      <HeaderMetadataLinkUnlessCurrent
        href={`/search/${search}/users`}
        predicate={isCurrent}
      >
        Users
      </HeaderMetadataLinkUnlessCurrent>
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
