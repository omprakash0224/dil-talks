import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { getStreak } from '../utils/streak'

const poses = [
    {
        name: "Mountain Pose",
        instructions: "Stand tall with feet hip-width apart, arms at your sides, palms facing forward.",
        animation: {
            la: 0, ra: 0, ll: 0, rl: 0, lar: 0, rar: 0,
            lh: 0, rh: 0 // hands neutral
        }
    },
    {
        name: "Upward Salute",
        instructions: "Raise arms overhead, reaching toward the sky with palms facing each other.",
        animation: {
            la: -Math.PI * 0.9, ra: -Math.PI * 0.9, ll: 0, rl: 0, lar: 0, rar: 0,
            lh: Math.PI / 6, rh: -Math.PI / 6 // hands slightly angled inward
        }
    },
    {
        name: "Warrior II",
        instructions: "Step feet wide apart, front knee bent, arms extended parallel to the floor.",
        animation: {
            la: Math.PI / 2, ra: Math.PI / 2, ll: Math.PI / 3, rl: -Math.PI / 6, lar: 0, rar: 0,
            lh: -Math.PI / 4, rh: Math.PI / 4 // hands pointing in opposite directions
        }
    },
    {
        name: "Tree Pose",
        instructions: "Balance on one leg, place other foot on inner thigh, hands in prayer position.",
        animation: {
            la: -Math.PI / 3, ra: -Math.PI / 3, ll: 0, rl: Math.PI / 2, lar: Math.PI / 4, rar: -Math.PI / 4,
            lh: Math.PI / 2, rh: -Math.PI / 2 // hands in prayer position
        }
    },
    {
        name: "Downward Dog",
        instructions: "Form an inverted V-shape with hands and feet planted, hips lifted high.",
        animation: {
            la: -Math.PI / 2, ra: -Math.PI / 2, ll: -Math.PI / 4, rl: -Math.PI / 4, lar: 0, rar: 0,
            lh: 0, rh: 0 // hands flat on ground
        }
    },
    {
        name: "Cobra Pose",
        instructions: "Lie on belly, press palms down, lift chest while keeping hips grounded.",
        animation: {
            la: -Math.PI / 6, ra: -Math.PI / 6, ll: Math.PI / 6, rl: Math.PI / 6, lar: Math.PI / 8, rar: -Math.PI / 8,
            lh: -Math.PI / 4, rh: Math.PI / 4 // hands pressed down
        }
    }
];

function Avatar({ currentPose }) {
    const group = useRef();
    const leftArm = useRef(), rightArm = useRef();
    const leftLeg = useRef(), rightLeg = useRef();
    const leftHand = useRef(), rightHand = useRef();

    useFrame(() => {
        if (!currentPose) return;
        const lerp = 0.05;

        // Arms animation
        leftArm.current.rotation.x = THREE.MathUtils.lerp(leftArm.current.rotation.x, currentPose.la || 0, lerp);
        rightArm.current.rotation.x = THREE.MathUtils.lerp(rightArm.current.rotation.x, currentPose.ra || 0, lerp);
        leftArm.current.rotation.z = THREE.MathUtils.lerp(leftArm.current.rotation.z, currentPose.lar || 0, lerp);
        rightArm.current.rotation.z = THREE.MathUtils.lerp(rightArm.current.rotation.z, currentPose.rar || 0, lerp);

        // Legs animation
        leftLeg.current.rotation.x = THREE.MathUtils.lerp(leftLeg.current.rotation.x, currentPose.ll || 0, lerp);
        rightLeg.current.rotation.x = THREE.MathUtils.lerp(rightLeg.current.rotation.x, currentPose.rl || 0, lerp);

        // Hands animation - now properly implemented
        if (leftHand.current && rightHand.current) {
            leftHand.current.rotation.z = THREE.MathUtils.lerp(leftHand.current.rotation.z, currentPose.lh || 0, lerp);
            rightHand.current.rotation.z = THREE.MathUtils.lerp(rightHand.current.rotation.z, currentPose.rh || 0, lerp);
            // Add some Y rotation for more natural hand positioning
            leftHand.current.rotation.y = THREE.MathUtils.lerp(leftHand.current.rotation.y, (currentPose.lh || 0) * 0.5, lerp);
            rightHand.current.rotation.y = THREE.MathUtils.lerp(rightHand.current.rotation.y, -(currentPose.rh || 0) * 0.5, lerp);
        }

        // Floating effect
        group.current.position.y = 0.95 + Math.sin(Date.now() * 0.001) * 0.05;
    });

    const skin = new THREE.MeshStandardMaterial({ color: 0xFCD5B5 });
    const cloth = new THREE.MeshStandardMaterial({ color: 0x4F46E5 });

    const createLimb = (upper, lower, joint, upW, lowW, withHand, handRef) => (
        <group>
            <mesh position={[0, -upper / 2, 0]}>
                <cylinderGeometry args={[upW, lowW, upper, 16]} />
                <meshStandardMaterial color={cloth.color} />
            </mesh>
            <mesh position={[0, -upper, 0]}>
                <sphereGeometry args={[joint, 16, 16]} />
                <meshStandardMaterial color={skin.color} />
            </mesh>
            <mesh position={[0, -upper - lower / 2, 0]}>
                <cylinderGeometry args={[lowW, lowW * 0.8, lower, 16]} />
                <meshStandardMaterial color={skin.color} />
            </mesh>
            {withHand && (
                <group ref={handRef} position={[0, -upper - lower, 0]}>
                    {/* Palm */}
                    <mesh>
                        <boxGeometry args={[0.15, 0.05, 0.12]} />
                        <meshStandardMaterial color={skin.color} />
                    </mesh>
                    {/* Fingers */}
                    <mesh position={[0, -0.025, 0.08]}>
                        <boxGeometry args={[0.12, 0.03, 0.04]} />
                        <meshStandardMaterial color={skin.color} />
                    </mesh>
                    {/* Thumb */}
                    <mesh position={[0.08, -0.01, 0.02]} rotation={[0, 0, Math.PI / 6]}>
                        <boxGeometry args={[0.03, 0.03, 0.06]} />
                        <meshStandardMaterial color={skin.color} />
                    </mesh>
                </group>
            )}
        </group>
    );

    const createFoot = () => (
        <group>
            {/* Foot base */}
            <mesh position={[0, -0.05, 0.1]}>
                <boxGeometry args={[0.12, 0.06, 0.2]} />
                <meshStandardMaterial color={skin.color} />
            </mesh>
            {/* Toes */}
            <mesh position={[0, -0.05, 0.18]}>
                <boxGeometry args={[0.1, 0.04, 0.06]} />
                <meshStandardMaterial color={skin.color} />
            </mesh>
        </group>
    );

    return (
        <group ref={group} position={[0, 0.95, 0]}>
            {/* Body */}
            <mesh position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.25, 0.15, 0.8, 16]} />
                <meshStandardMaterial color={cloth.color} />
            </mesh>

            {/* Hips */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <meshStandardMaterial color={cloth.color} />
            </mesh>

            {/* Neck + Head */}
            <mesh position={[0, 0.95, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
                <meshStandardMaterial color={skin.color} />
            </mesh>
            <mesh position={[0, 1.1, 0]}>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial color={skin.color} />
            </mesh>

            {/* Face features */}
            <mesh position={[0.08, 1.15, 0.15]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshStandardMaterial color={0x333333} />
            </mesh>
            <mesh position={[-0.08, 1.15, 0.15]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshStandardMaterial color={0x333333} />
            </mesh>

            {/* Arms with enhanced hands */}
            <group ref={leftArm} position={[0.3, 0.8, 0]}>
                {createLimb(0.4, 0.4, 0.08, 0.08, 0.06, true, leftHand)}
            </group>
            <group ref={rightArm} position={[-0.3, 0.8, 0]}>
                {createLimb(0.4, 0.4, 0.08, 0.08, 0.06, true, rightHand)}
            </group>

            {/* Legs with feet */}
            <group ref={leftLeg} position={[0.15, -0.1, 0]}>
                {createLimb(0.5, 0.45, 0.1, 0.1, 0.08)}
                <group position={[0, -0.95, 0]}>
                    {createFoot()}
                </group>
            </group>
            <group ref={rightLeg} position={[-0.15, -0.1, 0]}>
                {createLimb(0.5, 0.45, 0.1, 0.1, 0.08)}
                <group position={[0, -0.95, 0]}>
                    {createFoot()}
                </group>
            </group>
        </group>
    )
}

function Particles() {
    const pointsRef = useRef();
    const count = 3000;
    const positions = useRef(new Float32Array(count * 3).map(() => (Math.random() - 0.5) * 20));

    useFrame(() => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.001;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.02} color={0x818cf8} />
        </points>
    );
}

function Scene({ currentPose }) {
    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 10, 7.5]} intensity={1} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color={0x2d3748} metalness={0.1} roughness={0.8} />
            </mesh>
            <Particles />
            <Avatar currentPose={currentPose?.animation} />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </>
    )
}

const Aura = () => {
    const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
    const [bubble, setBubble] = useState("Welcome. I'm Aura. Let's find your center today.");
    const [chatInput, setChatInput] = useState("");
    const [streak, setStreak] = useState(getStreak());
    const [isPlaying, setIsPlaying] = useState(true);

    const currentPose = poses[currentPoseIndex];

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setCurrentPoseIndex(prev => (prev + 1) % poses.length);
            setBubble(`Next pose: ${poses[(currentPoseIndex + 1) % poses.length].name}`);
        }, 12000);
        return () => clearInterval(interval);
    }, [currentPoseIndex, isPlaying]);

    const handlePoseChange = (index) => {
        setCurrentPoseIndex(index);
        setBubble(`Next pose: ${poses[index].name}`);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        setBubble(isPlaying ? "Sequence paused" : "Sequence resumed");
    };

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const SYSTEM_PROMPT = "You are Aura, a calm, wise, friendly 3D digital guide.";

    const handleSubmit = async e => {
        e?.preventDefault?.();
        if (!chatInput) return;
        setBubble("Thinking...");
        try {
            const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: chatInput }] }],
                    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
                })
            });
            const data = await res.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Let's focus on our breath for a moment.";
            setBubble(text);
        } catch (e) {
            console.error(e);
            setBubble("Connection issue. Focus on your breath.");
        }
        setChatInput("");
    };

    return (
        <div className="w-screen h-screen bg-gray-900 text-white relative overflow-hidden">
            <Canvas className="absolute top-0 left-0 w-full h-full">
                <Scene currentPose={currentPose} />
            </Canvas>

            <div className="absolute top-0 left-0 w-full h-full flex flex-col p-4 md:p-8 pointer-events-none">
                {/* Header */}
                <header className="w-full flex justify-between items-center pointer-events-auto">
                    <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">Aura</h1>
                    <div className="bg-white/20 backdrop-blur-md p-2 px-4 rounded-full">
                        <p className="font-medium">Daily Streak: {streak} 🔥</p>
                    </div>
                </header>

                {/* Pose Controls */}
                <div className="mt-4 flex flex-wrap gap-2 pointer-events-auto">
                    {poses.map((pose, index) => (
                        <button
                            key={index}
                            onClick={() => handlePoseChange(index)}
                            className={`px-3 py-1 rounded-full text-sm transition-all ${currentPoseIndex === index
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-white/20 hover:bg-white/30'
                                }`}
                        >
                            {pose.name}
                        </button>
                    ))}
                    <button
                        onClick={togglePlayPause}
                        className="px-3 py-1 rounded-full text-sm bg-green-500/80 hover:bg-green-600/80 transition-all"
                    >
                        {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                    </button>
                </div>

                {/* Bottom Section */}
                <div className="mt-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
                    {/* Pose Info */}
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg w-full md:w-1/3 max-w-md transition-all duration-500">
                        <h2 className="text-xl font-bold text-indigo-300">{currentPose.name}</h2>
                        <p className="text-gray-200 mt-2">{currentPose.instructions}</p>
                    </div>

                    {/* Chat Interface */}
                    <div className="w-full md:w-1/3 max-w-md bg-white/10 backdrop-blur-md rounded-lg p-4">
                        <div className="flex gap-2">
                            <input
                                value={chatInput}
                                onChange={e => setChatInput(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
                                className="w-full bg-transparent border-b-2 border-gray-400 focus:border-indigo-400 py-2 px-2 outline-none"
                                placeholder="Ask Aura anything..."
                            />
                            <button
                                onClick={handleSubmit}
                                className="bg-indigo-500 hover:bg-indigo-600 rounded-full px-4 py-2 transition-all"
                            >
                                Send
                            </button>
                        </div>
                        <div className="mt-3 bg-indigo-600/80 p-3 rounded-xl min-h-[60px] flex items-center">
                            {bubble}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aura;