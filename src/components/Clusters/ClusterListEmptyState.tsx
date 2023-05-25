import React, { FC } from 'react';

import { EmptyState, EmptyStateIcon, EmptyStatePrimary, EmptyStateVariant, Title } from '@patternfly/react-core';
import { VirtualMachineIcon } from '@patternfly/react-icons';
import ClusterCreateButton from './ClusterCreateButton';

type ClusterListEmptyStateProps = {
  namespace: string;
};

const ClusterListEmptyState: FC<ClusterListEmptyStateProps> = ({ namespace }) => {
  return (
    <EmptyState variant={EmptyStateVariant.large}>
      <EmptyStateIcon icon={VirtualMachineIcon} />
      <Title headingLevel="h4" size="lg">
        No clusters found
      </Title>
      <EmptyStatePrimary>
        <ClusterCreateButton namespace={namespace} />
      </EmptyStatePrimary>
    </EmptyState>
  );
};

export default ClusterListEmptyState;
