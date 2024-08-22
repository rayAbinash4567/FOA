import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowDownRight, ArrowUpRight, LucideIcon, Minus } from 'lucide-react';
import React from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
interface StatItem {
  name: string;
  value: number;
  previousValue: number;
}

const data: StatItem[] = [
  { name: 'Closed Deals', value: 42, previousValue: 38 },
  { name: 'Avg. Transaction Value', value: 750000, previousValue: 720000 },
  { name: 'Client Satisfaction (%)', value: 98, previousValue: 97 },
  { name: 'Years of Experience', value: 15, previousValue: 14 },
  { name: 'Revenue Generated', value: 3150000, previousValue: 2736000 },
  { name: 'New Clients Acquired', value: 18, previousValue: 15 },
  { name: 'Referral Rate (%)', value: 65, previousValue: 60 },
  { name: 'Training Hours Completed', value: 120, previousValue: 100 },
];

const formatValue = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};

interface StatCardProps extends StatItem {}

const StatCard: React.FC<StatCardProps> = ({ name, value, previousValue }) => {
  const percentChange = ((value - previousValue) / previousValue) * 100;
  let Icon: LucideIcon;
  let color: string;

  if (percentChange > 0) {
    Icon = ArrowUpRight;
    color = 'text-green';
  } else if (percentChange < 0) {
    Icon = ArrowDownRight;
    color = 'text-red';
  } else {
    Icon = Minus;
    color = 'text-bodydark2';
  }

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <Icon className={`h-4 w-4 ${color}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value)}</div>
        <p className={`text-xs ${color}`}>
          {percentChange !== 0 &&
            `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(2)}%`}
        </p>
      </CardContent>
    </Card>
  );
};

export const PartnerStatistics: React.FC = () => {
  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <StatCard key={item.name} {...item} />
        ))}
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Performance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number, name: string) => [
                formatValue(value),
                name,
              ]}
            />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ScrollArea>
  );
};

export default PartnerStatistics;
