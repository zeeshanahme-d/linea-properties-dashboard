import { Card } from "antd";
import FallbackLoader from "components/core-ui/fallback-loader/FallbackLoader";
import { getShortMonthName } from "helpers/CustomHelpers";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

interface ActiveListingsItem {
    month: string;
    activeListings: number;
}

function ActiveListingsChart({ isLoading, data }: { isLoading?: boolean, data?: ActiveListingsItem[] }) {

    // Transform backend data into recharts format
    const formattedData = (data || []).map((item: ActiveListingsItem) => ({
        name: getShortMonthName(item.month as string),
        Listings: item.activeListings,
    }));

    return (
        <Card
            title="Active Listings by Month"
        >
            <div className="w-full h-80">
                {isLoading ? <FallbackLoader size="large" className="h-80" />
                    :
                    <ResponsiveContainer>
                        <BarChart
                            data={formattedData}
                            // barSize={45}
                            margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 400 }} />
                            <YAxis
                                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 400 }}
                                domain={[0, 100]}
                                ticks={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]}
                            />
                            <Tooltip />
                            <Bar dataKey="Listings" fill="#FDAF9B" />
                        </BarChart>
                    </ResponsiveContainer>
                }
            </div>
        </Card>
    );
}

export default ActiveListingsChart;
