import { useEffect, useState } from "react";
import { Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { formatDate } from "../lib/utils";

export default function SLAMonitor() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/tasks")
      .then((res) => setTasks(res.data || []))
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();

  const overdueTasks = tasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < now && t.status !== "COMPLETED"
  );

  const dueSoonTasks = tasks.filter((t) => {
    if (!t.dueDate || t.status === "COMPLETED") return false;
    const diff = new Date(t.dueDate) - now;
    const hours = diff / (1000 * 60 * 60);
    return hours > 0 && hours <= 24;
  });

  const atRiskTasks = [...overdueTasks, ...dueSoonTasks];

  return (
    <div className="page-transition">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          SLA Monitor
        </h1>
        <p className="text-muted-foreground">
          Track tasks that are overdue or nearing deadlines
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl border">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="text-destructive" />
            <h3 className="text-lg font-semibold">Overdue Tasks</h3>
          </div>
          <p className="text-3xl font-bold">{overdueTasks.length}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="text-yellow-600" />
            <h3 className="text-lg font-semibold">Due in 24 Hours</h3>
          </div>
          <p className="text-3xl font-bold">{dueSoonTasks.length}</p>
        </div>
      </div>

      {/* At Risk List */}
      <div className="bg-white rounded-2xl border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">At-Risk Tasks</h2>
        </div>

        <div className="p-6">
          {loading ? (
            <p className="text-muted-foreground">Loading tasks…</p>
          ) : atRiskTasks.length === 0 ? (
            <div className="text-center py-10">
              <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">
                All tasks are currently on track.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {atRiskTasks.map((task) => (
                <div
                  key={task._id}
                  onClick={() => navigate(`/tasks/${task._id}`)}
                  className="p-4 rounded-xl border cursor-pointer hover:bg-muted/40 transition"
                >
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-muted-foreground mb-1">
                    Due: {formatDate(task.dueDate)}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    Status: {task.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
