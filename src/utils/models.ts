import { K8sModel } from '@openshift-console/dynamic-plugin-sdk';
import { useK8sModels } from '@openshift-console/dynamic-plugin-sdk';
import { modelToRef } from './modelUtils';

export const InfinispanCluster: K8sModel = {
  apiGroup: 'infinispan.org',
  apiVersion: 'v1',
  kind: 'Infinispan',
  label: 'Infinispan',
  labelPlural: 'Infinispans',
  plural: 'infinispans',
  abbr: 'I',
  namespaced: true
};

export const Cache: K8sModel = {
  apiGroup: 'infinispan.org',
  apiVersion: 'v2alpha1',
  kind: 'Cache',
  label: 'Cache',
  labelPlural: 'Caches',
  plural: 'caches',
  abbr: 'C',
  namespaced: true
};

export const InfinispanClusterModelRef = modelToRef(InfinispanCluster);
