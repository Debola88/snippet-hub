import { redirect } from "next/navigation";

export default function Home() {
  redirect('/');
  
  return <div className="poppins"></div>;
}
