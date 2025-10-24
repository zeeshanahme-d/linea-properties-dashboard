import { Card } from "antd";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { name: "Jan", Listings: 65 },
    { name: "Feb", Listings: 80 },
    { name: "Mar", Listings: 90 },
    { name: "Apr", Listings: 100 },
    { name: "May", Listings: 130 },
    { name: "Jun", Listings: 140 },
    { name: "Jul", Listings: 140 },
    { name: "Aug", Listings: 160 },
    { name: "Sep", Listings: 175 },
    { name: "Oct", Listings: 190 },
    { name: "Nov", Listings: 0 },
    { name: "Dec", Listings: 0 },
];

function ActiveListingsChart() {
    return (
        <Card
            title="Active Listings by Month"
        >
            <div className="w-full h-80">
                <ResponsiveContainer>
                    <BarChart
                        data={data}
                        // barSize={45}
                        margin={{ top: 0, right: 10, left: -20, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 400 }} />
                        <YAxis
                            tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 400 }}
                            domain={[0, 200]}
                            ticks={[0, 50, 100, 150, 200]}
                        />
                        <Tooltip />
                        <Bar dataKey="Listings" fill="#FDAF9B" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}

export default ActiveListingsChart;
