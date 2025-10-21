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
            title={<p className="font-normal text-lg">Active Listings by Month</p>}
            className="activeListingsCard"
        >
            <div className="w-full h-80">
                <ResponsiveContainer>
                    <BarChart data={data} barSize={35}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fill: "#9ca3af" }} />
                        <YAxis tick={{ fill: "#9ca3af" }} />
                        <Tooltip />
                        <Bar dataKey="Listings" fill="#f4a497" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}

export default ActiveListingsChart;
