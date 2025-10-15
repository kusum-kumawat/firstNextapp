// components/admin/VendorStats.tsx
import { VendorStats as Stats } from "@/types/admin";

interface VendorStatsProps {
  stats: Stats;
}

export default function VendorStats({ stats }: VendorStatsProps) {
  const statCards = [
    {
      title: "Total Vendors",
      value: stats.total,
      color: "bg-blue-500",
      icon: "👥",
    },
    {
      title: "Pending Review",
      value: stats.pending,
      color: "bg-yellow-500",
      icon: "⏳",
    },
    {
      title: "Approved",
      value: stats.approved,
      color: "bg-green-500",
      icon: "✅",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      color: "bg-red-500",
      icon: "❌",
    },
    {
      title: "Monthly Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      color: "bg-purple-500",
      icon: "💰",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {card.value}
              </p>
            </div>
            <div className={`${card.color} `}>{card.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
