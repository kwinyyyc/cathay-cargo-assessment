export default function OutlineButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div>
      <button
        onClick={onClick}
        className="btn btn-ghost btn-sm border border-base-300 rounded-3xl"
      >
        {children}
      </button>
    </div>
  );
}
