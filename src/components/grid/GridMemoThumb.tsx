export type GridMemoThumbProps = {
  thumbUrl: string;
  authorName: string;
  title: string;
  onSelect: () => void;
};

export const GridMemoThumb = ({
  thumbUrl,
  authorName,
  title,
  onSelect,
}: GridMemoThumbProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect();
        }
      }}
      aria-label={title}
      className="grid-memo-thumb flex flex-col gap-1 cursor-pointer focus:outline-none group"
    >
      <div className="grid-memo-thumb-inner bg-white rounded-[8px] p-[6px] group-focus:outline-2 group-focus:outline-accent outline-offset-2">
        <img
          src={thumbUrl}
          alt={title}
          className="w-full h-full object-cover rounded-[6px]"
        />
      </div>
      <div className="text-sm font-medium">{authorName}</div>
    </div>
  );
};
