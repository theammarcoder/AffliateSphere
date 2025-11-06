import { getSession } from '@/lib/session';

export async function protect() {
  const session = await getSession();
  
  if (!session || !session.adminId) {
    return {
      error: true,
      status: 401,
      message: 'Not authorized, please login'
    };
  }
  
  return {
    error: false,
    adminId: session.adminId,
    adminEmail: session.adminEmail
  };
}

