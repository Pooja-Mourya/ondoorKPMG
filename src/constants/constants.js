let domain = 'meeting-api.gofactz.com/public';

const base_url = `http://${domain}/api/`;
const base_url2 = `http://${domain}/`;

const walkthrough = [
  {
    id: 0,
    title: 'Genuine product',
    sub_title: 'Diversified items of products in life, genuine product, safe',
  },
  {
    id: 1,
    title: 'Convenient ordering',
    sub_title: 'Order multiple items from multiple brands at the same time',
  },
  {
    id: 2,
    title: 'Easy search',
    sub_title:
      'Find products easy with Scanning camera, pay with just one camera scan',
  },
  {
    id: 3,
    title: 'Super fast delivery',
    sub_title: 'Delivery within the next day including Saturday and Sunday',
  },
];

export default {
  walkthrough,
  base_url,
  base_url2,
  AsyncStorageKey: '@user',
  endPoint: {
    login: 'login',
    meetingList: 'meetings',
    addMeeting: 'meeting',
    logout: 'logout',
    register: 'register',
    forgetPassword: 'forgot-password',
  },
};
