import { ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="page-transition">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          System overview and administrative control
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-primary rounded-3xl p-6 relative hover-lift">
          <button className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 text-white" />
          </button>
          <h3 className="text-white/90 text-sm mb-2">Active Users</h3>
          <p className="text-5xl font-bold text-white">—</p>
          <p className="text-white/80 text-xs mt-2">
            Data will appear once backend is connected
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-white/50 hover-lift">
          <h3 className="text-muted-foreground text-sm mb-2">Total Tasks</h3>
          <p className="text-5xl font-bold text-foreground">—</p>
          <p className="text-muted-foreground text-xs mt-2">
            Across all departments
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-white/50 hover-lift">
          <h3 className="text-muted-foreground text-sm mb-2">Pending Approvals</h3>
          <p className="text-5xl font-bold text-foreground">—</p>
          <p className="text-muted-foreground text-xs mt-2">
            Requires admin action
          </p>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-white/50 hover-lift">
          <h3 className="text-muted-foreground text-sm mb-2">System Status</h3>
          <p className="text-lg font-semibold text-green-600">Operational</p>
          <p className="text-muted-foreground text-xs mt-2">
            All services running normally
          </p>
        </div>
      </div>

      {/* Empty State (Intentional) */}
      <div className="glass-card rounded-3xl p-10 border border-white/50 text-center">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          No analytics available yet
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          This dashboard will surface real insights once backend services,
          authentication, and data pipelines are integrated.
        </p>
      </div>
    </div>
  );
}
