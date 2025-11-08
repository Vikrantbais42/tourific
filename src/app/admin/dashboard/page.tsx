'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Activity, LogOut } from "lucide-react";
import { logout } from "../actions";
import { Button } from "@/components/ui/button";
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, where } from 'firebase/firestore';
import { useFirestore, useMemoFirebase } from '@/firebase';

// Define a type for your visit data for type safety
type Visit = {
  timestamp: Date;
  // Add other relevant fields if you have them
};

export default function AdminDashboard() {
  const firestore = useFirestore();

  // Memoize the queries to prevent re-creation on every render
  const allVisitsQuery = useMemoFirebase(() => collection(firestore, 'visits'), [firestore]);
  const recentVisitsQuery = useMemoFirebase(() => {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    return query(collection(firestore, 'visits'), where('timestamp', '>=', oneDayAgo));
  }, [firestore]);

  // Fetch the data using the useCollection hook
  const { data: allVisits, isLoading: isLoadingAll } = useCollection<Visit>(allVisitsQuery);
  const { data: recentVisits, isLoading: isLoadingRecent } = useCollection<Visit>(recentVisitsQuery);

  const stats = {
    totalUsers: isLoadingAll ? 'Loading...' : allVisits?.length.toLocaleString() ?? '0',
    newUsers: '150', // Placeholder, as "new users" is more complex to define
    activeUsers: isLoadingRecent ? 'Loading...' : recentVisits?.length.toLocaleString() ?? '0',
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
                        <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalUsers}</div>
                        <p className="text-xs text-muted-foreground">All time visits to the site</p>
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
                        <CardTitle className="text-sm font-medium">Active Users (24h)</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeUsers}</div>
                        <p className="text-xs text-muted-foreground">Visits in the last 24 hours</p>
                    </CardContent>
                </Card>
            </div>
        </main>
    </div>
  );
}
