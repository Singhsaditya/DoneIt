import useTasks from "../hooks/useTasks";

export default function ManagerDashboard() {
  const { tasks, loading } = useTasks();

  if (loading) return <p className="p-6">Loading...</p>;

  const inProgress = tasks.filter(t => t.status === "in_progress").length;
  const completed = tasks.filter(t => t.status === "done").length;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Team Overview</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border">
          <p className="text-sm text-muted-foreground">In Progress</p>
          <p className="text-2xl font-bold">{inProgress}</p>
        </div>

        <div className="p-4 rounded-xl border">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold">{completed}</p>
        </div>
      </div>
    </div>
  );
}
