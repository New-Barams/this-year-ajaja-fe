import { useToggleAjajaNotificationMutation } from '@/hooks/apis/useToggleAjajaNotificationMutation';
import { useToggleIsPublicMutation } from '@/hooks/apis/useToggleIsPublicMutation';
import { Color } from '@/types';
import classNames from 'classnames';
import { AjajaButton, IconSwitchButton, PlanInput, Tag } from '..';
import './index.scss';

interface ReadOnlyPlanProps {
  isMine: boolean; // 나/ 타인 구분
  planData: PlanData;
}
export type PlanData = {
  id: number; //계힉 Id
  userId: number; // 유저 Id
  nickname: string; // 유저 닉네임
  title: string; //계획 타이틀
  description: string; // 계획 설명
  isPublic: boolean; // 공개여부
  tags: string[]; // tag 리스트,  태그는 타입 변경 예정
  ajajas: number; // 아자자 개수
  isAjajaOn: boolean; // 아자자 클릭 여부
  isCanAjaja: boolean; // 응원 메세지 알람 여부
  createdAt: string; // 계획 생성 일자
};

export default function ReadOnlyPlan({ isMine, planData }: ReadOnlyPlanProps) {
  const {
    id,
    nickname,
    title,
    description,
    isPublic,
    ajajas,
    isAjajaOn,
    tags,
    createdAt,
    isCanAjaja,
  } = planData;

  const createdYear = new Date(createdAt).getFullYear();

  const colors: Color[] = [
    'primary',
    'orange-300',
    'green-300',
    'blue-300',
    'purple-300',
  ];
  const { mutate: toggleIsPublic } = useToggleIsPublicMutation();
  const { mutate: toggleAjajaNotification } =
    useToggleAjajaNotificationMutation();

  const handleToggleIsPublic = () => {
    toggleIsPublic(id);
    console.log(`${id}를 통해서 공개여부 변경`);
  };

  const handleToggleIsCanAjaja = () => {
    toggleAjajaNotification(id);
    console.log(`${id}를 통해서 응원메세지 알림여부 변경`);
  };

  return (
    <div className="plan__container">
      <div className="plan__header">
        <h1 className="plan__header--text font-size-3xl">
          {isMine ? '계획' : `${nickname}님의 계획입니다.`}
        </h1>
        {isMine && (
          <IconSwitchButton
            isActive={isPublic}
            offIconName="PLAN_CLOSE"
            onIconName="PLAN_OPEN"
            onClick={handleToggleIsPublic}
          />
        )}
        <span
          className={classNames(
            'plan__header--after color-origin-gray-200',
            !isMine && 'bottom-line',
          )}>
          {isMine
            ? `계획 공개`
            : `${createdYear ? createdYear : '0000'}년 작성`}
        </span>
      </div>

      <div className="plan__content">
        <PlanInput
          kind="title"
          placeholder=""
          onChangeInput={() => {}}
          textInput={title}
          maxLength={100}
        />

        <PlanInput
          kind="content"
          placeholder=""
          onChangeInput={() => {}}
          textInput={description}
          maxLength={400}
        />
        <div className="plan__content--tags">
          {tags.map((tag, index) => (
            <Tag color={colors[index % 5]} key={index}>
              {tag}
            </Tag>
          ))}
        </div>
      </div>

      <div className="plan__bottom">
        <AjajaButton isFilled={isAjajaOn} ajajaCount={ajajas} />
        {isMine && (
          <>
            <IconSwitchButton
              onIconName="NOTIFICATION_ON"
              offIconName="NOTIFICATION_OFF"
              isActive={isCanAjaja}
              onClick={handleToggleIsCanAjaja}
            />
            <div className="plan__bottom--after color-origin-gray-200">
              <span>월요일 18:00 마다</span>
              <span>응원 메시지 알림 활성화 </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
