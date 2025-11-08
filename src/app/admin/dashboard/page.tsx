import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Activity, LogOut } from "lucide-react";
import { logout } from "../actions";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  // Placeholder data for the dashboard
  const stats = {
    totalUsers: '1,250',
    newUsers: '150',
    activeUsers: '800',
  };

  return (
    <div className="flex min-h-screen bg-secondary">
        <aside className="w-64 bg-background p-6 flex flex-col justify-between">
             <div>
                <h1 className="text-2xl font-poppins font-bold mb-8">Admin Panel</h1>
                <nav>
                    <ul>
                        <li>
                            <a href="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-lg bg-accent text-accent-foreground font-semibold">
                                <Users className="h-5 w-5" />
                                Dashboard
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <form action={logout}>
                <Button variant="ghost" className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </form>
        </aside>
        <main className="flex-1 p-8">
            <h2 className="text-3xl font-poppins font-bold mb-8">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Users</CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.newUsers}</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeUsers}</div>
                        <p className="text-xs text-muted-foreground">In the last 24 hours</p>
                    </CardContent>
                </Card>
            </div>
        </main>
    </div>
  );
}
