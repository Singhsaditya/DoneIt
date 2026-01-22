import { useEffect, useState } from "react";
import { fetchAuditLogs } from "../api/auditApi";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuditLogs()
      .then(setLogs)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading audit logs...</p>;
  if (!logs.length) return <p className="p-6">No audit logs found</p>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Audit Logs</h1>

      <div className="space-y-2">
        {logs.map((log) => (
          <div
            key={log._id}
            className="p-4 rounded-xl border"
          >
            <p className="font-semibold">{log.action}</p>
            <p className="text-sm text-muted-foreground">
              {log.user?.email || "System"}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(log.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
