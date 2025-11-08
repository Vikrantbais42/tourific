
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Activity, LogOut, KeyRound } from "lucide-react";
import { logout } from "../actions";
import { Button } from "@/components/ui/button";
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query, where, Timestamp } from 'firebase/firestore';
import { useFirestore, useMemoFirebase, useFirebase, useUser } from '@/firebase';
import { useEffect } from 'react';
import { signInAnonymously } from 'firebase/auth';
import VisitsChart from "@/components/visits-chart";


// Define a type for your visit data for type safety
type Visit = {
  timestamp: Timestamp;
};

export default function AdminDashboard() {
  const { firestore, auth } = useFirebase();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (auth && !user && !isUserLoading) {
        signInAnonymously(auth).catch((error) => {
            console.error("Anonymous sign-in failed", error);
        });
    }
  }, [auth, user, isUserLoading]);


  const allVisitsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return collection(firestore, 'visits');
  }, [firestore, user]);

  const recentVisitsQuery = useMemoFirebase(() => {
    if (!user) return null;
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);
    return query(collection(firestore, 'visits'), where('timestamp', '>=', oneDayAgo));
  }, [firestore, user]);

  const veryRecentVisitsQuery = useMemoFirebase(() => {
    if (!user) return null;
    const fiveMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
    return query(collection(firestore, 'visits'), where('timestamp', '>=', fiveMinutesAgo));
  }, [firestore, user]);


  const { data: allVisits, isLoading: isLoadingAll } = useCollection<Visit>(allVisitsQuery);
  const { data: recentVisits, isLoading: isLoadingRecent } = useCollection<Visit>(recentVisitsQuery);
  const { data: veryRecentVisits, isLoading: isLoadingVeryRecent } = useCollection<Visit>(veryRecentVisitsQuery);
  
  const totalVisits = isUserLoading || isLoadingAll ? 'Loading...' : allVisits?.length.toLocaleString() ?? '0';
  const activeVisitsLast24h = isUserLoading || isLoadingRecent ? 'Loading...' : recentVisits?.length.toLocaleString() ?? '0';
  const activeVisitsLast5m = isUserLoading || isLoadingVeryRecent ? 'Loading...' : veryRecentVisits?.length.toLocaleString() ?? '0';


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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalVisits}</div>
                        <p className="text-xs text-muted-foreground">All time visits to the site</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users (5 mins)</CardTitle>
                        <UserPlus className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeVisitsLast5m}</div>
                        <p className="text-xs text-muted-foreground">Visits in the last 5 minutes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Users (24h)</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeVisitsLast24h}</div>
                        <p className="text-xs text-muted-foreground">Visits in the last 24 hours</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <VisitsChart visits={allVisits} isLoading={isUserLoading || isLoadingAll} />
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Configure Gemini API Key</CardTitle>
                        <KeyRound className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            To enable the AI features of this application, you need to provide a Gemini API key.
                        </p>
                        <div className="p-4 rounded-lg bg-background border">
                            <p className="font-semibold">How to set your API Key:</p>
                            <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 space-y-1">
                                <li>Go to your project's hosting environment settings.</li>
                                <li>Find the section for "Environment Variables".</li>
                                <li>Add a new variable with the name <code className="bg-secondary px-1 py-0.5 rounded text-primary font-mono">GEMINI_API_KEY</code>.</li>
                                <li>Set the value to your actual Gemini API key.</li>
                                <li>Redeploy your application for the changes to take effect.</li>
                            </ol>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4">
                           For security reasons, your API key must be stored as a server-side environment variable and should not be stored in the database or exposed to the client-side code.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </main>
    </div>
  );
}
