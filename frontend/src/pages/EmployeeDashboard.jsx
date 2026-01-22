import { MOCK_TASKS } from '../lib/mockData';
import { getPriorityColor, getStatusColor, formatDate } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const myTasks = MOCK_TASKS.filter(
    (t) => t.assignee.name === user?.name
  );

  const activeTasks = myTasks.filter(
    (t) => t.status !== 'COMPLETED'
  );

  const upcomingDeadlines = myTasks.filter((t) => {
    const daysUntilDue = Math.ceil(
      (new Date(t.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilDue <= 3 && daysUntilDue > 0 && t.status !== 'COMPLETED';
  });

  return (
    <div className="page-transition">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          My Dashboard
        </h1>
        <p className="text-muted-foreground">
          Focus on your tasks and upcoming deadlines
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My Active Tasks */}
        <div className="glass-card rounded-3xl border border-white/50 hover-lift">
          <div className="p-6 border-b border-white/40">
            <h2 className="text-lg font-bold text-foreground">
              My Active Tasks
            </h2>
          </div>

          <div className="p-6">
            {activeTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No active tasks
              </p>
            ) : (
              <div className="space-y-4">
                {activeTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => navigate(`/tasks/${task.id}`)}
                    className="p-4 glass-card rounded-2xl hover:bg-white/60 transition-all cursor-pointer border border-white/40"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground">
                        {task.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>

                      <div className="flex-1 bg-white/50 rounded-full h-2 border border-white/60">
                        <div
                          className="bg-primary h-full rounded-full transition-all"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>

                      <span className="text-xs text-muted-foreground">
                        {task.progress}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Reporter: {task.reporter.name}</span>
                      <span>Due: {formatDate(task.dueDate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="glass-card rounded-3xl border border-white/50 hover-lift">
          <div className="p-6 border-b border-white/40">
            <h2 className="text-lg font-bold text-foreground">
              Upcoming Deadlines
            </h2>
          </div>

          <div className="p-6">
            {upcomingDeadlines.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No upcoming deadlines
              </p>
            ) : (
              <div className="space-y-4">
                {upcomingDeadlines.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => navigate(`/tasks/${task.id}`)}
                    className="p-4 bg-yellow-50/70 rounded-2xl hover:bg-yellow-100/70 transition-all cursor-pointer border border-yellow-200/60 backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground">
                        {task.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`px-2 py-1 rounded-full ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                      <span className="text-yellow-700 font-medium">
                        Due: {formatDate(task.dueDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
