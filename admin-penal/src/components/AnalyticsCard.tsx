import type { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
  render : string
}

const AnalyticsCard = ({ title, value, icon: Icon, render }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm" onClick={() => navigate(`${render}`)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="mt-2 text-3xl font-bold">{value}</h3>
        </div>

        <div className="rounded-xl bg-muted p-3">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;