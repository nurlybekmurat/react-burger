export const customMiddleware = 
  () =>
    (store) =>
      (next) =>
        (action) => {
          if (typeof action === 'function') {
            console.log(action);

            return action(next, store);
          } else {
            console.log(action);
            return next(action);
          }
        }
