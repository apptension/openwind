export const LabelComponent = ({ label }) => {
  return (
    <span
      className="flex items-center h-6 px-3 text-xs font-semibold rounded-full mb-2 mr-2"
      style={{ background: `#${label.color}30`, color: `#${label.color}` }}
    >
      {label.name}
    </span>
  );
};
