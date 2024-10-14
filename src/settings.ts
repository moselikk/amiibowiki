interface Config {
  title: string;
  listLength: number;
  useOssSource: boolean;
}

interface Api {
  amiiboApi: string;
  hitokotoApi: string;
  ossSource: string;
  amiiboOfficialAddress: string;
}
interface Information {
  authorHomePage: string;
  authorGithub: string;
}

export const config: Config = {
  title: 'Amiibowiki', // 网页标题
  listLength: 10, // 默认显示卡片数量
  useOssSource: true,
};

export const api: Api = {
  hitokotoApi: 'https://v1.hitokoto.cn/', // 一言 API
  amiiboApi: 'https://www.amiiboapi.com/api/', // amiiboapi API
  ossSource: 'https://less-1251975755.cos.ap-beijing.myqcloud.com/', // OSS URL
  amiiboOfficialAddress: 'https://www.nintendo.com/amiibo/',
};

export const information: Information = {
  authorHomePage: 'https://moselikk.com/',
  authorGithub: 'https://github.com/moselikk',
};

const settings = { config, api, information };

export default settings;
