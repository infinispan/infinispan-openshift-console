import { useCacheList } from '../services/cacheListHook';

//Utility function to count Cache CR's for particular Infinispan Cluster CR
export function countCachesForCluster(clusterName: any, namespace: string) {
  const { caches } = useCacheList(namespace);
  let count = 0;
  for (const cache of caches) {
    if (cache.spec.clusterName === clusterName) {
      count++;
    }
  }
  return count;
}
