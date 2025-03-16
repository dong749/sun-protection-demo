// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getData GET /api/data */
export async function getDataUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseListMelanomaSkinCancer_>('/api/data', {
    method: 'GET',
    ...(options || {}),
  });
}
