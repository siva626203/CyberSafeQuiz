export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What makes a strong password?",
    options: [
      "Your birthday and name",
      "A mix of uppercase, lowercase, numbers, and symbols",
      "The word 'password123'",
      "Your pet's name"
    ],
    correctAnswer: 1,
    explanation: "Strong passwords use a combination of uppercase letters, lowercase letters, numbers, and special symbols. They should be at least 12 characters long and avoid personal information.",
    category: "Passwords"
  },
  {
    id: 2,
    question: "What is phishing?",
    options: [
      "A water sport",
      "A scam to trick you into revealing personal information",
      "A type of computer virus",
      "A programming language"
    ],
    correctAnswer: 1,
    explanation: "Phishing is a cybercrime where attackers impersonate legitimate organizations to trick you into revealing sensitive information like passwords, credit card numbers, or personal data.",
    category: "Phishing"
  },
  {
    id: 3,
    question: "Should you use the same password for multiple accounts?",
    options: [
      "Yes, it's easier to remember",
      "No, each account should have a unique password",
      "Only for unimportant accounts",
      "Yes, but change it monthly"
    ],
    correctAnswer: 1,
    explanation: "Using unique passwords for each account is crucial. If one account is compromised, hackers can't access your other accounts. Consider using a password manager to help remember them all.",
    category: "Passwords"
  },
  {
    id: 4,
    question: "What should you do if you receive a suspicious email asking for your bank details?",
    options: [
      "Reply with the information immediately",
      "Click the link to verify",
      "Delete it and contact your bank directly",
      "Forward it to all your contacts"
    ],
    correctAnswer: 2,
    explanation: "Never provide sensitive information via email. Legitimate banks will never ask for passwords or account details via email. Always contact your bank directly using official contact information.",
    category: "Phishing"
  },
  {
    id: 5,
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Using two different passwords",
      "An extra security layer requiring a second form of verification",
      "A type of encryption",
      "A password manager"
    ],
    correctAnswer: 1,
    explanation: "Two-factor authentication adds an extra security layer by requiring not just a password, but also a second form of verification (like a code sent to your phone or email).",
    category: "Authentication"
  },
  {
    id: 6,
    question: "Is it safe to use public Wi-Fi for online banking?",
    options: [
      "Yes, always safe",
      "No, unless you use a VPN",
      "Only on weekends",
      "Yes, if the connection is fast"
    ],
    correctAnswer: 1,
    explanation: "Public Wi-Fi networks are often unsecured and can be monitored by hackers. If you must use public Wi-Fi for sensitive activities, always use a VPN (Virtual Private Network) to encrypt your connection.",
    category: "Safe Browsing"
  },
  {
    id: 7,
    question: "What does HTTPS in a website URL indicate?",
    options: [
      "The website is expensive",
      "The website is encrypted and more secure",
      "The website is slow",
      "The website has viruses"
    ],
    correctAnswer: 1,
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) indicates that the website encrypts data sent between your browser and the server, making it much harder for hackers to intercept your information.",
    category: "Safe Browsing"
  },
  {
    id: 8,
    question: "What is social engineering in cybersecurity?",
    options: [
      "Building social networks",
      "Manipulating people to reveal confidential information",
      "Creating social media accounts",
      "Engineering social apps"
    ],
    correctAnswer: 1,
    explanation: "Social engineering is the psychological manipulation of people to trick them into divulging confidential information or performing actions that compromise security.",
    category: "Social Engineering"
  },
  {
    id: 9,
    question: "How often should you update your software and operating system?",
    options: [
      "Never, if it's working fine",
      "Once a year",
      "As soon as updates are available",
      "Only when buying a new device"
    ],
    correctAnswer: 2,
    explanation: "Regular updates are crucial as they often include security patches that fix vulnerabilities. Enable automatic updates when possible to stay protected against the latest threats.",
    category: "System Security"
  },
  {
    id: 10,
    question: "What should you do before clicking a link in an email?",
    options: [
      "Click it immediately",
      "Hover over it to see the actual URL",
      "Share it with friends first",
      "Reply to the sender"
    ],
    correctAnswer: 1,
    explanation: "Always hover over links to preview the actual URL before clicking. Phishing emails often disguise malicious links with legitimate-looking text. Verify the destination matches what you expect.",
    category: "Phishing"
  }
];
