import { collections } from './lessons/collections.js';
import { decisions } from './lessons/decisions.js';
import { firstSignals } from './lessons/first-signals.js';
import { functionsAndFlow } from './lessons/functions.js';
import { textAndSequences } from './lessons/text-and-sequences.js';

const basics = [
  {
    title: "Python syntax",
    preview: "Print your first message.",
    storyTitle: "The first signal",
    story: ["You arrive at a coastal field station before dawn. The night crew has left one job on the desk: make the console confirm that the system is running.","Python reads the statement as a call to print. The parentheses hold the argument, and the quotes mark the text itself. When the call executes, the console receives the characters inside the quotes and then a newline.","Without quotes, Python treats words as names to look up. Watch the message move from the argument to the console."],
    example: "print(\"System online\")",
    prompt: "Change the message so the program prints Relay online.",
    expected: "Relay online",
    frames: [
      {"line":0,"note":"The console is empty. The program is about to start.","values":[],"output":""},
      {"line":1,"note":"The text inside the quotes becomes the argument to print.","values":[["Argument","\"System online\""]],"output":""},
      {"line":1,"note":"print writes the message and moves to the next line.","values":[["Call","print"]],"output":"System online"},
    ],
  },
  {
    title: "Variables",
    preview: "Give a value a name.",
    storyTitle: "The ticket tally",
    story: ["The field station has four places left on the morning shuttle. The operator wants the number in the console, but also needs a name for the tally so it can change later.","The first line evaluates 4 and binds it to the name tickets. The second line looks up that name and passes the value to print. The name and the value play different roles: the name tells Python where to look, and the value is what gets printed.","Reading a name before assigning it raises a NameError. Follow the two lines in order to see why."],
    example: "tickets = 4\nprint(tickets)",
    prompt: "Set tickets to 7, then print it.",
    expected: "7",
    frames: [
      {"line":0,"note":"No value is bound to tickets yet.","values":[],"output":""},
      {"line":1,"note":"Python binds the name tickets to the integer 4.","values":[["tickets","4"]],"output":""},
      {"line":2,"note":"print reads the current value of tickets.","values":[["tickets","4"]],"output":"4"},
    ],
  },
  {
    title: "Strings",
    preview: "Work with quoted text.",
    storyTitle: "A message for the next stop",
    story: ["The shuttle sign reuses a greeting at every stop. Rather than type a new sentence each time, the operator keeps the greeting and the stop name in separate pieces.","A string is a sequence of characters. When both operands are strings, + builds a new string with the left piece first. The space in \"Hello, \" is part of the first piece, so it appears between the comma and the stop name.","The operator inserts zero extra spaces. Compare the two pieces and the result in the trace."],
    example: "site = \"Perth\"\nprint(\"Hello, \" + site)",
    prompt: "Set site to Fremantle so the output is Hello, Fremantle.",
    expected: "Hello, Fremantle",
    frames: [
      {"line":1,"note":"The name site now refers to the text Perth.","values":[["site","\"Perth\""]],"output":""},
      {"line":2,"note":"The greeting and the site are the two operands.","values":[["Left","\"Hello, \""],["Right","\"Perth\""]],"output":""},
      {"line":2,"note":"Python joins the characters and prints the resulting string.","values":[["Joined","\"Hello, Perth\""]],"output":"Hello, Perth"},
    ],
  },
  {
    title: "Comparisons",
    preview: "Make a True or False check.",
    storyTitle: "At the line",
    story: ["A gauge reads exactly four. One alarm should trigger above four, while another should trigger at four or above. Both alarms see the same reading, but their instructions differ.","A comparison asks a yes-or-no question and produces a Boolean value. The > operator needs a strictly larger left side. The >= operator accepts either a larger value or equality. Equal inputs show the difference clearly.","Use == when you want equality alone. In the trace, the two comparisons read the same values and reach different answers."],
    example: "print(4 > 4)\nprint(4 >= 4)",
    prompt: "Make the comparison print True when both numbers are 6.",
    expected: "True",
    frames: [
      {"line":0,"note":"Both comparisons will use the same pair of numbers.","values":[["Left","4"],["Right","4"]],"output":""},
      {"line":1,"note":"4 is not greater than 4. The first result is False.","values":[["Operator",">"],["Result","False"]],"output":"False"},
      {"line":2,"note":"4 equals 4, so the inclusive comparison is True.","values":[["Operator",">="],["Result","True"]],"output":"False\nTrue"},
    ],
  },
  {
    title: "If and else",
    preview: "Choose which block runs.",
    storyTitle: "One decision, two routes",
    story: ["Before boarding, a training terminal reads the trainee’s score. A score of five or more sends the trainee to the shuttle. A lower score sends them back for another try.","The if line evaluates its condition first. A true result runs the indented if block. A false result skips that block and runs the else block. The colon introduces the block, and the indentation groups its statements.","Predict which message appears for a score of exactly five. The trace shows the route for a score of eight."],
    example: "score = 8\nif score >= 5:\n    print(\"Pass\")\nelse:\n    print(\"Retry\")",
    prompt: "Set the score below 5 so the program prints Retry.",
    expected: "Retry",
    frames: [
      {"line":1,"note":"The terminal records the score as 8.","values":[["score","8"]],"output":""},
      {"line":2,"note":"The condition 8 >= 5 is True.","values":[["score","8"],["Gate","True"]],"output":""},
      {"line":3,"note":"The true branch runs. The else branch is skipped.","values":[["Branch","if"]],"output":"Pass"},
    ],
  },
  {
    title: "Range",
    preview: "Generate a sequence of numbers.",
    storyTitle: "Number the lockers",
    story: ["A volunteer needs labels for lockers 1, 2, and 3. The equipment guide describes the set by where it starts and where the numbering should stop.","range(start, stop) describes a sequence of integers. The start is included and the stop is excluded. The range object describes the sequence without building a list. Calling list() collects its values so they can be displayed together.","For a last label of 3, use a stop of 4. Watch what happens when the next candidate reaches that stop."],
    example: "print(list(range(1, 4)))",
    prompt: "Adjust the stop value to print [1, 2, 3, 4].",
    expected: "[1, 2, 3, 4]",
    frames: [
      {"line":1,"note":"Start at 1. The stop is 4 and is excluded.","values":[["Start","1"],["Stop","4"]],"sequence":{"items":["1","2","3","4"],"active":0,"edge":3},"output":""},
      {"line":1,"note":"The sequence can supply 2, then 3.","values":[["Current","3"],["Stop","4"]],"sequence":{"items":["1","2","3","4"],"active":2,"edge":3},"output":""},
      {"line":1,"note":"4 is the boundary. list collects the three earlier values.","values":[["Next","4"],["Collected","3 items"]],"sequence":{"items":["1","2","3","4"],"active":3,"edge":3},"output":"[1, 2, 3]"},
    ],
  },
  {
    title: "For loops",
    preview: "Visit each item in a list.",
    storyTitle: "Read the signal flags",
    story: ["A lookout has a row of coloured flags to call out. The same instruction applies to each flag: read the colour and announce it.","A for loop asks its iterable for one item at a time. The loop binds that item to the loop variable and executes the indented body. It then asks for another item. When the iterable has no more items, the loop ends.","The loop variable contains the current flag, not its position. Follow the highlight from the first flag to the second."],
    example: "for signal in [\"red\", \"green\"]:\n    print(signal)",
    prompt: "Change the list to print blue, then green, on separate lines.",
    expected: "blue\ngreen",
    frames: [
      {"line":1,"note":"The loop takes the first flag and binds signal to red.","values":[["signal","\"red\""]],"sequence":{"items":["red","green"],"active":0},"output":""},
      {"line":2,"note":"The body prints the current flag.","values":[["signal","\"red\""]],"sequence":{"items":["red","green"],"active":0},"output":"red"},
      {"line":1,"note":"The next item replaces the value of signal.","values":[["signal","\"green\""]],"sequence":{"items":["red","green"],"active":1},"output":"red"},
      {"line":2,"note":"The body prints green. There are no more flags to read.","values":[["signal","\"green\""]],"sequence":{"items":["red","green"],"active":1},"output":"red\ngreen"},
    ],
  },
  {
    title: "While loops",
    preview: "Repeat while a condition holds.",
    storyTitle: "Check before repeating",
    story: ["The morning crew runs a counter during a short equipment check. At the start of each round, they look at the count to decide whether another check is needed.","A while loop tests its condition before each pass. If the condition is true, the body prints the count and adds one. That update changes the value used on the next test. When the comparison becomes false, execution continues past the loop.","If the body never changes a condition that stays true, the loop keeps running. Follow the count through the final comparison."],
    example: "count = 0\nwhile count < 2:\n    print(count)\n    count += 1",
    prompt: "Change the limit so the program prints 0, 1, and 2 on separate lines.",
    expected: "0\n1\n2",
    frames: [
      {"line":1,"note":"The counter starts at zero.","values":[["count","0"]],"output":""},
      {"line":2,"note":"0 < 2 is True, so the loop enters.","values":[["count","0"],["Continue?","True"]],"output":""},
      {"line":3,"note":"The loop prints the current count.","values":[["count","0"]],"output":"0"},
      {"line":4,"note":"The increment sets count to 1.","values":[["count","1"]],"output":"0"},
      {"line":2,"note":"1 < 2 is True, so the loop runs again.","values":[["count","1"],["Continue?","True"]],"output":"0"},
      {"line":3,"note":"The second pass prints 1.","values":[["count","1"]],"output":"0\n1"},
      {"line":4,"note":"The increment sets count to 2.","values":[["count","2"]],"output":"0\n1"},
      {"line":2,"note":"2 < 2 is False. The loop exits.","values":[["count","2"],["Continue?","False"]],"output":"0\n1"},
    ],
  },
];

export const chapters = [
  { number: 1, title: 'First signals', first: 1, lessons: [...basics, ...firstSignals] },
  { number: 2, title: 'Decisions and repetition', first: 21, lessons: decisions },
  { number: 3, title: 'Text and sequences', first: 41, lessons: textAndSequences },
  { number: 4, title: 'Collections and value semantics', first: 61, lessons: collections },
  { number: 5, title: 'Functions and program flow', first: 81, lessons: functionsAndFlow },
];

export const lessons = chapters.flatMap((chapter) => chapter.lessons);

export function chapterForLevel(level) {
  return chapters.find(({ first, lessons }) => first <= level && level < first + lessons.length);
}
