"use client";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

function Tower(){
  const floors=Array.from({length:14});
  const fins=Array.from({length:17});
  return <group rotation={[0,-.25,0]}>
    {floors.map((_,i)=><mesh key={i} position={[0,-2.6+i*.38,0]} scale={[2.4-i*.018,.055,1.46-i*.012]}><boxGeometry/><meshStandardMaterial color="#e9e7df" roughness={.42} metalness={.08}/></mesh>)}
    <mesh position={[0,0,.0]} scale={[2.18,5.05,1.28]}><boxGeometry/><meshPhysicalMaterial color="#b9d3dc" transparent opacity={.23} roughness={.05} transmission={.5}/></mesh>
    {fins.map((_,i)=><mesh key={i} position={[-2.05+i*.255,0,1.38]} scale={[.035,5.15,.18]}><boxGeometry/><meshStandardMaterial color="#d3c8b6"/></mesh>)}
    <mesh position={[.75,1.1,0]} scale={[2.7,.08,1.75]}><boxGeometry/><meshStandardMaterial color="#d7d0c3"/></mesh>
    <mesh position={[-.65,-1.2,0]} scale={[2.75,.08,1.7]}><boxGeometry/><meshStandardMaterial color="#d7d0c3"/></mesh>
  </group>;
}
export default function TowerScene(){return <Canvas frameloop="demand" dpr={[1,1.35]} gl={{antialias:true,alpha:true,powerPreference:'high-performance'}}><PerspectiveCamera makeDefault position={[5,2.2,8]} fov={35}/><ambientLight intensity={2.2}/><directionalLight position={[4,8,7]} intensity={3} color="#fff5dc"/><directionalLight position={[-4,1,2]} intensity={1} color="#b8d9ee"/><Tower/></Canvas>}
