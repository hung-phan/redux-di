import { get } from "lodash";

export type SelectorFunction<S> = (state: Object, ...args: any[]) => S;

const fromRoot = <S>(path: string, selector: SelectorFunction<S>): SelectorFunction<S> =>
  (state, ...args) => selector(get(state, path), ...args);

export default <S extends Object>(selectors: S, path: string): S =>
  Object.keys(selectors).reduce(
    (obj: S, key: string) => {
      obj[key] = fromRoot(path, selectors[key]);
      return obj;
    },
    Object.create(null)
  );