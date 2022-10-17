/* eslint-disable consistent-return */
import { compareVersions } from 'compare-versions';
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
  console.log(parsedDepPrefs);
  const cacheOfReposOutOfDate: OutOfSpecRepos = {};
  if (Array.isArray(allDependencies)) {
    if (!Array.isArray(allDependencies)) return cacheOfReposOutOfDate;
    allDependencies.forEach((repo) => {
      const parsedDepForRepo = jsonVerify(
        repo.builds[repo.builds.length - 1].deps
      );
      if (!Array.isArray(parsedDepPrefs)) return cacheOfReposOutOfDate;
      parsedDepPrefs.forEach((preferredDep: TrackedDependencies) => {
        if (!Array.isArray(parsedDepForRepo)) return cacheOfReposOutOfDate;
        parsedDepForRepo.forEach((dep: RepoDependencies) => {
          if (
            preferredDep.name === dep.name &&
            compareVersions(preferredDep.version, dep.version) === 1
          ) {
            console.log(compareVersions(preferredDep.version, dep.version));
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
