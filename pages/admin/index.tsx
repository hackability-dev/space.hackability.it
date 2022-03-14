import { AdminLayout } from "components/admin-layout";
import { signOut, useSession } from "next-auth/react";

const Admin = () => {
  const session = useSession();
  return (
    <AdminLayout>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button onClick={() => signOut()}> signout</button>
    </AdminLayout>
  );
};

export default Admin;
