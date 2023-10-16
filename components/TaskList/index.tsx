import { useMemo } from 'react';
import ToggleTag from '@/components/common/ToggleTag';
import { type TagBase } from '@/types/search';

interface TagListProps<T> {
  label: string;
  selectedTags: string[];
  tags: T[];
  onTagChange: (id: string) => void;
}

function TagList<T extends TagBase>({ label, selectedTags, tags, onTagChange }: TagListProps<T>) {
  const listOfTags = useMemo(() => {
    return (tags || []).map(({ id, title }) => {
      return <ToggleTag id={id} key={id} title={title} isSelected={selectedTags.includes(id)} onClick={onTagChange} />;
    });
  }, [onTagChange, selectedTags, tags]);

  return (
    <div className="py-16">
      <div className="pb-5 text-[10px] font-bold tracking-[5%] text-black/50 lg:text-[16px]">
        <span className="text-[10px] uppercase text-[#2E2F44] opacity-50 lg:text-[12px]">{label}</span>
      </div>
      {listOfTags}
    </div>
  );
}

export default TagList;
