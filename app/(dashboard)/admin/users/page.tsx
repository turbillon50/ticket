'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { UserRole } from '@/lib/roles'

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  joinDate: string
  status: 'active' | 'inactive' | 'suspended'
  eventsCreated: number
  bookings: number
  lastActive: string
}

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [newRole, setNewRole] = useState<UserRole>(UserRole.USER)

  // Mock users data
  const allUsers: User[] = [
    {
      id: '1',
      name: 'Sarah Anderson',
      email: 'sarah@urmah.events',
      role: UserRole.PRODUCER,
      joinDate: 'Jan 15, 2026',
      status: 'active',
      eventsCreated: 12,
      bookings: 856,
      lastActive: '2 hours ago',
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike@urmah.events',
      role: UserRole.PRODUCER,
      joinDate: 'Dec 1, 2025',
      status: 'active',
      eventsCreated: 8,
      bookings: 542,
      lastActive: '1 day ago',
    },
    {
      id: '3',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      role: UserRole.USER,
      joinDate: 'Feb 10, 2026',
      status: 'active',
      eventsCreated: 0,
      bookings: 5,
      lastActive: '3 hours ago',
    },
    {
      id: '4',
      name: 'John Doe',
      email: 'john@example.com',
      role: UserRole.USER,
      joinDate: 'Jan 20, 2026',
      status: 'inactive',
      eventsCreated: 0,
      bookings: 2,
      lastActive: '15 days ago',
    },
    {
      id: '5',
      name: 'Lisa Chen',
      email: 'lisa@urmah.events',
      role: UserRole.ADMIN,
      joinDate: 'Nov 1, 2025',
      status: 'active',
      eventsCreated: 0,
      bookings: 0,
      lastActive: '30 mins ago',
    },
    {
      id: '6',
      name: 'James Smith',
      email: 'james@example.com',
      role: UserRole.USER,
      joinDate: 'Feb 5, 2026',
      status: 'suspended',
      eventsCreated: 0,
      bookings: 8,
      lastActive: '7 days ago',
    },
  ]

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-red-500/20 text-red-400'
      case UserRole.PRODUCER:
        return 'bg-neon-green/20 text-neon-green'
      case UserRole.USER:
        return 'bg-blue-500/20 text-blue-400'
      case UserRole.GUEST:
        return 'bg-dark-text-secondary/20 text-dark-text-secondary'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-neon-green/20 text-neon-green'
      case 'inactive':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'suspended':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const handleRoleChange = (user: User) => {
    setSelectedUser(user)
    setNewRole(user.role)
    setShowRoleModal(true)
  }

  const saveRoleChange = () => {
    // In production, would call API to update user role
    console.log(`Updated ${selectedUser?.name}'s role to ${newRole}`)
    setShowRoleModal(false)
    setSelectedUser(null)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 100 },
    },
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold font-playfair text-white mb-2">User Management</h1>
        <p className="text-dark-text-secondary">Manage platform users and their roles</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-dark-card border border-neon-green/20 rounded-lg p-4">
          <p className="text-dark-text-secondary text-sm mb-2">Total Users</p>
          <p className="text-3xl font-bold text-white">{allUsers.length}</p>
          <p className="text-neon-green text-xs mt-2">Registered accounts</p>
        </div>

        <div className="bg-dark-card border border-neon-green/20 rounded-lg p-4">
          <p className="text-dark-text-secondary text-sm mb-2">Active Users</p>
          <p className="text-3xl font-bold text-white">
            {allUsers.filter((u) => u.status === 'active').length}
          </p>
          <p className="text-neon-green text-xs mt-2">Logged in recently</p>
        </div>

        <div className="bg-dark-card border border-neon-green/20 rounded-lg p-4">
          <p className="text-dark-text-secondary text-sm mb-2">Producers</p>
          <p className="text-3xl font-bold text-white">
            {allUsers.filter((u) => u.role === UserRole.PRODUCER).length}
          </p>
          <p className="text-neon-green text-xs mt-2">Event creators</p>
        </div>

        <div className="bg-dark-card border border-neon-green/20 rounded-lg p-4">
          <p className="text-dark-text-secondary text-sm mb-2">Suspended</p>
          <p className="text-3xl font-bold text-red-400">
            {allUsers.filter((u) => u.status === 'suspended').length}
          </p>
          <p className="text-red-400 text-xs mt-2">Flagged accounts</p>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-dark-card border border-neon-green/20 rounded-2xl p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-white font-semibold text-sm mb-2">Search</label>
            <input
              type="text"
              placeholder="Name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-dark-bg border border-neon-green/20 rounded-lg text-white placeholder-dark-text-secondary focus:border-neon-green focus:outline-none transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-white font-semibold text-sm mb-2">Role</label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as UserRole | 'all')}
              className="w-full px-4 py-2 bg-dark-bg border border-neon-green/20 rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors text-sm"
            >
              <option value="all">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="PRODUCER">Producer</option>
              <option value="USER">User</option>
              <option value="GUEST">Guest</option>
            </select>
          </div>

          <div>
            <label className="block text-white font-semibold text-sm mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="w-full px-4 py-2 bg-dark-bg border border-neon-green/20 rounded-lg text-white focus:border-neon-green focus:outline-none transition-colors text-sm"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('')
                setFilterRole('all')
                setFilterStatus('all')
              }}
              className="w-full px-4 py-2 bg-dark-bg border border-neon-green/20 text-white hover:border-neon-green rounded-lg font-semibold transition-colors text-sm"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-dark-card border border-neon-green/20 rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neon-green/20">
                <th className="px-6 py-4 text-left text-white font-semibold">User</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Role</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                <th className="px-6 py-4 text-center text-white font-semibold">Activity</th>
                <th className="px-6 py-4 text-center text-white font-semibold">Events</th>
                <th className="px-6 py-4 text-center text-white font-semibold">Bookings</th>
                <th className="px-6 py-4 text-right text-white font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  variants={itemVariants}
                  className="border-b border-neon-green/10 hover:bg-dark-bg/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-semibold">{user.name}</p>
                      <p className="text-dark-text-secondary text-xs">{user.email}</p>
                      <p className="text-dark-text-secondary text-xs">
                        Joined {user.joinDate}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <p className="text-dark-text-secondary text-sm">{user.lastActive}</p>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <p className="text-white font-semibold">{user.eventsCreated}</p>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <p className="text-white font-semibold">{user.bookings}</p>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleRoleChange(user)}
                        className="px-3 py-1 bg-neon-green/20 text-neon-green hover:bg-neon-green/30 rounded text-xs font-semibold transition-colors"
                      >
                        Change Role
                      </button>
                      <button className="px-3 py-1 bg-dark-bg border border-neon-green/20 text-white hover:border-neon-green rounded text-xs font-semibold transition-colors">
                        ⋮
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-dark-text-secondary">No users found matching your filters</p>
          </div>
        )}
      </motion.div>

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowRoleModal(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-dark-card border border-neon-green/20 rounded-2xl p-8 max-w-md w-full mx-4"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Change User Role</h2>
            <p className="text-dark-text-secondary mb-6">
              Update {selectedUser.name}'s role to grant different permissions
            </p>

            <div className="space-y-3 mb-6">
              {([UserRole.ADMIN, UserRole.PRODUCER, UserRole.USER, UserRole.GUEST] as const).map((role) => (
                <label key={role} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-dark-bg transition-colors">
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={newRole === role}
                    onChange={(e) => setNewRole(e.target.value as UserRole)}
                    className="w-4 h-4 accent-neon-green"
                  />
                  <span className="text-white font-semibold">{role.toUpperCase()}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRoleModal(false)}
                className="flex-1 px-4 py-2 bg-dark-bg border border-neon-green/20 text-white hover:border-neon-green rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveRoleChange}
                className="flex-1 px-4 py-2 bg-neon-green text-dark-bg hover:bg-neon-green-dark rounded-lg font-semibold transition-colors"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
