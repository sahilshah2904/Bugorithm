# Python Trail curriculum

300 levels from first statements to advanced Python. Levels 1–8 are playable. Levels 9–300 are the authoring plan, with a distinct scenario, exercise objective, and animation for each level. Chapters 1–4 teach the foundations, 5–9 cover everyday Python, 10–12 cover problem solving and engineering, and 13–15 move into concurrency, applied work, and internals.

Each full lesson should start with a situation the learner can picture, explain the rule that solves it, and call out a common misunderstanding or edge case. Follow that with a short code example, a trace the learner can replay, and an exercise with a clear expected result. Keep each animation tied to the concept. A loop needs a moving cursor, a closure needs reference arrows, and concurrent work needs a timeline.

The trace should show the active line, the state that changes, and the output or consequence. Offer play, pause, step, scrub, and speed controls. Use a second case when it exposes a different branch or a boundary. Levels involving local environments, networking, processes, or optional packages can pair a deterministic browser trace with a local exercise.

The visualizer takes inspiration from the synchronized code, state, and walkthrough in VizLearn. Python's official tutorial, language reference, and standard-library reference anchor the curriculum. [VizLearn bubble sort](https://vizlearn.app/algorithms/sorting/bubble-sort) · [Python tutorial](https://docs.python.org/3/tutorial/) · [Language reference](https://docs.python.org/3/reference/) · [Standard library](https://docs.python.org/3/library/)

## 1. First signals · 1–20

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 1 | Python syntax | A coastal station needs a startup message. Change the text passed to print. | Move a quoted argument into the call and then the console. |
| 2 | Variables | The shuttle has four tickets left. Change the count and print it by name. | Bind the tickets label to a value and follow the lookup. |
| 3 | Strings | A sign builds a greeting for each stop. Join two strings and preserve the space. | Bring the two pieces together and show the new string. |
| 4 | Comparisons | Two alarms disagree at exactly four. Compare strict and inclusive thresholds. | Show the same inputs entering two operators and yielding different Booleans. |
| 5 | If and else | A trainee's score determines whether they board or retry. Change which branch runs. | Highlight the condition and only the branch that executes. |
| 6 | Range | A locker needs a number label. Print four consecutive labels starting at one. | Move a pointer along integer cells and mark the excluded stop. |
| 7 | For loops | A lookout calls out each coloured flag. Change the flags in the iterable. | Move the current item highlight through the flags and append each output. |
| 8 | While loops | A crew repeats a check until its counter hits a limit. Adjust the limit. | Cycle between the guard, output, and update, then stop at false. |
| 9 | Comments | Leave a note for the next radio operator. Add a comment beside a working statement. | Show the comment staying on the page while the statement reaches execution. |
| 10 | Indentation | A line in the station checklist is accidentally outside its block. Move it into the right block. | Draw the two block edges and replay when each line runs. |
| 11 | Integers | A warehouse counts whole batteries. Add and subtract stock changes. | Move signed whole values into a running tally. |
| 12 | Floats | The tide gauge reports decimal readings. Compute the difference between two readings. | Place the readings on a number line and show the computed change. |
| 13 | Booleans | The radio has a power flag. Flip the flag and print the state. | Switch a two-state indicator and show True or False in output. |
| 14 | None | A sensor has sent no reading. Distinguish the missing value from a reading of zero. | Put None and 0 in separate slots and show both checks. |
| 15 | Arithmetic operators | A supply order adds boxes, removes damaged stock, and multiplies packs. Calculate the total. | Route values through addition, subtraction, and multiplication stations. |
| 16 | True division | Share 13 litres of water across four teams. Compute each exact share as a float. | Split the total into equal parts and show the quotient. |
| 17 | Floor division | Pack 13 batteries in boxes of four. Count the full boxes. | Fill groups of four and keep the incomplete group outside the quotient. |
| 18 | Remainder | Find the batteries left after packing. Use the remainder operator. | Separate full boxes from leftovers and show the remainder. |
| 19 | Operator precedence | A ticket bill adds a fixed fee to the price of three seats. Place parentheses correctly. | Evaluate inner operators first and compare both parenthesized forms. |
| 20 | Printing multiple values | The operator wants a single line with the station and status. Set a separator and line ending. | Join arguments with the separator and show where the cursor ends. |

## 2. Decisions and repetition · 21–40

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 21 | elif | A weather board assigns one of three warning bands. Order the tests from highest band down. | Walk the decision ladder until the first true branch. |
| 22 | Boolean and | The dock opens only with a pass and a safe tide. Combine both flags. | Show both inputs entering an AND gate and the one passing combination. |
| 23 | Boolean or | A volunteer can enter with a pass or a supervisor escort. Test either route. | Replay different flag combinations through the OR gate. |
| 24 | Boolean not | A lamp should light when the hatch is closed. Invert the open flag. | Flip the input state and the output lamp in one step. |
| 25 | Short-circuit evaluation | A ratio is safe only when its divisor is nonzero. Put the guard first. | Highlight the skipped division when the first condition is false. |
| 26 | Chained comparisons | A lab accepts temperatures inside a range. Express both limits in one comparison. | Place a reading between boundary markers and test an endpoint. |
| 27 | Truthiness | An empty supply list should trigger a refill. Compare empty and populated values. | Show empty and nonempty objects resolving at the decision gate. |
| 28 | Identity versus equality | Two radios have the same settings but are separate objects. Test == and is. | Draw equal contents in two boxes and separate identity arrows. |
| 29 | Membership | Check whether a named vessel appears in the departure list. Use in. | Sweep through cells until the requested value is found. |
| 30 | Conditional expressions | Choose a one-word status for a dashboard. Assign it with a conditional expression. | Show the predicate selecting one of two values before assignment. |
| 31 | Range step | Inspect every third locker. Add a step argument. | Advance the pointer in jumps and stop before the boundary. |
| 32 | Countdown ranges | A launch countdown walks backward from five. Choose a negative step and stop. | Move down the number line and compare stop zero with stop minus one. |
| 33 | enumerate | Print each gear item beside its numbered shelf. Choose a starting index. | Pair the running index with the currently visited item. |
| 34 | Accumulators | Sum the weight of a supply manifest. Update a total as each crate arrives. | Move each crate weight into the total and show its previous value. |
| 35 | Nested loops | Mark each seat in each shuttle row. Print its row and seat coordinates. | Hold the outer cursor while the inner cursor sweeps the row. |
| 36 | break | Find the first crate with a broken seal and end the inspection there. | Stop the cursor at the matching item and dim the unvisited crates. |
| 37 | continue | Skip closed stations but keep checking the route. Place continue after the check. | Jump back to the loop header while leaving later stations reachable. |
| 38 | Loop else | Check all doors for a fault and report success if the loop finishes without a break. | Compare an exhausted loop with a path that breaks early. |
| 39 | Sentinel loops | Read readings until the stop marker arrives. Keep the marker out of the totals. | Feed a queue one item at a time until the sentinel reaches the guard. |
| 40 | Loop invariants | Count open lockers as you walk the hall. State what the running count represents. | Draw the scanned prefix and verify the count after each iteration. |

## 3. Text and sequences · 41–60

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 41 | String indexing | Extract the first character of a call sign. Compare the first and last index. | Label character positions from both directions. |
| 42 | String slicing | Split a station ID into its prefix and number. Choose start and stop positions. | Slide two markers across the character strip and highlight the included span. |
| 43 | Slice steps and reversal | Read a ticket code in reverse order. Use a negative slice step. | Move the cursor backward and collect one character per step. |
| 44 | Whitespace and strip | A pasted sign includes stray spaces. Clean the edges before comparing it. | Peel whitespace from both ends while internal spaces stay in place. |
| 45 | String split | A radio message uses commas between fields. Split it into three parts. | Cut the text at each separator and place the pieces in slots. |
| 46 | String join | Combine the stops on a route using arrows. Join the list with a delimiter. | Insert a delimiter only in the gaps between adjacent entries. |
| 47 | String replace | A label contains an outdated station name. Replace a chosen number of matches. | Mark match positions and update the first matching segment. |
| 48 | Case normalization | Match badges typed with different capital letters. Normalize the lookup keys. | Run variant inputs through one normalizer and align the keys. |
| 49 | Substring search | Find where a warning appears in a message. Compare found and absent cases. | Slide a search window and display the first index or the missing result. |
| 50 | F-strings | Print the tide height with units and two decimals. Format the numeric field. | Resolve the expression, format the number, then insert it into the text. |
| 51 | Escapes and raw strings | Include quotes and backslashes on an instruction sign. Choose a suitable literal. | Show the source characters and the interpreted string side by side. |
| 52 | Unicode text | A station name contains an accented character. Inspect the text and code points. | Align displayed characters with their underlying code points. |
| 53 | Bytes and encoding | Send a station label through a wire protocol. Encode and decode with UTF-8. | Turn characters into byte cells and reconstruct the original text. |
| 54 | Lists | Collect the readings from a watch. Construct a list and read a position. | Place readings in numbered cells and move an index pointer. |
| 55 | List mutation | A manifest entry was entered incorrectly. Replace it in place. | Keep the list identity fixed while one cell changes. |
| 56 | append versus extend | Add either one parcel or a tray of parcels. Compare the two resulting lists. | Show a nested list in one cell versus items spread across cells. |
| 57 | Insert and remove | Place priority cargo at the front and remove an outdated entry. | Shift cells around the changed index and update the length. |
| 58 | pop and stack order | Retrieve the most recently filed note. Remove it and use its return value. | Move the top cell into the returned-value slot. |
| 59 | Tuples | Represent a sensor's fixed row and column. Try reading and replacing a coordinate. | Show indexed reads followed by the error on mutation. |
| 60 | Unpacking | A sensor returns a location and temperature. Bind each field to a name. | Draw positional arrows from tuple cells to names. |

## 4. Collections and value semantics · 61–80

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 61 | Dictionary creation and lookup | A station keeps supplies by name. Build a mapping and retrieve a quantity. | Trace a key to its value rather than an integer position. |
| 62 | Missing dictionary keys | Look up a new supply with no inventory entry yet. Choose a default. | Split lookup into present, absent with get, and absent with indexing. |
| 63 | Updating dictionaries | Apply a shipment to the supply map. Add a key and overwrite an existing value. | Watch the dictionary gain a slot while the old key keeps its position. |
| 64 | Dictionary iteration | Print every station and its current status. Iterate over items. | Move through key/value pairs and bind both names at each step. |
| 65 | Counting frequencies | Tally repeated radio codes. Increment a dictionary count. | Highlight the key under update and replay the first occurrence. |
| 66 | Sets | Deduplicate badge scans before counting visitors. | Drop repeated values into the same membership bucket. |
| 67 | Set union | Combine volunteers from two shifts without duplicates. | Merge two collections and highlight shared elements once. |
| 68 | Set intersection | Find the volunteers eligible for both shifts. | Draw overlapping groups and retain only their common members. |
| 69 | Set difference | List attendees who still need a safety induction. | Remove already trained names from the attendance set. |
| 70 | Hashability | Try using a changing equipment list as a key. Convert a stable record to a tuple. | Compare a mutable key attempt with the immutable tuple lookup. |
| 71 | Shared references | Two names point at the same checklist. Edit one and inspect the other. | Draw both names leading to one object before and after mutation. |
| 72 | Shallow copies | Copy a list of station lists and change one inner reading. | Show separate outer lists with shared inner arrows. |
| 73 | Deep copies | Give a trainee a copy they can edit independently. Clone the nested structure. | Compare the old and new object graphs after a nested edit. |
| 74 | Nested lists | Represent instrument readings in a grid. Read a row and a column. | Move from outer row selection to an inner cell. |
| 75 | List comprehensions | Convert a set of readings to a new scale. Compare a loop with its comprehension. | Sync the input pointer with the next appended result in both versions. |
| 76 | Comprehension filters | Keep only positive readings from a noisy log. | Send each item through a predicate before appending it. |
| 77 | Dictionary comprehensions | Index a list of named stations by their initials. | Build one key/value entry per input and show a key collision. |
| 78 | Set comprehensions | Collect all unique initial letters in a sign-in sheet. | Project each word to its initial and merge duplicates. |
| 79 | Sorting and key functions | Rank boats by arrival time while preserving equal-time order. | Show each item's sort key and follow stable ordering for ties. |
| 80 | min, max, and sum | Summarize a run of temperatures with three different aggregates. | Replay the same readings through running low, high, and total states. |

## 5. Functions and program flow · 81–100

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 81 | Defining a function | Extract a repeated fare rule into a named action. Define it and call it twice. | Show definition creating a callable, then enter its frame at each call. |
| 82 | Parameters and arguments | Use one distance function for routes of different lengths. | Map each supplied argument to the parameter for that call. |
| 83 | Return values | A distance function must feed its result into a fare calculation. Return the number. | Move the returned value back into the caller's expression. |
| 84 | print versus return | A fare function displays a price but the invoice receives None. Repair the function. | Split console output from the actual value returned to the caller. |
| 85 | Implicit None | A function reaches its last line without a return. Inspect what the caller receives. | Follow control past the function body to the implicit return. |
| 86 | Default parameters | Most trips use the standard fare. Add an optional price argument. | Compare binding a default with binding a supplied override. |
| 87 | Keyword arguments | A label has a title and a colour. Call it with named arguments in reverse order. | Match arguments to parameters by name instead of position. |
| 88 | Positional-only parameters | Expose a public calculation whose first parameter name is an implementation detail. | Compare accepted positional binding with the rejected keyword call. |
| 89 | Keyword-only parameters | Make a destructive confirmation flag explicit in a local example. Require its name. | Show a bare argument rejected and a named flag accepted. |
| 90 | Variable positional arguments | Compute a total for any number of listed prices. Collect them with *args. | Group remaining positional arguments into the tuple inside the function. |
| 91 | Variable keyword arguments | A station label takes optional named metadata. Collect it with **kwargs. | Gather unbound names and values into one dictionary. |
| 92 | Call unpacking | A route record already holds the arguments. Expand a list and a mapping at the call site. | Spread containers into separate argument slots and bind them. |
| 93 | Names and scope | A helper uses the same variable name as its caller. Trace both bindings. | Show separate frames and resolve each reference locally. |
| 94 | Global and nonlocal | A nested counter needs to update an enclosing value. Compare both declarations. | Draw the nearest enclosing and module scopes with update arrows. |
| 95 | Mutable defaults | Two calls unexpectedly share a collected list. Use a safe default pattern. | Track the single default object across calls, then allocate per call. |
| 96 | First-class functions | Choose a unit converter at runtime. Store a function in a mapping and call it. | Move a function reference through the map into the call site. |
| 97 | Lambda expressions | Sort a manifest by one field. Supply a short key expression. | Evaluate each row's key and show the resulting order. |
| 98 | Closures | Create a logger with its own station prefix. Build two configured functions. | Connect each callable to the distinct captured binding it keeps. |
| 99 | Recursion base cases | Count down a stack of numbered crates. Stop cleanly at zero. | Push call frames until the base case and unwind in reverse order. |
| 100 | Recursive return flow | Calculate a small factorial. Trace each multiplication on return. | Show suspended frames and propagate each returned value upward. |

## 6. Files, errors, and debugging · 101–120

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 101 | Reading a traceback | A report fails inside a helper. Find the innermost source line before fixing it. | Walk from caller to failing frame and highlight the exception message. |
| 102 | Syntax errors | A missing colon prevents the station script from starting. Repair it. | Stop at parsing and show that execution has not begun. |
| 103 | Runtime errors | A log index exists for most inputs and fails for an empty one. Reproduce it. | Run the code to the failing access and show the empty input. |
| 104 | Logic errors | A ticket boundary passes ordinary examples but fails at equality. Add a test for it. | Compare expected and actual paths on the same input. |
| 105 | try and except | A badge code may contain letters where an integer is expected. Catch ValueError. | Branch into the handler only when conversion raises the chosen exception. |
| 106 | try else and finally | A reader should report successful parsing and always close a resource. | Replay success and failure through their separate paths and common cleanup. |
| 107 | Raising exceptions | Reject a negative departure minute before processing the manifest. | Stop at a validation guard and show the caller receiving the exception. |
| 108 | Custom exceptions | Separate an invalid manifest from other input errors. | Trace a domain exception through a specific handler. |
| 109 | Exception chaining | Wrap a conversion failure with the row number it came from. | Connect the original exception to the higher-level context. |
| 110 | Assertions | Check an internal counter invariant during development. | Compare a valid counter step with a violated assertion. |
| 111 | Path objects | Build a report path from folder and file name. Avoid hand-built separators. | Join components visually and separate relative from absolute paths. |
| 112 | Reading text files | Open a local log and inspect the first lines. | Move a file cursor from open through read to close. |
| 113 | Writing and appending | Create a shift report and add a second entry. Compare modes. | Show the file contents before and after replace and append. |
| 114 | Context managers | Read a log inside with and trigger a controlled error. | Enter the resource scope and show cleanup on both exit routes. |
| 115 | Streaming file lines | Count records without loading the whole file at once. | Advance one line at a time and compare retained memory with read-all. |
| 116 | Text encodings | Open a UTF-8 report containing accented names. Diagnose a wrong decoder. | Flow byte sequences through correct and incorrect decoding paths. |
| 117 | CSV rows | Read a manifest with quoted commas. Use the csv module to split fields. | Step through a quoted field and show which commas separate columns. |
| 118 | JSON round trips | Save a station setting as JSON and read it back. | Map Python types to JSON syntax and reconstruct the values. |
| 119 | Input validation | Reject malformed input before producing any totals. | Walk valid, missing, and out-of-range cases through guard checks. |
| 120 | Debugging with breakpoints | Pause before a counter changes. Inspect locals and step over the assignment. | Sync a line pointer with the value panel as execution advances. |

## 7. Modules and tools · 121–140

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 121 | Importing modules | Reuse math helpers in a route calculation. Compare import styles. | Show names added to the current namespace for each form. |
| 122 | Module namespaces | Two helpers define the same function name. Qualify each through its module. | Draw two module scopes and resolve each dotted lookup. |
| 123 | Packages | Group reporting tools under one package. Import one submodule. | Walk the directory tree to the module that supplies the name. |
| 124 | Relative imports | A report formatter needs a sibling module. Resolve the relative import. | Move from the current package up or across to the target. |
| 125 | The main guard | Make a file usable as an import and as a script. | Compare __name__ values and show when entry code runs. |
| 126 | Import caching | A module records when it initializes. Import it twice and observe the log. | Follow the first load and then the cached module lookup. |
| 127 | Virtual environments | Two projects need different library versions. Create isolated environments locally. | Draw two interpreters pointing at different site-packages directories. |
| 128 | Dependency declarations | Describe a project's supported dependency ranges in pyproject.toml. | Show constraints narrowing a set of available versions. |
| 129 | Lock files | Rebuild the same environment on another machine. Compare ranges with locked versions. | Walk a dependency tree from broad constraints to exact selections. |
| 130 | Packaging distributions | Build a small library locally. Compare source and wheel outputs. | Trace source files through the build step to each artifact. |
| 131 | Command-line arguments | Pass an input path and verbose flag to a local script. | Map shell tokens into parsed arguments and defaults. |
| 132 | Environment variables | Provide configuration without hard-coding machine-specific values. | Show environment lookup feeding a config value with a default. |
| 133 | Logging levels | Show warnings during normal runs and details during troubleshooting. | Move messages through a severity gate at two settings. |
| 134 | Dates and times | Compute elapsed time between two local readings with known timezone information. | Place timezone-aware timestamps on a shared timeline. |
| 135 | Randomness and seeding | Generate repeatable sample readings for a test. | Replay the same seeded stream beside a different seed. |
| 136 | Statistics basics | Summarize a small batch with mean and median. Add an outlier. | Move one point outward and watch how each statistic changes. |
| 137 | Decimal arithmetic | Calculate prices where decimal amounts must add exactly. | Compare Decimal constructed from text with binary float representation. |
| 138 | Regex literals and classes | Match station IDs with a fixed prefix and digits. | Step a pattern cursor through the input and mark each match. |
| 139 | Regex groups | Extract the day and station from a log record. | Highlight the full match and place each capture in a named slot. |
| 140 | Reading documentation | Choose an API by reading its signature, return contract, and exceptions. | Link each signature element to a running example and an edge case. |

## 8. Classes and the data model · 141–160

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 141 | Classes and instances | Create two instrument records from one blueprint. | Build two independent objects from the same class definition. |
| 142 | Initialization with __init__ | Give every instrument a name and initial reading. | Trace arguments through instance creation into fields. |
| 143 | Instance methods and self | Update one instrument's reading with a method call. | Follow the bound method and show which object receives self. |
| 144 | Class versus instance attributes | Compare a shared calibration constant with per-unit state. | Draw class and instance lookup paths. |
| 145 | Shared mutable class state | Each instrument should collect its own alarms. Fix a shared list. | Show all instances pointing to one class list before the correction. |
| 146 | Properties | Validate a temperature field while keeping attribute-style access. | Route an assignment through a setter and show an invalid branch. |
| 147 | Class methods | Build an instrument from a text record using an alternate constructor. | Pass the class into a factory and show the new instance. |
| 148 | Static methods | Group a pure validation helper with its related type. | Compare method access with a call that receives no self or cls. |
| 149 | Composition | A station contains a radio and a sensor. Delegate work to each component. | Draw ownership and follow method calls between objects. |
| 150 | Inheritance | Create a specialist sensor that shares common behaviour with a base class. | Walk attribute lookup through the derived and base classes. |
| 151 | Overriding and super | Add a calibration step while retaining the parent initialization. | Trace the derived call and its handoff along the method order. |
| 152 | Multiple inheritance and MRO | Resolve which implementation wins in a small diamond hierarchy. | Show the computed search order and the next hop for super. |
| 153 | Dataclasses | Replace repetitive record initialization and comparison with a dataclass. | Map declared fields to generated methods and instance values. |
| 154 | Frozen dataclasses | Use an immutable position as a dictionary key when its fields are hashable. | Compare reads, rejected reassignment, and hashing. |
| 155 | Enums | Replace ambiguous status strings with named states. | Map wire values to distinct enum members and reject an invalid value. |
| 156 | String representations | Give a record a readable display and a useful debugging representation. | Compare print with repr on the same object. |
| 157 | Equality and hashing | Define equality for coordinates and maintain matching hashes for equal objects. | Send equal keys through hashing and equality checks in a lookup. |
| 158 | Custom iteration protocols | Make a small collection produce items through iter and next. | Follow the iterator object and its StopIteration signal. |
| 159 | Operator overloading | Add two two-dimensional offsets using +. | Trace the operator to __add__ and show incompatible operands. |
| 160 | Descriptors | Reuse field validation across multiple record classes. | Follow attribute access through the descriptor and instance storage. |

## 9. Iteration and functional patterns · 161–180

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 161 | Iterables versus iterators | Compare a reusable checklist with its one-pass reader. | Run two traversals and show when each cursor resets. |
| 162 | next and StopIteration | Read a sensor queue one entry at a time. | Advance the iterator until the exhaustion signal appears. |
| 163 | Generators and yield | Produce reading IDs on demand from a large range. | Pause a frame at yield and resume with its locals intact. |
| 164 | Generator expressions | Sum readings from a transformation without storing the whole list. | Follow one value from source to consumer and compare memory use. |
| 165 | yield from | Read events from nested sources in order. | Delegate iteration into each child stream and resume the parent. |
| 166 | Lazy pipelines | Normalize and filter a stream before taking three results. | Track pull requests upstream and stop processing at the third match. |
| 167 | zip and zip strict | Combine time and reading columns. Detect uneven lengths. | Pair values from both cursors and expose the mismatched tail. |
| 168 | map and filter | Transform and screen readings using callable functions. | Trace each item through transformation and predicate stages. |
| 169 | any and all | Decide whether any alarm is active and whether all doors are closed. | Show the first decisive item stopping evaluation and compare empty input. |
| 170 | itertools chain | Read records from consecutive shift logs as one stream. | Hand the cursor from the exhausted first iterable to the second. |
| 171 | itertools islice | Read every second event from a large stream. | Track visited versus yielded positions without materializing the input. |
| 172 | itertools groupby | Collect adjacent events by status. See why ordering matters. | Show boundaries opening new groups when the key changes. |
| 173 | itertools accumulate | Plot the running energy use through a shift. | Animate each reading updating the next prefix total. |
| 174 | Products and combinations | Plan equipment pairings with and without order. | Walk a choice grid and highlight repeated versus unique selections. |
| 175 | Decorators | Add a call log around a station helper. | Trace the wrapper call before and after delegating to the original. |
| 176 | functools wraps | Keep a decorated function's name and documentation visible. | Compare callable metadata before and after preserving it. |
| 177 | Parameterized decorators | Set a log prefix at decoration time. | Follow the factory, wrapper creation, and later invocation. |
| 178 | Partial application | Bind a fixed unit scale for repeated conversions. | Place stored arguments beside the ones supplied at call time. |
| 179 | Memoization | Avoid recomputing the same recursive result. | Show cache hits bypassing repeated branches and report cache entries. |
| 180 | Context manager protocol | Write a helper that brackets a local operation with setup and cleanup. | Trace __enter__, the block, and __exit__ with exception data. |

## 10. Algorithms and problem solving · 181–200

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 181 | Operation counting | Estimate how long a search takes as a manifest grows. | Plot measured comparison counts for a few input sizes. |
| 182 | Big O and auxiliary space | Compare two implementations with different growth and storage. | Animate input scaling and show extra memory beside operation counts. |
| 183 | Linear search | Find a radio ID in an unsorted manifest. | Move one pointer through the candidates and stop at a match. |
| 184 | Binary search | Find a threshold in a sorted table. | Update low, high, and mid and shade the discarded half. |
| 185 | Lower and upper bounds | Find the insertion positions around equal timestamps. | Run two boundary policies and compare their stopping positions. |
| 186 | Bubble sort | Reorder a short row of parcel weights using adjacent swaps. | Highlight compared neighbors, animate swaps, and grow the settled suffix. |
| 187 | Insertion sort | Place incoming parcels into an ordered prefix. | Move larger prefix values right before inserting the current value. |
| 188 | Selection sort | Find the smallest remaining weight for each slot. | Move the candidate minimum marker and perform one swap per pass. |
| 189 | Merge sort | Combine small sorted manifests into one sorted result. | Split recursively, then move the smaller head during each merge. |
| 190 | Quicksort | Partition parcels around a pivot before recursing. | Show the pivot, scan pointer, and growing left and right partitions. |
| 191 | Stacks | Match nested brackets in a configuration string. | Push opening brackets and pop against each closing bracket. |
| 192 | Queues and deques | Process dispatches in arrival order with collections.deque. | Animate enqueue at one end and dequeue at the other. |
| 193 | Linked lists | Insert a checkpoint between two stations. | Change next links one at a time while keeping the rest reachable. |
| 194 | Hash tables | Resolve a toy collision between two equipment IDs. | Trace keys to buckets and compare colliding entries. |
| 195 | Trees | Walk a directory tree in preorder and postorder. | Highlight the active node and show the traversal call stack. |
| 196 | Heaps | Dispatch the highest-priority job first. | Sync the array positions with a tree and animate sift operations. |
| 197 | Graph breadth-first search | Find the fewest shuttle transfers between two stops. | Grow distance layers and show the queue and predecessor map. |
| 198 | Graph depth-first search | Explore all reachable checkpoints and detect a cycle. | Advance a stack and mark first visits and back edges. |
| 199 | Backtracking | Choose a small set of shift assignments with no clashes. | Build a decision tree and undo a choice when a branch fails. |
| 200 | Dynamic programming | Count routes across a small grid with blocked cells. | Fill a table from base cases and highlight each state's dependencies. |

## 11. Testing and reliability · 201–220

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 201 | Unit tests | Check a fare rule on ordinary, boundary, and invalid inputs. | Feed the inputs through the same assertion and compare outcomes. |
| 202 | unittest structure | Group related checks into a test case and run the suite. | Show discovery, test method calls, and the result report. |
| 203 | Parameterized tests | Run the same assertion across multiple thresholds. | Advance through a case table and highlight the failing row. |
| 204 | Fixtures | Give each test its own clean inventory. | Show setup, test, and teardown with independent objects. |
| 205 | Testing exceptions | Assert that a malformed reading raises the right error. | Compare the expected exception class with the actual raised class. |
| 206 | Test doubles | Replace a network sensor with a deterministic fake. | Route the same interface through live and fake implementations. |
| 207 | Mock calls | Verify that a notifier is called once with a specific alert. | Capture calls in order and compare them with expectations. |
| 208 | Monkeypatching | Replace a time source temporarily during a test. | Show the original binding, patched binding, and restored binding. |
| 209 | Property-based tests | Check that sorting preserves length and elements across generated inputs. | Generate cases and shrink a failing input to its smallest witness. |
| 210 | Boundary-value design | Test a ticket rule immediately below, at, and above the cutoff. | Place the inputs on a number line against the rule boundary. |
| 211 | Regression tests | Turn a reproducible failure into a test before repairing it. | Replay a red result then a green result on the same case. |
| 212 | Coverage | Find a branch your current checks never visit. | Colour executed lines and branches across successive test cases. |
| 213 | Pure functions | Make a unit conversion depend only on its arguments. | Compare repeated calls with a helper that reads external state. |
| 214 | Dependency injection | Supply a file reader or clock to a report instead of creating it inside. | Move dependencies to the boundary and substitute a test double. |
| 215 | Structured logging | Record an event with fields instead of parsing message text. | Show one event entering a structured log and filter by a field. |
| 216 | Error handling at boundaries | Translate low-level parsing failures into a user-facing message. | Follow error context across parser, service, and interface layers. |
| 217 | Static linting | Find a shadowed name before running the program. | Move a diagnostic from the linter to the exact source location. |
| 218 | Formatting | Make repeated edits produce stable code layout. | Compare token structure before and after automatic reformatting. |
| 219 | Continuous integration | Run checks for a change before it merges. | Advance a commit through install, test, and reporting stages. |
| 220 | Profiling | Measure which report step consumes time before optimizing. | Build a call timeline and highlight the measured hot path. |

## 12. Types and architecture · 221–240

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 221 | Type annotations | Document the input and output of a conversion helper. | Show declared types alongside actual runtime values. |
| 222 | Optional values | Model a missing reading as a union with None. | Narrow the value through an explicit guard. |
| 223 | Typed collections | Annotate a mapping of station names to readings. | Compare a valid entry with an incompatible key or value type. |
| 224 | Type aliases | Give a meaningful name to a repeated coordinate type. | Follow an alias back to the represented type across functions. |
| 225 | Type variables | Write a helper that returns the same kind of item it receives. | Track one type variable from argument to result. |
| 226 | Generic classes | Implement a typed box for different payloads. | Instantiate two type specializations and compare accepted values. |
| 227 | Protocols | Accept any object with the required sensor method. | Match interface members structurally across unrelated classes. |
| 228 | Abstract base classes | Define a shared contract and require concrete implementations. | Show the missing method preventing instantiation. |
| 229 | Callable types | Accept a measurement converter with a fixed signature. | Connect a callable's parameter and result types to the consumer. |
| 230 | TypedDict | Describe a structured report dictionary with required fields. | Validate expected keys and highlight missing or wrong-shaped data. |
| 231 | Literal and tagged unions | Represent successful and failed reads as distinct variants. | Narrow using the tag and reveal the fields available in each branch. |
| 232 | Type narrowing | Guard a value before using methods that only one variant supports. | Track the possible types before and after the branch. |
| 233 | Overloads | Describe the output type for two different input forms. | Match calls against declared signatures and then the shared implementation. |
| 234 | Variance | Explain why a mutable collection of one subtype cannot stand in for all base values. | Trace the invalid write that would break the subtype collection. |
| 235 | Immutability by design | Publish a configuration snapshot that consumers can only read. | Compare shared mutable references with immutable replacement. |
| 236 | Module boundaries | Split report parsing, analysis, and presentation into modules. | Follow data across the three public interfaces. |
| 237 | Circular imports | Repair two modules that import each other at startup. | Show partial initialization and break the dependency cycle. |
| 238 | Interfaces and adapters | Wrap two incompatible sensor APIs behind one local interface. | Map both request and response shapes through adapters. |
| 239 | Event-driven code | Notify a display when a sensor reading arrives. | Move an event from publisher to subscribed handlers. |
| 240 | State machines | Model transitions between idle, reading, and fault. | Highlight valid edges and reject an impossible transition. |

## 13. Concurrency and async · 241–260

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 241 | Processes and threads | Compare separate memory with shared state using local workers. | Draw process boundaries and show where each worker can read or write. |
| 242 | Concurrency versus parallelism | Interleave waiting tasks and compare with simultaneous computation. | Replay overlapping timelines across one and multiple execution slots. |
| 243 | Blocking I/O | Read a slow response while another task is ready. | Show a blocked execution slot and the ready work waiting behind it. |
| 244 | Thread synchronization | Protect an inventory update shared by two workers. | Move each worker through acquire, update, and release. |
| 245 | Race conditions | Reproduce a lost update with two counter increments. | Interleave reads and writes to show both the faulty and protected outcomes. |
| 246 | Deadlocks | Two workers each hold a resource the other needs. | Draw the wait cycle and break it with a consistent lock order. |
| 247 | Thread pools | Process several slow reads with a fixed number of workers. | Move queued jobs into freed worker slots and display results. |
| 248 | Process pools | Distribute a CPU-heavy local calculation across processes. | Show serialization, worker execution, and result collection. |
| 249 | Futures | Collect a result that will become available later. | Track pending, finished, and failed states over time. |
| 250 | Producer-consumer queues | Buffer events between a generator and a reporter. | Animate items moving through a bounded queue and show backpressure. |
| 251 | Coroutines | Create an async function and observe when its body runs. | Separate coroutine creation from scheduling and first execution. |
| 252 | await and the event loop | Pause a download while another coroutine makes progress. | Switch active lanes at await points on a scheduler timeline. |
| 253 | Async tasks | Start two independent waits and gather both results. | Show both tasks pending concurrently and compare completion order. |
| 254 | Task groups | Run related work with a shared lifetime. | Track sibling tasks and show cleanup when one fails. |
| 255 | Cancellation | Stop an obsolete request and release its resources. | Propagate cancellation at an await point through a finally block. |
| 256 | Async timeouts | Bound how long one report waits for a sensor response. | Race the completion against a deadline and show the selected outcome. |
| 257 | Async iteration | Consume a stream whose next item becomes available later. | Advance the iterator across waits and show each yielded event. |
| 258 | Async context managers | Acquire and close an asynchronous connection safely. | Track await points in entry, use, and exit. |
| 259 | Semaphores | Limit the number of simultaneous requests. | Allocate a small permit pool and queue the remaining tasks. |
| 260 | Backoff and jitter | Retry a transient failure without synchronizing every worker. | Compare fixed delays with increasing delays spread across a timeline. |

## 14. Applied Python and data · 261–280

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 261 | SQLite basics | Store readings and query a filtered subset. | Walk rows through table insert, predicate, and returned result. |
| 262 | Parameterized SQL | Pass a station ID as data in a query. | Keep query syntax separate from the bound argument. |
| 263 | Transactions | Update related records together and recover after a failure. | Show intermediate writes becoming durable only on commit. |
| 264 | Indexes and query plans | Find readings by station without scanning every row. | Compare the table scan with an indexed lookup path. |
| 265 | HTTP requests and responses | Read a sample API exchange locally or from a fixture. | Trace method, path, status, headers, and body in both directions. |
| 266 | API pagination | Collect all readings when a service returns one page at a time. | Move through cursors and terminate when the next token is absent. |
| 267 | JSON schema validation | Check a response before mapping it to a report. | Walk required fields and flag a wrong type at its path. |
| 268 | Rate limiting | Send requests at a controlled rate. | Animate a token bucket refilling and a request waiting for a token. |
| 269 | Cache expiration | Reuse a recent report and refresh it after a chosen time. | Place hits and misses on a timeline with a clear expiry boundary. |
| 270 | NumPy arrays | Represent readings with one shape and dtype in a local lab. | Map coordinates onto the array and show the dtype per element. |
| 271 | NumPy broadcasting | Apply one correction per column to a grid of readings. | Align shapes from the trailing dimensions and expand singleton axes. |
| 272 | NumPy views and copies | Change a slice and observe when it affects the source array. | Draw a view sharing a buffer beside an independent copy. |
| 273 | Boolean masks | Select valid readings in a grid with a condition. | Align the mask with the input and highlight retained cells. |
| 274 | pandas DataFrames | Read a small manifest and select named columns. | Show labels and index alongside the selected values. |
| 275 | Missing data | Distinguish missing readings from literal zeros before summarizing. | Trace rows through dropping, filling, and the final aggregate. |
| 276 | Grouping and aggregation | Compute per-station readings from one combined table. | Split rows into groups, aggregate, then combine results. |
| 277 | Joining tables | Attach station metadata to readings by key. | Follow matched and unmatched rows through inner and left joins. |
| 278 | Plotting data | Visualize tide readings with labelled axes and units. | Draw points in chronological order and inspect an anomalous point. |
| 279 | Reproducible notebooks | Run a short analysis from a clean kernel. | Replay cell execution order and expose an out-of-order state dependency. |
| 280 | Data pipelines | Validate, transform, and export a repeatable report. | Advance a record through each stage and divert invalid records. |

## 15. Advanced Python · 281–300

| Level | Topic | Story and code task | Animation brief |
| --- | --- | --- | --- |
| 281 | Generator send and close | Control a running generator that accepts a new threshold. | Trace sent values into a suspended yield and cleanup on close. |
| 282 | Closures and late binding | Create three callbacks in a loop without sharing the final loop value. | Show capture of a binding versus saving its value as an argument default. |
| 283 | Caching policies | Keep only recently used report results in memory. | Animate hits, misses, and least-recently-used eviction. |
| 284 | Weak references | Track an object without keeping it alive. | Remove its final strong reference and show the weak reference resolving empty. |
| 285 | Garbage collection and cycles | Build a small cycle of objects and remove outside references. | Compare reachability with individual reference counts. |
| 286 | Memory profiling | Find allocations that grow on repeated report runs. | Compare successive snapshots and trace the growing allocation path. |
| 287 | Slots and object layout | Compare ordinary attribute storage with a fixed set of fields. | Show where attributes live and which extra assignment is rejected. |
| 288 | Attribute lookup | Trace an attribute through descriptors, instance storage, and the class. | Walk precedence one step at a time and show the winning value. |
| 289 | __getattr__ and __getattribute__ | Provide a computed fallback without accidental recursion. | Contrast the hook for every access with the hook for missing attributes. |
| 290 | Metaclasses | Observe how a class is constructed from its namespace. | Move class-body entries through metaclass creation into a class object. |
| 291 | Class creation hooks | Register subclasses automatically when they are defined. | Follow class creation into __init_subclass__ and the registry. |
| 292 | Abstract syntax trees | Inspect and transform a simple expression safely in a local exercise. | Translate source into a tree and highlight the changed node. |
| 293 | Bytecode and disassembly | Compare bytecode for two small equivalent expressions. | Match selected instructions back to source and track the operand stack. |
| 294 | Import hooks | Load a toy module from an in-memory source map. | Step through finder, spec, loader, and module cache. |
| 295 | Serialization boundaries | Decide which values can travel safely as JSON between processes. | Compare supported types with values that require an explicit representation. |
| 296 | Safe parsing versus evaluation | Parse a small arithmetic input as data instead of running arbitrary text. | Show accepted nodes and reject an expression outside the allowed grammar. |
| 297 | Subprocess management | Run a local tool with an argument list and capture its result. | Trace argument boundaries, standard streams, timeout, and exit status. |
| 298 | Memory and binary protocols | Pack and unpack a sensor record with struct. | Map field sizes and byte order onto a numbered byte buffer. |
| 299 | Version compatibility | Verify that a package works across its supported Python versions. | Run a feature and test matrix and point out a version-specific failure. |
| 300 | Capstone architecture review | Build a station monitor that ingests readings, validates them, and reports alerts. | Trace one record through the whole system and replay a failure and recovery. |
