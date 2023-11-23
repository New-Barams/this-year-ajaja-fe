export interface RequestEmailVerificationRequestBody {
  email: string;
}

export interface RequestEmailVerificationResponse {
  //실제 api에서는 응답값 없음
  data: Certification;
}
interface Certification {
  certification: string;
}
