import { useUser } from "@auth0/nextjs-auth0";
import { AdminLayout } from "components/admin-layout";
// import { signOut, useSession } from "next-auth/react";

const Admin = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <AdminLayout>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      {/* <button onClick={() => signOut()}> signout</button> */}
    </AdminLayout>
  );
};

export default Admin;
