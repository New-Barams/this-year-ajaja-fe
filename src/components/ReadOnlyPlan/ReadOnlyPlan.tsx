import { planIcons } from '@/constants/planIcons';
import { useToggleAjajaNotificationMutation } from '@/hooks/apis/useToggleAjajaNotificationMutation';
import { useToggleIsPublicMutation } from '@/hooks/apis/useToggleIsPublicMutation';
import { PlanData } from '@/types/apis/plan/GetPlan';
import Image from 'next/image';
import { AjajaButton, DebounceSwitchButton, PlanInput, Tag } from '..';
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
    Public,
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
        disabled={isLogin}
        planId={id}
        isFilled={writer.ajajaPressed}
        ajajaCount={ajajas}
      />
      {isMine && (
        <div className="plan__bottom">
          <DebounceSwitchButton
            defaultIsOn={Public}
            toggleName="public"
            submitToggleAPI={handleToggleIsPublic}
          />

          <DebounceSwitchButton
            toggleName="ajaja"
            defaultIsOn={canAjaja}
            submitToggleAPI={handleToggleIsCanAjaja}
          />
        </div>
      )}
    </div>
  );
}
