import useTasks from "../hooks/useTasks";

export default function EmployeeDashboard() {
  const { tasks, loading } = useTasks();

  if (loading) return <p className="p-6">Loading...</p>;

  const completed = tasks.filter(t => t.status === "done").length;
  const pending = tasks.filter(t => t.status !== "done").length;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Tasks</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold">{pending}</p>
        </div>

        <div className="p-4 rounded-xl border">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold">{completed}</p>
        </div>
      </div>
    </div>
  );
}
