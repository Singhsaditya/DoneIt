import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, User, Calendar, Clock } from 'lucide-react';
import { MOCK_TASKS } from '../lib/mockData';
import { getPriorityColor, getStatusColor, formatDate, formatDateTime } from '../lib/utils';
import { useAuthStore } from '../stores/authStore';
import { useToast } from '../hooks/use-toast';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { toast } = useToast();
  const [comment, setComment] = useState('');

  const task = MOCK_TASKS.find((t) => t.id === id);

  if (!task) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Task not found</p>
        <button onClick={() => navigate('/tasks')} className="mt-4 text-primary hover:underline">
          Back to Tasks
        </button>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    toast({
      title: 'Status updated',
      description: `Task status changed to ${newStatus}`,
    });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    toast({
      title: 'Comment added',
      description: 'Your comment has been posted',
    });
    setComment('');
  };

  const canEdit = user?.role === 'admin' || user?.role === 'manager' || task.assignee.name === user?.name;

  return (
    <div className="page-transition">
      <button
        onClick={() => navigate('/tasks')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tasks
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="glass-card p-6 rounded-3xl border border-white/50">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground mb-2">{task.title}</h1>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  {task.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white/60 text-muted-foreground border border-white/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {canEdit && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/tasks/${id}/edit`)}
                    className="p-2 hover:bg-white/50 rounded-lg transition-all"
                  >
                    <Edit className="w-5 h-5 text-muted-foreground" />
                  </button>
                  {user?.role === 'admin' && (
                    <button className="p-2 hover:bg-destructive/10 rounded-lg transition-all">
                      <Trash2 className="w-5 h-5 text-destructive" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <p className="text-muted-foreground">{task.description}</p>

            {/* Progress */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Progress</span>
                <span className="text-sm text-muted-foreground">{task.progress}%</span>
              </div>
              <div className="bg-white/50 rounded-full h-3 border border-white/60">
                <div 
                  className="bg-primary h-full rounded-full transition-all" 
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Workflow Timeline */}
          <div className="glass-card p-6 rounded-3xl border border-white/50">
            <h2 className="text-lg font-semibold text-foreground mb-4">Workflow Timeline</h2>
            <div className="space-y-4">
              {task.workflow.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${index === task.workflow.length - 1 ? 'bg-primary' : 'bg-muted'}`} />
                    {index < task.workflow.length - 1 && (
                      <div className="w-0.5 h-full bg-muted mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${getStatusColor(step.status)}`}>
                        {step.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{formatDateTime(step.timestamp)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">By {step.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="glass-card p-6 rounded-3xl border border-white/50">
            <h2 className="text-lg font-semibold text-foreground mb-4">Comments & Activity</h2>
            
            <div className="space-y-4 mb-6">
              {task.comments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No comments yet</p>
              ) : (
                task.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user}`}
                      alt={comment.user}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="bg-white/60 p-3 rounded-lg border border-white/70">
                        <p className="text-sm font-medium text-foreground mb-1">{comment.user}</p>
                        <p className="text-sm text-muted-foreground">{comment.text}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDateTime(comment.timestamp)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleAddComment} className="flex gap-3">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
                  rows={3}
                />
                <button
                  type="submit"
                  className="mt-2 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-xl text-sm font-medium transition-all"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          {canEdit && (
            <div className="glass-card p-6 rounded-3xl border border-white/50">
              <h3 className="font-semibold text-foreground mb-4">Actions</h3>
              <div className="space-y-2">
                <select
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full px-4 py-3 bg-white/50 border border-white/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                  defaultValue={task.status}
                >
                  {['ASSIGNED', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'].map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Details */}
          <div className="glass-card p-6 rounded-3xl border border-white/50">
            <h3 className="font-semibold text-foreground mb-4">Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Assignee</p>
                  <p className="text-sm font-medium text-foreground">{task.assignee.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Reporter</p>
                  <p className="text-sm font-medium text-foreground">{task.reporter.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="text-sm font-medium text-foreground">{formatDate(task.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Due Date</p>
                  <p className="text-sm font-medium text-foreground">{formatDate(task.dueDate)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
