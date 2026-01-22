import useTasks from "../hooks/useTasks";

export default function AdminDashboard() {
  const { tasks, loading } = useTasks();

  if (loading) return <p className="p-6">Loading...</p>;

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "done").length;
  const pending = total - completed;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">System Overview</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl border">
          <p className="text-sm text-muted-foreground">Total Tasks</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>

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
