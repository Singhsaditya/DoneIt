import { AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TASKS } from '../lib/mockData';
import { getPriorityColor, formatDate, getTimeRemaining } from '../lib/utils';

export default function SLAMonitor() {
  const navigate = useNavigate();
  
  const overdueTasks = MOCK_TASKS.filter(
    (t) => new Date(t.dueDate) < new Date() && t.status !== 'COMPLETED'
  );
  
  const approachingDeadline = MOCK_TASKS.filter((t) => {
    const daysUntilDue = Math.ceil((new Date(t.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    return daysUntilDue <= 1 && daysUntilDue > 0 && t.status !== 'COMPLETED';
  });

  const allAtRisk = [...overdueTasks, ...approachingDeadline].sort(
    (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
  );

  return (
    <div className="page-transition">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">SLA Monitor</h1>
        <p className="text-muted-foreground">Track deadlines and escalations efficiently</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-2xl border border-border">
          <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">{overdueTasks.length}</h3>
          <p className="text-sm text-muted-foreground">Overdue Tasks</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">{approachingDeadline.length}</h3>
          <p className="text-sm text-muted-foreground">Due Within 24h</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-border">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-1">
            {Math.round((MOCK_TASKS.filter(t => t.status === 'COMPLETED').length / MOCK_TASKS.length) * 100)}%
          </h3>
          <p className="text-sm text-muted-foreground">Completion Rate</p>
        </div>
      </div>

      {/* At-Risk Tasks */}
      <div className="bg-white rounded-2xl border border-border">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">At-Risk Tasks</h2>
        </div>
        <div className="p-6">
          {allAtRisk.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">All tasks are on track!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {allAtRisk.map((task) => {
                const timeRemaining = getTimeRemaining(task.dueDate);
                const isOverdue = timeRemaining.isOverdue;
                
                return (
                  <div
                    key={task.id}
                    onClick={() => navigate(`/tasks/${task.id}`)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      isOverdue
                        ? 'bg-destructive/5 border-destructive/20 hover:bg-destructive/10'
                        : 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{task.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ml-4 ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Assignee</p>
                        <div className="flex items-center gap-2">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignee.name}`}
                            alt={task.assignee.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="font-medium text-foreground">{task.assignee.name}</span>
                        </div>
                      </div>

                      <div>
                        <p className="text-muted-foreground mb-1">Due Date</p>
                        <p className="font-medium text-foreground">{formatDate(task.dueDate)}</p>
                      </div>

                      <div>
                        <p className="text-muted-foreground mb-1">Time Remaining</p>
                        <p className={`font-medium ${isOverdue ? 'text-destructive' : 'text-yellow-600'}`}>
                          {timeRemaining.text}
                        </p>
                      </div>

                      <div>
                        <p className="text-muted-foreground mb-1">Progress</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all ${isOverdue ? 'bg-destructive' : 'bg-yellow-600'}`}
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                          <span className="font-medium text-foreground">{task.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
