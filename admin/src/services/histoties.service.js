import BaseService from '@/common/baseService';
import { API_URL } from '@/config';

const source =`${API_URL}/admin/histoties`;

const fetch = (params) => BaseService.fetch(source, params);

const details = (params) => BaseService.fetch(`${source}/details`, params);

const importing = (model) => BaseService.post(`${source}/import`, model);

export default { fetch, details, importing };