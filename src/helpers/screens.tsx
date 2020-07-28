import React from 'react';
import AppProviders from '@fos/containers/AppProviders';

export function wrapWithRequiredProviders(Provider = AppProviders) {
  return (Component: React.ComponentType<any>) => (props: any) => (
    <Provider>
      <Component {...props} />
    </Provider>
  );
}
