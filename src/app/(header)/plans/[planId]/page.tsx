export default function PlanIdPage({ params }: { params: { planId: string } }) {
  // const data: PlanData = {
  //   id: 1234,
  //   userId: 123121,
  //   nickname: '테스트임니다.',
  //   title: '테스트 타이틀',
  //   description: '테스트 설명',
  //   isPublic: true,
  //   ajajas: 25,
  //   isAjajaOn: true,
  //   tags: ['stst', 'ststt', 'ststt', 'werwrw'],
  //   createdAt: '',
  //   isCanAjaja: true,
  // };

  return <h2>{params.planId}</h2>;
}
