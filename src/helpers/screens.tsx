import React from 'react';
import AppProviders from '@fos/containers/AppProviders';

export function wrapWithRequiredProviders(Component: React.ComponentType<any>) {
  return (props: any) => (
    <AppProviders>
      <Component {...props} />
    </AppProviders>
  );
}
