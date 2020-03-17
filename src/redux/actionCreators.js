import {
  CART_ADD_PRODUCT_START,
  CART_ADD_PRODUCT_SUCCESS,
  CART_ADD_PRODUCT_FAIL,
  CART_DELETE_PRODUCT_START,
  CART_DELETE_PRODUCT_SUCCESS,
  CART_DELETE_PRODUCT_FAIL,
  CART_SET_PRODUCT_QUANTITY_START,
  CART_SET_PRODUCT_QUANTITY_SUCCESS,
  CART_SET_PRODUCT_QUANTITY_FAIL,
  INIT_APP_START,
  INIT_APP_SUCCESS,
  INIT_APP_FAIL,
  CATALOG_PAGE_LOAD_START,
  CATALOG_PAGE_LOAD_SUCCESS,
  CATALOG_PAGE_LOAD_FAIL,
  CART_PAGE_LOAD_START,
  CART_PAGE_LOAD_SUCCESS,
  CART_PAGE_LOAD_FAIL
} from "./actionTypes";
import axios from "axios";
import {ajaxEndpoint} from "../shared/utilities";
import {ErrorMessage} from "../shared/errorMessages";
import {cartItemAdapter} from "./utils";

export const initApp = () => {
  return dispatch => {
    dispatch(initAppStart());
    axios.get(ajaxEndpoint("rewooc_get_common_data")).then(({data}) => {
      dispatch(initAppSuccess(data))
    }).catch(error => {
      dispatch(initAppFail(error))
    })
  }
};

export const initAppStart = () => {
  return {type: INIT_APP_START}
};
export const initAppSuccess = (data) => {
  return {type: INIT_APP_SUCCESS, payload: {data}}
};
export const initAppFail = (error) => {
  return {type: INIT_APP_FAIL, error}
};

export const addToCart = (productId, quantity) => {
  return dispatch => {
    dispatch(addToCartStart(productId));

    const params = new FormData();
    params.set("productId", productId);
    params.set("quantity", quantity);

    axios.post(ajaxEndpoint("rewooc_add_to_cart"), params).then(response => {
      const {success, data} = response.data;
      if (success && data) {
        const cartItem = cartItemAdapter(data);
        dispatch(addToCartSuccess(cartItem));
      } else {
        throw new Error(ErrorMessage.CART_FAIL_TO_ADD_PRODUCT);
      }
    }).catch(error => {
      dispatch(addToCartFail(error));
    });
  }
};

export const addToCartStart = (productId) => {
  return {type: CART_ADD_PRODUCT_START, payload: {productId}}
};

export const addToCartSuccess = (product) => {
  return {type: CART_ADD_PRODUCT_SUCCESS, payload: {product}}
};

export const addToCartFail = (error) => {
  return {type: CART_ADD_PRODUCT_FAIL, error}
};

export const deleteFromCart = (productKey) => {
  return dispatch => {
    const data = new FormData();
    data.set("productKey", productKey);

    dispatch(deleteFromCartStart(productKey));
    axios.post(ajaxEndpoint("rewooc_delete_from_cart"), data)
      .then(response => {
        if (response.data.success) {
          dispatch(deleteFromCartSuccess(productKey));
        } else {
          throw new Error(ErrorMessage.CART_FAIL_TO_DELETE_PRODUCT);
        }
      })
      .catch(error => {
        dispatch(deleteFromCartFail(error));
      });
  }
};

export const deleteFromCartStart = (productKey) => {
  return {type: CART_DELETE_PRODUCT_START, payload: {productKey}}
};

export const deleteFromCartSuccess = (productKey) => {
  return {type: CART_DELETE_PRODUCT_SUCCESS, payload: {productKey}}
};

export const deleteFromCartFail = (error) => {
  return {type: CART_DELETE_PRODUCT_FAIL, error}
};

export const setCartProductQuantity = (productKey, quantity) => {
  return dispatch => {
    const data = new FormData();
    data.set("productKey", productKey);
    data.set("quantity", quantity);

    dispatch(setCartProductQuantityStart(productKey));
    axios.post(ajaxEndpoint("rewooc_set_cat_product_quantity"), data)
      .then(response => {
        const {success, data} = response.data;
        if (success && data) {
          const cartItem = cartItemAdapter(data);
          dispatch(setCartProductQuantitySuccess(productKey, cartItem));
        } else {
          throw new Error(ErrorMessage.CART_FAIL_TO_CHANGE_QUANTITY)
        }
      })
      .catch(error => {
        dispatch(setCartProductQuantityFail(error));
      });
  }
};

export const setCartProductQuantityStart = (productKey) => {
  return {type: CART_SET_PRODUCT_QUANTITY_START, payload: {productKey}}
};

export const setCartProductQuantitySuccess = (productKey, item) => {
  return {type: CART_SET_PRODUCT_QUANTITY_SUCCESS, payload: {item}}
};

export const setCartProductQuantityFail = (error) => {
  return {type: CART_SET_PRODUCT_QUANTITY_FAIL, error}
};

export const loadCatalogPage = (url) => {
  return dispatch => {
    dispatch(loadCatalogPageStart());
    axios.get(url).then(({data}) => {
      dispatch(loadCatalogPageSuccess(data));
    }).catch(error => {
      dispatch(loadCatalogPageFail(error))
    })
  }
};

export const loadCatalogPageStart = () => {
  return {type: CATALOG_PAGE_LOAD_START}
};

export const loadCatalogPageSuccess = data => {
  return {
    type: CATALOG_PAGE_LOAD_SUCCESS,
    payload: {
      products: data.products,
      title: data.title
    }
  }
};

export const loadCatalogPageFail = error => {
  return {type: CATALOG_PAGE_LOAD_FAIL, error}
};


export const loadCartPage = (url) => {
  return dispatch => {
    dispatch(loadCartPageStart());
    axios.get(url).then(({data}) => {
      dispatch(loadCartPageSuccess(data));
    }).catch(error => {
      dispatch(loadCartPageFail(error))
    })
  }
};

export const loadCartPageStart = () => {
  return {type: CART_PAGE_LOAD_START}
};

export const loadCartPageSuccess = data => {
  return {
    type: CART_PAGE_LOAD_SUCCESS,
    payload: {
      title: data.title
    }
  }
};

export const loadCartPageFail = error => {
  return {type: CART_PAGE_LOAD_FAIL, error}
};