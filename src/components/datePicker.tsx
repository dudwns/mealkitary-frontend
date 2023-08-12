import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import { useRecoilState } from "recoil";
import { pickupDateState, pickupTimeState } from "@/libs/recoilState";

const DatePickerComponent: React.FC = () => {
  const [pickupDate, setPickupDate] = useRecoilState<Date | null>(pickupDateState);
  const [pickupTime, setPickupTime] = useRecoilState<Date>(pickupTimeState);

  const DateCustomInput: React.FC<{ value: string; onClick: () => void }> = ({
    value,
    onClick,
  }) => (
    <input // input 요소로 변경
      className="date-custom-input" // 커스텀 CSS 클래스 적용
      value={value}
      onClick={onClick}
      readOnly
      placeholder="날짜 선택하기"
    />
  );

  const TimeCustomInput: React.FC<{ value: string; onClick: () => void }> = ({
    value,
    onClick,
  }) => (
    <input // input 요소로 변경
      className="time-custom-input" // 커스텀 CSS 클래스 적용
      value={value}
      onClick={onClick}
      readOnly
      placeholder="시간 선택하기"
    />
  );

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  const isDateSelectable = (date: Date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return date >= currentDate && date <= maxDate;
  };

  const nowMinTime = new Date();
  nowMinTime.setHours(new Date().getHours(), new Date().getMinutes(), 0); // 현재 시간을 가져옴

  const minTime = new Date();
  minTime.setHours(9, 0, 0); // 최소 9:00 AM
  const maxTime = new Date();
  maxTime.setHours(21, 0, 0); // 최대 9:00 PM

  return (
    <div className="grid grid-cols-2 gap-8 pb-6">
      <DatePicker
        selected={pickupDate}
        onChange={(date: Date) => {
          setPickupDate(date);
        }}
        filterDate={isDateSelectable}
        locale={ko}
        showIcon={false}
        dateFormat="yyyy년 MM월 dd일"
        timeFormat="HH:mm"
        withPortal
        customInput={
          <DateCustomInput
            value={pickupDate ? pickupDate.toLocaleDateString("ko-KR") : "날짜 선택하기"}
            onClick={() => {}}
          />
        }
      />
      <DatePicker
        selected={pickupTime}
        onChange={(date: Date) => setPickupTime(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"
        withPortal
        minTime={
          pickupDate && pickupDate.toDateString() === new Date().toDateString()
            ? nowMinTime
            : minTime
        }
        maxTime={maxTime}
        customInput={
          <TimeCustomInput
            value={pickupDate ? pickupDate.toLocaleDateString("ko-KR") : "날짜 선택하기"}
            onClick={() => {}}
          />
        }
      />
    </div>
  );
};

export default DatePickerComponent;
