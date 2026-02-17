import { phases, type ProjectConfig } from "@/lib/mock-data";

interface WBSRow {
  wbs: string;
  taskName: string;
  calDaysOnsite: number;
  perDiemUsd: number;
  hotelUsd: number;
  nbrTransport: number;
  transportCostUsd: number;
  totalExpensesCostUsd: number;
  level: number; // 0 = project, 1 = phase group, 2 = sub-group, 3 = task
}

interface Props {
  config: ProjectConfig;
}

const CostBreakdownTable = ({ config }: Props) => {
  const { commercial } = config;

  // Build WBS rows from phases & resource mix
  const taskRows: WBSRow[] = phases.map((phase, i) => {
    const res = config.resources.find((r) => r.phaseId === phase.id);
    const onsite = res?.onsite || 0;
    const calDays = onsite * 20; // ~20 working days per resource
    const perDiem = calDays * commercial.perDiem;
    const hotel = calDays * commercial.hotelCost;
    const nbrTransport = onsite;
    const transportCost = nbrTransport * commercial.flightCost;
    const totalExpenses = perDiem + hotel + transportCost;

    return {
      wbs: `1.1.1.${i + 1}`,
      taskName: `${phase.name} Phase`,
      calDaysOnsite: calDays,
      perDiemUsd: perDiem,
      hotelUsd: hotel,
      nbrTransport,
      transportCostUsd: transportCost,
      totalExpensesCostUsd: totalExpenses,
      level: 3,
    };
  });

  // Roll-up rows
  const totalCalDays = taskRows.reduce((s, r) => s + r.calDaysOnsite, 0);
  const totalPerDiem = taskRows.reduce((s, r) => s + r.perDiemUsd, 0);
  const totalHotel = taskRows.reduce((s, r) => s + r.hotelUsd, 0);
  const totalNbrTransport = taskRows.reduce((s, r) => s + r.nbrTransport, 0);
  const totalTransportCost = taskRows.reduce((s, r) => s + r.transportCostUsd, 0);
  const totalExpenses = taskRows.reduce((s, r) => s + r.totalExpensesCostUsd, 0);

  const implRow: WBSRow = {
    wbs: "1.1.1",
    taskName: "Implementation",
    calDaysOnsite: totalCalDays,
    perDiemUsd: totalPerDiem,
    hotelUsd: totalHotel,
    nbrTransport: totalNbrTransport,
    transportCostUsd: totalTransportCost,
    totalExpensesCostUsd: totalExpenses,
    level: 2,
  };

  const phaseRow: WBSRow = {
    wbs: "1.1",
    taskName: `PHASE 1: ${config.segment || "Project"} — ${config.projectName || "Unnamed"}`,
    calDaysOnsite: totalCalDays,
    perDiemUsd: totalPerDiem,
    hotelUsd: totalHotel,
    nbrTransport: totalNbrTransport,
    transportCostUsd: totalTransportCost,
    totalExpensesCostUsd: totalExpenses,
    level: 1,
  };

  const projectRow: WBSRow = {
    wbs: "1",
    taskName: `${config.projectName || "Project"} Plan`,
    calDaysOnsite: totalCalDays * commercial.coefficient,
    perDiemUsd: totalPerDiem * commercial.coefficient,
    hotelUsd: totalHotel * commercial.coefficient,
    nbrTransport: totalNbrTransport,
    transportCostUsd: totalTransportCost * commercial.coefficient,
    totalExpensesCostUsd: totalExpenses * commercial.coefficient,
    level: 0,
  };

  const allRows = [projectRow, phaseRow, implRow, ...taskRows];

  const fmt = (n: number) => `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const rowBg = (level: number) => {
    switch (level) {
      case 0: return "bg-primary text-primary-foreground font-bold";
      case 1: return "bg-primary/80 text-primary-foreground font-semibold";
      case 2: return "bg-primary/60 text-primary-foreground font-semibold";
      default: return "bg-card text-foreground";
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-primary text-primary-foreground">
            <th className="p-2 text-left font-semibold w-16">WBS</th>
            <th className="p-2 text-left font-semibold min-w-[200px]">Task Name</th>
            <th className="p-2 text-right font-semibold">Total Nbr of<br />calendar day<br />on-site</th>
            <th className="p-2 text-right font-semibold">Per diem<br />USD $</th>
            <th className="p-2 text-right font-semibold">Hotel<br />USD $</th>
            <th className="p-2 text-right font-semibold">Nbr<br />Transportation</th>
            <th className="p-2 text-right font-semibold">Transportation<br />cost USD $</th>
            <th className="p-2 text-right font-semibold">Total Expenses<br />Cost USD $</th>
          </tr>
        </thead>
        <tbody>
          {allRows.map((row) => (
            <tr
              key={row.wbs}
              className={`border-t border-border ${rowBg(row.level)}`}
            >
              <td className="p-2 font-mono">{row.wbs}</td>
              <td className={`p-2 ${row.level === 3 ? "pl-6" : ""}`}>{row.taskName}</td>
              <td className="p-2 text-right font-mono">{row.calDaysOnsite.toFixed(1)}</td>
              <td className="p-2 text-right font-mono">{fmt(row.perDiemUsd)}</td>
              <td className="p-2 text-right font-mono">{fmt(row.hotelUsd)}</td>
              <td className="p-2 text-right font-mono">{row.nbrTransport}</td>
              <td className="p-2 text-right font-mono">{fmt(row.transportCostUsd)}</td>
              <td className="p-2 text-right font-mono font-semibold">{fmt(row.totalExpensesCostUsd)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CostBreakdownTable;
