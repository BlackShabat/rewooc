import { instance } from '../instance'
import { wcAjax } from '../endpoints'
import { ICartItem } from '../cart/cartTypes'
import {
  IDeliveryMethod,
  IDeliveryMethodResponse,
  IPaymentMethod,
  IPaymentMethodResponse,
} from './orderTypes'
import { IResponseData } from '../types'

/**
 * Submit new order
 */
async function createOrder(form: any, cartItems: ICartItem[]): Promise<number> {
  const products = cartItems.map((item) => {
    return {
      product_id: item.product?.id,
      quantity: item.quantity,
    }
  })

  const options = {
    billing: {
      first_name: form.elements['billing_first_name'].value,
      last_name: form.elements['billing_last_name'].value,
      phone: form.elements['billing_phone'].value,
      email: form.elements['billing_email'].value,
    },
    products: products,
    delivery: form.elements['delivery'].value,
    payment: form.elements['payment'].value,
    status: 'processing',
    customer_id: 1,
  }

  const {
    data: { success, data },
  } = await instance.post<IResponseData<number>>(
    wcAjax('rewooc_post_order'),
    options
  )

  if (!success) {
    throw new Error('Fail to create new Order')
  }

  return data
}

/**
 * Fetch delivery methods
 */
async function fetchDeliveryMethods(): Promise<IDeliveryMethod[]> {
  const {
    data: { data, success },
  } = await instance.get<
    IResponseData<{
      [key: number]: IDeliveryMethodResponse
    }>
  >(wcAjax('rewooc_fetch_delivery_methods'))

  if (!success) {
    throw new Error('Fail to fetch delivery methods')
  }

  const methods = Object.values(data).map<IDeliveryMethod>((method) => {
    return {
      id: method.instance_id,
      title: method.title,
      cost: Number(method.cost),
      enabled: method.enabled,
      order: method.method_order,
    }
  })

  return methods
}

/**
 * Fetch payment methods
 */
async function fetchPaymentMethods(): Promise<IPaymentMethod[]> {
  const {
    data: { success, data },
  } = await instance.get<IResponseData<IPaymentMethodResponse[]>>(
    wcAjax('rewooc_fetch_payment_gateways')
  )

  if (!success) {
    throw new Error('Fail to fetch payment methods')
  }

  const methods = data.map<IPaymentMethod>((method) => {
    return {
      id: method.id,
      title: method.title,
      description: method.description,
      order: method.order,
      enabled: method.enabled,
    }
  })

  return methods
}

export default {
  createOrder,
  fetchDeliveryMethods,
  fetchPaymentMethods,
}
