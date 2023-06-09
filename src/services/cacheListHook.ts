import { useEffect, useState } from 'react';
import { k8sListItems } from '@openshift-console/dynamic-plugin-sdk';
import { Cache } from '../utils/models';

export function useCacheList(namespace) {
  const [caches, setCaches] = useState([]);
  const [loadError, setLoadError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
    k8sListItems({
      model: Cache,
      queryParams: { ns: namespace }
    })
      .then((caches) => {
        setCaches(caches);
      })
      .catch((e) => {
        setLoadError(e.message);
      })
      .finally(() => {
        setLoading(true);
      });
  }, []);

  return { caches, loadError, loading };
}
