#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import boxen from "boxen";
import figlet from "figlet";
import clear from "clear";

// Get terminal dimensions
const getTerminalSize = () => ({
  width: process.stdout.columns || 80,
  height: process.stdout.rows || 24,
});

// Helper to strip ANSI codes for accurate width calculation
const stripAnsi = (str) => str.replace(/\u001B\[[0-9;]*[a-zA-Z]/g, "");

// Creates a centered box with specified content and styling
const createBox = (content, color, title = "") => {
  // Calculate the width of the content without ANSI escape codes
  const lines = content.split("\n");
  const contentWidth = Math.max(...lines.map((line) => stripAnsi(line).length));
  // Add padding, borders, and margin to get total box width
  const totalBoxWidth = contentWidth + 4; // 2 for padding + 2 for borders

  // Get terminal width
  const { width: terminalWidth } = getTerminalSize();

  // Calculate left margin to center the box
  const marginLeft = Math.max(
    0,
    Math.floor((terminalWidth - totalBoxWidth) / 2)
  );

  return boxen(content, {
    padding: 1,
    margin: {
      top: 1,
      bottom: 1,
      left: marginLeft,
      right: marginLeft,
    },
    borderStyle: "round",
    borderColor: color,
    title: title,
    titleAlignment: "center",
    textAlignment: "center",
  });
};

// Display welcome message
const showWelcome = () => {
  const nameBanner = figlet.textSync("Harsh Sharma", {
    font: "Standard",
    horizontalLayout: "default",
  });

  const subtitle = chalk.bold.cyan("Software Engineer III @ Google — YouTube Create");
  const tagline = chalk.dim("Stack-agnostic problem solver • Building YouTube's Mobile Video Editor");

  const fullBanner = `${chalk.cyan(nameBanner)}\n\n${subtitle}\n${tagline}`;
  console.log(createBox(fullBanner, "cyan"));
};

// Portfolio content
const portfolioContent = {
  "About Me": {
    content: `I am a Software Engineer III at Google on the YouTube Create team, building YouTube's Mobile Video Editor for creators worldwide using Flutter, native Android, and native iOS.

I consider myself a stack-agnostic problem solver—driven by curiosity, tackling complex and ambiguous engineering challenges, and staying curious about forefronts in tech. I actively use AI workflows to accelerate how I build, debug, and iterate.

Outside of work, I'm always up for discussing interesting engineering problems, technology architecture, or catching a game of outdoor sports.`,
    color: "green",
  },
  "My Experience": {
    content: `${chalk.bold.cyan("🏢 Software Engineer III at Google")} ${chalk.dim("(June 2025 – Present)")}
• Team: YouTube Create
• Building YouTube's Mobile Video Editor for creators worldwide using Flutter, native Android, and native iOS.
• Integrating AI workflows to accelerate developer velocity, prototyping, and debugging.

${chalk.bold.yellow("🏢 Technology Intern at Fidelity International")} ${chalk.dim("(June – July 2024)")}
• Team: Innovation Team
• Developed a POC of an enterprise cryptocurrency wallet by reverse engineering MetaMask and MetaMask Institutional.
• Built an IAM-like dashboard for granular access control over keys and transactions.
• Documented architecture diagrams, threat models, and codebases for future reference.`,
    color: "yellow",
  },
  "Tech Stack": {
    content: `${chalk.cyan("📱 Mobile:")}       Flutter  |  Dart  |  Android (Kotlin)  |  iOS (Swift)
${chalk.yellow("⚡ AI & Tools:")}   Agentic Workflows  |  LLM APIs  |  AI Developer Tooling
${chalk.green("💻 Languages:")}    TypeScript  |  JavaScript  |  C++  |  Python
${chalk.magenta("🌐 Data & Web:")}   Node.js  |  PostgreSQL  |  MongoDB  |  Firebase
${chalk.blue("🛠️ DevOps:")}       Docker  |  Git  |  CI/CD  |  Linux`,
    color: "blue",
  },
  "My Coding Profiles": {
    content: `🏆 LeetCode: ${chalk.cyan("https://leetcode.com/xoxoharsh/")}
    Rating: 2018 (Knight) | Problems Solved: 788

⭐ Codeforces: ${chalk.cyan("https://codeforces.com/profile/XoXoHarsh")}
    Max Rating: 1556 (Specialist) | Problems Solved: 610+

🌟 GeeksforGeeks: ${chalk.cyan(
      "https://www.geeksforgeeks.org/user/harshsharma20503/"
    )}
    Problems Solved: 250+

💻 HackerRank: ${chalk.cyan(
      "https://www.hackerrank.com/profile/harshsharma20503"
    )}
    6⭐ in Problem Solving | 5⭐ in C++`,
    color: "magenta",
  },
  "Contact Info": {
    content: `🌐 Website:  ${chalk.cyan("https://xoxoharsh.in")}
💼 LinkedIn: ${chalk.cyan("https://linkedin.com/in/xoxoharsh")}
🐙 GitHub:   ${chalk.cyan("https://github.com/XoXoHarsh")}
📧 Email:    ${chalk.cyan("harshsharma20503@gmail.com")}

${chalk.dim("Always happy to chat about tech, mobile systems, or interesting problems to solve!")}`,
    color: "cyan",
  },
  Exit: {
    content:
      "Thanks for checking out my portfolio! May your code be bug-free! 👋",
    color: "yellow",
  },
};

// Show menu and handle selection
const showMenu = async () => {
  // Add some vertical spacing before the menu
  console.log("\n");

  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Choose an option:",
      choices: Object.keys(portfolioContent),
      // Center the menu using padding
      prefix: " ".repeat(Math.floor(getTerminalSize().width / 4)),
    },
  ]);

  clear();

  if (choice === "Exit") {
    console.log(
      createBox(
        portfolioContent[choice].content,
        portfolioContent[choice].color
      )
    );
    process.exit(0);
  }

  console.log(
    createBox(
      portfolioContent[choice].content,
      portfolioContent[choice].color,
      choice
    )
  );
  showMenu();
};

// Main function
const main = () => {
  clear();
  showWelcome();
  showMenu();
};

// Start the application
main();
