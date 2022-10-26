/* eslint-disable consistent-return */
import { compareVersions } from 'compare-versions';
import {
  AllDependenciesBuilds,
  TrackedDependencies,
  OutOfSpecRepos,
} from 'frontend/src/types';
import jsonVerify from './jsonVerify';

/**
 * @typeParam name - string that indicates name of repository dependency
 * @typeParam version - string that indicates version number of the dependency
 * @typeParam devDependency - boolean value indicating whether or not a dependency is a dev dependency
 */
interface RepoDependencies {
  name: string;
  version: string;
  isDevDependency?: boolean;
}

/**
 * function to find and specify which dependencies are out of spec according to user input
 * @param preferredDependencies - JSON string that indicates the list of preferred dependencies to track
 * @param allDependencies - object following {@link AllDependenciesBuilds}
 * @returns object containing out of spec repositories or empty object if non are out of spec
 */
const findOutOfSpecRepos = (
  preferredDependencies: string,
  allDependencies: AllDependenciesBuilds[]
) => {
  const parsedDepPrefs = JSON.parse(preferredDependencies);
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
