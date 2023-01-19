// import { BlogIcon } from "components/icon";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { InferGetServerSidePropsType } from "next";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export type SignInErrorTypes =
  | "Signin"
  | "OAuthSignin"
  | "OAuthCallback"
  | "OAuthCreateAccount"
  | "EmailCreateAccount"
  | "Callback"
  | "OAuthAccountNotLinked"
  | "EmailSignin"
  | "CredentialsSignin"
  | "SessionRequired"
  | "default";

const errors: Record<SignInErrorTypes, string> = {
  Signin: "Prova a loggarti con un metodo differente.",
  OAuthSignin: "Prova a loggarti con un metodo differente.",
  OAuthCallback: "Prova a loggarti con un metodo differente.",
  OAuthCreateAccount: "Prova a loggarti con un metodo differente.",
  EmailCreateAccount: "Prova a loggarti con un metodo differente.",
  Callback: "Prova a loggarti con un metodo differente.",
  OAuthAccountNotLinked:
    "Sembra che hai già effettuato il login con un altro medoto. Per confermare, utilizza il metodo di login originale!",
  EmailSignin: "Errore nell'invio della mail.",
  CredentialsSignin:
    "Errore nel Login. Controlla i dati che hai inserito e riprova.",
  SessionRequired: "Perfavore effettua il login per accedere a questa pagina.",
  default: "Non riesco a fare il login.",
};

export default function SignIn({ providers }: Props) {
  const session = useSession();
  const router = useRouter();
  const error = router.query.error as SignInErrorTypes | undefined;

  if (session.status === "authenticated") {
    const url = (router.query.callbackUrl as string) || "/dashboard";
    router.push(url);
    return <p>loading</p>;
  }
  if (!providers) {
    return "error";
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* <BlogIcon className="mx-auto h-14 w-auto text-pink-600" /> */}
          <img
            src="/hackability.png"
            alt="logo"
            className="mx-auto h-14 w-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login in Space Hackability
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && <p className="mb-4 text-center">{errors[error]}</p>}
            <div className="mt-0">
              <div className="mt-2 grid grid-cols-1 gap-3">
                <div>
                  <button
                    onClick={() =>
                      signIn(providers.google.id, {
                        redirect: true,
                        callbackUrl: "/dashboard",
                      })
                    }
                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                  >
                    <FontAwesomeIcon
                      icon={faGoogle}
                      className="h-5 w-5"
                      fill="currentColor"
                    />
                    <span className="ml-3">Login con Google </span>
                    <span className="sr-only">Sign in with Google</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
