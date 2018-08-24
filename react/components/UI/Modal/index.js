import React from 'react';

import { wrapWithApolloProvider, initClientSideApolloClient } from 'react/apollo';
import mount from 'react/util/mount';
import unmount from 'react/util/unmount';

import ModalComponent from 'react/components/UI/Modal/Modal';

export default class Modal {
  ModalComponent = ModalComponent

  constructor(Component, props = {}, modalProps = {}) {
    this.Component = Component;
    this.props = props;
    this.modalProps = modalProps;
    this.el = document.createElement('div');
  }

  open = () => {
    document.body.appendChild(this.el);

    const boot = wrapWithApolloProvider(initClientSideApolloClient());
    const props = { onClose: this.close, ...this.props };

    const ModalApp = innerProps => (
      <this.ModalComponent onClose={this.close} {...this.modalProps}>
        <this.Component {...innerProps} />
      </this.ModalComponent>
    );

    const App = boot(ModalApp, props);

    mount(App, this.el);
  }

  close = () => {
    unmount(this.el);
    this.el.parentNode.removeChild(this.el);
  }
}
