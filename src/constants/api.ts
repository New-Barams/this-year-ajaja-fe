export const NETWORK = {
  TIMEOUT: 10000,
} as const;

export const DOMAIN = {
  PUT_USERS_RECEIVE: '/users/receive',
  POST_USERS_VERIFY: '/users/verify',
  POST_USERS_SEND_VERIFICATION: '/users/send-verification',
  POST_USERS_REFRESH: '/users/refresh',
  POST_USERS_LOGOUT: '/users/logout',
  DELETE_USERS: '/users',
  GET_USERS: '/users',

  POST_FEEDBACKS: (feedbackId: number) => `/feedbacks/${feedbackId}`,
  GET_FEEDBACKS: (userId: number) => `/feedbacks/${userId}`,
  GET_FEEDBACKS_EACH: (planId: number) => `/mock/${planId}/feedbacks`,

  POST_REISSUE: '/reissue',
  POST_LOGIN: `/login`,

  GET_PLANS_REMINDS: (planId: number) => `/mock/plans/${planId}/reminds`,
  PUT_PLANS_REMINDS: (planId: number) => `/mock/plans/${planId}/reminds`,
  POST_PLANS_REMINDS: (planId: number) => `/mock/plans/${planId}/reminds`,
  GET_PLANS_REMINDS_MESSAGES: (userId: number) =>
    `/mock/plans/${userId}/reminds/messages`,
  GET_PLANS: (planId: number) => `/plans/${planId}`,
  PUT_PLANS: (planId: number) => `/plans/${planId}`,
  DELETE_PLANS: (planId: number) => `/plans/${planId}`,
  PUT_PLANS_SWITCH_REMINDABLE: (planId: number) =>
    `/plans/${planId}/remindable`,
  PUT_PLANS_SWITCH_PUBLIC: (planId: number) => `/plans/${planId}/public`,
  PUT_PLANS_SWITCH_AJAJA: (planId: number) => `/plans/${planId}/ajaja`,
  GET_PLANS_ALL: '/plans',
  POST_PLANS: '/plans',
  GET_PLANS_FEEDBAKS: (planId: number) => `/plans/${planId}/feedbacks`,
  GET_PLANS_MAIN: `/plans/main`,

  POST_AJAJA: (planId: number) => `/plans/${planId}/ajaja`,

  GET_REMINDS: (planId: number) => `/reminds/${planId}`,
  GET_REMINDS_MODIFY: (planId: number) => `/reminds/modify/${planId}`,
};

// 실제 API -> swagger 순서입니다.
// PUT_USERS_RECEIVE: '/users/receive',
// POST_USERS_VERIFY: '/users/verify',
// POST_USERS_SEND_VERIFICATION: '/users/send-verification',
// POST_USERS_REFRESH: '/users/refresh',
// POST_USERS_LOGOUT: '/users/logout',
// DELETE_USERS: '/users',

// POST_FEEDBACKS: (feedbackId: number) => `/feedbacks/${feedbackId}`,
// GET_FEEDBACKS: (userId: number) => `/feedbacks/${userId}`,

// POST_REISSUE: '/reissue',
// POST_LOGIN: '/login',

// GET_PLANS: (planId: number) => `/plans/${planId}`,
// PUT_PLANS: (planId: number) => `/plans/${planId}`,
// DELETE_PLANS: (planId: number) => `/plans/${planId}`,
// PUT_PLANS_SWITCH_REMINDABLE: (planId: number) => `/plans/${planId}/remindable`,
// PUT_PLANS_SWITCH_PUBLIC: (planId: number) => `/plans/${planId}/public`,
// PUT_PLANS_SWITCH_AJAJA: (planId: number) => `/plans/${planId}/ajaja`,
// GET_PLANS_ALL: '/plans',
// POST_PLANS: '/plans',
// GET_PLANS_FEEDBAKS: (planId: number) => `/plans/${planId}/feedbacks`,
// GET_PLANS_MAIN: (userId: number) => `/plans/main/${userId}`,

// GET_REMINDS : (planId: number) => `/reminds/${planId}`,
// GET_REMINDS_MODIFY : (planId: number) => `/reminds/modify/${planId}`,
