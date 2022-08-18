import React, { ChangeEvent, FormEvent } from 'react';

interface SearchFormProps {
  submitHandler: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  keywordValue: string;
  keywordChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchForm = ({
  submitHandler,
  keywordValue,
  keywordChangeHandler,
}: SearchFormProps) => {
  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <div className="bg-slate-200 rounded-t-lg py-4">
        <h3 className="font-bold text-[14px]">
          오늘의 날씨 확인하기<span className="text-xs">(최대 3일)</span>
        </h3>
        <p className="font-bold text-rose-500">
          지역명으로 검색해주세요!
          <span className="text-[8px]">(구,군,동,리)</span>
        </p>

        <input
          className="w-[90%] border border-teal-400 h-8"
          type="text"
          value={keywordValue}
          id="keyword"
          onChange={keywordChangeHandler}
        />
      </div>

      <button
        type="submit"
        className="py-2 w-full hover:bg-orange-500 hover:text-white transition-all duration-200"
      >
        검색하기
      </button>
    </form>
  );
};

export default SearchForm;
