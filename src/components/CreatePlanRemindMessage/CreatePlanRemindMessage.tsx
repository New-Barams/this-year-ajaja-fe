import { useSessionStorage } from '@/hooks/useSessionStorage';
import { RemindItemType } from '@/types/components/Remind';
import React, { useCallback } from 'react';
import { WritableRemindItem } from '..';

export default function CreatePlanRemindMessage() {
  const [remindMessageList, setRemindMessageList] = useSessionStorage<
    RemindItemType[]
  >({
    key: 'remind',
    initialValue: [],
    // TODO: 이 초기값은 사실 쓰여질 일이 없음 => 3번에서 4번으로 넘어올 때 이미 날짜 확정 모달 클릭 후 각 날짜에 해당하는 기본값을 ""로 설정해주고 넘어왔을 것이므로
    // TODO: 그래서 모달 단계에서 이 작업을 해줘야 함
  });

  const handleChangeRemindMessage = (
    month: number,
    day: number,
    newMessage: string,
  ) => {
    setRemindMessageList(
      remindMessageList.map((item) => {
        if (item.date.month === month && item.date.day === day) {
          return { ...item, message: newMessage };
        }
        return item;
      }),
    );
  };

  const makeAllRemindMessageSame = useCallback(() => {
    if (remindMessageList.length > 1) {
      const firstMessage = remindMessageList[0].message;
      setRemindMessageList(
        remindMessageList.map((item) => ({ ...item, message: firstMessage })),
      );
    }
  }, [remindMessageList, setRemindMessageList]);

  return (
    <div>
      <div>선택받은 날짜에 받을 리마인드 메세지를 작성해주세요 !</div>
      <ul>
        {remindMessageList.map((item, index) => {
          return index === 0 ? (
            <WritableRemindItem
              key={index}
              remindMonth={item.date.month}
              remindDay={item.date.day}
              remindMessage={item.message}
              handleChangeRemindMessage={(text: string) => {
                handleChangeRemindMessage(item.date.month, item.date.day, text);
              }}
              makeAllRemindMessageSame={makeAllRemindMessageSame}
              classNameList={['writable-remind__message__item']}
            />
          ) : (
            <WritableRemindItem
              key={index}
              remindMonth={item.date.month}
              remindDay={item.date.day}
              remindMessage={item.message}
              handleChangeRemindMessage={(text: string) => {
                handleChangeRemindMessage(item.date.month, item.date.day, text);
              }}
              classNameList={['writable-remind__message__item']}
            />
          );
        })}
      </ul>
    </div>
  );
}
