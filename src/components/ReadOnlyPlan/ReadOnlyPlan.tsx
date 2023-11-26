import { useToggleAjajaNotificationMutation } from '@/hooks/apis/useToggleAjajaNotificationMutation';
import { useToggleIsPublicMutation } from '@/hooks/apis/useToggleIsPublicMutation';
import { Color } from '@/types';
import { PlanData } from '@/types/apis/plan/GetPlan';
import classNames from 'classnames';
import { AjajaButton, DebounceSwitchButton, PlanInput, Tag } from '..';
import './index.scss';

interface ReadOnlyPlanProps {
  isMine: boolean; // 나/ 타인 구분
  planData: PlanData;
}

export default function ReadOnlyPlan({ isMine, planData }: ReadOnlyPlanProps) {
  const {
    id,
    nickname,
    title,
    description,
    isPublic,
    ajajas,
    createdAt,
    isPressAjaja,
    tags,
    canAjaja,
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
          <DebounceSwitchButton
            defaultIsOn={isPublic}
            toggleName="public"
            submitToggleAPI={handleToggleIsPublic}
          />
        )}
        <span
          className={classNames(
            'plan__header--after color-origin-gray-200',
            !isMine && 'bottom-line',
          )}>
          {isMine || `${createdYear ? createdYear : '0000'}년 작성`}
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
        <AjajaButton planId={id} isFilled={isPressAjaja} ajajaCount={ajajas} />
        {isMine && (
          <>
            <DebounceSwitchButton
              toggleName="ajaja"
              defaultIsOn={canAjaja}
              submitToggleAPI={handleToggleIsCanAjaja}
            />
          </>
        )}
      </div>
    </div>
  );
}
