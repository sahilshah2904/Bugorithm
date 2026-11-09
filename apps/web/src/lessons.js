export const lessons = [
  {
    "title": "Python syntax",
    "preview": "Print your first message.",
    "concept": "A Python statement tells the interpreter what to do. Write one statement per line. Use parentheses for a function call and quotes around text.",
    "example": "print(\"System online\")",
    "prompt": "Change the message so the program prints Relay online.",
    "starter": "print(\"System online\")",
    "expected": "Relay online"
  },
  {
    "title": "Variables",
    "preview": "Give a value a name.",
    "concept": "Use = to assign a value to a name. Python evaluates the right side first. Later lines can read the value or assign a new one.",
    "example": "tickets = 4\nprint(tickets)",
    "prompt": "Set tickets to 7, then print it.",
    "starter": "tickets = 4\nprint(tickets)",
    "expected": "7"
  },
  {
    "title": "Strings",
    "preview": "Work with quoted text.",
    "concept": "A string is text inside quotes. The + operator joins two strings in order. Include a space inside the quotes if you want one in the result.",
    "example": "site = \"Perth\"\nprint(\"Hello, \" + site)",
    "prompt": "Set site to Fremantle so the output is Hello, Fremantle.",
    "starter": "site = \"Perth\"\nprint(\"Hello, \" + site)",
    "expected": "Hello, Fremantle"
  },
  {
    "title": "Comparisons",
    "preview": "Make a True or False check.",
    "concept": "A comparison produces True or False. Use == to compare values for equality. Use >= when equality should also count.",
    "example": "print(4 > 4)\nprint(4 >= 4)",
    "prompt": "Make the comparison print True when both numbers are 6.",
    "starter": "print(6 > 6)",
    "expected": "True"
  },
  {
    "title": "If and else",
    "preview": "Choose which block runs.",
    "concept": "If a condition is true, Python runs the indented if block. Otherwise it runs the else block. The colon and indentation show where each block begins and ends.",
    "example": "score = 8\nif score >= 5:\n    print(\"Pass\")\nelse:\n    print(\"Retry\")",
    "prompt": "Set the score below 5 so the program prints Retry.",
    "starter": "score = 8\nif score >= 5:\n    print(\"Pass\")\nelse:\n    print(\"Retry\")",
    "expected": "Retry"
  },
  {
    "title": "Range",
    "preview": "Generate a sequence of numbers.",
    "concept": "range(start, stop) starts at start and stops before stop. Use list() when you want to see every value in the sequence.",
    "example": "print(list(range(1, 4)))",
    "prompt": "Adjust the stop value to print [1, 2, 3, 4].",
    "starter": "print(list(range(1, 4)))",
    "expected": "[1, 2, 3, 4]"
  },
  {
    "title": "For loops",
    "preview": "Visit each item in a list.",
    "concept": "A for loop takes one item at a time and gives it a name. Python runs the indented block once for each item in the sequence.",
    "example": "for signal in [\"red\", \"green\"]:\n    print(signal)",
    "prompt": "Change the list to print blue, then green, on separate lines.",
    "starter": "for signal in [\"red\", \"green\"]:\n    print(signal)",
    "expected": "blue\ngreen"
  },
  {
    "title": "While loops",
    "preview": "Repeat while a condition holds.",
    "concept": "A while loop checks the condition before each iteration. Change the value it checks so the loop can eventually stop.",
    "example": "count = 0\nwhile count < 2:\n    print(count)\n    count += 1",
    "prompt": "Change the limit so the program prints 0, 1, and 2 on separate lines.",
    "starter": "count = 0\nwhile count < 2:\n    print(count)\n    count += 1",
    "expected": "0\n1\n2"
  }
];
