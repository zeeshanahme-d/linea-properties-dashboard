import { Card } from "antd";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "Jan", Revenue: 80500 },
    { name: "Feb", Revenue: 1000 },
    { name: "Mar", Revenue: 9800 },
    { name: "Apr", Revenue: 120 },
    { name: "May", Revenue: 800 },
    { name: "Jun", Revenue: 4242525 },
    { name: "Jul", Revenue: 1250000 },
    { name: "Aug", Revenue: 15000 },
    { name: "Sep", Revenue: 135000 },
    { name: "Oct", Revenue: 160000 },
    { name: "Nov", Revenue: 0 },
    { name: "Dec", Revenue: 0 },
];

function RevenueGrowthChart() {
    return (
        <Card
            title={<p className="font-normal text-lg">Revenue Growth</p>}
            className=""
        >
            <div className="w-full h-80">
                <ResponsiveContainer>
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f28a7e" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#f28a7e" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fill: "#9ca3af" }} />
                        <YAxis tick={{ fill: "#9ca3af" }} />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="Revenue"
                            stroke="#e56b5d"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}

export default RevenueGrowthChart;
