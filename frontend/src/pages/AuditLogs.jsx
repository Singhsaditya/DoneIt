import { FileText, User, Clock } from 'lucide-react';
import { MOCK_AUDIT_LOGS } from '../lib/mockData';
import { formatDateTime } from '../lib/utils';

export default function AuditLogs() {
  const getActionColor = (action) => {
    const colors = {
      USER_ROLE_CHANGED: 'bg-blue-100 text-blue-700',
      TASK_CREATED: 'bg-green-100 text-green-700',
      TASK_STATUS_CHANGED: 'bg-yellow-100 text-yellow-700',
      USER_DISABLED: 'bg-red-100 text-red-700',
    };
    return colors[action] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="page-transition">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Audit Logs</h1>
        <p className="text-muted-foreground">Track all system changes and user actions</p>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Entity
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Changes
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-accent transition-all">
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {formatDateTime(log.timestamp)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${getActionColor(log.action)}`}>
                      {log.action.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">
                        {log.entity} #{log.entityId}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {log.before && (
                        <div className="text-xs">
                          <span className="text-muted-foreground">Before: </span>
                          <code className="bg-muted px-2 py-1 rounded">
                            {JSON.stringify(log.before)}
                          </code>
                        </div>
                      )}
                      {log.after && (
                        <div className="text-xs">
                          <span className="text-muted-foreground">After: </span>
                          <code className="bg-muted px-2 py-1 rounded">
                            {JSON.stringify(log.after)}
                          </code>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
