import {
  AllDependenciesBuilds,
  TrackedDependencies,
  OutOfSpecRepos,
} from 'frontend/src/types';
import jsonVerify from './jsonVerify';

interface RepoDependencies {
  name: string;
  version: string;
  isDevDependency?: boolean;
}

const findOutOfSpecRepos = (
  preferredDependencies: string,
  allDependencies: AllDependenciesBuilds[]
) => {
  const parsedDepPrefs = JSON.parse(preferredDependencies);
  const cacheOfReposOutOfDate: OutOfSpecRepos = {};
  if (Array.isArray(allDependencies)) {
    allDependencies.forEach((repo) => {
      const parsedDepForRepo = jsonVerify(
        repo.builds[repo.builds.length - 1].deps
      );
      parsedDepPrefs.forEach((preferredDep: TrackedDependencies) => {
        console.log('arse', parsedDepForRepo);
        parsedDepForRepo.forEach((dep: RepoDependencies) => {
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
  console.log(cacheOfReposOutOfDate);
  return cacheOfReposOutOfDate;
};
export default findOutOfSpecRepos;
