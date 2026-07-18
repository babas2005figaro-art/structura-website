import type {Metadata} from "next";
import "./globals.css";
import {SiteShell} from "../components/SiteShell";
export const metadata:Metadata={metadataBase:new URL('https://structura.example'),title:{default:'Structūra — From intelligence to structure',template:'%s — Structūra'},description:'Architecture, real-estate intelligence and enterprise systems built for consequential decisions.',icons:{icon:'/favicon.svg'},openGraph:{title:'Structūra — From intelligence to structure',description:'Architecture, real-estate intelligence and enterprise systems built for consequential decisions.',type:'website'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body><SiteShell>{children}</SiteShell></body></html>}
