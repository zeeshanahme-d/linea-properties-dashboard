import { Card } from "antd";
import FallbackLoader from "components/core-ui/fallback-loader/FallbackLoader";
import { getShortMonthName } from "helpers/CustomHelpers";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

interface RevenueItem {
    year: number;
    month: string;
    date: string;
    revenueGenerated: number;
}

interface RevenueGrowthChartProps {
    isLoading?: boolean;
    data?: RevenueItem[];
}

function RevenueGrowthChart({ isLoading, data }: RevenueGrowthChartProps) {
    // Transform backend data into recharts format
    const formattedData = (data || []).map(item => ({
        name: getShortMonthName(item.month),
        Revenue: item.revenueGenerated,
    }));

    return (
        <Card title="Revenue Growth">
            <div className="w-full h-80">
                {isLoading ? (
                    <FallbackLoader size="large" className="h-80" />
                ) : (
                    <ResponsiveContainer>
                        <AreaChart
                            data={formattedData}
                            margin={{ top: 10, right: 30, left: -15, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f28a7e" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#f28a7e" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 400 }}
                            />
                            <YAxis
                                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 400 }}
                                // Auto scale based on data
                                domain={[0, 1000]}
                                ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]}
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
                )}
            </div>
        </Card>
    );
}

export default RevenueGrowthChart;
