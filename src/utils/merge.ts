type Indexed<T> = {
    [key in string]: T;
  };

/* eslint-disable no-param-reassign */
function merge<T = unknown>(lhs: Indexed<T>, rhs: Indexed<T>): Indexed<T> {
  Object.entries(rhs).forEach(([key, value]) => {
    if (lhs[key]) {
      merge(lhs[key] as Indexed<T>, rhs[key] as Indexed<T>);
    } else {
      lhs[key] = value;
    }
  });
  return lhs;
}

export default merge;
