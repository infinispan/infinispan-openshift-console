export function clusterHealthHelper(clusterStatus): boolean {
  if (!clusterStatus || !clusterStatus['conditions']) {
    console.log('no condition');
    return false;
  }
  const health = clusterStatus.conditions.find((condition) => {
    console.log('checking condition');
    return condition.type === 'WellFormed' && condition.status === 'True';
  });
  return !!health;
}
