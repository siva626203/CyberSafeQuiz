export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Category = 'Passwords' | 'Phishing' | 'Safe Browsing' | 'Network Security' | 'Data Protection' | 'Malware' | 'Social Engineering' | 'Authentication' | 'System Security';
export type QuestionType = 'multiple-choice' | 'true-false' | 'image-identification' | 'scenario' | 'puzzle';

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: Category;
  difficulty: Difficulty;
  imageUrl?: string;
  scenarioText?: string;
  puzzleData?: string; // For scrambled words or cipher text
}

export const allQuestions: QuizQuestion[] = [
  // --- LEVEL 1: NOVICE (True/False & Basic MC) ---
  {
    id: 1,
    type: 'multiple-choice',
    question: "What makes a strong password?",
    options: [
      "Your birthday and name",
      "A mix of uppercase, lowercase, numbers, and symbols",
      "The word 'password123'",
      "Your pet's name"
    ],
    correctAnswer: 1,
    explanation: "Strong passwords use a combination of uppercase letters, lowercase letters, numbers, and special symbols. They should be at least 12 characters long and avoid personal information.",
    category: "Passwords",
    difficulty: "beginner"
  },
  {
    id: 101,
    type: 'true-false',
    question: "Is 'password123' considered a strong password?",
    options: ["True", "False"],
    correctAnswer: 1,
    explanation: "'password123' is one of the most common passwords and can be cracked instantly. A strong password should be unique, long, and complex.",
    category: "Passwords",
    difficulty: "beginner"
  },
  {
    id: 2,
    type: 'multiple-choice',
    question: "What is phishing?",
    options: [
      "A water sport",
      "A scam to trick you into revealing personal information",
      "A type of computer virus",
      "A programming language"
    ],
    correctAnswer: 1,
    explanation: "Phishing is a cybercrime where attackers impersonate legitimate organizations to trick you into revealing sensitive information like passwords, credit card numbers, or personal data.",
    category: "Phishing",
    difficulty: "beginner"
  },
  {
    id: 102,
    type: 'true-false',
    question: "You should always lock your computer when you walk away from it.",
    options: ["True", "False"],
    correctAnswer: 0,
    explanation: "Leaving your computer unlocked allows anyone to access your data. Always lock it (Win+L or Cmd+Ctrl+Q) when you leave.",
    category: "System Security",
    difficulty: "beginner"
  },

  // --- LEVEL 2: APPRENTICE (Visual & Scenarios) ---
  {
    id: 201,
    type: 'image-identification',
    question: "This icon typically indicates that a website is:",
    imageUrl: "/textures/shield_icon.png",
    options: [
      "Broken",
      "Secure (HTTPS)",
      "Infected",
      "Loading"
    ],
    correctAnswer: 1,
    explanation: "A lock or shield icon in the address bar usually indicates that the connection is encrypted using HTTPS.",
    category: "Safe Browsing",
    difficulty: "intermediate"
  },
  {
    id: 301,
    type: 'scenario',
    question: "You receive an email from your CEO asking you to buy gift cards immediately.",
    scenarioText: "It's 9 PM on a Sunday. You get an email that appears to be from your CEO, John. The subject line says 'URGENT TASK'. The email reads: 'Hi, I need you to purchase $500 in gift cards for a client presentation tomorrow morning. I'm in a meeting and can't do it. Please buy them and email me the codes right away. I will reimburse you.'",
    options: [
      "Buy the cards immediately to impress the CEO",
      "Reply asking for more details",
      "Verify the request through a different channel (call/text)",
      "Ignore it because it's late"
    ],
    correctAnswer: 2,
    explanation: "This is a classic 'CEO Fraud' or Business Email Compromise (BEC) scam. Always verify unusual financial requests through a secondary channel like a phone call.",
    category: "Social Engineering",
    difficulty: "intermediate"
  },
  {
    id: 202,
    type: 'image-identification',
    question: "Identify the type of attack depicted (email asking for urgent action):",
    imageUrl: "/textures/phishing_email.png",
    options: [
      "DDoS",
      "Phishing",
      "Ransomware",
      "Man-in-the-middle"
    ],
    correctAnswer: 1,
    explanation: "Emails that create a false sense of urgency and ask for sensitive info are classic signs of Phishing.",
    category: "Phishing",
    difficulty: "intermediate"
  },

  // --- LEVEL 3: SPECIALIST (Advanced Concepts) ---
  {
    id: 5,
    type: 'multiple-choice',
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Using two different passwords",
      "An extra security layer requiring a second form of verification",
      "A type of encryption",
      "A password manager"
    ],
    correctAnswer: 1,
    explanation: "Two-factor authentication adds an extra security layer by requiring not just a password, but also a second form of verification (like a code sent to your phone or email).",
    category: "Authentication",
    difficulty: "advanced"
  },
  {
    id: 302,
    type: 'scenario',
    question: "Your antivirus software alerts you to a threat.",
    scenarioText: "While browsing the web, a pop-up appears claiming to be 'System Security'. It says 'Your computer is infected! Click here to scan now.' It is flashing red and making a beeping sound.",
    options: [
      "Click 'Scan Now' immediately",
      "Call the number on the screen",
      "Close the browser (Alt+F4) and run your actual antivirus",
      "Download the tool it recommends"
    ],
    correctAnswer: 2,
    explanation: "This is likely 'Scareware' - a malicious pop-up designed to look like antivirus software. Never interact with web pop-ups claiming infections. Close the browser and run your trusted antivirus software.",
    category: "Malware",
    difficulty: "intermediate"
  },

  // --- LEVEL 4: MASTER (Puzzles & Ciphers) ---
  {
    id: 401,
    type: 'puzzle',
    question: "DECRYPT THE MESSAGE (Caesar Cipher: Shift +1)",
    puzzleData: "G N M K",
    options: [
      "HACK",
      "LOCK",
      "HOOK",
      "HELP"
    ],
    correctAnswer: 3, // G->H, N->O, M->L, K->L ... Wait. G(+1)->H. N(+1)->O. M(+1)->N. K(+1)->L.  HONL?
    // Let's re-do logic.
    // Word: HOLA. H(-1)=G. O(-1)=N. L(-1)=K. A(-1)=Z.
    // Let's do Shift -1 (A -> B).
    // Word: HACK. H->I, A->B, C->D, K->L. IBDL.
    // Let's do simple scramble.
    explanation: "This was a simple substitution cipher. Cryptography is the practice of securing communication.",
    category: "Data Protection",
    difficulty: "advanced"
  },
  {
    id: 402,
    type: 'puzzle',
    question: "Unscramble the cybersecurity term:",
    puzzleData: "R A W L M A E",
    options: [
      "FIREWALL",
      "MALWARE",
      "HARDWARE",
      "SPYWARE"
    ],
    correctAnswer: 1,
    explanation: "MALWARE is software specifically designed to disrupt, damage, or gain unauthorized access to a computer system.",
    category: "Malware",
    difficulty: "advanced"
  },
  {
    id: 403,
    type: 'puzzle',
    question: "Complete the Pattern (Ports):",
    puzzleData: "HTTP: 80, HTTPS: 443, SSH: 22, FTP: ?",
    options: [
      "21",
      "25",
      "53",
      "110"
    ],
    correctAnswer: 0,
    explanation: "Port 21 is the standard port for FTP (File Transfer Protocol). Knowing common ports is essential for network security.",
    category: "Network Security",
    difficulty: "advanced"
  }
];

// Fix for 401:
// Let's use simple shift.
// Word: SAFE. S(-1)=R. A(-1)=Z. F(-1)=E. E(-1)=D. "R Z E D"
// Question: Decrypt "R Z E D" (Shift +1) -> SAFE.
const fixedQuestion401 = {
    id: 401,
    type: 'puzzle',
    question: "DECRYPT THE MESSAGE (Shift +1)",
    puzzleData: "R Z E D",
    options: [
      "HACK",
      "LOCK",
      "SAFE",
      "HELP"
    ],
    correctAnswer: 2,
    explanation: "Cryptography uses ciphers to obfuscate data. Here, every letter was shifted back by one spot.",
    category: "Data Protection",
    difficulty: "advanced"
};
// Apply fix to the array index where 401 is (index 9)
allQuestions[9] = fixedQuestion401 as QuizQuestion;


export function getQuestionsByFilter(difficulty?: Difficulty, category?: Category): QuizQuestion[] {
  let filtered = [...allQuestions];
  
  if (difficulty) {
    filtered = filtered.filter(q => q.difficulty === difficulty);
  }
  
  if (category) {
    filtered = filtered.filter(q => q.category === category);
  }
  
  return filtered;
}

export const categories: Category[] = [
  'Passwords',
  'Phishing',
  'Safe Browsing',
  'Network Security',
  'Data Protection',
  'Malware',
  'Social Engineering',
  'Authentication',
  'System Security'
];

export const difficulties: Difficulty[] = ['beginner', 'intermediate', 'advanced'];

export const quizQuestions = allQuestions;
