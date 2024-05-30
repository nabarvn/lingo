import { NextPage } from "next";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin";

const App = dynamic(() => import("./app"), { ssr: false });

const AdminPage: NextPage = () => {
  if (!isAdmin()) {
    redirect("/");
  }

  return <App />;
};

export default AdminPage;
