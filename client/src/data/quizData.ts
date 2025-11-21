export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type Category = 'Passwords' | 'Phishing' | 'Safe Browsing' | 'Network Security' | 'Data Protection' | 'Malware' | 'Social Engineering' | 'Authentication' | 'System Security';

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: Category;
  difficulty: Difficulty;
}

export const allQuestions: QuizQuestion[] = [
  // BEGINNER - Passwords
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
    category: "Passwords",
    difficulty: "beginner"
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
    category: "Passwords",
    difficulty: "beginner"
  },
  
  // BEGINNER - Phishing
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
    category: "Phishing",
    difficulty: "beginner"
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
    category: "Phishing",
    difficulty: "beginner"
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
    category: "Phishing",
    difficulty: "beginner"
  },
  
  // BEGINNER - Safe Browsing
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
    category: "Safe Browsing",
    difficulty: "beginner"
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
    category: "Safe Browsing",
    difficulty: "beginner"
  },
  
  // BEGINNER - Authentication
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
    category: "Authentication",
    difficulty: "beginner"
  },
  
  // BEGINNER - System Security
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
    category: "System Security",
    difficulty: "beginner"
  },
  
  // BEGINNER - Social Engineering
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
    category: "Social Engineering",
    difficulty: "beginner"
  },
  
  // INTERMEDIATE - Passwords
  {
    id: 11,
    question: "What is a password manager?",
    options: [
      "A person who remembers your passwords",
      "A secure tool that stores and generates strong passwords",
      "A text file where you write passwords",
      "An Excel spreadsheet"
    ],
    correctAnswer: 1,
    explanation: "A password manager is a secure application that stores all your passwords in an encrypted vault, generates strong unique passwords, and auto-fills login forms. Examples include LastPass, 1Password, and Bitwarden.",
    category: "Passwords",
    difficulty: "intermediate"
  },
  {
    id: 12,
    question: "How long should a secure password be at minimum?",
    options: [
      "6 characters",
      "8 characters",
      "12 characters",
      "20 characters"
    ],
    correctAnswer: 2,
    explanation: "Security experts recommend passwords be at least 12 characters long. Longer passwords are exponentially harder to crack. Consider using passphrases - random words combined together.",
    category: "Passwords",
    difficulty: "intermediate"
  },
  
  // INTERMEDIATE - Network Security
  {
    id: 13,
    question: "What is a VPN (Virtual Private Network)?",
    options: [
      "A special type of monitor",
      "A service that encrypts your internet connection",
      "A video streaming platform",
      "A type of firewall"
    ],
    correctAnswer: 1,
    explanation: "A VPN creates an encrypted tunnel for your internet traffic, hiding your IP address and protecting your data from eavesdroppers. It's especially important when using public Wi-Fi.",
    category: "Network Security",
    difficulty: "intermediate"
  },
  {
    id: 14,
    question: "What is a firewall?",
    options: [
      "A physical wall that protects against fire",
      "A security system that monitors and controls network traffic",
      "A type of antivirus software",
      "A password protection tool"
    ],
    correctAnswer: 1,
    explanation: "A firewall is a network security system that monitors incoming and outgoing network traffic and decides whether to allow or block specific traffic based on defined security rules.",
    category: "Network Security",
    difficulty: "intermediate"
  },
  
  // INTERMEDIATE - Malware
  {
    id: 15,
    question: "What is ransomware?",
    options: [
      "Software that speeds up your computer",
      "Malware that encrypts your files and demands payment",
      "A type of antivirus program",
      "Free software"
    ],
    correctAnswer: 1,
    explanation: "Ransomware is malicious software that encrypts your files or locks your computer, then demands payment (usually in cryptocurrency) to restore access. Regular backups are your best defense.",
    category: "Malware",
    difficulty: "intermediate"
  },
  {
    id: 16,
    question: "What is a trojan horse in cybersecurity?",
    options: [
      "A large wooden horse",
      "Malware disguised as legitimate software",
      "A secure encryption method",
      "A type of firewall"
    ],
    correctAnswer: 1,
    explanation: "A trojan horse is malware that disguises itself as legitimate software to trick users into installing it. Once installed, it can steal data, install more malware, or give attackers remote access to your system.",
    category: "Malware",
    difficulty: "intermediate"
  },
  
  // INTERMEDIATE - Data Protection
  {
    id: 17,
    question: "What is encryption?",
    options: [
      "Deleting files permanently",
      "Converting data into coded format to prevent unauthorized access",
      "Backing up data to cloud",
      "Compressing files to save space"
    ],
    correctAnswer: 1,
    explanation: "Encryption converts readable data into coded format using algorithms. Only those with the correct decryption key can read the original data. It's essential for protecting sensitive information.",
    category: "Data Protection",
    difficulty: "intermediate"
  },
  {
    id: 18,
    question: "Why should you back up your important data regularly?",
    options: [
      "To slow down your computer",
      "To protect against data loss from hardware failure or ransomware",
      "To use more storage space",
      "It's not necessary"
    ],
    correctAnswer: 1,
    explanation: "Regular backups protect against data loss from hardware failures, ransomware attacks, accidental deletion, or natural disasters. Follow the 3-2-1 rule: 3 copies, 2 different media, 1 offsite.",
    category: "Data Protection",
    difficulty: "intermediate"
  },
  
  // ADVANCED - Network Security
  {
    id: 19,
    question: "What is a DDoS (Distributed Denial of Service) attack?",
    options: [
      "A type of password attack",
      "Overwhelming a server with traffic from multiple sources",
      "A phishing technique",
      "A data encryption method"
    ],
    correctAnswer: 1,
    explanation: "A DDoS attack floods a target server, website, or network with traffic from multiple compromised systems, making it unavailable to legitimate users. It's like thousands of people trying to enter a door simultaneously.",
    category: "Network Security",
    difficulty: "advanced"
  },
  {
    id: 20,
    question: "What is DNS spoofing?",
    options: [
      "Changing your DNS settings for faster internet",
      "Corrupting DNS cache to redirect users to malicious websites",
      "A legitimate DNS optimization technique",
      "A type of firewall configuration"
    ],
    correctAnswer: 1,
    explanation: "DNS spoofing (or cache poisoning) is when attackers corrupt the DNS cache to redirect domain name queries to malicious IP addresses, potentially leading users to fake websites designed to steal credentials.",
    category: "Network Security",
    difficulty: "advanced"
  },
  
  // ADVANCED - Malware
  {
    id: 21,
    question: "What is a zero-day vulnerability?",
    options: [
      "A bug discovered on day zero",
      "A security flaw unknown to the software vendor",
      "A virus that expires after 24 hours",
      "A type of firewall rule"
    ],
    correctAnswer: 1,
    explanation: "A zero-day vulnerability is a software security flaw that's unknown to the vendor. Attackers can exploit it before a patch is available, making it extremely dangerous. The 'zero-day' refers to vendors having zero days to fix it.",
    category: "Malware",
    difficulty: "advanced"
  },
  {
    id: 22,
    question: "What is a rootkit?",
    options: [
      "Administrator tools for managing servers",
      "Malware that hides itself and other malicious software deep in the system",
      "A backup root directory",
      "A password recovery tool"
    ],
    correctAnswer: 1,
    explanation: "A rootkit is malicious software designed to hide itself and other malware deep within an operating system, often at the kernel level. They're extremely difficult to detect and remove, requiring specialized tools.",
    category: "Malware",
    difficulty: "advanced"
  },
  
  // ADVANCED - Authentication
  {
    id: 23,
    question: "What is multi-factor authentication (MFA)?",
    options: [
      "Using multiple passwords",
      "Authentication requiring two or more verification factors",
      "A type of firewall",
      "A password manager feature"
    ],
    correctAnswer: 1,
    explanation: "MFA requires two or more independent credentials: something you know (password), something you have (security token), and/or something you are (biometric). It significantly enhances security beyond simple passwords.",
    category: "Authentication",
    difficulty: "advanced"
  },
  {
    id: 24,
    question: "What is a brute force attack?",
    options: [
      "Physically breaking into a computer",
      "Trying many password combinations until finding the correct one",
      "Overloading a server with requests",
      "Social engineering technique"
    ],
    correctAnswer: 1,
    explanation: "A brute force attack systematically tries every possible password combination until finding the correct one. Strong, long passwords and account lockout policies help defend against these attacks.",
    category: "Authentication",
    difficulty: "advanced"
  },
  
  // ADVANCED - Social Engineering
  {
    id: 25,
    question: "What is spear phishing?",
    options: [
      "Fishing with a spear",
      "Targeted phishing attack aimed at specific individuals or organizations",
      "General mass email scam",
      "A type of malware"
    ],
    correctAnswer: 1,
    explanation: "Spear phishing is a highly targeted phishing attack directed at specific individuals or companies. Attackers research their targets and craft personalized, convincing messages, making them harder to detect than generic phishing.",
    category: "Social Engineering",
    difficulty: "advanced"
  },
  {
    id: 26,
    question: "What is pretexting in social engineering?",
    options: [
      "Preparing a presentation",
      "Creating a fabricated scenario to trick someone into revealing information",
      "Testing security systems",
      "A type of encryption"
    ],
    correctAnswer: 1,
    explanation: "Pretexting involves creating a fabricated scenario (pretext) to engage a target and trick them into revealing information or performing actions. The attacker often impersonates someone with authority or a legitimate need for information.",
    category: "Social Engineering",
    difficulty: "advanced"
  },
  
  // ADVANCED - Data Protection
  {
    id: 27,
    question: "What is end-to-end encryption?",
    options: [
      "Encrypting only the beginning and end of a file",
      "Encryption where only communicating users can read messages",
      "A type of firewall",
      "Partial encryption of data"
    ],
    correctAnswer: 1,
    explanation: "End-to-end encryption ensures that data is encrypted on the sender's device and only decrypted on the recipient's device. Even the service provider cannot access the unencrypted content. Used in secure messaging apps like Signal.",
    category: "Data Protection",
    difficulty: "advanced"
  },
  {
    id: 28,
    question: "What is the principle of least privilege?",
    options: [
      "Giving users maximum access for convenience",
      "Granting minimum access rights necessary to perform job functions",
      "A type of encryption",
      "A password policy"
    ],
    correctAnswer: 1,
    explanation: "The principle of least privilege means users should have only the minimum access rights needed to perform their jobs. This limits the potential damage from accidents, errors, or malicious actions.",
    category: "Data Protection",
    difficulty: "advanced"
  },
  
  // ADVANCED - System Security
  {
    id: 29,
    question: "What is a Security Information and Event Management (SIEM) system?",
    options: [
      "A type of antivirus",
      "A system that provides real-time analysis of security alerts",
      "A firewall configuration",
      "A password manager"
    ],
    correctAnswer: 1,
    explanation: "SIEM systems collect, analyze, and correlate security event data from across an organization's IT infrastructure in real-time, helping detect threats, ensure compliance, and respond to incidents quickly.",
    category: "System Security",
    difficulty: "advanced"
  },
  {
    id: 30,
    question: "What is penetration testing?",
    options: [
      "Testing how fast you can type",
      "Simulated cyber attack to find security vulnerabilities",
      "Testing network speed",
      "A type of malware"
    ],
    correctAnswer: 1,
    explanation: "Penetration testing (pen testing) is authorized simulated cyber attack on a system to evaluate security. Ethical hackers try to exploit vulnerabilities before real attackers do, helping organizations strengthen their defenses.",
    category: "System Security",
    difficulty: "advanced"
  }
];

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

// Legacy export for backwards compatibility
export const quizQuestions = allQuestions.filter(q => q.difficulty === 'beginner').slice(0, 10);
