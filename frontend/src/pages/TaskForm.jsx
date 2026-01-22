import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { MOCK_TASKS, MOCK_USERS_DATA, PRIORITY_OPTIONS } from '../lib/mockData';
import { useToast } from '../hooks/use-toast';

export default function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEdit = Boolean(id);
  
  const existingTask = isEdit ? MOCK_TASKS.find((t) => t.id === id) : null;

  const [formData, setFormData] = useState({
    title: existingTask?.title || '',
    description: existingTask?.description || '',
    assigneeId: existingTask?.assignee.id || '',
    priority: existingTask?.priority || 'MEDIUM',
    dueDate: existingTask?.dueDate ? new Date(existingTask.dueDate).toISOString().split('T')[0] : '',
    tags: existingTask?.tags.join(', ') || '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.assigneeId) newErrors.assigneeId = 'Assignee is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    toast({
      title: isEdit ? 'Task updated' : 'Task created',
      description: isEdit 
        ? 'Task has been updated successfully' 
        : 'New task has been created successfully',
    });
    
    navigate('/tasks');
  };

  return (
    <div className="page-transition">
      <button
        onClick={() => navigate('/tasks')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Tasks
      </button>

      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold text-foreground mb-6">
          {isEdit ? 'Edit Task' : 'Create New Task'}
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-border space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
              Task Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-4 py-2.5 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                errors.title ? 'border-destructive' : 'border-border'
              }`}
              placeholder="Enter task title"
            />
            {errors.title && (
              <p className="text-destructive text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-4 py-2.5 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none ${
                errors.description ? 'border-destructive' : 'border-border'
              }`}
              rows={4}
              placeholder="Describe the task"
            />
            {errors.description && (
              <p className="text-destructive text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="assignee" className="block text-sm font-medium text-foreground mb-2">
                Assignee *
              </label>
              <select
                id="assignee"
                value={formData.assigneeId}
                onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })}
                className={`w-full px-4 py-2.5 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                  errors.assigneeId ? 'border-destructive' : 'border-border'
                }`}
              >
                <option value="">Select assignee</option>
                {MOCK_USERS_DATA.filter(u => u.status === 'active').map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </option>
                ))}
              </select>
              {errors.assigneeId && (
                <p className="text-destructive text-xs mt-1">{errors.assigneeId}</p>
              )}
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-foreground mb-2">
                Priority *
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                {PRIORITY_OPTIONS.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-foreground mb-2">
                Due Date *
              </label>
              <input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={`w-full px-4 py-2.5 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                  errors.dueDate ? 'border-destructive' : 'border-border'
                }`}
              />
              {errors.dueDate && (
                <p className="text-destructive text-xs mt-1">{errors.dueDate}</p>
              )}
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2">
                Tags (comma separated)
              </label>
              <input
                id="tags"
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="e.g., frontend, urgent"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-medium transition-all"
            >
              {isEdit ? 'Update Task' : 'Create Task'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="bg-muted hover:bg-muted/70 text-foreground px-6 py-2.5 rounded-xl font-medium transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
