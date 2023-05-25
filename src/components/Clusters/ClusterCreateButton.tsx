import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { ListPageCreateButton } from '@openshift-console/dynamic-plugin-sdk';
import { InfinispanClusterModelRef } from '../../utils/models';
import { DEFAULT_NAMESPACE } from '../../utils/constants';

type ClusterCreateButtonProps = {
  namespace: string;
};

const ClusterCreateButton: FC<ClusterCreateButtonProps> = ({ namespace }) => {
  const history = useHistory();

  const onClick = () => {
    history.push(`/k8s/ns/${namespace || DEFAULT_NAMESPACE}/${InfinispanClusterModelRef}/~new`);
  };

  return (
    <ListPageCreateButton
      onClick={onClick}
      createAccessReview={{ groupVersionKind: InfinispanClusterModelRef, namespace }}
    >
      Create Data Grid Cluster
    </ListPageCreateButton>
  );
};

export default ClusterCreateButton;
