"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Tower(){
  const group=useRef<THREE.Group>(null);
  useFrame((state)=>{if(group.current){group.current.rotation.y=Math.sin(state.clock.elapsedTime*.18)*.16-.25;group.current.position.y=Math.sin(state.clock.elapsedTime*.35)*.05}});
  const floors=Array.from({length:14});
  const fins=Array.from({length:17});
  return <group ref={group} rotation={[0,-.25,0]}>
    {floors.map((_,i)=><mesh key={i} position={[0,-2.6+i*.38,0]} scale={[2.4-i*.018,.055,1.46-i*.012]}><boxGeometry/><meshStandardMaterial color="#e9e7df" roughness={.42} metalness={.08}/></mesh>)}
    <mesh position={[0,0,.0]} scale={[2.18,5.05,1.28]}><boxGeometry/><meshPhysicalMaterial color="#b9d3dc" transparent opacity={.23} roughness={.05} transmission={.5}/></mesh>
    {fins.map((_,i)=><mesh key={i} position={[-2.05+i*.255,0,1.38]} scale={[.035,5.15,.18]}><boxGeometry/><meshStandardMaterial color="#d3c8b6"/></mesh>)}
    <mesh position={[.75,1.1,0]} scale={[2.7,.08,1.75]}><boxGeometry/><meshStandardMaterial color="#d7d0c3"/></mesh>
    <mesh position={[-.65,-1.2,0]} scale={[2.75,.08,1.7]}><boxGeometry/><meshStandardMaterial color="#d7d0c3"/></mesh>
  </group>;
}
export default function TowerScene(){return <Canvas dpr={[1,1.5]} gl={{antialias:true,alpha:true}}><PerspectiveCamera makeDefault position={[5,2.2,8]} fov={35}/><ambientLight intensity={2.2}/><directionalLight position={[4,8,7]} intensity={3} color="#fff5dc"/><directionalLight position={[-4,1,2]} intensity={1} color="#b8d9ee"/><Float speed={.5} floatIntensity={.12}><Tower/></Float></Canvas>}
