import { api, config } from '@/settings';

/**
 * @description 获取图片地址
 * @param url 源 URL
 * @returns string
 */
export function imgSrc(url: string): string {
  return config.useOssSource ? `${api.ossSource}images/${url.slice(65)}` : url;
}
