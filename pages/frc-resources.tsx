import Layout from "@components/layout";

export default function FRCResources() {
  return (
    <Layout title="FRC Resources">
      <div className="page-header">
        <h2>FRC Resources </h2>
      </div>

      <h3>
        FIRST information and resources
      </h3>

      <p>
        <a href="https://www.firstinspires.org/robotics/frc/game-and-season">
          FIRST Website
        </a>
      </p>

      <h4>
        2023 FIRST Competition: Charged Up
      </h4>

      <p>
        <a href="https://www.youtube.com/watch?v=0zpflsYc4PA">
          Introduction Video
        </a>
      </p>

      <p>
        <a href="https://firstfrc.blob.core.windows.net/frc2023/Manual/2023FRCGameManual.pdf">
          Rule Book
        </a>
      </p>

      <h3 id="past-competitions">Past Competitions</h3>
      <p><a href="https://www.youtube.com/watch?v=I77Dz9pfds4">FRC 2021: INFINITE RECHARGE</a></p>
      <p><a href="https://youtu.be/EVC_h4hHwZA">FRC 2019: Einstein Final 1</a></p>
      <p><a href="https://youtu.be/drL2y0rYo3I">FRC 2019: Einstein Final 2</a></p>
    </Layout>
  );
}