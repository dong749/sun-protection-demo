// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addProduct POST /api/product/add */
export async function addProductUsingPost(
  body: API.ProductAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/product/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getProductList GET /api/product/all */
export async function getProductListUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListProduct_>('/api/product/all', {
    method: 'GET',
    ...(options || {}),
  });
}

/** deleteProduct POST /api/product/delete */
export async function deleteProductUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/product/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editProduct POST /api/product/edit */
export async function editProductUsingPost(
  body: API.ProductEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/product/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getProductVOById GET /api/product/get/vo */
export async function getProductVoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getProductVOByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseProduct_>('/api/product/get/vo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listProductVOByPage POST /api/product/list/page/vo */
export async function listProductVoByPageUsingPost(
  body: API.ProductQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProduct_>('/api/product/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyProductVOByPage POST /api/product/my/list/page/vo */
export async function listMyProductVoByPageUsingPost(
  body: API.ProductQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageProduct_>('/api/product/my/list/page/vo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
