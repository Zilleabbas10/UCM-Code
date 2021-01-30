import ACTION_TYPES from './action.types';

const updateLoader = (isLoading) => ({
  type: ACTION_TYPES.TOGGLE_APP_LOADING,
  isLoading,
});
export const toggleAppScreenLoader = (isLoading: boolean) => {
  return (dispatch) => {
    if (!isLoading) {
      setTimeout(() => {
        dispatch(updateLoader(isLoading));
      }, 100);
    } else {
      dispatch(updateLoader(isLoading));
    }
  };
};
