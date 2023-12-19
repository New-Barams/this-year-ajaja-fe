import { planIcons } from '@/constants/planIcons';
import { useToggleAjajaNotificationMutation } from '@/hooks/apis/useToggleAjajaNotificationMutation';
import { useToggleIsPublicMutation } from '@/hooks/apis/useToggleIsPublicMutation';
import { PlanData } from '@/types/apis/plan/GetPlan';
import { checkIsSeason } from '@/utils/checkIsSeason';
import Image from 'next/image';
import Link from 'next/link';
import { AjajaButton, DebounceSwitchButton, PlanInput, Tag } from '..';
import './index.scss';

interface ReadOnlyPlanProps {
  isMine: boolean; // 나/ 타인 구분
  planData: PlanData;
}

export default function ReadOnlyPlan({ isMine, planData }: ReadOnlyPlanProps) {
  const {
    id,
    iconNumber,
    title,
    description,
    isPublic,
    ajajas,
    createdAt,
    isPressAjaja,
    tags,
    canAjaja,
  } = planData;

  const createdYear = new Date(createdAt).toLocaleDateString();

  const isSeason = checkIsSeason();
  const { mutate: toggleIsPublic } = useToggleIsPublicMutation(id);
  const { mutate: toggleAjajaNotification } =
    useToggleAjajaNotificationMutation(id);

  const handleToggleIsPublic = () => {
    toggleIsPublic(id);
  };

  const handleToggleIsCanAjaja = () => {
    toggleAjajaNotification(id);
  };
  const handleDelete = () => {};
  return (
    <div className="plan__container">
      <div className="plan__header">
        <Image
          src={`/animal/${planIcons[iconNumber]}.png`}
          alt={`${planIcons[iconNumber]}`}
          width={50}
          height={50}
        />
        <h1 className="plan__header--text font-size-lg">{title}</h1>
        <div className="plan__header--after font-size-sm">
          <div className="plan__header--after--at">{`${createdYear} 작성`}</div>
          {isMine && isSeason && (
            <div className="plan__header--buttons">
              <Link href={`/edit/${id}`}>수정</Link>
              <span onClick={handleDelete}>삭제</span>
            </div>
          )}
        </div>
      </div>

      <div className="plan__content font-size-base">
        <PlanInput
          kind="content"
          placeholder=""
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
      <AjajaButton planId={id} isFilled={isPressAjaja} ajajaCount={ajajas} />
      <div className="plan__bottom">
        <DebounceSwitchButton
          defaultIsOn={isPublic}
          toggleName="public"
          submitToggleAPI={handleToggleIsPublic}
        />

        <DebounceSwitchButton
          toggleName="ajaja"
          defaultIsOn={canAjaja}
          submitToggleAPI={handleToggleIsCanAjaja}
        />
      </div>
    </div>
  );
}
