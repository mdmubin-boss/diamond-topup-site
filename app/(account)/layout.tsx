import BottomNav from "@/components/layout/BottomNav";
export default function Layout({children}:{children:React.ReactNode}){return <div className="pb-20">{children}<BottomNav/></div>;}
