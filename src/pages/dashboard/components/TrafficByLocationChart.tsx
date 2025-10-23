// src/components/TrafficByLocation.tsx
import React from 'react';
import { Card } from 'antd';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// src/data/locationData.ts
export const trafficData = [
    { name: 'Douala', value: 35, color: '#FF8056' },
    { name: 'Yaoundé', value: 25, color: '#255D8D' },
    { name: 'Buea', value: 20, color: '#BFBFFF' },
    { name: 'Limbe', value: 12, color: '#F59E0B' },
    { name: 'Others', value: 8, color: '#4D4D4D' },
];


const TrafficByLocationChart: React.FC = () => {
    const COLORS = ['#FF8056', '#255D8D', '#BFBFFF', '#F59E0B', '#4D4D4D'];


    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip bg-white p-2 rounded-md shadow-md border flex">
                    <p className="text-medium-gray">{payload[0].name}: </p>
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
            <div className="flex flex-row items-center h-[220px]">
                <PieChart width={400} height={400}>
                    <Pie
                        data={trafficData}
                        paddingAngle={0}
                        dataKey="value"
                        labelLine={false}
                        label={false}
                        isAnimationActive={true}
                    >
                        {trafficData.map((_, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    {/* Tooltip must be a direct child of the chart, not the Pie */}
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>

                <ul className="w-full px-2 mt-0 space-y-1">
                    {trafficData.map((item, index) => (
                        <li key={index} className="flex justify-between items-center">
                            <div className="flex items-center">
                                <span
                                    className="w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: item.color }}
                                ></span>
                                <span className="text-[#8C97A7]">{item.name}</span>
                            </div>
                            <span className="font-medium">{item.value}%</span>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
};

export default TrafficByLocationChart;
