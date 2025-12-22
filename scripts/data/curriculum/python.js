
window.CURRICULUM_PYTHON = {
    'python': {
        id: 'python',
        title: 'The Legend of Python',
        description: 'Master programming fundamentals with Python.',
        icon: '🐍',
        image: './assets/pixel_art/python.png',
        difficulty: 'BEGINNER',
        chapters: [
            // CH 1: THE BEGINNING
            {
                id: 1, title: 'The Beginning', icon: '🌱', description: 'Start your journey.',
                lessons: [
                    { id: 'python-1-1', title: 'Hello World', type: 'exercise', xp: 50, content: { story: "Welcome to the world of code! Your first spell.", instructions: [{ step: 1, text: "Type `print('Hello World')`" }], starterCode: "# Write code below\n", expectedOutput: "Hello World" } },
                    { id: 'python-1-2', title: 'The Console', type: 'exercise', xp: 50, content: { story: "Learn to speak to the machine.", instructions: [{ step: 1, text: "Print your name." }], starterCode: "print('My name is...')", expectedOutput: "My name is..." } },
                    { id: 'python-1-3', title: 'Comments', type: 'exercise', xp: 50, content: { story: "Leave notes for your future self.", instructions: [{ step: 1, text: "Use `#` to write a comment." }], starterCode: "# This is a comment\nprint('Code runs')", expectedOutput: "Code runs" } },
                    { id: 'python-1-4', title: 'Block Letters', type: 'project', xp: 100, content: { story: "Create your initials in ASCII art.", instructions: [{ step: 1, text: "Use multiple print statements." }], starterCode: "print('  A  ')\nprint(' A A ')", expectedOutput: "  A  \n A A " } }
                ]
            },
            // CH 2: VARIABLES
            {
                id: 2, title: 'Variables', icon: '📦', description: 'Storing data for later.',
                lessons: [
                    { id: 'python-2-1', title: 'Creation', type: 'exercise', xp: 50, content: { story: "Variables are like boxes.", instructions: [{ step: 1, text: "Create `xp = 10` and print it." }], starterCode: "", expectedOutput: "10" } },
                    { id: 'python-2-2', title: 'Data Types', type: 'exercise', xp: 50, content: { story: "Integers, Strings, Booleans.", instructions: [{ step: 1, text: "Create a string variable." }], starterCode: "", expectedOutput: "String" } },
                    { id: 'python-2-3', title: 'Math Magic', type: 'exercise', xp: 50, content: { story: "Perform calculations.", instructions: [{ step: 1, text: "Add two numbers." }], starterCode: "print(10 + 5)", expectedOutput: "15" } },
                    { id: 'python-2-4', title: 'Currency Converter', type: 'project', xp: 100, content: { story: "Convert Yuan to Dollars.", instructions: [{ step: 1, text: "Calculate exchange rate." }], starterCode: "yuan = 50\nrate = 0.14\nprint(yuan * rate)", expectedOutput: "7.0" } }
                ]
            },
            // CH 3: CONTROL FLOW
            {
                id: 3, title: 'Control Flow', icon: '🔀', description: 'Directing the path of logic.',
                lessons: [
                    { id: 'python-3-1', title: 'If Statements', type: 'exercise', xp: 50, content: { story: "Decisions, decisions.", instructions: [{ step: 1, text: "Check if 5 > 3." }], starterCode: "if 5 > 3:\n  print('Yes')", expectedOutput: "Yes" } },
                    { id: 'python-3-2', title: 'Relational Operators', type: 'exercise', xp: 50, content: { story: "Compare values.", instructions: [{ step: 1, text: "Print 10 == 10" }], starterCode: "print(10 == 10)", expectedOutput: "True" } },
                    { id: 'python-3-3', title: 'Else & Elif', type: 'exercise', xp: 50, content: { story: "Alternative paths.", instructions: [{ step: 1, text: "Handle verify logic." }], starterCode: "x=2\nif x>5: print('Big')\nelse: print('Small')", expectedOutput: "Small" } },
                    { id: 'python-3-4', title: 'Magic 8 Ball', type: 'project', xp: 150, content: { story: "Predict the future.", instructions: [{ step: 1, text: "Print a random fortune." }], starterCode: "import random\nprint('Yes')", expectedOutput: "Yes" } }
                ]
            },
            // CH 4: LOOPS
            {
                id: 4, title: 'Loops', icon: '🔄', description: 'Repeating success.',
                lessons: [
                    { id: 'python-4-1', title: 'While Loops', type: 'exercise', xp: 50, content: { story: "Repeat until done.", instructions: [{ step: 1, text: "Count to 3." }], starterCode: "i = 1\nwhile i <= 3:\n  print(i)\n  i += 1", expectedOutput: "1\n2\n3" } },
                    { id: 'python-4-2', title: 'For Loops', type: 'exercise', xp: 50, content: { story: "Iterate over ranges.", instructions: [{ step: 1, text: "Loop 3 times." }], starterCode: "for i in range(3):\n  print(i)", expectedOutput: "0\n1\n2" } },
                    { id: 'python-4-3', title: 'FizzBuzz', type: 'project', xp: 150, content: { story: "The classic interview question.", instructions: [{ step: 1, text: "Print Fizz, Buzz, or number." }], starterCode: "print('FizzBuzz')", expectedOutput: "FizzBuzz" } }
                ]
            },
            // CH 5: LISTS
            {
                id: 5, title: 'Lists', icon: '📜', description: 'Managing collections.',
                lessons: [
                    { id: 'python-5-1', title: 'Create List', type: 'exercise', xp: 50, content: { story: "A shopping list.", instructions: [{ step: 1, text: "Make a list of fruits." }], starterCode: "fruits = ['apple']\nprint(fruits[0])", expectedOutput: "apple" } },
                    { id: 'python-5-2', title: 'Indexing', type: 'exercise', xp: 50, content: { story: "Grab specific items.", instructions: [{ step: 1, text: "Get the last item." }], starterCode: "nums = [1, 2, 3]\nprint(nums[-1])", expectedOutput: "3" } },
                    { id: 'python-5-3', title: 'Methods', type: 'exercise', xp: 50, content: { story: "Append and pop.", instructions: [{ step: 1, text: "Add to list." }], starterCode: "l = []\nl.append(1)\nprint(l)", expectedOutput: "[1]" } }
                ]
            },
            // CH 6: FUNCTIONS
            {
                id: 6, title: 'Functions', icon: '🔧', description: 'Reusable spells.',
                lessons: [
                    { id: 'python-6-1', title: 'Define', type: 'exercise', xp: 50, content: { story: "Create a command.", instructions: [{ step: 1, text: "Define say_hi." }], starterCode: "def say_hi():\n  print('Hi')\nsay_hi()", expectedOutput: "Hi" } },
                    { id: 'python-6-2', title: 'Parameters', type: 'exercise', xp: 50, content: { story: "Pass data in.", instructions: [{ step: 1, text: "Greet a name." }], starterCode: "def greet(n):\n  print('Hi ' + n)\ngreet('Neo')", expectedOutput: "Hi Neo" } },
                    { id: 'python-6-3', title: 'Return', type: 'exercise', xp: 50, content: { story: "Get data back.", instructions: [{ step: 1, text: "Return sum." }], starterCode: "def add(a,b):\n  return a+b\nprint(add(2,2))", expectedOutput: "4" } }
                ]
            },
            // CH 7: CLASSES
            {
                id: 7, title: 'Classes & Objects', icon: '🏗️', description: 'Object Oriented Programming.',
                lessons: [
                    { id: 'python-7-1', title: ' The Blueprint', type: 'exercise', xp: 50, content: { story: "Define a class.", instructions: [{ step: 1, text: "Create Class Dog." }], starterCode: "class Dog:\n  pass\nprint('Dog')", expectedOutput: "Dog" } },
                    { id: 'python-7-2', title: 'Attributes', type: 'exercise', xp: 50, content: { story: "Give it properties.", instructions: [{ step: 1, text: "Set name." }], starterCode: "class Cat:\n  name='Whiskers'\nc=Cat()\nprint(c.name)", expectedOutput: "Whiskers" } }
                ]
            },
            // CH 8: MODULES (FINAL)
            {
                id: 8, title: 'Modules', icon: '📦', description: 'Using libraries.',
                lessons: [
                    { id: 'python-8-1', title: 'Import', type: 'exercise', xp: 50, content: { story: "Use math.", instructions: [{ step: 1, text: "Import math." }], starterCode: "import math\nprint(math.sqrt(16))", expectedOutput: "4.0" } },
                    { id: 'python-8-2', title: 'Final Project', type: 'project', xp: 500, content: { story: "Build a Text Adventure.", instructions: [{ step: 1, text: "Combine everything!" }], starterCode: "print('You win!')", expectedOutput: "You win!" } }
                ]
            }
        ]
    }
};
