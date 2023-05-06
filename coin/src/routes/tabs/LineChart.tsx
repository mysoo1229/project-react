import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../../api";

interface ICoinHistory {
  close: string;
  time_close: number;
}

interface IChart {
  coinId: string;
}

function LineChart({coinId}: IChart) {
  const { isLoading, data } = useQuery<ICoinHistory[]>("coinHistory", () => fetchCoinHistory(coinId));

  return (
    <>
      { isLoading ? (
        "loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "Price",
              data: data?.slice(0, 14).map(item => parseFloat(item.close)) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: "light"
            },
            chart: {
              width: 500,
              height: 300,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              borderColor: "#ddd",
              row: {
                colors: undefined,
                opacity: 0.3
              }
            },
            colors: [
              '#4692ff',
            ],
            stroke: {
              width: 4
            },
            xaxis: {
              axisTicks: {
                show: false,
              },
              categories:
                data?.slice(0, 14).map(item => 
                  new Date(item.time_close * 1000).toUTCString()
                ) ?? [],
              type: "datetime",
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#66cc96"],
                stops: [0, 80],
              }
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`
              }
            }
          }}
        />
      )}
    </>
  );
}

export default LineChart;
