// ============================================
// MINECODE - CURRICULUM DATA
// Centralized lesson, module, and exercise content
// ============================================

const CURRICULUM = {
    'python': {
        id: 'python',
        title: 'The Legend of Python',
        description: 'Master programming fundamentals with Python.',
        icon: '🐍',
        image: './assets/pixel_art/python.png',
        difficulty: 'BEGINNER',
        chapters: [
            // ========== CHAPTER 1: SETTING UP ==========
            {
                id: 1,
                title: 'Setting Up',
                icon: '⚙️',
                description: 'Your first steps into the world of code.',
                lessons: [
                    {
                        id: 'python-1-1',
                        title: 'Hello World',
                        type: 'exercise',
                        xp: 50,
                        content: {
                            story: `# Welcome to Python! 🐍

Every programmer's journey begins with a simple greeting to the world. Today, you'll write your first line of code.

In Python, we use the \`print()\` function to display text on the screen. It's like teaching your computer to speak!

\`\`\`python
print("Hello, World!")
\`\`\`

## Your Mission
Write a program that displays "Hello, World!" to the console.`,
                            instructions: [
                                { step: 1, text: 'Type `print("Hello, World!")` in the editor' },
                                { step: 2, text: 'Click the **Run** button to execute your code' },
                                { step: 3, text: 'See your message appear in the terminal below!' }
                            ],
                            hints: [
                                'Make sure to use quotation marks around your text',
                                'Python is case-sensitive - use lowercase `print`',
                                'Don\'t forget the parentheses!'
                            ],
                            starterCode: '# Write your first Python program below\n\n',
                            solution: 'print("Hello, World!")',
                            expectedOutput: 'Hello, World!'
                        }
                    },
                    {
                        id: 'python-1-2',
                        title: 'Comments',
                        type: 'exercise',
                        xp: 50,
                        content: {
                            story: `# Leaving Notes for Yourself 📝

Comments are notes in your code that Python ignores. They're for humans, not computers!

Use the \`#\` symbol to start a comment:

\`\`\`python
# This is a comment
print("Hello!")  # This is also a comment
\`\`\`

## Your Mission
Add a comment above your print statement, then print "Learning is fun!"`,
                            instructions: [
                                { step: 1, text: 'Write a comment using `#`' },
                                { step: 2, text: 'Print "Learning is fun!" on the next line' },
                                { step: 3, text: 'Run your code!' }
                            ],
                            hints: [
                                'Comments start with #',
                                'The comment can say anything you want'
                            ],
                            starterCode: '# Write a comment here\n\n# Now print something below\n',
                            solution: '# My first comment\nprint("Learning is fun!")',
                            expectedOutput: 'Learning is fun!'
                        }
                    },
                    {
                        id: 'python-1-3',
                        title: 'Block Letters',
                        type: 'project',
                        xp: 100,
                        content: {
                            story: `# 🎨 Project: Block Letters

Time to get creative! Use multiple \`print()\` statements to create ASCII art of your initials.

\`\`\`python
print("  A  ")
print(" A A ")
print("AAAAA")
print("A   A")
print("A   A")
\`\`\`

## Your Mission
Create block letters of your first initial!`,
                            instructions: [
                                { step: 1, text: 'Plan out your letter on paper first' },
                                { step: 2, text: 'Use multiple `print()` statements for each row' },
                                { step: 3, text: 'Run and admire your art!' }
                            ],
                            hints: [
                                'Use spaces to position characters',
                                'Each print() creates a new line',
                                'Try using * or # characters'
                            ],
                            starterCode: '# Create your block letter below!\n\nprint("  *  ")\nprint(" * * ")\nprint("*****")\nprint("*   *")\nprint("*   *")\n',
                            solution: 'print("  *  ")\nprint(" * * ")\nprint("*****")\nprint("*   *")\nprint("*   *")',
                            expectedOutput: '  *  \n * * \n*****\n*   *\n*   *'
                        }
                    }
                ]
            },

            // ========== CHAPTER 2: VARIABLES ==========
            {
                id: 2,
                title: 'Variables',
                icon: '📦',
                description: 'Learn to store and manage data.',
                lessons: [
                    {
                        id: 'python-2-1',
                        title: 'Creating Variables',
                        type: 'exercise',
                        xp: 50,
                        content: {
                            story: `# Storing Information 📦

Variables are like labeled boxes where you can store data.

\`\`\`python
name = "Alex"
age = 16
\`\`\`

The \`=\` sign assigns a value to a variable.

## Your Mission
Create a variable called \`name\` with your name, and print it.`,
                            instructions: [
                                { step: 1, text: 'Create a variable `name` and set it to your name' },
                                { step: 2, text: 'Use `print(name)` to display it' },
                                { step: 3, text: 'Run your code!' }
                            ],
                            hints: [
                                'Strings need quotation marks',
                                'Variable names are case-sensitive'
                            ],
                            starterCode: '# Create your variable\nname = \n\n# Print it\nprint(name)\n',
                            solution: 'name = "Alex"\nprint(name)',
                            expectedOutput: 'Alex'
                        }
                    },
                    {
                        id: 'python-2-2',
                        title: 'Data Types',
                        type: 'exercise',
                        xp: 75,
                        content: {
                            story: `# Types of Data 🔢

Python has different data types:
- **Strings**: Text in quotes → \`"Hello"\`
- **Integers**: Whole numbers → \`42\`
- **Floats**: Decimals → \`3.14\`
- **Booleans**: True or False → \`True\`

\`\`\`python
greeting = "Hi"      # String
count = 10           # Integer
price = 9.99         # Float
is_active = True     # Boolean
\`\`\`

## Your Mission
Create one variable of each type and print them all.`,
                            instructions: [
                                { step: 1, text: 'Create a string variable' },
                                { step: 2, text: 'Create an integer variable' },
                                { step: 3, text: 'Create a float variable' },
                                { step: 4, text: 'Create a boolean variable' },
                                { step: 5, text: 'Print all four variables' }
                            ],
                            hints: [
                                'Booleans are True or False (capitalized)',
                                'Floats have decimal points',
                                'You can print multiple values: print(a, b, c, d)'
                            ],
                            starterCode: '# Create your variables\nmy_string = ""\nmy_int = 0\nmy_float = 0.0\nmy_bool = True\n\n# Print them all\nprint(my_string, my_int, my_float, my_bool)\n',
                            solution: 'my_string = "Hello"\nmy_int = 42\nmy_float = 3.14\nmy_bool = True\nprint(my_string, my_int, my_float, my_bool)',
                            expectedOutput: 'Hello 42 3.14 True'
                        }
                    },
                    {
                        id: 'python-2-3',
                        title: 'Type Conversion',
                        type: 'exercise',
                        xp: 75,
                        content: {
                            story: `# Changing Types 🔄

Sometimes you need to convert between types:

\`\`\`python
str(42)      # "42" (int to string)
int("10")    # 10 (string to int)
float("3.5") # 3.5 (string to float)
\`\`\`

## Your Mission
Convert the string "100" to an integer, add 50 to it, and print the result.`,
                            instructions: [
                                { step: 1, text: 'Use `int()` to convert "100" to a number' },
                                { step: 2, text: 'Add 50 to the result' },
                                { step: 3, text: 'Print the final answer' }
                            ],
                            hints: [
                                'int("100") converts the string to 100',
                                'You can do math after converting'
                            ],
                            starterCode: '# Convert and calculate\ntext_number = "100"\n\n# Your code here\nresult = \n\nprint(result)\n',
                            solution: 'text_number = "100"\nresult = int(text_number) + 50\nprint(result)',
                            expectedOutput: '150'
                        }
                    },
                    {
                        id: 'python-2-4',
                        title: 'Mad Libs',
                        type: 'project',
                        xp: 100,
                        content: {
                            story: `# 🎭 Project: Mad Libs

Create a funny story using variables! Mad Libs combines words in silly ways.

\`\`\`python
adjective = "silly"
noun = "robot"
print("The " + adjective + " " + noun + " danced.")
\`\`\`

## Your Mission
Create your own Mad Lib with at least 3 variables!`,
                            instructions: [
                                { step: 1, text: 'Create variables for different word types (noun, verb, adjective)' },
                                { step: 2, text: 'Combine them into a funny sentence' },
                                { step: 3, text: 'Print your Mad Lib!' }
                            ],
                            hints: [
                                'Use + to combine strings',
                                'Add spaces inside your quotes',
                                'Be creative with your words!'
                            ],
                            starterCode: '# Create your Mad Lib!\nadjective = ""\nnoun = ""\nverb = ""\n\n# Build and print your sentence\nprint("The " + adjective + " " + noun + " loves to " + verb + "!")\n',
                            solution: 'adjective = "sleepy"\nnoun = "dragon"\nverb = "code"\nprint("The " + adjective + " " + noun + " loves to " + verb + "!")',
                            expectedOutput: 'The sleepy dragon loves to code!'
                        }
                    }
                ]
            },

            // ========== CHAPTER 3: CONTROL FLOW ==========
            {
                id: 3,
                title: 'Control Flow',
                icon: '🔀',
                description: 'Make decisions in your code.',
                lessons: [
                    {
                        id: 'python-3-1',
                        title: 'If Statements',
                        type: 'exercise',
                        xp: 75,
                        content: {
                            story: `# Making Decisions 🤔

\`if\` statements let your code make choices:

\`\`\`python
age = 18
if age >= 18:
    print("You can vote!")
\`\`\`

The indented code runs only if the condition is True.

## Your Mission
Check if a number is positive and print a message.`,
                            instructions: [
                                { step: 1, text: 'Create a variable `number` with a positive value' },
                                { step: 2, text: 'Use `if number > 0:` to check' },
                                { step: 3, text: 'Print "Positive!" if true' }
                            ],
                            hints: [
                                'Don\'t forget the colon after the condition',
                                'Indent with 4 spaces or a tab',
                                '> means greater than'
                            ],
                            starterCode: '# Check if positive\nnumber = 5\n\nif number > 0:\n    print("Positive!")\n',
                            solution: 'number = 5\nif number > 0:\n    print("Positive!")',
                            expectedOutput: 'Positive!'
                        }
                    },
                    {
                        id: 'python-3-2',
                        title: 'Else / Elif',
                        type: 'exercise',
                        xp: 75,
                        content: {
                            story: `# More Choices 🔀

\`else\` runs when the \`if\` is False. \`elif\` adds more conditions:

\`\`\`python
score = 85
if score >= 90:
    print("A")
elif score >= 80:
    print("B")
else:
    print("C")
\`\`\`

## Your Mission
Create a grade checker for a score.`,
                            instructions: [
                                { step: 1, text: 'Create a `score` variable' },
                                { step: 2, text: 'Use if/elif/else to assign grades' },
                                { step: 3, text: 'Print the grade' }
                            ],
                            hints: [
                                'Check from highest to lowest',
                                'elif is short for "else if"',
                                'else handles all remaining cases'
                            ],
                            starterCode: '# Grade checker\nscore = 85\n\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("C")\n',
                            solution: 'score = 85\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("C")',
                            expectedOutput: 'B'
                        }
                    },
                    {
                        id: 'python-3-3',
                        title: 'Logical Operators',
                        type: 'exercise',
                        xp: 75,
                        content: {
                            story: `# Combining Conditions 🔗

Use \`and\`, \`or\`, and \`not\` to combine conditions:

\`\`\`python
age = 20
has_id = True

if age >= 18 and has_id:
    print("Entry allowed")
\`\`\`

## Your Mission
Check if a number is between 1 and 10 (inclusive).`,
                            instructions: [
                                { step: 1, text: 'Create a `number` variable' },
                                { step: 2, text: 'Use `and` to check both conditions' },
                                { step: 3, text: 'Print "Valid!" if in range' }
                            ],
                            hints: [
                                'number >= 1 and number <= 10',
                                'Both conditions must be True',
                                'You can also use: 1 <= number <= 10'
                            ],
                            starterCode: '# Range checker\nnumber = 5\n\nif number >= 1 and number <= 10:\n    print("Valid!")\n',
                            solution: 'number = 5\nif number >= 1 and number <= 10:\n    print("Valid!")',
                            expectedOutput: 'Valid!'
                        }
                    },
                    {
                        id: 'python-3-4',
                        title: 'Magic 8 Ball',
                        type: 'project',
                        xp: 150,
                        content: {
                            story: `# 🎱 Project: Magic 8 Ball

Build a fortune teller! Use \`random\` to pick answers.

\`\`\`python
import random
answers = ["Yes", "No", "Maybe"]
print(random.choice(answers))
\`\`\`

## Your Mission
Create a Magic 8 Ball with at least 5 possible answers!`,
                            instructions: [
                                { step: 1, text: 'Import the random module' },
                                { step: 2, text: 'Create a list of 5+ answers' },
                                { step: 3, text: 'Use random.choice() to pick one' },
                                { step: 4, text: 'Print the answer!' }
                            ],
                            hints: [
                                'Lists use square brackets: []',
                                'Separate items with commas',
                                'random.choice() picks randomly'
                            ],
                            starterCode: '# Magic 8 Ball\nimport random\n\nanswers = ["Yes", "No", "Maybe", "Ask again", "Definitely"]\n\nprint(random.choice(answers))\n',
                            solution: 'import random\nanswers = ["Yes", "No", "Maybe", "Ask again", "Definitely"]\nprint(random.choice(answers))',
                            expectedOutput: 'Maybe'
                        }
                    }
                ]
            },

            // ========== CHAPTER 4: LOOPS ==========
            {
                id: 4,
                title: 'Loops',
                icon: '🔄',
                description: 'Repeat actions efficiently.',
                lessons: [
                    {
                        id: 'python-4-1',
                        title: 'While Loops',
                        type: 'exercise',
                        xp: 75,
                        content: {
                            story: `# Keep Going! 🔁

\`while\` loops repeat while a condition is True:

\`\`\`python
count = 0
while count < 3:
    print(count)
    count = count + 1
\`\`\`

**Output:** 0, 1, 2

## Your Mission
Count from 1 to 5 using a while loop.`,
                            instructions: [
                                { step: 1, text: 'Create a counter starting at 1' },
                                { step: 2, text: 'Loop while counter <= 5' },
                                { step: 3, text: 'Print and increment the counter' }
                            ],
                            hints: [
                                'Don\'t forget to increment!',
                                'Use count = count + 1 or count += 1',
                                'Make sure the loop will eventually end'
                            ],
                            starterCode: '# Count 1 to 5\ncount = 1\n\nwhile count <= 5:\n    print(count)\n    count = count + 1\n',
                            solution: 'count = 1\nwhile count <= 5:\n    print(count)\n    count = count + 1',
                            expectedOutput: '1\n2\n3\n4\n5'
                        }
                    },
                    {
                        id: 'python-4-2',
                        title: 'For Loops',
                        type: 'exercise',
                        xp: 75,
                        content: {
                            story: `# Loop Through Items 📋

\`for\` loops iterate over sequences:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

## Your Mission
Loop through a list of 3 colors and print each one.`,
                            instructions: [
                                { step: 1, text: 'Create a list of 3 colors' },
                                { step: 2, text: 'Use a for loop to iterate' },
                                { step: 3, text: 'Print each color' }
                            ],
                            hints: [
                                'Lists use square brackets',
                                'for item in list: is the syntax',
                                'The loop variable can be any name'
                            ],
                            starterCode: '# Loop through colors\ncolors = ["red", "green", "blue"]\n\nfor color in colors:\n    print(color)\n',
                            solution: 'colors = ["red", "green", "blue"]\nfor color in colors:\n    print(color)',
                            expectedOutput: 'red\ngreen\nblue'
                        }
                    },
                    {
                        id: 'python-4-3',
                        title: 'Range',
                        type: 'exercise',
                        xp: 75,
                        content: {
                            story: `# Generate Numbers 🔢

\`range()\` creates a sequence of numbers:

\`\`\`python
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

for i in range(1, 6):
    print(i)  # 1, 2, 3, 4, 5
\`\`\`

## Your Mission
Print numbers from 1 to 10 using range().`,
                            instructions: [
                                { step: 1, text: 'Use range(1, 11) to get 1-10' },
                                { step: 2, text: 'Loop through the range' },
                                { step: 3, text: 'Print each number' }
                            ],
                            hints: [
                                'range(1, 11) goes from 1 to 10',
                                'The end value is exclusive',
                                'range(start, stop)'
                            ],
                            starterCode: '# Print 1 to 10\nfor i in range(1, 11):\n    print(i)\n',
                            solution: 'for i in range(1, 11):\n    print(i)',
                            expectedOutput: '1\n2\n3\n4\n5\n6\n7\n8\n9\n10'
                        }
                    },
                    {
                        id: 'python-4-4',
                        title: 'FizzBuzz',
                        type: 'project',
                        xp: 200,
                        content: {
                            story: `# 🎯 Project: FizzBuzz

The classic coding challenge! For numbers 1-15:
- Print "Fizz" for multiples of 3
- Print "Buzz" for multiples of 5
- Print "FizzBuzz" for both
- Otherwise print the number

Use \`%\` (modulo) to check divisibility.

## Your Mission
Solve FizzBuzz!`,
                            instructions: [
                                { step: 1, text: 'Loop through 1 to 15' },
                                { step: 2, text: 'Check FizzBuzz first (divisible by both)' },
                                { step: 3, text: 'Then check Fizz and Buzz separately' },
                                { step: 4, text: 'Print the number if none match' }
                            ],
                            hints: [
                                'number % 3 == 0 means divisible by 3',
                                'Check FizzBuzz before Fizz and Buzz',
                                'Use elif for exclusive conditions'
                            ],
                            starterCode: '# FizzBuzz Challenge\nfor i in range(1, 16):\n    if i % 3 == 0 and i % 5 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)\n',
                            solution: 'for i in range(1, 16):\n    if i % 3 == 0 and i % 5 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
                            expectedOutput: '1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz'
                        }
                    }
                ]
            },

            // ========== CHAPTER 5: FUNCTIONS ==========
            {
                id: 5,
                title: 'Functions',
                icon: '🧩',
                description: 'Organize code into reusable blocks.',
                lessons: [
                    {
                        id: 'python-5-1',
                        title: 'Defining Functions',
                        type: 'exercise',
                        xp: 75,
                        content: {
                            story: `# Reusable Code 🧩

Functions are reusable blocks of code:

\`\`\`python
def greet():
    print("Hello!")

greet()  # Call the function
\`\`\`

## Your Mission
Create a function called \`say_hello\` and call it.`,
                            instructions: [
                                { step: 1, text: 'Define a function with `def say_hello():`' },
                                { step: 2, text: 'Add a print statement inside' },
                                { step: 3, text: 'Call the function' }
                            ],
                            hints: [
                                'def keyword defines a function',
                                'Don\'t forget the colon and indentation',
                                'Call with functi// ============================================
// CENTRAL CURRICULUM AGGREGATOR
// ============================================

// Collect shards from window scope (loaded via dashboard.html)
const pythonData = window.CURRICULUM_PYTHON || {};
                            const webData = window.CURRICULUM_WEB || {};
                            const systemsData = window.CURRICULUM_SYSTEMS || {};
                            const miscData = window.CURRICULUM_MISC || {};

                            // Merge into Master Curriculum
                            const CURRICULUM = {
                                ...pythonData,
                                ...webData,
                                ...systemsData,
                                ...miscData
                            };

                            // Export for module systems (Node/ESM)
                            if(typeof module !== 'undefined' && module.exports) {
                        module.exports = CURRICULUM;
                    }

// Ensure global access for browser
if(typeof window !== 'undefined') {
                window.CURRICULUM = CURRICULUM;
                console.log('✅ Curriculum Loaded:', Object.keys(CURRICULUM).length, 'Languages');
            }
                ```
