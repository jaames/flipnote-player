import type { ExpandedSampleManifestEntry } from '@/core/samples';
import { GridWrapper } from './GridWrapper';
import { GridMemoThumb } from './GridMemoThumb';

type Props = {
  items: ExpandedSampleManifestEntry[];
  onSelect: (item: ExpandedSampleManifestEntry) => void;
};

export const SampleMemoGrid = ({ items, onSelect }: Props) => {
  return (
    <GridWrapper>
      {items.map((item) => (
        <GridMemoThumb
          key={item.filename}
          thumbUrl={item.thumbUrl}
          authorName={item.author}
          title={item.filename}
          onSelect={() => onSelect(item)}
        />
      ))}
    </GridWrapper>
  );
};
