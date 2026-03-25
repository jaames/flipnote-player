type Props = React.PropsWithChildren<{}>;

export const GridWrapper = ({ children }: Props) => {
  return (
    <div className="base-memo-grid grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
};