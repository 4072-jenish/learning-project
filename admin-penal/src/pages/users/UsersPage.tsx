import type { FC } from "react";
import { useEffect, useState } from "react";
import { Check, Edit, Plus, Trash2, Users as UsersIcon, X } from "lucide-react";
import { toast } from "sonner";

import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import type { IUser } from "@/types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatDate, getInitials } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const RoleBadge: FC<{ role: string }> = ({ role }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
      role === "admin"
        ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
        : "bg-sky-500/10 text-sky-600 dark:text-sky-400"
    )}
  >
    {role}
  </span>
);

const UsersPage: FC = () => {
  const {
    users,
    loading,
    fetchAllUsers,
    updateUser,
    deleteUser,
    approveUser,
    rejectUser,
  } = useUser();
  const { signUpAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    if (users.length === 0) {
      fetchAllUsers();
    }
  }, [users.length]);

  const resetForm = () => {
    setSelectedUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "user",
    });
  };

  const handleAdd = () => {
    resetForm();
    setOpen(true);
  };

  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedUser) {
      const updateData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
      };

      await updateUser(String(selectedUser.id), updateData);
      toast.success("User updated successfully");
    } else {
      await signUpAdmin(formData);
      await fetchAllUsers();
      toast.success("User added successfully");
    }

    resetForm();
    setOpen(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    await deleteUser(String(id));
    toast.success("User deleted successfully");
  };

  const handleApprove = async (id: number) => {
    await approveUser(String(id));
    toast.success("User approved successfully");
  };

  const handleReject = async (id: number) => {
    await rejectUser(String(id));
    toast.success("User rejected successfully");
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Users
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Manage all registered users
          </p>
        </div>

        <Button onClick={handleAdd} className="w-full gap-2 sm:w-auto">
          <Plus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-sm font-medium">All Users</h2>
          <span className="text-sm text-muted-foreground">
            {loading ? "Loading…" : `${users.length} total`}
          </span>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 5 }).map((__, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-5 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-40">
                    <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <UsersIcon className="h-8 w-8 opacity-40" />
                      <p className="text-sm font-medium">No users found</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: IUser) => (
                  <TableRow key={user.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 leading-tight">
                          <p className="truncate font-medium">{user.name}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <RoleBadge role={user.role} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={user.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-wrap items-center justify-end gap-1.5">
                        {user.status !== "approved" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1 text-emerald-600 hover:bg-emerald-500/10 hover:text-emerald-600 dark:text-emerald-400"
                            onClick={() => handleApprove(user.id)}
                          >
                            <Check className="h-4 w-4" />
                            <span className="hidden sm:inline">Approve</span>
                          </Button>
                        )}

                        {user.status !== "rejected" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="gap-1 text-rose-600 hover:bg-rose-500/10 hover:text-rose-600 dark:text-rose-400"
                            onClick={() => handleReject(user.id)}
                          >
                            <X className="h-4 w-4" />
                            <span className="hidden sm:inline">Reject</span>
                          </Button>
                        )}

                        <Button
                          size="icon-sm"
                          variant="outline"
                          aria-label="Edit user"
                          onClick={() => handleEdit(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          size="icon-sm"
                          variant="destructive"
                          aria-label="Delete user"
                          onClick={() => handleDelete(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedUser ? "Edit User" : "Add User"}</DialogTitle>
            <DialogDescription>
              {selectedUser
                ? "Update the user details below."
                : "Create a new user account."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Name</label>
              <Input
                placeholder="Full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            {!selectedUser && (
              <div className="space-y-1.5">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-sm font-medium">Role</label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full">
              {selectedUser ? "Update User" : "Add User"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
