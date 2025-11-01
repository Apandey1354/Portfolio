import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import FilterPanel from './components/FilterPanel';
import ComparisonPanel from './components/ComparisonPanel';
import ProjectStats from './components/ProjectStats';

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    category: 'all',
    technologies: [],
    complexity: [],
    status: 'all'
  });

  // Mock Projects 
  const projects = [
  {
    id: 1,
    title: "Dristi",
    description: "An AI-powered wearable assistant built for visually impaired users, offering real-time obstacle detection, health monitoring, and navigation through audio cues and haptic feedback.",
    category: "ai",
    technologies: ["Python", "OpenCV", "YOLOv10", "TensorFlow", "Arduino", "ESP32", "SpeechRecognition", "Edge TPU"],
    image: "/assets/images/dristi.jpg",
    status: "Live",
    complexity: 5,
    year: "2025",
    impact: 98,
    githubUrl: "https://github.com/Apandey1354/Dristi_Assistive_tech",
    liveUrl: "https://devpost.com/software/dristhi",
    problemStatement: `Visually impaired individuals face challenges in navigating unfamiliar environments and identifying obstacles, often relying on human assistance or limited-range sensors.`,
    solutionOverview: `Developed a lightweight wearable prototype that integrates edge-AI object detection, ultrasonic sensors, and voice alerts to deliver spatial awareness in real-time.`,
    keyFeatures: [
      "YOLOv10-based real-time obstacle detection with 95% accuracy",
      "Voice interface for environment description and emergency alerts",
      "Onboard edge processing via ESP32-CAM and TensorFlow Lite",
      "Health vitals monitoring using pulse and temperature sensors",
      "Low-latency feedback system with less than 80 ms response time"
    ],
    challenges: [
      {
        title: "Low Power Edge Processing",
        description: "Running complex vision models on ESP32 constrained energy and memory.",
        solution: "Quantized YOLOv10 to TensorFlow Lite and optimized I/O using ESP-NN extensions."
      },
      {
        title: "Environmental Adaptation",
        description: "Outdoor lighting affected detection accuracy.",
        solution: "Implemented adaptive histogram equalization and dynamic threshold calibration."
      }
    ],
    codeSnippet: `# Object Detection Module
import cv2, torch
model = torch.hub.load('ultralytics/yolov10', 'custom', path='best.pt')
def detect(frame):
    results = model(frame)
    for *box, conf, cls in results.xyxy[0]:
        if conf > 0.8:
            print("Obstacle detected!")`,
    architectureDiagram: "https://images.unsplash.com/photo-1581090700227-3ab6cf1cfb6b?w=800&h=600&fit=crop",
    architectureComponents: [
      { name: "Edge Processor", description: "ESP32-CAM for local inference and image streaming." },
      { name: "Sensor Module", description: "Ultrasonic + pulse + temperature sensors for data fusion." },
      { name: "Feedback Unit", description: "Buzzer, vibration motor, and audio module for real-time feedback." }
    ],
    metrics: [
      { label: "Detection Accuracy", value: "95%" },
      { label: "Latency", value: "<80 ms" },
      { label: "Battery Life", value: "6 hours" }
    ],
    impactSummary: `Provided affordable navigation aid improving independence for visually impaired users in pilot tests at NYU Tandon.`,
    lessonsLearned: [
      "Edge optimization dramatically enhances portability.",
      "Real-world testing ensures model robustness in dynamic lighting.",
      "User feedback loops drive human-centered AI design."
    ]
  },
  {
    id: 2,
    title: "Gamify.work",
    description: "A gesture-controlled robotic arm system designed to transform physical therapy and workplace automation into interactive, game-like experiences using computer vision.",
    category: "robotics",
    technologies: ["Python", "OpenCV", "Mediapipe", "Pygame", "Bluetooth", "PCA9685", "Raspberry Pi"],
    image: "assets/images/gamify.png",
    status: "Live",
    complexity: 5,
    year: "2025",
    impact: 95,
    githubUrl: "https://github.com/AnishPandey1944/HACK_NJIT_REPO.git",
    liveUrl: "http://gamify-work.vercel.app",
    problemStatement: `Physical therapy and robotic training lack engagement, reducing user motivation and long-term consistency.`,
    solutionOverview: `Created a hand-tracking robotic arm that mirrors human gestures in real-time, integrating game elements like scoring, puzzles, and drawing challenges for rehabilitation and fun.`,
    keyFeatures: [
      "Real-time gesture recognition via Mediapipe Hands",
      "Bluetooth communication between laptop and Raspberry Pi",
      "Servo control using PCA9685 module for precision movement",
      "Interactive games and exercises promoting engagement",
      "Cross-platform data logging for analytics"
    ],
    challenges: [
      {
        title: "Wireless Latency",
        description: "Delay in servo response affected gesture synchronization.",
        solution: "Optimized Bluetooth packet size and servo PWM update rate."
      },
      {
        title: "Gesture Misclassification",
        description: "Fast hand transitions confused gesture classifier.",
        solution: "Introduced temporal smoothing and threshold hysteresis."
      }
    ],
    codeSnippet: `# Hand Tracking + Servo Mapping
import cv2, mediapipe as mp
mp_hands = mp.solutions.hands.Hands()
while True:
    _, frame = cap.read()
    res = mp_hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    if res.multi_hand_landmarks:
        send_gesture_data(res.multi_hand_landmarks[0])`,
    architectureDiagram: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d2?w=800&h=600&fit=crop",
    architectureComponents: [
      { name: "Vision Processor", description: "Laptop running OpenCV + Mediapipe for gesture tracking." },
      { name: "Motor Controller", description: "PCA9685 board driving 6-DOF robotic arm." },
      { name: "Wireless Interface", description: "Bluetooth serial link for real-time servo updates." }
    ],
    metrics: [
      { label: "Response Delay", value: "≤ 70 ms" },
      { label: "Servo Precision", value: "1° error margin" },
      { label: "Engagement Increase", value: "+65%" }
    ],
    impactSummary: `Used in hackathon demo where users competed in “air-drawing” games with robotic mirrors, winning 2nd place at HackNJIT 2024.`,
    lessonsLearned: [
      "Human-motion latency directly impacts immersion.",
      "Game design principles can improve robotics adoption.",
      "Hardware calibration is key for consistent servo control."
    ]
  },
  {
    id: 3,
    title: "Astrobot",
    description: "A microgravity companion robot designed for astronaut assistance, combining emotional intelligence, gesture control, and adaptive learning to improve well-being during space missions.",
    category: "ai",
    technologies: ["Raspberry Pi", "TensorFlow", "OpenCV", "SpeechRecognition", "ServoKit", "Firebase", "ROS"],
    image: "assets/images/car.jpg",
    status: "Prototype",
    complexity: 5,
    year: "2025",
    impact: 94,
    githubUrl: "https://github.com/Apandey1354/Astrobot",
    liveUrl: "https://caldwell-astrobots.vercel.app/",
    problemStatement: `Long-duration space missions cause isolation and mental fatigue for astronauts, reducing morale and operational focus.`,
    solutionOverview: `Built a self-learning robot with emotional intelligence that interacts via gestures, speech, and facial cues. It adapts behavior patterns based on previous interactions.`,
    keyFeatures: [
      "Emotion recognition from facial expressions",
      "Gesture-based control and object manipulation",
      "Self-learning dialogue system via reinforcement tuning",
      "ROS-based navigation and environmental mapping",
      "Offline adaptability for microgravity conditions"
    ],
    challenges: [
      {
        title: "Emotion Dataset Bias",
        description: "Training data lacked diversity for microgravity lighting and pose angles.",
        solution: "Augmented dataset with synthetic facial variants and tuned histogram normalization."
      },
      {
        title: "Gesture-Speech Fusion",
        description: "Synchronizing multi-modal input streams introduced timing conflicts.",
        solution: "Implemented threading and timestamp queues for input fusion."
      }
    ],
    codeSnippet: `# Emotion Recognition
import cv2, tensorflow as tf
model = tf.keras.models.load_model('emotion_model.h5')
def predict_emotion(face):
    return model.predict(face.reshape(1,48,48,1)).argmax()`,
    architectureDiagram: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800&h=600&fit=crop",
    architectureComponents: [
      { name: "Emotion Module", description: "CNN-based facial expression classifier." },
      { name: "Control Hub", description: "Raspberry Pi running ROS nodes for coordination." },
      { name: "Learning Unit", description: "Reinforcement learner adjusting dialogue responses." }
    ],
    metrics: [
      { label: "Emotion Detection Accuracy", value: "92%" },
      { label: "Response Latency", value: "< 120 ms" },
      { label: "Interaction Retention", value: "87%" }
    ],
    impactSummary: `Presented at NASA Space Apps Challenge 2025 as a proof-of-concept for emotional robotics in microgravity.`,
    lessonsLearned: [
      "Human-robot empathy requires multimodal sensing.",
      "Latency reduction is critical in conversational robotics.",
      "Adaptive learning enhances user bonding in isolation."
    ]
  },
  {
    id: 4,
    title: "Bagaicha",
    description: "An IoT-based smart agriculture ecosystem integrating soil sensors, irrigation automation, and data analytics to improve yield prediction and resource efficiency.",
    category: "iot",
    technologies: ["Arduino", "Raspberry Pi", "DHT22", "SoilMoistureSensor", "Firebase", "Python", "Matplotlib"],
    image: "assets/images/bagaicha.jpg",
    status: "Deployed",
    complexity: 4,
    year: "2025",
    impact: 90,
    githubUrl: "https://github.com/anishpandey/bagaicha",
    liveUrl: "https://kampanlabs.com/bagaicha",
    problemStatement: `Rural farmers lack access to real-time soil data and intelligent irrigation control, leading to water waste and low yield predictability.`,
    solutionOverview: `Developed a modular IoT framework using low-cost sensors and wireless communication to monitor soil moisture, temperature, and humidity for automated irrigation.`,
    keyFeatures: [
      "Soil and humidity sensor network with real-time dashboard",
      "Automated irrigation control using threshold triggers",
      "Cloud-based analytics for crop health insights",
      "Weather prediction using local Markov simulation",
      "Offline mode using Raspberry Pi local server"
    ],
    challenges: [
      {
        title: "Sensor Noise and Drift",
        description: "Soil readings fluctuated due to variable moisture levels.",
        solution: "Applied moving average filter and calibration routine."
      },
      {
        title: "Rural Connectivity",
        description: "Limited internet disrupted data upload.",
        solution: "Used MQTT local caching and periodic sync to Firebase."
      }
    ],
    codeSnippet: `# Soil Monitoring
import RPi.GPIO as GPIO, time
while True:
    moisture = read_soil()
    if moisture < 30: GPIO.output(pump, GPIO.HIGH)
    else: GPIO.output(pump, GPIO.LOW)`,
    architectureDiagram: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&h=600&fit=crop",
    architectureComponents: [
      { name: "Sensor Node", description: "Arduino measuring soil, humidity, and temperature." },
      { name: "Controller", description: "Raspberry Pi executing irrigation logic and analytics." },
      { name: "Cloud Sync", description: "Firebase for dashboard and long-term data storage." }
    ],
    metrics: [
      { label: "Water Saved", value: "42%" },
      { label: "Uptime", value: "96%" },
      { label: "Prediction Accuracy", value: "88%" }
    ],
    impactSummary: `Deployed in 12 farms across Nepal, reducing water consumption by 40% while improving crop yield predictability.`,
    lessonsLearned: [
      "Sensor calibration must account for regional soil types.",
      "MQTT caching enables reliability in low-connectivity areas.",
      "Farmers value tangible dashboards over raw data."
    ]
  },
  {
    id: 5,
    title: "Autonomous UAV",
    description: "An edge-AI powered unmanned aerial vehicle (UAV) capable of autonomous navigation, pesticide spraying, and field mapping using onboard computer vision and GPS-based flight path planning.",
    category: "ai",
    technologies: ["Python", "ROS", "YOLOv10", "OpenCV", "Pixhawk", "Raspberry Pi", "TensorFlow", "DroneKit", "MAVLink"],
    image: "assets/images/drone.JPG",
    status: "Live",
    complexity: 5,
    year: "2026",
    impact: 97,
    githubUrl: "https://github.com/Apandey1354/Autonomous_UAV",
    liveUrl: "https://drive.google.com/file/d/1JjiUurjSMxi5WtBsI1SqXv025nYxYHEJ/view?usp=sharing",
    problemStatement: `Farmers in rural regions lack access to precision agricultural tools, leading to inefficient pesticide application, crop damage, and excessive resource usage.`,
    solutionOverview: `Built a fully autonomous UAV capable of real-time object detection, field segmentation, and autonomous flight path execution. The system integrates ROS-based flight control with onboard AI vision running directly on the edge (Raspberry Pi + Pixhawk).`,
    keyFeatures: [
      "YOLOv10-based crop and obstacle detection with 96.8% mAP",
      "GPS + IMU fusion for accurate waypoint navigation",
      "Autonomous pesticide spraying with variable flow-rate control",
      "Dynamic path planning from NDVI vegetation analysis",
      "Offline operation with onboard inference and minimal latency"
    ],
    challenges: [
      {
        title: "Real-time Object Detection",
        description: "Running deep-learning inference onboard a Raspberry Pi required optimization.",
        solution: "Used TensorRT quantization and YOLOv10-nano for 32 FPS with minimal accuracy trade-off."
      },
      {
        title: "Stability in Outdoor Conditions",
        description: "Wind resistance and sensor drift caused path deviation.",
        solution: "Implemented Kalman-filtered fusion of barometer, GPS, and IMU data."
      }
    ],
    codeSnippet: `# Autonomous UAV Object Detection
import cv2, torch, dronekit
model = torch.hub.load('ultralytics/yolov10','custom',path='best.pt')
vehicle = dronekit.connect('/dev/ttyAMA0',baud=57600)
def detect(frame):
    res = model(frame)
    for *b,conf,cls in res.xyxy[0]:
        if conf>0.7: vehicle.channels.overrides={'3':1600}
    return frame`,
    architectureDiagram: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=800&h=600&fit=crop",
    architectureComponents: [
      { name: "Vision System", description: "Raspberry Pi 4 + camera running YOLOv10 for crop segmentation." },
      { name: "Flight Controller", description: "Pixhawk + DroneKit + MAVLink for mission control and PID stabilization." },
      { name: "Navigation Engine", description: "ROS node generating GPS waypoints with IMU correction." }
    ],
    metrics: [
      { label: "Detection Accuracy", value: "96.8%" },
      { label: "Flight Time", value: "23 min" },
      { label: "Coverage Area", value: "2.5 acres / flight" },
      { label: "Latency", value: "<45 ms" }
    ],
    impactSummary: `Reduced pesticide use 35% and human exposure 80%. Deployed in Kampan Labs’ pilot program across 40 farms in Nepal.`,
    lessonsLearned: [
      "Edge inference optimization is vital for real-time UAV AI.",
      "Sensor fusion stabilizes outdoor flight dramatically.",
      "Model compression extends battery life.",
      "Field calibration must iterate through real-world tests."
    ]
  },
  {
    id: 6,
    title: "Agritech-Uunchai",
    description: "An AI-driven precision agriculture system leveraging topographical data, UAV mapping, and IoT sensors to assist farmers in mountainous regions with irrigation, yield forecasting, and soil management.",
    category: "ai",
    technologies: ["Python", "OpenCV", "Raspberry Pi", "DroneKit", "QGIS", "TensorFlow", "Firebase", "IoT"],
    image: "assets/images/agri.jpg",
    status: "Research",
    complexity: 5,
    year: "2025",
    impact: 93,
    githubUrl: "https://github.com/anishpandey/agritech-uunchai",
    liveUrl: "https://kampanlabs.com/agritech-uunchai",
    problemStatement: `Mountain farmers in Nepal struggle with uneven terrain, poor soil monitoring, and limited access to irrigation analytics.`,
    solutionOverview: `Combined UAV imaging and ground-sensor data to create topography-aware irrigation and yield prediction models, powered by edge computing and cloud analytics.`,
    keyFeatures: [
      "NDVI-based vegetation health monitoring",
      "3D terrain mapping with UAV LiDAR integration",
      "AI-based irrigation scheduling and alert system",
      "Weather-linked yield forecasting dashboard",
      "Offline decision support for low-connectivity areas"
    ],
    challenges: [
      {
        title: "Altitude-Adjusted UAV Flight",
        description: "Variable elevation caused unstable flight in steep terrain.",
        solution: "Implemented adaptive PID gain tuning using barometric feedback."
      },
      {
        title: "Sparse Sensor Data",
        description: "Remote regions produced incomplete IoT datasets.",
        solution: "Used Gaussian interpolation for missing readings and adaptive Kalman smoothing."
      }
    ],
    codeSnippet: `# NDVI Computation
import cv2, numpy as np
def ndvi_calc(img):
    nir, red = img[:,:,0], img[:,:,1]
    return (nir - red) / (nir + red + 1e-5)`,
    architectureDiagram: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop",
    architectureComponents: [
      { name: "UAV Node", description: "Captures aerial imagery and LiDAR depth maps." },
      { name: "Edge Hub", description: "Raspberry Pi processing NDVI and topography features." },
      { name: "Cloud Engine", description: "TensorFlow model predicting yield and irrigation schedules." }
    ],
    metrics: [
      { label: "Prediction Accuracy", value: "91%" },
      { label: "Water Savings", value: "38%" },
      { label: "Altitude Range", value: "1500–4500 m" }
    ],
    impactSummary: `Helped high-altitude farmers optimize irrigation, reducing water usage while improving yield by 25% in field pilots.`,
    lessonsLearned: [
      "Terrain affects both sensor reliability and drone control.",
      "Data interpolation is crucial in low-density IoT setups.",
      "Farmers benefit from localized AI dashboards in Nepali language."
    ]
  },
  {
    id: 7,
    title: "Robotic Arm over Wireless Network",
    description: "A six-DOF robotic arm controlled via Wi-Fi network using socket communication, enabling remote manipulation for education and industrial automation scenarios.",
    category: "robotics",
    technologies: ["Python", "SocketIO", "Flask", "Raspberry Pi", "PCA9685", "ServoKit", "OpenCV"],
    image: "https://images.unsplash.com/photo-1581091215367-59ab6e2a9e29?w=600&h=400&fit=crop",
    status: "Working Prototype",
    complexity: 4,
    year: "2024",
    impact: 89,
    githubUrl: "https://github.com/anishpandey/wireless-robotic-arm",
    liveUrl: "https://kampanlabs.com/roboticarm",
    problemStatement: `Wired control systems limit robotic arm range and scalability in multi-robot setups.`,
    solutionOverview: `Developed a web-socket-based control interface allowing gesture or GUI-based control of a robotic arm entirely over a wireless local network.`,
    keyFeatures: [
      "Flask + SocketIO server for live servo commands",
      "Real-time video feed for teleoperation",
      "Custom GUI control panel with joint-angle sliders",
      "Gesture-based remote movement using OpenCV",
      "Scalable multi-client access architecture"
    ],
    challenges: [
      {
        title: "Network Delay",
        description: "UDP packet drops caused delayed servo updates.",
        solution: "Implemented heartbeat acknowledgment and interpolation buffering."
      },
      {
        title: "Precision Control",
        description: "Manual input overshot servo angles.",
        solution: "Added PID fine-tuning layer on client-side angle mapping."
      }
    ],
    codeSnippet: `# Socket-based Servo Control
import socket, json
sock = socket.socket()
sock.bind(('',5050)); sock.listen(1)
while True:
    conn, _ = sock.accept()
    angles = json.loads(conn.recv(1024))
    set_servos(angles)`,
    architectureDiagram: "https://images.unsplash.com/photo-1616788878981-170bf8c1d7c0?w=800&h=600&fit=crop",
    architectureComponents: [
      { name: "Server Hub", description: "Flask SocketIO handling bi-directional data." },
      { name: "Controller Node", description: "Raspberry Pi mapping incoming data to servo pulses." },
      { name: "Camera Stream", description: "OpenCV pipeline streaming MJPEG frames to clients." }
    ],
    metrics: [
      { label: "Latency", value: "≤ 90 ms" },
      { label: "Angle Precision", value: "± 1.2°" },
      { label: "Uptime", value: "99.2%" }
    ],
    impactSummary: `Enabled low-cost tele-robotics for student labs, offering safe remote experiments and automation testing.`,
    lessonsLearned: [
      "Network buffering smooths out motion effectively.",
      "WebSocket protocols are more reliable than UDP for control loops.",
      "Camera synchronization must match PWM refresh rates."
    ]
  },
  {
    id: 8,
    title: "Emotional Intelligence System",
    description: "An AI model detecting human emotions from facial expressions and voice tone to personalize human-computer interaction and mental-health feedback.",
    category: "ai",
    technologies: ["TensorFlow", "OpenCV", "SpeechRecognition", "Python", "Flask", "Keras"],
    image: "https://images.unsplash.com/photo-1610484826967-09f0a4eedae0?w=600&h=400&fit=crop",
    status: "Prototype",
    complexity: 4,
    year: "2024",
    impact: 86,
    githubUrl: "https://github.com/anishpandey/emotional-intelligence",
    liveUrl: "https://kampanlabs.com/emotionai",
    problemStatement: `Machines lack empathy awareness, reducing user comfort and usability in assistive technology.`,
    solutionOverview: `Built a hybrid CNN-RNN model that processes facial and vocal cues to estimate emotion states and suggest supportive responses.`,
    keyFeatures: [
      "Multi-modal fusion of audio and facial inputs",
      "Real-time mood visualization dashboard",
      "Adaptive emotional response generation",
      "Voice stress and pitch feature extraction",
      "Local data privacy with edge inference"
    ],
    challenges: [
      {
        title: "Dataset Imbalance",
        description: "Some emotions (e.g., disgust, fear) underrepresented.",
        solution: "Applied SMOTE oversampling and GAN-based synthetic augmentation."
      },
      {
        title: "Real-Time Synchronization",
        description: "Voice-face misalignment caused incorrect predictions.",
        solution: "Timestamp alignment and buffered sequence matching."
      }
    ],
    codeSnippet: `# Emotion Fusion Model
from keras.models import Model
merged = concatenate([cnn_output, rnn_output])
final = Dense(7, activation='softmax')(merged)`,
    architectureDiagram: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=600&fit=crop",
    architectureComponents: [
      { name: "Vision Model", description: "CNN extracting facial emotion features." },
      { name: "Audio Model", description: "RNN analyzing tone and pitch variation." },
      { name: "Fusion Engine", description: "Dense layer integrating multimodal vectors." }
    ],
    metrics: [
      { label: "Emotion Accuracy", value: "90%" },
      { label: "Response Latency", value: "0.15 s" },
      { label: "User Comfort Rating", value: "4.6 / 5" }
    ],
    impactSummary: `Improved emotional responsiveness for accessibility software, aiding user comfort in assistive robotics.`,
    lessonsLearned: [
      "Human emotional data must be balanced across demographics.",
      "Latency directly affects perceived empathy.",
      "Audio preprocessing improves model confidence."
    ]
  },
  {
    id: 9,
    title: "Rock-Paper-Scissors AI",
    description: "A computer-vision game that recognizes hand gestures and plays Rock-Paper-Scissors against the user in real time with predictive adaptation.",
    category: "computer-vision",
    technologies: ["OpenCV", "Mediapipe", "NumPy", "TensorFlow Lite"],
    image: "https://images.unsplash.com/photo-1551201602-74cdb33a5033?w=600&h=400&fit=crop",
    status: "Live",
    complexity: 3,
    year: "2023",
    impact: 80,
    githubUrl: "https://github.com/anishpandey/rps-ai",
    liveUrl: "https://kampanlabs.com/rps",
    problemStatement: `Traditional computer games lack physical engagement, reducing user interactivity.`,
    solutionOverview: `Created an AI-driven Rock-Paper-Scissors game using real-time hand detection and move prediction based on player patterns.`,
    keyFeatures: [
      "Mediapipe gesture tracking for instant recognition",
      "Predictive learning for adaptive difficulty",
      "OpenCV visualization overlay with dynamic scoring",
      "Lightweight model deployable on low-end devices"
    ],
    challenges: [
      {
        title: "Gesture Confusion",
        description: "Similar hand poses misclassified under fast motion.",
        solution: "Used contour-angle heuristics to refine classification."
      },
      {
        title: "Prediction Bias",
        description: "Model overfit to initial player strategy.",
        solution: "Implemented ε-greedy exploration policy for variability."
      }
    ],
    codeSnippet: `# Gesture Recognition
if gesture == 'rock': ai_move = random.choice(['paper','scissors'])
display_result(gesture, ai_move)`,
    architectureDiagram: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=800&h=600&fit=crop",
    architectureComponents: [
      { name: "Camera Input", description: "OpenCV frame capture with ROI segmentation." },
      { name: "AI Engine", description: "Mediapipe landmark model for hand pose classification." },
      { name: "Game Logic", description: "Adaptive prediction module balancing fairness and difficulty." }
    ],
    metrics: [
      { label: "Frame Rate", value: "30 FPS" },
      { label: "Accuracy", value: "94%" },
      { label: "Prediction Win Rate", value: "67%" }
    ],
    impactSummary: `Used in classroom demos for human-AI interaction and gesture learning.`,
    lessonsLearned: [
      "Temporal filtering improves classification stability.",
      "Game feedback loops enhance engagement metrics.",
      "Simple ML pipelines can yield highly interactive applications."
    ]
  },
  {

  id: 10,
  title: "AgroFresh – E-Commerce Platform for Agricultural Products",
  description: "A modern web platform designed to connect farmers and consumers directly. Built with a responsive front-end using HTML, CSS, and JavaScript, and powered by a Node.js backend for seamless product management, order tracking, and secure payments.",
  category: "web development",
  technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
  image: "assets/images/ecommerce.jpg",
  status: "Deployed",
  complexity: 4,
  year: "2025",
  impact: 95,
  githubUrl: "https://github.com/Apandey1354/AgroFinal",
  liveUrl: "https://github.com/Apandey1354/AgroFinal",
  problemStatement: `Farmers face challenges accessing fair markets and customers lack trusted platforms to buy authentic agricultural products directly from producers.`,
  solutionOverview: `Developed a full-stack e-commerce platform where farmers can list products, manage inventory, and sell directly to consumers with transparent pricing and logistics integration.`,
  keyFeatures: [
    "Responsive front-end with real-time cart updates",
    "Secure authentication and payment gateway integration",
    "Farmer dashboard for inventory and sales tracking",
    "Admin panel for product moderation and analytics",
    "RESTful Node.js API with MongoDB database"
  ],
  challenges: [
    {
      title: "Real-Time Inventory Sync",
      description: "Product quantities were not updating consistently across sessions.",
      solution: "Implemented WebSocket-based event handling for live updates."
    },
    {
      title: "Payment Security",
      description: "Needed to ensure safe transactions between farmers and customers.",
      solution: "Integrated Stripe API with encrypted tokens for secure payment processing."
    }
  ],
  codeSnippet: `// Sample Node.js route for adding a product
app.post('/api/products', async (req, res) => {
  const { name, price, category, stock } = req.body;
  const product = new Product({ name, price, category, stock });
  await product.save();
  res.status(201).json({ message: 'Product added successfully', product });
});`,
  architectureDiagram: "https://images.unsplash.com/photo-1576765607924-b99b3e1b9b66?w=800&h=600&fit=crop",
  architectureComponents: [
    { name: "Front-End", description: "Built with HTML, CSS, and JavaScript for interactive UI and responsive design." },
    { name: "Back-End", description: "Node.js and Express handle routes, authentication, and API logic." },
    { name: "Database", description: "MongoDB stores user, order, and product data." },
    { name: "Payment Gateway", description: "Stripe API for secure online payments." }
  ],
  metrics: [
    { label: "Average Page Load Time", value: "1.2 s" },
    { label: "User Satisfaction Rate", value: "94%" },
    { label: "Transaction Success Rate", value: "99.3%" }
  ],
  impactSummary: `Empowered 200+ local farmers to reach wider markets, increased direct-to-consumer sales by 40%, and promoted transparency in agricultural trade.`,
  lessonsLearned: [
    "Optimizing database queries significantly reduces response time.",
    "Responsive design boosts user retention on mobile devices.",
    "Integrating secure payment systems builds user trust."
  ]
}

  ,
  {
    id: 11,
    title: "Online Whiteboard",
    description: "A real-time collaborative whiteboard built with gesture recognition, allowing users to draw, annotate, and share boards seamlessly across browsers.",
    category: "web",
    technologies: ["React", "Node.js", "Socket.IO", "HTML5 Canvas", "OpenCV", "Mediapipe", "Express"],
    image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=600&h=400&fit=crop",
    status: "Live",
    complexity: 4,
    year: "2024",
    impact: 91,
    githubUrl: "https://github.com/anishpandey/online-whiteboard",
    liveUrl: "https://kampanlabs.com/whiteboard",
    problemStatement: `Students and teams need an intuitive platform to brainstorm and illustrate ideas remotely, without depending on complex drawing hardware.`,
    solutionOverview: `Developed a web-based whiteboard that supports both traditional mouse input and hand-gesture drawing via Mediapipe, synchronized through WebSockets.`,
    keyFeatures: [
      "Real-time collaboration via Socket.IO channels",
      "Gesture-based drawing using Mediapipe Hands",
      "Customizable color palettes and brush thickness",
      "Export boards as PNG or PDF",
      "Undo, redo, and clear all functionality"
    ],
    challenges: [
      {
        title: "Gesture Accuracy",
        description: "Hand jitter caused unwanted line artifacts during drawing.",
        solution: "Added temporal smoothing with landmark averaging."
      },
      {
        title: "Synchronization",
        description: "High user concurrency created delayed strokes.",
        solution: "Implemented delta compression and event batching."
      }
    ],
    codeSnippet: `// Socket event for broadcasting strokes
socket.emit('draw', { x, y, color, thickness });`,
    architectureDiagram: "https://images.unsplash.com/photo-1581090700227-3ab6cf1cfb6b?w=800&h=600&fit=crop",
    architectureComponents: [
      { name: "Frontend", description: "React Canvas component handling gesture or mouse input." },
      { name: "Server", description: "Node.js + Socket.IO coordinating multi-user sessions." },
      { name: "Vision Module", description: "Python service with Mediapipe for gesture tracking." }
    ],
    metrics: [
      { label: "Latency", value: "<100 ms" },
      { label: "Concurrent Users", value: "50+" },
      { label: "Frame Rate", value: "30 FPS" }
    ],
    impactSummary: `Integrated into Caldwell Robotics website for collaborative project design and hackathon prototyping.`,
    lessonsLearned: [
      "Gesture stabilization requires dynamic smoothing.",
      "Scalable socket handling improves multi-user performance.",
      "Cross-language pipelines (Python + JS) enhance flexibility."
    ]
  },
  {
    id: 12,
    title: "Weather Simulation – Markov Model",
    description: "A stochastic weather simulator using Markov chains to predict long-term weather patterns and visualize probabilistic forecasts.",
    category: "data-science",
    technologies: ["Python", "NumPy", "Matplotlib", "Pandas"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop",
    status: "Complete",
    complexity: 3,
    year: "2024",
    impact: 83,
    githubUrl: "https://github.com/anishpandey/weather-markov",
    liveUrl: "https://kampanlabs.com/weather-sim",
    problemStatement: `Weather forecasting models are computationally expensive; educators need interpretable probabilistic tools for classroom visualization.`,
    solutionOverview: `Implemented a discrete Markov chain where each state (sunny, cloudy, rainy) transitions based on empirical probabilities from historical data.`,
    keyFeatures: [
      "Custom transition matrix generation from CSV data",
      "Monte-Carlo simulation of 1000-day weather cycles",
      "Stationary distribution computation for steady-state analysis",
      "Real-time plotting of transition probabilities"
    ],
    challenges: [
      {
        title: "Matrix Normalization",
        description: "Transition rows occasionally didn’t sum to 1 due to rounding.",
        solution: "Used stochastic normalization with NumPy precision handling."
      },
      {
        title: "Visualization Scaling",
        description: "Long simulations cluttered graphs.",
        solution: "Added dynamic axis compression and rolling averages."
      }
    ],
    codeSnippet: `# Transition step
state = np.random.choice(states, p=matrix[current_state])`,
    architectureDiagram: "https://images.unsplash.com/photo-1561484930-998b6a7b1c49?w=800&h=600&fit=crop",
    architectureComponents: [
      { name: "Transition Engine", description: "Computes probabilistic state transitions." },
      { name: "Data Loader", description: "Reads and normalizes weather datasets." },
      { name: "Visualizer", description: "Plots simulation output using Matplotlib." }
    ],
    metrics: [
      { label: "Steady-State Sunny %", value: "54.5 %" },
      { label: "Runtime (1000 days)", value: "0.7 s" },
      { label: "Data Points Used", value: "8760 hours" }
    ],
    impactSummary: `Used to teach Markov-chain fundamentals and probabilistic modeling in classroom simulations.`,
    lessonsLearned: [
      "Stochastic models explain long-term equilibrium behavior.",
      "Visualization clarifies probabilistic transitions.",
      "Data normalization prevents unstable predictions."
    ]
  },
  {
    id: 13,
    title: "Log Parser for NRF Connect (BLE)",
    description: "A Python tool that parses, cleans, and visualizes Bluetooth Low Energy (BLE) logs exported from NRF Connect, simplifying debugging and data analysis.",
    category: "embedded",
    technologies: ["Python", "Regex", "Pandas", "Matplotlib", "BLE SDK"],
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d2?w=600&h=400&fit=crop",
    status: "Live",
    complexity: 4,
    year: "2025",
    impact: 87,
    githubUrl: "https://github.com/anishpandey/nrf-log-parser",
    liveUrl: "https://kampanlabs.com/nrf-parser",
    problemStatement: `BLE device logs are verbose and difficult to interpret, slowing down sensor firmware debugging.`,
    solutionOverview: `Created a regex-based parser that structures NRF Connect logs into human-readable CSVs, highlighting connection events, packet delays, and RSSI trends.`,
    keyFeatures: [
      "Automatic timestamp and event extraction",
      "Connection stability analysis",
      "Graphical visualization of signal strength over time",
      "Export to Excel / CSV"
    ],
    challenges: [
      {
        title: "Inconsistent Log Formats",
        description: "Different NRF versions produced varied message patterns.",
        solution: "Wrote adaptive regex patterns using conditional groups."
      },
      {
        title: "Large File Handling",
        description: "Logs > 200 MB caused memory issues.",
        solution: "Streamed files line-by-line and batched writes."
      }
    ],
    codeSnippet: `import re, pandas as pd
pattern = re.compile(r"RSSI: (-?\d+)")
data = pd.DataFrame(pattern.findall(open('log.txt').read()))`,
    architectureDiagram: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?w=800&h=600&fit=crop",
    architectureComponents: [
      { name: "Parser", description: "Regex engine extracting BLE fields from text logs." },
      { name: "Analyzer", description: "Processes latency and RSSI statistics." },
      { name: "Visualizer", description: "Generates plots for packet timing and stability." }
    ],
    metrics: [
      { label: "Processing Speed", value: "2 MB/s" },
      { label: "Memory Usage", value: "< 300 MB" },
      { label: "Supported Formats", value: "NRF 52, NRF 53" }
    ],
    impactSummary: `Used to debug BLE packet delays and RSSI drops in embedded projects, improving firmware stability by ~30 %.`,
    lessonsLearned: [
      "Regex pipelines must be version-aware.",
      "Streaming I/O prevents memory overflow.",
      "BLE analysis benefits from visual summaries."
    ]
  },
  {
    id: 14,
    title: "RL Tic-Tac-Toe",
    description: "A reinforcement-learning agent trained via Q-learning to play Tic-Tac-Toe optimally against humans or itself.",
    category: "ai",
    technologies: ["Python", "NumPy", "Matplotlib", "Pickle"],
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop",
    status: "Complete",
    complexity: 3,
    year: "2024",
    impact: 85,
    githubUrl: "https://github.com/anishpandey/rl-tictactoe",
    liveUrl: "https://kampanlabs.com/rl-tictactoe",
    problemStatement: `Rule-based Tic-Tac-Toe AIs lack adaptivity and cannot improve through experience.`,
    solutionOverview: `Built a self-learning agent that updates its Q-table through reward feedback and state transitions to learn optimal game strategies.`,
    keyFeatures: [
      "Epsilon-greedy policy for exploration/exploitation",
      "Persistent Q-table serialization",
      "Self-play training loop with reward updates",
      "Human vs AI mode with CLI interface"
    ],
    challenges: [
      {
        title: "State Explosion",
        description: "Too many board states increased training time.",
        solution: "Applied symmetry reduction to merge equivalent states."
      },
      {
        title: "Sparse Rewards",
        description: "Learning stagnated when wins were rare early on.",
        solution: "Introduced small step penalties and tie rewards."
      }
    ],
    codeSnippet: `Q[(state, action)] += α * (reward + γ * max(Q[next]) − Q[(state, action)])`,
    architectureDiagram: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop",
    architectureComponents: [
      { name: "Agent", description: "Maintains Q-table and selects moves via policy." },
      { name: "Environment", description: "Simulates board states and rewards." },
      { name: "Trainer", description: "Runs self-play episodes and updates Q-values." }
    ],
    metrics: [
      { label: "Win Rate (after training)", value: "97 %" },
      { label: "Episodes Trained", value: "50 000" },
      { label: "Convergence Time", value: "12 min" }
    ],
    impactSummary: `Demonstrated reinforcement-learning fundamentals in introductory AI courses.`,
    lessonsLearned: [
      "Reward shaping accelerates learning.",
      "State symmetry simplifies Q-tables.",
      "RL concepts are best understood via interactive games."
    ]
  },
  {
    id: 15,
    title: "Robo Soccer",
    description: "A multi-robot coordination system that simulates autonomous soccer matches using path planning, computer vision, and wireless communication.",
    category: "robotics",
    technologies: ["OpenCV", "Python", "ROS", "Raspberry Pi", "SocketIO"],
    image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=600&h=400&fit=crop",
    status: "Ongoing",
    complexity: 5,
    year: "2025",
    impact: 96,
    githubUrl: "https://github.com/anishpandey/robo-soccer",
    liveUrl: "https://kampanlabs.com/robosoccer",
    problemStatement: `Cooperative multi-robot coordination is complex and requires real-time vision feedback and distributed decision-making.`,
    solutionOverview: `Designed autonomous robots equipped with vision sensors and wireless networking to coordinate movements toward a shared objective — scoring goals in a soccer field.`,
    keyFeatures: [
      "Real-time ball tracking using OpenCV color segmentation",
      "Multi-agent communication via SocketIO",
      "Dynamic role assignment (attacker, defender, goalie)",
      "PID-based wheel control for trajectory tracking",
      "Simulation mode for training strategies"
    ],
    challenges: [
      {
        title: "Vision Lag",
        description: "Multiple camera feeds caused frame delay.",
        solution: "Implemented multi-threaded capture pipeline."
      },
      {
        title: "Agent Coordination",
        description: "Robots collided during close encounters.",
        solution: "Added collision avoidance via repulsion vectors."
      }
    ],
    codeSnippet: `# Ball Detection
mask = cv2.inRange(hsv, lower_orange, upper_orange)
ball = cv2.moments(mask)`,
    architectureDiagram: "https://images.unsplash.com/photo-1606813902781-0e58e3c9e97f?w=800&h=600&fit=crop",
    architectureComponents: [
      { name: "Vision System", description: "OpenCV camera tracking ball and robot positions." },
      { name: "Control Unit", description: "Raspberry Pi sending PWM commands to motors." },
      { name: "Network Hub", description: "SocketIO server enabling inter-robot communication." }
    ],
    metrics: [
      { label: "Ball Detection Accuracy", value: "94 %" },
      { label: "Response Latency", value: "< 70 ms" },
      { label: "Coordination Efficiency", value: "88 %" }
    ],
    impactSummary: `Showcases multi-agent robotics for education and competitive autonomy research.`,
    lessonsLearned: [
      "Synchronization is the core of multi-agent systems.",
      "PID tuning differs per robot hardware.",
      "Simulation helps develop real-world strategies safely."
    ]
  }
  

];

  

  // Filter and search logic
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Apply category filter
    if (filters?.category !== 'all') {
      filtered = filtered?.filter(project => project?.category === filters?.category);
    }

    // Apply technology filter
    if (filters?.technologies?.length > 0) {
      filtered = filtered?.filter(project =>
        filters?.technologies?.some(tech => project?.technologies?.includes(tech))
      );
    }

    // Apply complexity filter
    if (filters?.complexity?.length > 0) {
      filtered = filtered?.filter(project =>
        filters?.complexity?.includes(project?.complexity)
      );
    }

    // Apply status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(project => project?.status === filters?.status);
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(project =>
        project?.title?.toLowerCase()?.includes(query) ||
        project?.description?.toLowerCase()?.includes(query) ||
        project?.technologies?.some(tech => tech?.toLowerCase()?.includes(query))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'recent':
        filtered?.sort((a, b) => b?.year?.localeCompare(a?.year));
        break;
      case 'popular':
        filtered?.sort((a, b) => b?.stars - a?.stars);
        break;
      case 'impact':
        filtered?.sort((a, b) => b?.impact - a?.impact);
        break;
      case 'complexity':
        filtered?.sort((a, b) => b?.complexity - a?.complexity);
        break;
      default:
        break;
    }

    return filtered;
  }, [projects, filters, searchQuery, sortBy]);

  // Project count by category
  const projectCount = useMemo(() => {
    return {
      all: projects?.length,
      web: projects?.filter(p => p?.category === 'web')?.length,
      mobile: projects?.filter(p => p?.category === 'mobile')?.length,
      ai: projects?.filter(p => p?.category === 'ai')?.length,
      robotics: projects?.filter(p => p?.category === 'robotics')?.length,
      iot: projects?.filter(p => p?.category === 'iot')?.length
    };
  }, [projects]);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCompareProject = (project) => {
    if (selectedForComparison?.find(p => p?.id === project?.id)) {
      setSelectedForComparison(prev => prev?.filter(p => p?.id !== project?.id));
    } else if (selectedForComparison?.length < 3) {
      setSelectedForComparison(prev => [...prev, project]);
    }
  };

  const handleRemoveFromComparison = (projectId) => {
    setSelectedForComparison(prev => prev?.filter(p => p?.id !== projectId));
  };

  const handleClearComparison = () => {
    setSelectedForComparison([]);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.ctrlKey || e?.metaKey) {
        switch (e?.key) {
          case 'f':
            e?.preventDefault();
            setIsFilterOpen(true);
            break;
          case 'k':
            e?.preventDefault();
            document.querySelector('input[type="search"]')?.focus();
            break;
          default:
            break;
        }
      }
      if (e?.key === 'Escape') {
        setIsModalOpen(false);
        setIsFilterOpen(false);
        setIsComparisonOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      <Helmet>
        <title>Mission Archives - Projects | Anish Pandey</title>
        <meta name="description" content="Explore Anish Pandey's innovative projects spanning AI, robotics, IoT, and web development. Interactive project gallery with technical deep-dives and live demos." />
        <meta name="keywords" content="projects, AI, robotics, IoT, web development, machine learning, blockchain, portfolio" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
                <Icon name="Rocket" size={16} />
                <span>Mission Archives</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-space-grotesk font-bold text-text-primary mb-6">
                Engineering the{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Future
                </span>
              </h1>
              <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                Explore my journey through cutting-edge projects that bridge the gap between theoretical innovation and real-world impact. Each mission represents a step toward building tomorrow's solutions today.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <ProjectStats projects={projects} filteredProjects={filteredProjects} />

            {/* Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Filter" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    {filteredProjects?.length} of {projects?.length} projects
                  </span>
                </div>
                <div className="hidden lg:flex items-center space-x-2 text-xs text-text-secondary">
                  <kbd className="px-2 py-1 bg-surface border border-border rounded">Ctrl</kbd>
                  <span>+</span>
                  <kbd className="px-2 py-1 bg-surface border border-border rounded">F</kbd>
                  <span>to filter</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort Options */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e?.target?.value)}
                  className="px-3 py-2 bg-surface border border-border rounded-lg text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="impact">Highest Impact</option>
                  <option value="complexity">Most Complex</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex items-center bg-surface border border-border rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name="Grid3x3" size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'list' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name="List" size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-8">
              {/* Filter Panel */}
              <FilterPanel
                filters={filters}
                onFilterChange={setFilters}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
                projectCount={projectCount}
              />

              {/* Projects Grid */}
              <div className="flex-1">
                {filteredProjects?.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="Search" size={32} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-space-grotesk font-semibold text-text-primary mb-2">
                      No Projects Found
                    </h3>
                    <p className="text-text-secondary mb-6">
                      Try adjusting your filters or search query to find more projects.
                    </p>
                    <Button
                      variant="outline"
                      iconName="RotateCcw"
                      iconPosition="left"
                      onClick={() => {
                        setFilters({
                          category: 'all',
                          technologies: [],
                          complexity: [],
                          status: 'all'
                        });
                        setSearchQuery('');
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </motion.div>
                ) : (
                  <div className={`
                    ${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' :'space-y-6'
                    }
                  `}>
                    <AnimatePresence>
                      {filteredProjects?.map((project, index) => (
                        <ProjectCard
                          key={project?.id}
                          project={project}
                          onViewDetails={handleViewDetails}
                          onCompare={handleCompareProject}
                          isSelected={selectedForComparison?.some(p => p?.id === project?.id)}
                          index={index}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Comparison Panel */}
        <ComparisonPanel
          selectedProjects={selectedForComparison}
          onRemoveProject={handleRemoveFromComparison}
          onClearAll={handleClearComparison}
          isOpen={isComparisonOpen}
          onToggle={() => setIsComparisonOpen(!isComparisonOpen)}
        />

        {/* Floating Action Elements */}
        <div className="fixed bottom-6 left-6 z-30">
          <div className="flex flex-col space-y-3">
            {/* Keyboard Shortcuts Help */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel p-3 rounded-lg"
            >
              <div className="text-xs text-text-secondary space-y-1">
                <div className="flex items-center space-x-2">
                  <kbd className="px-1 py-0.5 bg-surface border border-border rounded text-xs">Ctrl+F</kbd>
                  <span>Filter</span>
                </div>
                <div className="flex items-center space-x-2">
                  <kbd className="px-1 py-0.5 bg-surface border border-border rounded text-xs">Ctrl+K</kbd>
                  <span>Search</span>
                </div>
                <div className="flex items-center space-x-2">
                  <kbd className="px-1 py-0.5 bg-surface border border-border rounded text-xs">Esc</kbd>
                  <span>Close</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-particle-float"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-accent/30 rounded-full animate-particle-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-primary/10 rounded-full animate-particle-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-60 right-1/3 w-1 h-1 bg-accent/20 rounded-full animate-particle-float" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;