export interface GetPlanResponse {
  success: boolean;
  data: PlanData;
}
// {
//   "success": true,
//   "data": {
//     "id": 0,
//     "userId": 0,
//     "nickname": "string",
//     "title": "string",
//     "description": "string",
//     "isPublic": true,
//     "canRemind": true,
//     "canAjaja": true,
//     "ajajas": 0,
//     "isPressAjaja": true,
//     "tags": [
//       "string"
//     ],
//     "createdAt": "2023-11-23T05:50:03.634Z"
//   }
// }

export interface PlanData {
  id: number;
  useId: number;
  nickname: string;
  title: string;
  description: string;
  isPublic: boolean;
  canRemind: boolean;
  canAjaja: boolean;
  ajajas: number;
  isPressAjaja: boolean;
  tags: string[];
  createdAt: string;
}
