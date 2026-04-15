export enum UserRole {
  ADMIN = 'admin',
  PRODUCER = 'producer',
  USER = 'user',
  GUEST = 'guest',
}

export const ROLE_PERMISSIONS = {
  [UserRole.ADMIN]: [
    'manage_users',
    'manage_roles',
    'manage_events',
    'manage_bookings',
    'view_analytics',
    'manage_payments',
    'manage_support',
    'access_admin_dashboard',
    'manage_producers',
    'view_all_events',
    'export_data',
  ],
  [UserRole.PRODUCER]: [
    'create_events',
    'manage_own_events',
    'view_event_analytics',
    'manage_event_inclusions',
    'view_bookings',
    'track_earnings',
    'access_producer_dashboard',
    'upload_media',
  ],
  [UserRole.USER]: [
    'browse_events',
    'book_events',
    'view_bookings',
    'write_reviews',
    'share_events',
    'manage_itineraries',
    'connect_with_users',
    'view_maps',
  ],
  [UserRole.GUEST]: [
    'browse_public_events',
    'view_policies',
    'view_faqs',
  ],
}

export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false
}

export function hasAnyPermission(role: UserRole, permissions: string[]): boolean {
  return permissions.some(perm => hasPermission(role, perm))
}
