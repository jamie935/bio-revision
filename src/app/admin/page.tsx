"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Shield,
  CreditCard,
  Gift,
  Clock,
  Search,
  ArrowLeft,
  TrendingUp,
} from "lucide-react";

interface UserRow {
  id: string;
  phone: string;
  displayName: string | null;
  role: string;
  hasPaid: boolean;
  freeAccess: boolean;
  trialEndsAt: string;
  createdAt: string;
  lastActiveAt: string | null;
  cardsAnswered: number;
}

interface Stats {
  totalUsers: number;
  activeThisWeek: number;
  paidUsers: number;
  freeAccessUsers: number;
  trialUsers: number;
}

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserRow[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const isSuper = user?.role === "super_admin";

  const loadData = useCallback(async () => {
    const [usersRes, statsRes] = await Promise.all([
      fetch(`/api/admin/users?search=${encodeURIComponent(search)}`),
      fetch("/api/admin/stats"),
    ]);
    if (usersRes.ok) {
      const data = await usersRes.json();
      setUsers(data.users);
    }
    if (statsRes.ok) {
      setStats(await statsRes.json());
    }
    setLoading(false);
  }, [search]);

  useEffect(() => {
    if (user && user.role !== "user") {
      loadData();
    }
  }, [user, loadData]);

  if (!user || user.role === "user") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Access denied</p>
      </div>
    );
  }

  const toggleFreeAccess = async (userId: string, current: boolean) => {
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, freeAccess: !current }),
    });
    loadData();
  };

  const changeRole = async (userId: string, role: string) => {
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });
    loadData();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <Badge variant="secondary">{user.role}</Badge>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid gap-3 grid-cols-2 md:grid-cols-5 mb-8">
            {[
              { icon: Users, label: "Total Users", value: stats.totalUsers, color: "text-blue-500", bg: "bg-blue-50" },
              { icon: TrendingUp, label: "Active This Week", value: stats.activeThisWeek, color: "text-green-500", bg: "bg-green-50" },
              { icon: CreditCard, label: "Paid", value: stats.paidUsers, color: "text-purple-500", bg: "bg-purple-50" },
              { icon: Gift, label: "Free Access", value: stats.freeAccessUsers, color: "text-amber-500", bg: "bg-amber-50" },
              { icon: Clock, label: "On Trial", value: stats.trialUsers, color: "text-cyan-500", bg: "bg-cyan-50" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 text-center">
                  <div className={`w-8 h-8 rounded-full ${stat.bg} flex items-center justify-center mx-auto mb-1`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-[10px] text-gray-500">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* User list */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Users</CardTitle>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search phone or name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 pr-3 py-2 text-sm border rounded-lg w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500 text-center py-8">Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-500">
                      <th className="pb-2 font-medium">Phone</th>
                      <th className="pb-2 font-medium">Role</th>
                      <th className="pb-2 font-medium">Status</th>
                      <th className="pb-2 font-medium">Cards</th>
                      <th className="pb-2 font-medium">Last Active</th>
                      <th className="pb-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => {
                      const trialActive = new Date(u.trialEndsAt) > new Date();
                      const status = u.hasPaid
                        ? "Paid"
                        : u.freeAccess
                          ? "Free"
                          : trialActive
                            ? "Trial"
                            : "Expired";
                      const statusColor =
                        status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : status === "Free"
                            ? "bg-amber-100 text-amber-700"
                            : status === "Trial"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700";

                      return (
                        <tr key={u.id} className="border-b last:border-0">
                          <td className="py-2.5">
                            <span className="font-mono text-xs">{u.phone}</span>
                            {u.displayName && (
                              <span className="text-gray-400 text-xs ml-1">
                                ({u.displayName})
                              </span>
                            )}
                          </td>
                          <td className="py-2.5">
                            {u.role !== "user" ? (
                              <Badge variant="secondary" className="text-[10px]">
                                <Shield className="w-3 h-3 mr-0.5" />
                                {u.role}
                              </Badge>
                            ) : (
                              <span className="text-gray-400 text-xs">user</span>
                            )}
                          </td>
                          <td className="py-2.5">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColor}`}>
                              {status}
                            </span>
                          </td>
                          <td className="py-2.5 text-gray-600">{u.cardsAnswered}</td>
                          <td className="py-2.5 text-gray-400 text-xs">
                            {u.lastActiveAt
                              ? new Date(u.lastActiveAt).toLocaleDateString()
                              : "Never"}
                          </td>
                          <td className="py-2.5">
                            <div className="flex gap-1">
                              <Button
                                variant={u.freeAccess ? "destructive" : "outline"}
                                size="sm"
                                className="h-6 text-[10px] px-2"
                                onClick={() => toggleFreeAccess(u.id, u.freeAccess)}
                              >
                                {u.freeAccess ? "Revoke Free" : "Grant Free"}
                              </Button>
                              {isSuper && u.role !== "super_admin" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 text-[10px] px-2"
                                  onClick={() =>
                                    changeRole(
                                      u.id,
                                      u.role === "admin" ? "user" : "admin"
                                    )
                                  }
                                >
                                  {u.role === "admin" ? "Demote" : "Make Admin"}
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
