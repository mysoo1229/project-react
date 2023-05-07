import ApexChart from "react-apexcharts";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { fetchCoinHistory } from "../../api";
import { isLightAtom } from "../../atoms";

interface ICoinHistory {
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
}

interface ChartProps {
  coinId: string;
}

function CandleChart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<ICoinHistory[]>("coinHistory", () => fetchCoinHistory(coinId),);
  const isLight = useRecoilValue(isLightAtom);

  const candleData = data?.slice(0, 14).map((item) => {
    return {
      x: new Date(item.time_close * 1000).toUTCString(),
      y:
        [
          parseFloat(item.open),
          parseFloat(item.high),
          parseFloat(item.low),
          parseFloat(item.close),
        ]
    }
  });

  return <div>
    {isLoading ?
      (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: candleData ?? []
            }
          ]}
          options={{
            theme: {
              mode: isLight ? "light" : "dark"
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
              borderColor: isLight ? "#ddd" : "#444",
              row: {
                colors: undefined,
                opacity: 0.3
              }
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#66cc96',
                  downward: '#4692ff',
                }
              }
            },
            stroke: {
              width: 2
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
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`
              }
            }
          }}
        />
      )
    }
  </div>;
}

export default CandleChart;
