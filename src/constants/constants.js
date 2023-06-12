let domain = '10.0.2.2:5000';

const base_url = `http://${domain}/api/meeting`;
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
    node_meeting: 'createMeeting',

    login: 'login',
    meetingList: 'meetings',
    meeting: 'meeting',
    logout: 'logout',
    registerForm: 'register',
    forgetPassword: 'forgot-password',
    userList: 'users',
    uploadFile: 'file-upload',
    notes: 'notes',
    roles: 'roles',
    note: 'note',
    user: 'user',
    actionList: 'action-items',
    action: 'action-item',
    meetingAction: 'meeting-action',
    noteAction: 'note-action',
    actionItemAction: 'action-item-action',
    appSetting: 'app-setting',
    role: 'role',
    dashboard: 'dashboard',
    changePassword: 'change-password',
    updatePassword: 'update-password',
    notifications: 'notifications',
    readAllNotification: 'user-notification-read-all',
    // readAllNotificationId: 'notification/1/read',
    permissions: 'permissions',
    permission: 'permission',
    verifyOtp: 'verify-otp',
    userAction: 'user-action',
    logsList: 'logs',
  },
};
