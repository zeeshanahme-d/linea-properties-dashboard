// src/components/TrafficByLocation.tsx
import React from 'react';
import { Card } from 'antd';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import FallbackLoader from 'components/core-ui/fallback-loader/FallbackLoader';

// src/data/locationData.ts
export const trafficData = [
    { name: 'Douala', value: 35, color: '#FF8056' },
    { name: 'Yaoundé', value: 25, color: '#255D8D' },
    { name: 'Buea', value: 20, color: '#BFBFFF' },
    { name: 'Limbe', value: 12, color: '#F59E0B' },
    { name: 'Others', value: 8, color: '#4D4D4D' },
];

interface TrafficByLocationItem {
    city: string;
    percentage: number;
    color: string;
}

interface TrafficByLocationChartProps {
    isLoading?: boolean;
    data?: TrafficByLocationItem[];
}


const TrafficByLocationChart: React.FC<TrafficByLocationChartProps> = ({ isLoading, data }) => {
    const COLORS = ['#FF8056', '#255D8D', '#BFBFFF', '#F59E0B', '#4D4D4D'];

    const formattedData = (data || []).map((item: TrafficByLocationItem) => ({
        name: item.city,
        value: item.percentage,
        // Assign a unique color from COLORS to each city by index for uniqueness
        color: COLORS[(data || []).findIndex(d => d.city === item.city) % COLORS.length],
    }));

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip bg-white p-2 rounded-md shadow-md border flex">
                    <p className="text-medium-gray capitalize">{payload[0].name}: </p>
                    <p className="text-medium-gray"> {payload[0].value}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card
            title="Traffic by Location"
            className="w-full xl:max-w-sm 3xl:max-w-md h-[300px]"
        >
            {isLoading ? <FallbackLoader size="large" className="h-[200px]" />
                :
                <div className="flex flex-row items-center h-[220px]">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={formattedData}
                            paddingAngle={0}
                            dataKey="value"
                            labelLine={false}
                            label={false}
                            isAnimationActive={true}
                        >
                            {formattedData.map((_, index) => (
                                <Cell key={index} fill={formattedData[index].color} />
                            ))}
                        </Pie>
                        {/* Tooltip must be a direct child of the chart, not the Pie */}
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>


                    <ul className="w-full px-2 mt-0 space-y-1">
                        {formattedData.map((item, index) => (
                            <li key={index} className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <span
                                        className="w-3 h-3 rounded-full mr-2"
                                        style={{ backgroundColor: item.color }}
                                    ></span>
                                    <span className="text-[#8C97A7] capitalize">{item.name}</span>
                                </div>
                                <span className="font-medium ">{item.value}%</span>
                            </li>
                        ))}
                    </ul>

                </div>
            }

        </Card>
    );
};

export default TrafficByLocationChart;
