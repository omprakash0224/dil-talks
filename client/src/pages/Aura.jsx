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
            lh: 0, rh: 0
        },
        muscles: { legs: 0.3, core: 0.2, arms: 0.1 },
        wobbleIntensity: 0.1,
        breathingPattern: "Simple"
    },
    {
        name: "Upward Salute",
        instructions: "Raise arms overhead, reaching toward the sky with palms facing each other.",
        animation: {
            la: -Math.PI * 0.9, ra: -Math.PI * 0.9, ll: 0, rl: 0, lar: 0, rar: 0,
            lh: Math.PI / 6, rh: -Math.PI / 6
        },
        muscles: { legs: 0.3, core: 0.4, arms: 0.6 },
        wobbleIntensity: 0.15,
        breathingPattern: "4-7-8"
    },
    {
        name: "Warrior II",
        instructions: "Step feet wide apart, front knee bent, arms extended parallel to the floor.",
        animation: {
            la: Math.PI / 2, ra: Math.PI / 2, ll: Math.PI / 3, rl: -Math.PI / 6, lar: 0, rar: 0,
            lh: -Math.PI / 4, rh: Math.PI / 4
        },
        muscles: { legs: 0.8, core: 0.6, arms: 0.7 },
        wobbleIntensity: 0.25,
        breathingPattern: "Box Breathing"
    },
    {
        name: "Tree Pose",
        instructions: "Balance on one leg, place other foot on inner thigh, hands in prayer position.",
        animation: {
            la: -Math.PI / 3, ra: -Math.PI / 3, ll: 0, rl: Math.PI / 2, lar: Math.PI / 4, rar: -Math.PI / 4,
            lh: Math.PI / 2, rh: -Math.PI / 2
        },
        muscles: { legs: 0.9, core: 0.7, arms: 0.3 },
        wobbleIntensity: 0.4,
        breathingPattern: "Simple"
    },
    {
        name: "Downward Dog",
        instructions: "Form an inverted V-shape with hands and feet planted, hips lifted high.",
        animation: {
            la: -Math.PI / 2, ra: -Math.PI / 2, ll: -Math.PI / 4, rl: -Math.PI / 4, lar: 0, rar: 0,
            lh: 0, rh: 0
        },
        muscles: { legs: 0.6, core: 0.8, arms: 0.8 },
        wobbleIntensity: 0.2,
        breathingPattern: "4-7-8"
    },
    {
        name: "Cobra Pose",
        instructions: "Lie on belly, press palms down, lift chest while keeping hips grounded.",
        animation: {
            la: -Math.PI / 6, ra: -Math.PI / 6, ll: Math.PI / 6, rl: Math.PI / 6, lar: Math.PI / 8, rar: -Math.PI / 8,
            lh: -Math.PI / 4, rh: Math.PI / 4
        },
        muscles: { legs: 0.2, core: 0.6, arms: 0.7 },
        wobbleIntensity: 0.1,
        breathingPattern: "Simple"
    }
];

const breathingPatterns = {
    "4-7-8": { inhale: 4, hold: 7, exhale: 8 },
    "Box Breathing": { inhale: 4, hold: 4, exhale: 4, hold2: 4 },
    "Simple": { inhale: 4, exhale: 6 }
};

// Meditation Timer Component
function MeditationTimer({ isActive, duration, onComplete }) {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    onComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, onComplete]);

    useEffect(() => {
        setTimeLeft(duration);
    }, [duration]);

    if (!isActive) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Meditation Time</h3>
                <div className="text-6xl font-light mb-4">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <p className="text-gray-300">Focus on your breath and be present</p>
                <div className="mt-6 w-16 h-16 mx-auto rounded-full border-4 border-indigo-400 animate-pulse"></div>
            </div>
        </div>
    );
}

// Breathing Guide Component
function BreathingGuide({ pattern, isActive }) {
    const [phase, setPhase] = useState('inhale');
    const [timeInPhase, setTimeInPhase] = useState(0);
    const circleRef = useRef();

    const currentPattern = breathingPatterns[pattern] || breathingPatterns["Simple"];

    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setTimeInPhase(prev => {
                const maxTime = currentPattern[phase];
                if (prev >= maxTime) {
                    // Move to next phase
                    if (phase === 'inhale') {
                        setPhase(currentPattern.hold ? 'hold' : 'exhale');
                    } else if (phase === 'hold') {
                        setPhase('exhale');
                    } else if (phase === 'exhale') {
                        setPhase(currentPattern.hold2 ? 'hold2' : 'inhale');
                    } else if (phase === 'hold2') {
                        setPhase('inhale');
                    }
                    return 0;
                }
                return prev + 0.1;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isActive, phase, currentPattern]);

    const getPhaseText = () => {
        switch (phase) {
            case 'inhale': return 'Breathe In...';
            case 'hold': return 'Hold...';
            case 'exhale': return 'Breathe Out...';
            case 'hold2': return 'Hold...';
            default: return 'Breathe...';
        }
    };

    const getCircleScale = () => {
        const progress = timeInPhase / currentPattern[phase];
        if (phase === 'inhale') return 0.5 + (progress * 0.5);
        if (phase === 'exhale') return 1 - (progress * 0.5);
        return phase === 'hold' || phase === 'hold2' ? 1 : 0.5;
    };

    const getCircleColor = () => {
        switch (phase) {
            case 'inhale': return '#3B82F6'; // blue
            case 'hold': return '#8B5CF6'; // purple
            case 'exhale': return '#10B981'; // green
            case 'hold2': return '#F59E0B'; // amber
            default: return '#6B7280';
        }
    };

    if (!isActive) return null;

    return (
        <div className="fixed bottom-20 right-8 bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center z-40">
            <div className="text-lg font-medium mb-4">{getPhaseText()}</div>
            <div
                ref={circleRef}
                className="w-20 h-20 rounded-full border-4 transition-all duration-100 mx-auto"
                style={{
                    transform: `scale(${getCircleScale()})`,
                    borderColor: getCircleColor(),
                    backgroundColor: `${getCircleColor()}20`
                }}
            />
            <div className="text-sm text-gray-300 mt-2">{pattern}</div>
        </div>
    );
}

function Avatar({ currentPose, muscleHighlight, wobbleEnabled, breathingActive }) {
    const group = useRef();
    const bodyRef = useRef();
    const leftArm = useRef(), rightArm = useRef();
    const leftLeg = useRef(), rightLeg = useRef();
    const leftHand = useRef(), rightHand = useRef();

    // Wobble state
    const wobbleOffset = useRef({ x: 0, z: 0 });
    const wobbleTime = useRef(0);

    // Breathing state
    const breathingPhase = useRef(0);

    useFrame((state) => {
        if (!currentPose) return;
        const lerp = 0.05;
        const time = state.clock.elapsedTime;

        // Basic pose animations
        leftArm.current.rotation.x = THREE.MathUtils.lerp(leftArm.current.rotation.x, currentPose.la || 0, lerp);
        rightArm.current.rotation.x = THREE.MathUtils.lerp(rightArm.current.rotation.x, currentPose.ra || 0, lerp);
        leftArm.current.rotation.z = THREE.MathUtils.lerp(leftArm.current.rotation.z, currentPose.lar || 0, lerp);
        rightArm.current.rotation.z = THREE.MathUtils.lerp(rightArm.current.rotation.z, currentPose.rar || 0, lerp);

        leftLeg.current.rotation.x = THREE.MathUtils.lerp(leftLeg.current.rotation.x, currentPose.ll || 0, lerp);
        rightLeg.current.rotation.x = THREE.MathUtils.lerp(rightLeg.current.rotation.x, currentPose.rl || 0, lerp);

        if (leftHand.current && rightHand.current) {
            leftHand.current.rotation.z = THREE.MathUtils.lerp(leftHand.current.rotation.z, currentPose.lh || 0, lerp);
            rightHand.current.rotation.z = THREE.MathUtils.lerp(rightHand.current.rotation.z, currentPose.rh || 0, lerp);
            leftHand.current.rotation.y = THREE.MathUtils.lerp(leftHand.current.rotation.y, (currentPose.lh || 0) * 0.5, lerp);
            rightHand.current.rotation.y = THREE.MathUtils.lerp(rightHand.current.rotation.y, -(currentPose.rh || 0) * 0.5, lerp);
        }

        // Balance wobble effect
        if (wobbleEnabled && currentPose.wobbleIntensity > 0) {
            wobbleTime.current += 0.02;
            const intensity = currentPose.wobbleIntensity;

            // Random micro-movements
            wobbleOffset.current.x += (Math.random() - 0.5) * 0.001 * intensity;
            wobbleOffset.current.z += (Math.random() - 0.5) * 0.001 * intensity;

            // Damping to keep movements realistic
            wobbleOffset.current.x *= 0.98;
            wobbleOffset.current.z *= 0.98;

            // Clamp maximum wobble
            const maxWobble = intensity * 0.02;
            wobbleOffset.current.x = THREE.MathUtils.clamp(wobbleOffset.current.x, -maxWobble, maxWobble);
            wobbleOffset.current.z = THREE.MathUtils.clamp(wobbleOffset.current.z, -maxWobble, maxWobble);

            // Apply wobble with some natural sway
            group.current.rotation.x = wobbleOffset.current.z + Math.sin(wobbleTime.current * 0.5) * intensity * 0.01;
            group.current.rotation.z = wobbleOffset.current.x + Math.cos(wobbleTime.current * 0.7) * intensity * 0.008;
        }

        // Breathing animation
        if (breathingActive && bodyRef.current) {
            breathingPhase.current = Math.sin(time * 0.5) * 0.5 + 0.5; // 0 to 1
            const breathingScale = 1 + breathingPhase.current * 0.05;
            bodyRef.current.scale.y = breathingScale;
            bodyRef.current.scale.x = 1 + breathingPhase.current * 0.02;
        }

        // Base floating effect
        const baseY = 0.95 + Math.sin(time * 0.001) * 0.05;
        group.current.position.y = baseY;
    });

    const skin = new THREE.MeshStandardMaterial({ color: 0xFCD5B5 });
    const cloth = new THREE.MeshStandardMaterial({ color: 0x4F46E5 });

    // Muscle highlight materials
    const getMuscleHighlightMaterial = (bodyPart, baseMaterial) => {
        if (!muscleHighlight || !currentPose.muscles) return baseMaterial;

        const intensity = currentPose.muscles[bodyPart] || 0;
        if (intensity === 0) return baseMaterial;

        const highlightColor = new THREE.Color().setHSL(
            0.1 - (intensity * 0.1), // Red to orange based on intensity
            0.8,
            0.5 + (intensity * 0.3)
        );

        return new THREE.MeshStandardMaterial({
            color: baseMaterial.color,
            emissive: highlightColor,
            emissiveIntensity: intensity * 0.3
        });
    };

    const createLimb = (upper, lower, joint, upW, lowW, withHand, handRef, muscleGroup) => (
        <group>
            <mesh position={[0, -upper / 2, 0]}>
                <cylinderGeometry args={[upW, lowW, upper, 16]} />
                <primitive object={getMuscleHighlightMaterial(muscleGroup, cloth)} />
            </mesh>
            <mesh position={[0, -upper, 0]}>
                <sphereGeometry args={[joint, 16, 16]} />
                <primitive object={getMuscleHighlightMaterial(muscleGroup, skin)} />
            </mesh>
            <mesh position={[0, -upper - lower / 2, 0]}>
                <cylinderGeometry args={[lowW, lowW * 0.8, lower, 16]} />
                <primitive object={getMuscleHighlightMaterial(muscleGroup, skin)} />
            </mesh>
            {withHand && (
                <group ref={handRef} position={[0, -upper - lower, 0]}>
                    <mesh>
                        <boxGeometry args={[0.15, 0.05, 0.12]} />
                        <primitive object={getMuscleHighlightMaterial(muscleGroup, skin)} />
                    </mesh>
                    <mesh position={[0, -0.025, 0.08]}>
                        <boxGeometry args={[0.12, 0.03, 0.04]} />
                        <primitive object={getMuscleHighlightMaterial(muscleGroup, skin)} />
                    </mesh>
                    <mesh position={[0.08, -0.01, 0.02]} rotation={[0, 0, Math.PI / 6]}>
                        <boxGeometry args={[0.03, 0.03, 0.06]} />
                        <primitive object={getMuscleHighlightMaterial(muscleGroup, skin)} />
                    </mesh>
                </group>
            )}
        </group>
    );

    const createFoot = () => (
        <group>
            <mesh position={[0, -0.05, 0.1]}>
                <boxGeometry args={[0.12, 0.06, 0.2]} />
                <primitive object={getMuscleHighlightMaterial('legs', skin)} />
            </mesh>
            <mesh position={[0, -0.05, 0.18]}>
                <boxGeometry args={[0.1, 0.04, 0.06]} />
                <primitive object={getMuscleHighlightMaterial('legs', skin)} />
            </mesh>
        </group>
    );

    return (
        <group ref={group} position={[0, 0.95, 0]}>
            {/* Body with breathing animation */}
            <mesh ref={bodyRef} position={[0, 0.5, 0]}>
                <cylinderGeometry args={[0.25, 0.15, 0.8, 16]} />
                <primitive object={getMuscleHighlightMaterial('core', cloth)} />
            </mesh>

            {/* Hips */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.4, 0.2, 0.3]} />
                <primitive object={getMuscleHighlightMaterial('core', cloth)} />
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

            {/* Arms */}
            <group ref={leftArm} position={[0.3, 0.8, 0]}>
                {createLimb(0.4, 0.4, 0.08, 0.08, 0.06, true, leftHand, 'arms')}
            </group>
            <group ref={rightArm} position={[-0.3, 0.8, 0]}>
                {createLimb(0.4, 0.4, 0.08, 0.08, 0.06, true, rightHand, 'arms')}
            </group>

            {/* Legs */}
            <group ref={leftLeg} position={[0.15, -0.1, 0]}>
                {createLimb(0.5, 0.45, 0.1, 0.1, 0.08, false, null, 'legs')}
                <group position={[0, -0.95, 0]}>
                    {createFoot()}
                </group>
            </group>
            <group ref={rightLeg} position={[-0.15, -0.1, 0]}>
                {createLimb(0.5, 0.45, 0.1, 0.1, 0.08, false, null, 'legs')}
                <group position={[0, -0.95, 0]}>
                    {createFoot()}
                </group>
            </group>
        </group>
    );
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

function Scene({ currentPose, muscleHighlight, wobbleEnabled, breathingActive }) {
    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 10, 7.5]} intensity={1} />
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color={0x2d3748} metalness={0.1} roughness={0.8} />
            </mesh>
            <Particles />
            <Avatar
                currentPose={currentPose?.animation}
                muscleHighlight={muscleHighlight}
                wobbleEnabled={wobbleEnabled}
                breathingActive={breathingActive}
            />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </>
    );
}

const Aura = () => {
    const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
    const [bubble, setBubble] = useState("Welcome. I'm Aura. Let's find your center today.");
    const [chatInput, setChatInput] = useState("");
    const [streak, setStreak] = useState(getStreak());
    const [isPlaying, setIsPlaying] = useState(true);

    // New feature states
    const [meditationActive, setMeditationActive] = useState(false);
    const [meditationDuration, setMeditationDuration] = useState(60);
    const [breathingGuideActive, setBreathingGuideActive] = useState(false);
    const [muscleHighlight, setMuscleHighlight] = useState(false);
    const [wobbleEnabled, setWobbleEnabled] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const currentPose = poses[currentPoseIndex];

    useEffect(() => {
        if (!isPlaying || meditationActive) return;

        const interval = setInterval(() => {
            setCurrentPoseIndex(prev => {
                const nextIndex = (prev + 1) % poses.length;
                setBubble(`Next pose: ${poses[nextIndex].name}`);

                // Start meditation between poses (every 3rd pose)
                if (nextIndex % 3 === 0) {
                    setMeditationActive(true);
                    setBubble("Time for meditation. Find your inner peace.");
                }

                return nextIndex;
            });
        }, 12000);

        return () => clearInterval(interval);
    }, [isPlaying, meditationActive]);

    const handlePoseChange = (index) => {
        setCurrentPoseIndex(index);
        setBubble(`Next pose: ${poses[index].name}`);
    };

    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
        setBubble(isPlaying ? "Sequence paused" : "Sequence resumed");
    };

    const handleMeditationComplete = () => {
        setMeditationActive(false);
        setBubble("Meditation complete. Let's continue with our practice.");
    };

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const SYSTEM_PROMPT = "You are Aura, a calm, wise, friendly 3D digital yoga guide. Provide helpful, encouraging responses about yoga, breathing, meditation, and wellness.";

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
                <Scene
                    currentPose={currentPose}
                    muscleHighlight={muscleHighlight}
                    wobbleEnabled={wobbleEnabled}
                    breathingActive={breathingGuideActive}
                />
            </Canvas>

            {/* Meditation Timer */}
            <MeditationTimer
                isActive={meditationActive}
                duration={meditationDuration}
                onComplete={handleMeditationComplete}
            />

            {/* Breathing Guide */}
            <BreathingGuide
                pattern={currentPose?.breathingPattern || "Simple"}
                isActive={breathingGuideActive}
            />

            <div className="absolute top-0 left-0 w-full h-full flex flex-col p-4 md:p-8 pointer-events-none">
                {/* Header */}
                <header className="w-full flex justify-between items-center pointer-events-auto">
                    <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">Aura</h1>
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 backdrop-blur-md p-2 px-4 rounded-full">
                            <p className="font-medium">Daily Streak: {streak} 🔥</p>
                        </div>
                        <button
                            onClick={() => setSettingsOpen(!settingsOpen)}
                            className="bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition-all"
                        >
                            ⚙️
                        </button>
                    </div>
                </header>

                {/* Settings Panel */}
                {settingsOpen && (
                    <div className="mt-4 bg-white/10 backdrop-blur-md rounded-lg p-4 pointer-events-auto max-w-sm">
                        <h3 className="font-bold mb-3">Settings</h3>

                        <div className="space-y-3">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={breathingGuideActive}
                                    onChange={(e) => setBreathingGuideActive(e.target.checked)}
                                />
                                <span>Breathing Guide</span>
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={muscleHighlight}
                                    onChange={(e) => setMuscleHighlight(e.target.checked)}
                                />
                                <span>Muscle Highlights</span>
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={wobbleEnabled}
                                    onChange={(e) => setWobbleEnabled(e.target.checked)}
                                />
                                <span>Balance Wobble</span>
                            </label>

                            <div>
                                <label className="block text-sm mb-1">Meditation Duration</label>
                                <select
                                    value={meditationDuration}
                                    onChange={(e) => setMeditationDuration(parseInt(e.target.value))}
                                    className="bg-white/20 rounded px-2 py-1 text-sm w-full"
                                >
                                    <option value={30}>30 seconds</option>
                                    <option value={60}>1 minute</option>
                                    <option value={120}>2 minutes</option>
                                    <option value={300}>5 minutes</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Feature Controls */}
                <div className="mt-4 flex flex-wrap gap-2 pointer-events-auto">
                    <button
                        onClick={() => setMeditationActive(true)}
                        className="px-3 py-1 rounded-full text-sm bg-purple-500/80 hover:bg-purple-600/80 transition-all"
                    >
                        🧘 Meditate
                    </button>
                    <button
                        onClick={() => setBreathingGuideActive(!breathingGuideActive)}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${breathingGuideActive
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/20 hover:bg-white/30'
                            }`}
                    >
                        💨 Breathing
                    </button>
                </div>

                {/* Pose Controls */}
                <div className="mt-2 flex flex-wrap gap-2 pointer-events-auto">
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

                {/* Muscle Engagement Display */}
                {muscleHighlight && currentPose?.muscles && (
                    <div className="mt-4 bg-white/10 backdrop-blur-md rounded-lg p-3 pointer-events-auto max-w-sm">
                        <h4 className="font-bold mb-2 text-sm">Muscle Engagement</h4>
                        <div className="space-y-2">
                            {Object.entries(currentPose.muscles).map(([muscle, intensity]) => (
                                <div key={muscle} className="flex items-center gap-2">
                                    <span className="text-xs capitalize w-12">{muscle}:</span>
                                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${intensity * 100}%`,
                                                backgroundColor: `hsl(${120 - (intensity * 60)}, 70%, 50%)`
                                            }}
                                        />
                                    </div>
                                    <span className="text-xs">{Math.round(intensity * 100)}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Current Pose Info with Breathing Pattern */}
                <div className="mt-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 pointer-events-auto">
                    {/* Enhanced Pose Info */}
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg w-full md:w-1/3 max-w-md transition-all duration-500">
                        <div className="flex items-center gap-2 mb-2">
                            <h2 className="text-xl font-bold text-indigo-300">{currentPose.name}</h2>
                            {wobbleEnabled && currentPose.wobbleIntensity > 0.3 && (
                                <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">
                                    Balance Challenge
                                </span>
                            )}
                        </div>
                        <p className="text-gray-200 mt-2 text-sm">{currentPose.instructions}</p>

                        {breathingGuideActive && (
                            <div className="mt-3 pt-3 border-t border-white/20">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-blue-300">Breathing Pattern:</span>
                                    <span className="text-xs bg-blue-500/20 text-blue-200 px-2 py-1 rounded-full">
                                        {currentPose.breathingPattern}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Pose Benefits */}
                        <div className="mt-3 text-xs text-gray-300">
                            {currentPose.name === "Mountain Pose" && "Improves posture and balance"}
                            {currentPose.name === "Upward Salute" && "Energizes and stretches the body"}
                            {currentPose.name === "Warrior II" && "Builds strength and focus"}
                            {currentPose.name === "Tree Pose" && "Enhances balance and concentration"}
                            {currentPose.name === "Downward Dog" && "Full body strength and flexibility"}
                            {currentPose.name === "Cobra Pose" && "Opens chest and strengthens back"}
                        </div>
                    </div>

                    {/* Enhanced Chat Interface */}
                    <div className="w-full md:w-1/3 max-w-md bg-white/10 backdrop-blur-md rounded-lg p-4">
                        <div className="flex gap-2">
                            <input
                                value={chatInput}
                                onChange={e => setChatInput(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
                                className="w-full bg-transparent border-b-2 border-gray-400 focus:border-indigo-400 py-2 px-2 outline-none text-sm"
                                placeholder="Ask about poses, breathing, or meditation..."
                            />
                            <button
                                onClick={handleSubmit}
                                className="bg-indigo-500 hover:bg-indigo-600 rounded-full px-4 py-2 transition-all text-sm"
                            >
                                Send
                            </button>
                        </div>

                        {/* Enhanced Chat Bubble */}
                        <div className="mt-3 bg-indigo-600/80 p-3 rounded-xl min-h-[60px] flex items-center relative">
                            <div className="text-sm leading-relaxed">{bubble}</div>
                            {bubble === "Thinking..." && (
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="mt-3 flex flex-wrap gap-2">
                            <button
                                onClick={() => setChatInput("Tell me about this pose")}
                                className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-full transition-all"
                            >
                                About this pose
                            </button>
                            <button
                                onClick={() => setChatInput("Give me breathing tips")}
                                className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-full transition-all"
                            >
                                Breathing tips
                            </button>
                            <button
                                onClick={() => setChatInput("How to improve balance?")}
                                className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded-full transition-all"
                            >
                                Balance tips
                            </button>
                        </div>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-none">
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-4 py-2">
                        <div className="flex space-x-1">
                            {poses.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentPoseIndex
                                            ? 'bg-indigo-400 scale-125'
                                            : index < currentPoseIndex
                                                ? 'bg-green-400'
                                                : 'bg-gray-600'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-xs text-gray-300 ml-2">
                            {currentPoseIndex + 1} of {poses.length}
                        </span>
                    </div>
                </div>

                {/* Session Stats */}
                <div className="absolute top-20 right-4 bg-white/10 backdrop-blur-md rounded-lg p-3 pointer-events-none max-w-xs">
                    <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                            <span>Session Time:</span>
                            <span>{Math.floor(Date.now() / 1000 / 60) % 60} min</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Poses Completed:</span>
                            <span>{currentPoseIndex + 1}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Balance Difficulty:</span>
                            <span className="capitalize">
                                {currentPose.wobbleIntensity < 0.2 ? 'Easy' :
                                    currentPose.wobbleIntensity < 0.3 ? 'Medium' : 'Hard'}
                            </span>
                        </div>
                        {breathingGuideActive && (
                            <div className="flex justify-between">
                                <span>Breathing:</span>
                                <span className="text-blue-300">Active</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aura;