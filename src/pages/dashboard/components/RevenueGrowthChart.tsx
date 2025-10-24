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
    { name: "Jan", Revenue: 500000 },
    { name: "Feb", Revenue: 900000 },
    { name: "Mar", Revenue: 1200000 },
    { name: "Apr", Revenue: 1500000 },
    { name: "May", Revenue: 1200000 },
    { name: "Jun", Revenue: 800000 },
    { name: "Jul", Revenue: 1600000 },
    { name: "Aug", Revenue: 1500000 },
    { name: "Sep", Revenue: 1800000 },
    { name: "Oct", Revenue: 2000000 },
    { name: "Nov", Revenue: 1400000 },
    { name: "Dec", Revenue: 1800000 },
];

function RevenueGrowthChart() {
    return (
        <Card
            title="Revenue Growth"
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
                        <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 400 }} />
                        <YAxis
                            tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 400 }}
                            domain={[0, 2000000]}
                            ticks={[0, 500000, 1000000, 1500000, 2000000]}
                        />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="Revenue"
                            stroke="#e56b5d"
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            fillOpacity={0.8}
                            fill="url(#colorRevenue)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}

export default RevenueGrowthChart;
