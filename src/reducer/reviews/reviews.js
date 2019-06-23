const ActionType = {
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  CLEAR_REVIEWS: `CLEAR_REVIEWS`,
  POST_REVIEW: `POST_REVIEW`
};

const initialState = {
  reviews: [],
  reviewPostedStatus: false
};

const actionLoadReviews = (loadedReviews) => {
  return {
    type: ActionType.LOAD_REVIEWS,
    payload: loadedReviews
  };
};

const actionClearReviews = () => {
  return {
    type: ActionType.CLEAR_REVIEWS
  };
};

const actionPostReview = (status) => {
  return {
    type: ActionType.POST_REVIEW,
    payload: status
  };
};

const Operation = {
  loadReviews: (filmId) => (dispatch, _getState, api) => {
    return api.get(`/comments/${filmId}`).then((response) => {
      dispatch(actionLoadReviews(response.data));
    });
  },

  postReview: (filmId, reviewInfo) => (dispatch, _getState, api) => {
    return api
      .post(`/comments/${filmId}`, reviewInfo)
      .then(() => {
        dispatch(actionPostReview(true));
      })
      .catch((error) => {
        dispatch(actionPostReview(false));
        throw new Error(`Some trouble: ${error}`);
      });
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload.sort(function (reviewA, reviewB) {
          return new Date(reviewB.date) - new Date(reviewA.date);
        })
      });

    case ActionType.CLEAR_REVIEWS:
      return Object.assign({}, state, initialState);

    case ActionType.POST_REVIEW:
      return Object.assign({}, state, {
        reviewPostedStatus: action.payload
      });
  }

  return state;
};

export {
  actionLoadReviews,
  actionPostReview,
  actionClearReviews,
  Operation,
  ActionType,
  reducer
};
