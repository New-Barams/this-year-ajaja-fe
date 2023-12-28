export interface GetPlanResponse {
  success: boolean;
  data: PlanData;
}
// {
//   "success": true,
//   "data": {
//       "writer": {
//           "nickname": "게임하는 원숭이",
//           "owner": true,
//           "ajajaPressed": true
//       },
//       "id": 44,
//       "title": "전국 여행 하기 ",
//       "description": "2달에 한 번씩 견문을 넓히기 위해서 여행 ",
//       "icon": 8,
//       "canRemind": true,
//       "canAjaja": true,
//       "ajajas": 1,
//       "tags": [
//           "충청도",
//           "전라도",
//           "경상도",
//           "강원도",
//           "제주도"
//       ],
//       "createdAt": "2023-11-30T08:26:56.947438Z",
//       "public": true
//   }
// }
export interface PlanData {
  writer: Writer;
  id: number;
  title: string;
  description: string;
  icon: number;
  canRemind: boolean;
  canAjaja: boolean;
  ajajas: number;
  tags: string[];
  Public: boolean;
  createdAt: string;
}

interface Writer {
  nickname: string;
  owner: boolean;
  ajajaPressed: boolean;
}
