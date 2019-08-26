import axios from 'axios';
import {CART_ADD_PRODUCT} from './actionTypes';
import {addToCartSuccess, addToCartStart, addToCartFail} from './actionCreators';
import {ajaxEndpoint} from '../shared/utilities';

export const addToCart = store => next => action => {
    if (action.type !== CART_ADD_PRODUCT) {
        next(action);
        return;
    }
    next(addToCartStart(action.payload.productId));
    axios.get(ajaxEndpoint('rewooc_add_to_cart'), {
        params: {productId: action.payload.productId}
    }).then(response => {
        next(addToCartSuccess(response.data));
    }).catch(error => {
        next(addToCartFail(error));
    });
};