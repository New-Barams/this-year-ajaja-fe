import { planIcons } from '@/constants/planIcons';
import { useToggleAjajaNotificationMutation } from '@/hooks/apis/useToggleAjajaNotificationMutation';
import { useToggleIsPublicMutation } from '@/hooks/apis/useToggleIsPublicMutation';
import { PlanData } from '@/types/apis/plan/GetPlan';
import Image from 'next/image';
import { AjajaButton, DebounceSwitchButton, PlanInput, Tag } from '..';
import HelpButton from '../HelpButton/HelpButton';
import './index.scss';

interface ReadOnlyPlanProps {
  isLogin: boolean;
  isMine: boolean;
  planData: PlanData;
  children?: React.ReactNode;
}

export default function ReadOnlyPlan({
  isLogin,
  isMine,
  planData,
  children,
}: ReadOnlyPlanProps) {
  const {
    id,
    icon,
    title,
    description,
    public: isPublic,
    ajajas,
    createdAt,
    writer,
    tags,
    canAjaja,
  } = planData;

  const createdYear = new Date(createdAt).toLocaleDateString();
  const { mutate: toggleIsPublic } = useToggleIsPublicMutation(id);
  const { mutate: toggleAjajaNotification } =
    useToggleAjajaNotificationMutation(id);

  const handleToggleIsPublic = () => {
    toggleIsPublic(id);
  };

  const handleToggleIsCanAjaja = () => {
    toggleAjajaNotification(id);
  };

  return (
    <div className="plan__container">
      <div className="plan__header">
        <Image
          src={`/animal/${planIcons[icon]}.png`}
          alt={`${planIcons[icon]}`}
          width={50}
          height={50}
        />
        <h1 className="plan__header--text font-size-lg">{title}</h1>
        <div className="plan__header--after font-size-sm">
          <div className="plan__header--after--at">{`${createdYear} 작성`}</div>
          {children}
        </div>
      </div>

      <div className="plan__content font-size-base color-origin-text-100">
        <PlanInput
          classNameList={['color-origin-text-100']}
          kind="content"
          placeholder="어떤 계획을 가지고 계신가요?"
          onChangeInput={() => {}}
          textInput={description}
          maxLength={400}
        />
        <div className="plan__content--tags font-size-sm">
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
      </div>
      <AjajaButton
        disabled={!isLogin}
        planId={id}
        isFilled={writer.ajajaPressed}
        ajajaCount={ajajas}
      />
      {isMine && (
        <div className="plan__bottom">
          <div className="plan__bottom--public">
            <DebounceSwitchButton
              defaultIsOn={isPublic}
              toggleName="public"
              submitToggleAPI={handleToggleIsPublic}
            />
            <HelpButton
              helpText={`계획 공개를 하면 둘러보기에서\n모든 사람들이 볼 수 있어요.`}
            />
          </div>
          <div className="plan__bottom--ajaja-notification">
            <DebounceSwitchButton
              toggleName="ajaja"
              defaultIsOn={canAjaja}
              submitToggleAPI={handleToggleIsCanAjaja}
            />
            <HelpButton
              helpText={`매주 몇 명의 새로운 사람들이 내 계획에\n아좌좌를 눌러 응원했는지 알려드려요.`}
            />
          </div>
          <span className="font-size-xs color-origin-primary">
            현재 카카오톡 알림은 2월 부터 받으실 수 있습니다.
          </span>
        </div>
      )}
    </div>
  );
}
