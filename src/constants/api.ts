export const NETWORK = {
  TIMEOUT: 10000,
} as const;

export const DOMAIN = {
  PUT_USERS_RECEIVE: '/users/receive',
  POST_USERS_VERIFY: '/mock/users/verify-email',
  POST_USERS_SEND_VERIFICATION: '/mock/users/send-verification',
  POST_USERS_REFRESH: '/mock/users/refresh',
  POST_USERS_LOGOUT: '/mock/users/logout',
  DELETE_USERS: '/mock/users',

  POST_FEEDBACKS: (feedbackId: string) => `/mock/feedbacks/${feedbackId}`,
  GET_FEEDBACKS: (userId: string) => `/feedbacks/${userId}`,
  GET_FEEDBACKS_EACH: (planId: string) => `/mock/${planId}/feedbacks`,

  POST_REISSUE: '/mock/reissue',
  POST_LOGIN: '/mock/login',

  GET_PLANS_REMINDS: (planId: string) => `/mock/plans/${planId}/reminds`,
  PUT_PLANS_REMINDS: (planId: string) => `/mock/plans/${planId}/reminds`,
  POST_PLANS_REMINDS: (planId: string) => `/mock/plans/${planId}/reminds`,
  GET_PLANS_REMINDS_MESSAGES: (userId: string) =>
    `/mock/plans/${userId}/reminds/messages`,
  GET_PLANS: (id: string) => `/mock/plans/${id}`,
  PUT_PLANS: (id: string) => `/mock/plans/${id}`,
  DELETE_PLANS: (id: string) => `/mock/plans/${id}`,
  PUT_PLANS_SWITCH_REMINDABLE: (id: string) => `/mock/plans/${id}/remindable`,
  PUT_PLANS_SWITCH_PUBLIC: (id: string) => `/mock/plans/${id}/public`,
  PUT_PLANS_SWITCH_AJAJA: (id: string) => `/mock/plans/${id}/ajaja`,
  GET_PLANS_ALL: '/mock/plans',
  POST_PLANS: '/mock/plans',
  GET_PLANS_FEEDBAKS: (planId: string) => `/plans/${planId}/feedbacks`,
  GET_PLANS_MAIN: (userId: string) => `/mock/plans/main/${userId}`,
};

//실제 API -> swagger 순서입니다.
// PUT_USERS_RECEIVE: '/users/receive',
// POST_USERS_VERIFY: '/users/verify',
// POST_USERS_SEND_VERIFICATION: '/users/send-verification',
// POST_USERS_REFRESH: '/users/refresh',
// POST_USERS_LOGOUT: '/users/logout',
// DELETE_USERS: '/users',

// POST_FEEDBACKS: (feedbackId: string) => `/feedbacks/${feedbackId}`,
// GET_FEEDBACKS: (userId: string) => `/feedbacks/${userId}`,

// POST_REISSUE: '/reissue',
// POST_LOGIN: '/login',

// GET_PLANS: (id: string) => `/plans/${id}`,
// PUT_PLANS: (id: string) => `/plans/${id}`,
// DELETE_PLANS: (id: string) => `/plans/${id}`,
// PUT_PLANS_SWITCH_REMINDABLE: (id: string) => `/plans/${id}/remindable`,
// PUT_PLANS_SWITCH_PUBLIC: (id: string) => `/plans/${id}/public`,
// PUT_PLANS_SWITCH_AJAJA: (id: string) => `/plans/${id}/ajaja`,
// GET_PLANS_ALL: '/plans',
// POST_PLANS: '/plans',
// GET_PLANS_FEEDBAKS: (planId: string) => `/plans/${planId}/feedbacks`,
// GET_PLANS_MAIN: (userId: string) => `/plans/main/${userId}`,
