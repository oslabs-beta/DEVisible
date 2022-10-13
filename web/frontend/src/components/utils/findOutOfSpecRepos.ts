import { AllDependenciesBuilds } from 'frontend/src/types';
import jsonVerify from './jsonVerify';

const findOutOfSpecRepos = (
  preferredDependencies: string,
  allDependencies: AllDependenciesBuilds[]
) => {
  const parsedDepPrefs = JSON.parse(preferredDependencies);
  const cacheOfReposOutOfDate = {};
  if (Array.isArray(allDependencies)) {
    allDependencies.forEach((repo) => {
      const parsedDepForRepo = jsonVerify(
        repo.builds[repo.builds.length - 1].deps
      );
      parsedDepPrefs.forEach((preferredDep) => {
        parsedDepForRepo.forEach((dep) => {
          if (
            preferredDep.name === dep.name &&
            parseFloat(preferredDep.version) > parseFloat(dep.version)
          ) {
            if (cacheOfReposOutOfDate[repo.id])
              cacheOfReposOutOfDate[repo.id].push(dep.name);
            else cacheOfReposOutOfDate[repo.id] = [dep.name];
          }
        });
      });
    });
  }
  return cacheOfReposOutOfDate;
};
export default findOutOfSpecRepos;
