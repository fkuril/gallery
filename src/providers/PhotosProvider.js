import React, { useEffect, useReducer, createContext, useContext } from 'react';
import produce from 'immer';

const PhotosContext = createContext();

const photosInitialState = {
  photos: [],
  perPage: 10,
  orderBy: 'latest',
  currentPage: 1,
  total: 0,
  isLoading: false,
};

const photosReducer = produce((draft, action) => {
  switch (action.type) {
    case 'totalChanged':
      draft.total = action.payload;
      return;
    case 'photosLoaded':
      action.photos.forEach(photo => {
        draft.photos.push(photo);
      });
      return;
    case 'orderByChanged':
      draft.orderBy = action.payload.orderBy;
      draft.photos = [];
      draft.currentPage = 1;
      return;
    case 'perPageChanged':
      draft.perPage = action.payload.perPage;
      draft.photos = [];
      draft.currentPage = 1;
      return;
    case 'loadMoreClicked':
      draft.currentPage += 1;
      return;
    case 'loading':
      draft.isLoading = action.payload;
      return;
    default:
      throw new Error(`photosReducer: invalid action type '${action.type}'`);
  }
});

export function PhotosProvider({ children }) {
  const [state, dispatch] = useReducer(photosReducer, photosInitialState);

  const { photos, currentPage, perPage, orderBy, isLoading, total } = state;

  const changeOrderBy = newOrderBy =>
    dispatch({ type: 'orderByChanged', payload: { orderBy: newOrderBy } });

  const changePerPage = newPerPage =>
    dispatch({ type: 'perPageChanged', payload: { perPage: newPerPage } });

  const loadMoreClicked = () => dispatch({ type: 'loadMoreClicked' });

  useEffect(() => {
    dispatch({ type: 'loading', payload: true });

    fetch(`/api/photos?page=${currentPage}&per_page=${perPage}&order_by=${orderBy}`)
      .then(resp => {
        dispatch({ type: 'totalChanged', payload: parseInt(resp.headers.get('x-total'), 10) });
        return resp.json();
      })
      .then(newPhotos => {
        dispatch({ type: 'photosLoaded', photos: newPhotos });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        dispatch({ type: 'loading', payload: false });
      });
  }, [currentPage, perPage, orderBy, dispatch]);

  return (
    <PhotosContext.Provider
      value={{
        photos,
        currentPage,
        total,
        perPage,
        orderBy,
        changeOrderBy,
        changePerPage,
        loadMoreClicked,
        isLoading,
      }}
    >
      {children}
    </PhotosContext.Provider>
  );
}

export function usePhotos() {
  return useContext(PhotosContext);
}
