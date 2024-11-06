import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const ExampleChart = () => {
  const gastosone = 1234564;
  const gastosTwo = 546123;
  const gastosThree = 450000;
  const gastosFour = 98651;

  const optionsOne = {
    cutout: "60%",
  };
  const optionsShadowChart = {
    cutout: "90%",
  };

  const dataThree = {
    datasets: [
      {
        data: [gastosone, gastosTwo, gastosThree, gastosFour],
        backgroundColor: [
          "rgba(253, 115, 56, 1)",
          "rgba(130, 128, 255, 1)",
          "rgba(255, 195, 0, 1)",
          "rgba(0, 182, 155, 1)",
        ],
        borderColor: [
          "rgba(253, 115, 56, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(0, 182, 155, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  //----------------------------------------------

  const dataShadowChart = {
    datasets: [
      {
        data: [100], // Valor fijo para el gráfico de sombreado
        backgroundColor: ["rgba(0, 0, 0, 0.1)"], // Color del sombreado
        borderWidth: 0, // Sin bordes
      },
    ],
  };

  return (
    <>
      <div style={{ height: 500, width: 500 }}>
        <Pie
          data={dataThree}
          options={optionsOne}
          style={{ top: 0, left: 0, padding: 12 }}
        />
      </div>
      <div>
        <h1 className="titleIngresos">Principales ingresos: Top 4 empresas</h1>
      </div>
      <div className="ingresosDetail">
        <div className="column1">
          <div className="gasto1">
            <div className="ingreso1Icon">1</div>
            <div className="ingreso1Detail">
              <p>Empresa 1</p>
            </div>
          </div>
          {/* 2 */}
          <div className="gasto2">
            <div className="ingreso2Icon">2</div>
            <div className="ingreso2Detail">
              <p>Empresa 2</p>
            </div>
          </div>
        </div>
        <div className="column2">
          <div className="gasto3">
            <div className="ingreso3Icon">3</div>
            <div className="ingreso3Detail">
              <p>Empresa 3</p>
            </div>
          </div>
          <div className="gasto4">
            <div className="ingreso4Icon">4</div>
            <div className="ingreso4Detail">
              <p>Empresa 4</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
