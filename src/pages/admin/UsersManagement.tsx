import { useState } from 'react';
import { mockUsers } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  MoreVertical, 
  Shield, 
  User as UserIcon,
  Mail,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockUsers.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <Button>
          <UserIcon className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Users Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">User</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Email</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Role</th>
                <th className="text-left text-sm font-medium text-muted-foreground px-6 py-4">Joined</th>
                <th className="text-right text-sm font-medium text-muted-foreground px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="font-medium text-foreground">{user.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.isAdmin ? (
                      <Badge className="bg-primary/10 text-primary border-0">
                        <Shield className="h-3 w-3 mr-1" />
                        Admin
                      </Badge>
                    ) : (
                      <Badge variant="secondary">User</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(user.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>{user.isAdmin ? 'Remove Admin' : 'Make Admin'}</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredUsers.length} of {mockUsers.length} users
      </div>
    </div>
  );
}
