import '../styles/Refresh.css';

interface RefreshButtonProps {
  onClick: () => void;
}

export const Refresh = ({ onClick }: RefreshButtonProps) => {
  return (
    <button className="refresh-button" onClick={onClick}>
      Обновить
    </button>
  );
};
