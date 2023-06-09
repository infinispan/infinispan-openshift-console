import React, { FC } from 'react';
import { useClusterList } from '../../services/clusterListHook';
import { EmptyState, EmptyStateBody, EmptyStateIcon, Label } from '@patternfly/react-core';
import { CubesIcon } from '@patternfly/react-icons';
import {
  ResourceLink,
  ListPageBody,
  ListPageFilter,
  ListPageHeader,
  useListPageFilter,
  TableData,
  Timestamp,
  VirtualizedTable,
  K8sGroupVersionKind
} from '@openshift-console/dynamic-plugin-sdk';
import ClusterListEmptyState from './ClusterListEmptyState';
import ClusterCreateButton from './ClusterCreateButton';
import { countCachesForCluster } from '../../utils/cacheCount';

type ClustersListProps = {
  namespace: string;
};

const ClustersList: FC<ClustersListProps> = ({ namespace }) => {
  const { clusters, loadError, loading } = useClusterList(namespace);
  const [data, filteredData, onFilterChange] = useListPageFilter(clusters);

  const groupVersionKind: K8sGroupVersionKind = {
    group: 'infinispan.org',
    version: 'v1',
    kind: 'Infinispan'
  };

  const columns = [
    {
      title: 'Name',
      id: 'name'
    },
    {
      title: 'Kind',
      id: 'kind'
    },
    {
      title: 'Namespace',
      id: 'namespace'
    },
    {
      title: 'Cache count',
      id: 'cacheCount'
    },
    {
      title: 'Operand Version',
      id: 'operandVersion'
    },
    {
      title: 'Create',
      id: 'created'
    }
  ];

  const EmptyMsg = () => {
    return (
      <EmptyState>
        <EmptyStateIcon icon={CubesIcon} />
        <EmptyStateBody>No data found for applied filter</EmptyStateBody>
      </EmptyState>
    );
  };

  return (
    <>
      <ListPageHeader title={'Data Grid Clusters'}>
        <ClusterCreateButton namespace={namespace} />
      </ListPageHeader>
      <ListPageBody>
        <ListPageFilter data={data} loaded={loading} onFilterChange={onFilterChange} />
        <VirtualizedTable
          data={filteredData}
          unfilteredData={data}
          columns={columns}
          loaded={loading}
          loadError={loadError}
          NoDataEmptyMsg={() => <ClusterListEmptyState namespace={namespace} />}
          EmptyMsg={EmptyMsg}
          Row={({ obj, activeColumnIDs, rowData }) => {
            const cacheCount = countCachesForCluster(obj.metadata.name, namespace);
            return (
              <>
                <TableData id={columns[0].id} activeColumnIDs={activeColumnIDs}>
                  <ResourceLink
                    groupVersionKind={groupVersionKind}
                    name={obj.metadata.name}
                    namespace={obj.metadata.namespace}
                  />
                </TableData>
                <TableData id={columns[1].id} activeColumnIDs={activeColumnIDs}>
                  {obj['kind']}
                </TableData>
                <TableData id={columns[2].id} activeColumnIDs={activeColumnIDs}>
                  {obj['metadata']['namespace']}
                </TableData>
                <TableData id={columns[3].id} activeColumnIDs={activeColumnIDs}>
                  {cacheCount}
                </TableData>
                <TableData id={columns[4].id} activeColumnIDs={activeColumnIDs}>
                  <Label variant={'outline'}>{obj['status']['operand']['version']}</Label>
                </TableData>
                <TableData id={columns[5].id} activeColumnIDs={activeColumnIDs}>
                  <Timestamp timestamp={obj['metadata']['creationTimestamp']} />
                </TableData>
                {console.log('obj', obj)}
                {console.log('rowData', rowData)}
              </>
            );
          }}
        />
      </ListPageBody>
    </>
  );
};

export default ClustersList;
