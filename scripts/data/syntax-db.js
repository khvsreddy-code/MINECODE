// MINECODE SYNTAX DATABASE [UNIVERSAL COMPILER SUPPORT]
// Defines the "DNA" of every language to generate accurate lessons from Basic to Advanced.

const SYNTAX_DB = {
    // === 1. PYTHONISH (The readability kings) ===
    'python': {
        name: 'Python',
        extension: 'py',
        print: 'print("$TEXT")',
        printVar: 'print($VAR)',
        comment: '# $TEXT',
        var: '$NAME = $VALUE',
        varStr: '$NAME = "$VALUE"',
        loop: 'for i in range($COUNT):\n    print(i)',
        loopArray: 'for item in items:\n    print(item)',
        if: 'if $CONDITION:\n    print("True")',
        function: 'def $NAME($PARAM):\n    return $PARAM * 2',
        class: 'class $NAME:\n    def __init__(self, val):\n        self.val = val',
        array: 'items = [1, 2, 3]',
        true: 'True', false: 'False'
    },
    'ruby': {
        name: 'Ruby',
        extension: 'rb',
        print: 'puts "$TEXT"',
        printVar: 'puts $VAR',
        comment: '# $TEXT',
        var: '$NAME = $VALUE',
        varStr: '$NAME = "$VALUE"',
        loop: '$COUNT.times do |i|\n  puts i\nend',
        if: 'if $CONDITION\n  puts "True"\nend',
        function: 'def $NAME($PARAM)\n  return $PARAM * 2\nend',
        class: 'class $NAME\n  def initialize(val)\n    @val = val\n  end\nend',
        array: 'items = [1, 2, 3]',
        true: 'true', false: 'false'
    },
    'lua': {
        name: 'Lua',
        extension: 'lua',
        print: 'print("$TEXT")',
        printVar: 'print($VAR)',
        comment: '-- $TEXT',
        var: 'local $NAME = $VALUE',
        varStr: 'local $NAME = "$VALUE"',
        loop: 'for i = 1, $COUNT do\n  print(i)\nend',
        if: 'if $CONDITION then\n  print("True")\nend',
        function: 'function $NAME($PARAM)\n  return $PARAM * 2\nend',
        array: 'items = {1, 2, 3}',
        true: 'true', false: 'false'
    },

    // === 2. C-FAMILY (The curly brace battalion) ===
    'javascript': {
        name: 'JavaScript',
        extension: 'js',
        print: 'console.log("$TEXT");',
        printVar: 'console.log($VAR);',
        comment: '// $TEXT',
        var: 'let $NAME = $VALUE;',
        varStr: 'let $NAME = "$VALUE";',
        loop: 'for (let i = 0; i < $COUNT; i++) {\n    console.log(i);\n}',
        if: 'if ($CONDITION) {\n    console.log("True");\n}',
        function: 'function $NAME($PARAM) {\n    return $PARAM * 2;\n}',
        class: 'class $NAME {\n    constructor(val) { this.val = val; }\n}',
        array: 'const items = [1, 2, 3];',
        true: 'true', false: 'false'
    },
    'cpp': {
        name: 'C++',
        extension: 'cpp',
        main: '#include <iostream>\nusing namespace std;\n\nint main() {\n    $CODE\n    return 0;\n}',
        print: 'cout << "$TEXT" << endl;',
        printVar: 'cout << $VAR << endl;',
        comment: '// $TEXT',
        var: 'int $NAME = $VALUE;',
        varStr: 'string $NAME = "$VALUE";',
        loop: 'for (int i = 0; i < $COUNT; i++) {\n        cout << i << endl;\n    }',
        if: 'if ($CONDITION) {\n        cout << "True" << endl;\n    }',
        function: 'int $NAME(int $PARAM) {\n    return $PARAM * 2;\n}',
        array: 'int items[] = {1, 2, 3};',
        true: 'true', false: 'false'
    },
    'c': {
        name: 'C',
        extension: 'c',
        main: '#include <stdio.h>\n\nint main() {\n    $CODE\n    return 0;\n}',
        print: 'printf("$TEXT\\n");',
        printVar: 'printf("%d\\n", $VAR);',
        comment: '// $TEXT',
        var: 'int $NAME = $VALUE;',
        varStr: 'char $NAME[] = "$VALUE";',
        loop: 'for (int i = 0; i < $COUNT; i++) {\n        printf("%d\\n", i);\n    }',
        if: 'if ($CONDITION) {\n        printf("True\\n");\n    }',
        true: '1', false: '0'
    },
    'csharp': {
        name: 'C#',
        extension: 'cs',
        main: 'using System;\n\npublic class Program {\n    public static void Main() {\n        $CODE\n    }\n}',
        print: 'Console.WriteLine("$TEXT");',
        printVar: 'Console.WriteLine($VAR);',
        comment: '// $TEXT',
        var: 'int $NAME = $VALUE;',
        varStr: 'string $NAME = "$VALUE";',
        loop: 'for (int i = 0; i < $COUNT; i++) {\n            Console.WriteLine(i);\n        }',
        if: 'if ($CONDITION) {\n            Console.WriteLine("True");\n        }',
        class: 'public class $NAME {\n    public $NAME() { }\n}',
        true: 'true', false: 'false'
    },
    'java': {
        name: 'Java',
        extension: 'java',
        main: 'public class Main {\n    public static void main(String[] args) {\n        $CODE\n    }\n}',
        print: 'System.out.println("$TEXT");',
        printVar: 'System.out.println($VAR);',
        comment: '// $TEXT',
        var: 'int $NAME = $VALUE;',
        varStr: 'String $NAME = "$VALUE";',
        loop: 'for (int i = 0; i < $COUNT; i++) {\n            System.out.println(i);\n        }',
        if: 'if ($CONDITION) {\n            System.out.println("True");\n        }',
        class: 'class $NAME {\n    $NAME() { }\n}',
        true: 'true', false: 'false'
    },
    'php': {
        name: 'PHP',
        extension: 'php',
        main: '<?php\n$CODE\n?>',
        print: 'echo "$TEXT\\n";',
        printVar: 'echo $$NAME . "\\n";',
        comment: '// $TEXT',
        var: '$$NAME = $VALUE;', // PHP vars start with $
        varStr: '$$NAME = "$VALUE";',
        loop: 'for ($i = 0; $i < $COUNT; $i++) {\n    echo $i . "\\n";\n}',
        if: 'if ($CONDITION) {\n    echo "True\\n";\n}',
        array: '$items = array(1, 2, 3);',
        true: 'true', false: 'false'
    },
    'swift': {
        name: 'Swift',
        extension: 'swift',
        print: 'print("$TEXT")',
        printVar: 'print($VAR)',
        comment: '// $TEXT',
        var: 'var $NAME = $VALUE',
        varStr: 'var $NAME = "$VALUE"',
        loop: 'for i in 0..<$COUNT {\n    print(i)\n}',
        if: 'if $CONDITION {\n    print("True")\n}',
        true: 'true', false: 'false'
    },
    'kotlin': {
        name: 'Kotlin',
        extension: 'kt',
        main: 'fun main() {\n    $CODE\n}',
        print: 'println("$TEXT")',
        printVar: 'println($VAR)',
        comment: '// $TEXT',
        var: 'var $NAME = $VALUE',
        varStr: 'var $NAME = "$VALUE"',
        loop: 'for (i in 0 until $COUNT) {\n        println(i)\n    }',
        if: 'if ($CONDITION) {\n        println("True")\n    }',
        true: 'true', false: 'false'
    },
    'go': {
        name: 'Go',
        extension: 'go',
        main: 'package main\nimport "fmt"\n\nfunc main() {\n    $CODE\n}',
        print: 'fmt.Println("$TEXT")',
        printVar: 'fmt.Println($VAR)',
        comment: '// $TEXT',
        var: 'var $NAME int = $VALUE',
        varStr: 'var $NAME string = "$VALUE"',
        loop: 'for i := 0; i < $COUNT; i++ {\n        fmt.Println(i)\n    }',
        if: 'if $CONDITION {\n        fmt.Println("True")\n    }',
        true: 'true', false: 'false'
    },
    'rust': {
        name: 'Rust',
        extension: 'rs',
        main: 'fn main() {\n    $CODE\n}',
        print: 'println!("$TEXT");',
        printVar: 'println!("{}", $VAR);',
        comment: '// $TEXT',
        var: 'let $NAME = $VALUE;',
        varStr: 'let $NAME = "$VALUE";',
        loop: 'for i in 0..$COUNT {\n        println!("{}", i);\n    }',
        if: 'if $CONDITION {\n        println!("True");\n    }',
        true: 'true', false: 'false'
    },
    'bash': {
        name: 'Bash',
        extension: 'sh',
        print: 'echo "$TEXT"',
        printVar: 'echo $$NAME',
        comment: '# $TEXT',
        var: '$NAME=$VALUE',
        varStr: '$NAME="$VALUE"',
        loop: 'for i in {1..$COUNT}\ndo\n   echo $i\ndone',
        if: 'if [ $CONDITION ]; then\n   echo "True"\nfi',
        true: 'true', false: 'false'
    },

    // === 3. DEFAULTS / MOCKS ===
    'godot': {
        name: 'Godot (GDScript)',
        extension: 'gd',
        main: 'extends Node\n\nfunc _ready():\n    $CODE',
        print: 'print("$TEXT")',
        printVar: 'print($VAR)',
        comment: '# $TEXT',
        var: 'var $NAME = $VALUE',
        varStr: 'var $NAME = "$VALUE"',
        loop: 'for i in range($COUNT):\n    print(i)',
        if: 'if $CONDITION:\n    print("True")',
        true: 'true', false: 'false'
    },
    'typescript': {
        name: 'TypeScript',
        extension: 'ts',
        print: 'console.log("$TEXT");',
        printVar: 'console.log($VAR);',
        comment: '// $TEXT',
        var: 'let $NAME: number = $VALUE;',
        varStr: 'let $NAME: string = "$VALUE";',
        loop: 'for (let i: number = 0; i < $COUNT; i++) {\n    console.log(i);\n}',
        if: 'if ($CONDITION) {\n    console.log("True");\n}',
        true: 'true', false: 'false'
    }
};

window.SYNTAX_DB = SYNTAX_DB;
