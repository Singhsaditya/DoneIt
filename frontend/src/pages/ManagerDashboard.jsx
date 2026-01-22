import { MOCK_TASKS } from '../lib/mockData';
import { getPriorityColor, getStatusColor, formatDate } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

export default function ManagerDashboard() {
  const navigate = useNavigate();

  const pendingApprovals = MOCK_TASKS.filter(t => t.status === 'REVIEW');
  const overdueTasks = MOCK_TASKS.filter(
    t => new Date(t.dueDate) < new Date() && t.status !== 'COMPLETED'
  );

  return (
    <div className="page-transition">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Manager Dashboard
        </h1>
        <p className="text-muted-foreground">
          Review tasks, manage approvals, and track overdue work
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <div className="glass-card rounded-3xl border border-white/50 hover-lift">
          <div className="p-6 border-b border-white/40">
            <h2 className="text-lg font-bold text-foreground">
              Pending Approvals
            </h2>
          </div>

          <div className="p-6">
            {pendingApprovals.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No pending approvals
              </p>
            ) : (
              <div className="space-y-4">
                {pendingApprovals.map(task => (
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

                    <p className="text-sm text-muted-foreground mb-3">
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Assignee: {task.assignee.name}</span>
                      <span>Due: {formatDate(task.dueDate)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Overdue Tasks */}
        <div className="glass-card rounded-3xl border border-white/50 hover-lift">
          <div className="p-6 border-b border-white/40">
            <h2 className="text-lg font-bold text-foreground">
              Overdue Tasks
            </h2>
          </div>

          <div className="p-6">
            {overdueTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No overdue tasks
              </p>
            ) : (
              <div className="space-y-4">
                {overdueTasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => navigate(`/tasks/${task.id}`)}
                    className="p-4 bg-red-50/70 rounded-2xl hover:bg-red-100/70 transition-all cursor-pointer border border-red-200/60 backdrop-blur-sm"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-foreground">
                        {task.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Assignee: {task.assignee.name}
                      </span>
                      <span className="text-destructive font-medium">
                        Overdue: {formatDate(task.dueDate)}
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
