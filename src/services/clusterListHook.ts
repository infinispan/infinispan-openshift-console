import { useEffect, useState } from 'react';
import { k8sListItems, K8sModel } from '@openshift-console/dynamic-plugin-sdk';
import { useActiveNamespace } from '@openshift-console/dynamic-plugin-sdk-internal';
import { InfinispanCluster } from '../utils/models';

export function useClusterList(namespace) {
  const [activeNamespace] = useActiveNamespace();
  const [clusters, setClusters] = useState([]);
  const [loadError, setLoadError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
    k8sListItems({
      model: InfinispanCluster,
      queryParams: { ns: namespace }
    })
      .then((clusters) => {
        setClusters(clusters);
        console.log('clusters', clusters);
      })
      .catch((e) => {
        setLoadError(e.message);
        console.error('failed', e);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  return { clusters, loadError, loading };
}
