import { useAppSelector } from '../state/hooks.js';

function useIsNotOriginCountry(country) {
  var originCountry = useAppSelector(function (state) {
    return state.user.originCountry;
  });
  return Boolean(originCountry) && originCountry !== country;
}

export { useIsNotOriginCountry };
