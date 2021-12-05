export const ReactionButtonComponent = ({ icon, value, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled} className="rounded p-2 flex items-end font-bold hover:bg-gray-100">
      {icon} <span className="ml-2">{value}</span>
    </button>
  );
};
