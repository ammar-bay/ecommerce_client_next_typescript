import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

interface unauthorizedProps {
  admin?: boolean;
}

export default function Unauthorized({ admin }: unauthorizedProps) {
  const router = useRouter();
  const { qmessage } = router.query;

  return (
    <Layout title="Unauthorized Page">
      <h1 className="text-xl">Access Denied</h1>
      {qmessage && <div className="mb-4 text-red-500">{qmessage}</div>}
      {admin ? (
        <div className="mb-4 text-red-500">Admin access required</div>
      ) : (
        <>
          <div className="mb-4 text-red-500">You need to login first</div>
          <Link href={"login"}>Log in first</Link>
        </>
      )}
    </Layout>
  );
}
