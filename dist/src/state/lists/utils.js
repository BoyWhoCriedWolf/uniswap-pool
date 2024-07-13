import { minVersionBump } from '@uniswap/token-lists';

function shouldAcceptVersionUpdate(listUrl, current, update, targetBump) {
  const min = minVersionBump(current.tokens, update.tokens);
  // Automatically update minor/patch as long as bump matches the min update.
  if (targetBump >= min) {
    return true;
  } else {
    console.debug(`List at url ${listUrl} could not automatically update because the version bump was only PATCH/MINOR while the update had breaking changes and should have been MAJOR`);
    return false;
  }
}

export { shouldAcceptVersionUpdate };
