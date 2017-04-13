import { get } from "lodash";

const fromRoot = (path: string, selector: Function): Function =>
  (state: Object, ...args: any[]): any => selector(get(state, path), ...args);

export default (
  selectors: { [key: string]: Function },
  path: string
): { [key: string]: Function } => Object.keys(selectors).reduce(
  (obj: { [key: string]: Function }, key) => {
    obj[key] = fromRoot(path, selectors[key]);
    return obj;
  },
  {}
);