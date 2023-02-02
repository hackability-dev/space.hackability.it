import type { User } from "@prisma/client";
import { DashboardLayout } from "../../../layouts/dashboard";
import { trpc } from "../../../utils/trpc";

const ProjectsPage = () => {
  const { data, isLoading, error } = trpc.admin.getUsers.useQuery({
    skip: 0,
    take: 50,
  });

  if (isLoading) {
    return <p>loading ...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <DashboardLayout>
      <div>
        <div className="">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Utenti</h1>
              <p className="mt-2 text-sm text-gray-700">Lista utenti</p>
              <UsersList users={data} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectsPage;

interface UsersListProps {
  users: Pick<
    User,
    "id" | "email" | "image" | "isAdmin" | "isAuthor" | "name"
  >[];
}

const UsersList = ({ users }: UsersListProps) => {
  const utils = trpc.useContext();
  const setAuthorMut = trpc.admin.setAuthor.useMutation({
    onSuccess: () => {
      utils.admin.invalidate();
    },
  });

  return (
    <div className="w-full overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={u.image!} alt={u.name!} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{u.name}</div>
                    <div className="text-sm opacity-50">{u.email}</div>
                  </div>
                </div>
              </td>
              <td>
                <input
                  type="checkbox"
                  className="toggle"
                  checked={u.isAuthor}
                  onChange={() =>
                    setAuthorMut.mutate({ isAuthor: !u.isAuthor, id: u.id })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
