// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getUVIndex GET /api/uv */
export async function getUvIndexUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUVIndexUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/uv', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getUVIndexByLatAndLon GET /api/uv-location */
export async function getUvIndexByLatAndLonUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUVIndexByLatAndLonUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/uv-location', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
