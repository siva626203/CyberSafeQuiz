import { QuizQuestion } from './quizData';

// "Introduction to Cyber Safety" - Generated Data
// 8 MCQ, 4 TF, 3 Scenario, 3 Puzzle (Scramble, Match, Fill), 2 Find Mistake, 1 Riddle

export const introQuestions: QuizQuestion[] = [
  // --- 8 MCQs ---
  {
    id: 1001,
    type: 'multiple-choice',
    question: "What is the 'Digital Footprint'?",
    options: [
      "The physical weight of your computer",
      "The trail of data you leave behind while using the internet",
      "A type of shoe for hackers",
      "A virus that tracks your steps"
    ],
    correctAnswer: 1,
    explanation: "Your digital footprint is the record of your online activities, including social media posts, browsing history, and shared data.",
    category: "Data Protection",
    difficulty: "beginner"
  },
  {
    id: 1002,
    type: 'multiple-choice',
    question: "Which of these is the safest way to store passwords?",
    options: [
      "Write them on a sticky note",
      "Save them in a text file on your desktop",
      "Use a reputable Password Manager",
      "Use the same password for everything"
    ],
    correctAnswer: 2,
    explanation: "Password managers encrypt and store your passwords securely, so you only need to remember one master password.",
    category: "Passwords",
    difficulty: "beginner"
  },
  {
    id: 1003,
    type: 'multiple-choice',
    question: "What should you do before downloading a mobile app?",
    options: [
      "Check the reviews and permissions",
      "Download it only if it's free",
      "Ask a friend if it looks cool",
      "Click the first link on Google"
    ],
    correctAnswer: 0,
    explanation: "Always check user reviews and requested permissions (e.g., access to contacts/camera) to ensure the app is legitimate and respects privacy.",
    category: "Safe Browsing",
    difficulty: "beginner"
  },
  {
    id: 1004,
    type: 'multiple-choice',
    question: "What does a padlock icon in the browser address bar mean?",
    options: [
      "The website is closed",
      "The website is encrypted (HTTPS)",
      "You cannot leave the page",
      "The website has a virus"
    ],
    correctAnswer: 1,
    explanation: "The padlock indicates the site uses HTTPS encryption, making it safer to send data like passwords or credit card numbers.",
    category: "Safe Browsing",
    difficulty: "beginner"
  },
  {
    id: 1005,
    type: 'multiple-choice',
    question: "Which information is safe to share publicly on social media?",
    options: [
      "Your home address",
      "Your favorite hobby",
      "Your phone number",
      "Your school schedule"
    ],
    correctAnswer: 1,
    explanation: "Hobbies are generally safe to share. Sensitive info like address, phone number, or location schedules can be used by stalkers or scammers.",
    category: "Social Engineering",
    difficulty: "beginner"
  },
  {
    id: 1006,
    type: 'multiple-choice',
    question: "What is 'Cyberbullying'?",
    options: [
      "Playing video games online",
      "Using technology to harass, threaten, or target another person",
      "Writing code to fix bugs",
      "Sharing funny memes"
    ],
    correctAnswer: 1,
    explanation: "Cyberbullying involves repeated hostile behavior online intended to harm others. It is a serious issue with legal consequences.",
    category: "Social Engineering",
    difficulty: "beginner"
  },
  {
    id: 1007,
    type: 'multiple-choice',
    question: "If you receive a suspicious link from a friend, what should you do?",
    options: [
      "Click it immediately",
      "Ignore it",
      "Contact the friend through another method to verify",
      "Forward it to others"
    ],
    correctAnswer: 2,
    explanation: "Accounts can be hacked. If a friend sends a weird link, verify it with them via call or text before clicking.",
    category: "Phishing",
    difficulty: "beginner"
  },
  {
    id: 1008,
    type: 'multiple-choice',
    question: "Why are software updates important?",
    options: [
      "They make the screen brighter",
      "They patch security holes and fix bugs",
      "They delete your data",
      "They are not important"
    ],
    correctAnswer: 1,
    explanation: "Updates often contain security patches that fix vulnerabilities hackers could exploit.",
    category: "System Security",
    difficulty: "beginner"
  },

  // --- 4 True/False ---
  {
    id: 2001,
    type: 'true-false',
    question: "Incognito mode makes you invisible to the internet.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. Incognito mode only prevents your browser from saving history. Your ISP and websites can still track you.",
    category: "Safe Browsing",
    difficulty: "intermediate"
  },
  {
    id: 2002,
    type: 'true-false',
    question: "You should cover your webcam when not in use.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "True. Hackers can use malware (RATs) to access webcams. A physical cover provides 100% protection.",
    category: "System Security",
    difficulty: "beginner"
  },
  {
    id: 2003,
    type: 'true-false',
    question: "Public Wi-Fi at a coffee shop is always safe.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. Public Wi-Fi is often unencrypted. Hackers can intercept data. Use a VPN if you must connect.",
    category: "Network Security",
    difficulty: "beginner"
  },
  {
    id: 2004,
    type: 'true-false',
    question: "Deleting a photo from social media removes it from the internet forever.",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "False. Once posted, content can be screenshotted or archived by others. The internet is permanent.",
    category: "Data Protection",
    difficulty: "intermediate"
  },

  // --- 3 Scenario-based ---
  {
    id: 3001,
    type: 'scenario',
    question: "A stranger messages you on Instagram offering a modeling contract but asks for photos first.",
    scenarioText: "User 'TalentScout_99' sends a DM: 'Hey! You have a great look. We want to sign you. Send 3 full-body pics and your address for the contract.'",
    options: [
      "Send the photos, it's a great opportunity",
      "Block and report the user",
      "Ask for their office address first",
      "Give a fake address"
    ],
    correctAnswer: 1,
    explanation: "Legitimate agencies do not solicit random minors on Instagram for photos/addresses. This is likely a predator or scam. Block and report.",
    category: "Social Engineering",
    difficulty: "intermediate"
  },
  {
    id: 3002,
    type: 'scenario',
    question: "You are playing an online game and a player asks to trade items but wants your password.",
    scenarioText: "Player 'ProGamer' says: 'I can duplicate your rare sword. Just give me your login details for 5 mins.'",
    options: [
      "Give the password, you want the item",
      "Give the password but change it later",
      "Refuse and report the player",
      "Ask them to prove it first"
    ],
    correctAnswer: 2,
    explanation: "Admins or legit players never need your password. This is a scam to steal your account.",
    category: "Passwords",
    difficulty: "beginner"
  },
  {
    id: 3003,
    type: 'scenario',
    question: "You win a free iPhone in a pop-up ad.",
    scenarioText: "A colorful wheel spins and lands on 'iPhone 15'. It asks for your credit card to pay $1 for shipping.",
    options: [
      "Pay the $1, it's a cheap iPhone",
      "Enter your parents' card details",
      "Close the tab immediately",
      "Share the link with friends"
    ],
    correctAnswer: 2,
    explanation: "If it sounds too good to be true, it is. This is a phishing scam to steal credit card info.",
    category: "Phishing",
    difficulty: "beginner"
  },

  // --- 3 Puzzle-style Activities ---
  // A) Word Scramble
  {
    id: 4001,
    type: 'puzzle',
    question: "Unscramble the term:",
    puzzleData: "E R A W S M O N A R", // RANSOMWARE
    options: [
      "SPYWARE",
      "RANSOMWARE",
      "SHAREWARE",
      "FIRMWARE"
    ],
    correctAnswer: 1,
    explanation: "Ransomware is malware that locks your files until you pay a fee (ransom).",
    category: "Malware",
    difficulty: "advanced"
  },

  // B) Match Pairs (Simplified as MCQ for now, or distinct type if engine supports)
  // Let's try to simulate Match Pairs as a specific Puzzle variation
  {
    id: 4002,
    type: 'multiple-choice', // Fallback to MC for robustness, but styled as "Select the correct match"
    question: "Which term matches the definition: 'Malicious software designed to harm your device'?",
    options: [
      "Firewall",
      "Encryption",
      "Malware",
      "Backup"
    ],
    correctAnswer: 2,
    explanation: "Malware (Malicious Software) includes viruses, worms, and trojans designed to cause harm.",
    category: "Malware",
    difficulty: "beginner"
  },

  // C) Fill in the blanks
  {
    id: 4003,
    type: 'puzzle',
    question: "Complete the sentence:",
    puzzleData: "To prevent data loss, you should always ___ your important files.", // BACKUP
    options: [
      "DELETE",
      "SHARE",
      "BACKUP",
      "DOWNLOAD"
    ],
    correctAnswer: 2,
    explanation: "Backups create copies of your data so you can restore it if your device is lost or infected.",
    category: "Data Protection",
    difficulty: "beginner"
  },

  // --- 2 Find the Mistake (Visual Scenario) ---
  {
    id: 5001,
    type: 'scenario', // Using scenario with specific text format for visual
    question: "Identify the unsafe action in this post.",
    scenarioText: "Social Media Post by Arun: 'Going on vacation to Hawaii for 2 weeks! House will be empty. So excited! ✈️🏠'",
    options: [
      "Posting about a vacation",
      "Using emojis",
      "Announcing the house is empty",
      "Sharing excitement"
    ],
    correctAnswer: 2,
    explanation: "Announcing your house is empty invites burglars. Post vacation photos AFTER you return.",
    category: "Social Engineering",
    difficulty: "intermediate"
  },
  {
    id: 5002,
    type: 'scenario',
    question: "What is wrong with this email?",
    scenarioText: "From: support@g00gle-security.com | Subject: Account Alert | Body: 'Click here to verify password.'",
    options: [
      "The subject line",
      "The sender address (g00gle)",
      "The font size",
      "The verify request"
    ],
    correctAnswer: 1,
    explanation: "The sender domain 'g00gle-security.com' is a typo-squatting attempt (using 0 instead of o). Official emails come from the real domain.",
    category: "Phishing",
    difficulty: "intermediate"
  },

  // --- 1 Riddle ---
  {
    id: 6001,
    type: 'puzzle',
    question: "WHO AM I?",
    puzzleData: "I have keys but open no locks. I have space but no room. You can enter, but never go outside.",
    options: [
      "A Computer",
      "The Internet",
      "A Keyboard",
      "A Password"
    ],
    correctAnswer: 2,
    explanation: "A Keyboard! (Keys, Space bar, Enter key).",
    category: "System Security",
    difficulty: "intermediate"
  }
];
