/**
 * This is a parsing expression grammar for rules, using PEG.js as the library.
 * This constructs a parse tree, which can be traversed and be used as validation
 * in ValidateCoursePlan.js.
 */

start
	= expression

expression
	= left:and_expr _ "or" _ right:and_expr { return {type: "OR", left: left, right: right} }
    / and_expr

and_expr
	= left:bracket_expr _ "AND" _ _ right:bracket_expr { return {type: "AND", left: left, right: right } }
    / bracket_expr

bracket_expr
	= "(" expression:expression ")" { return expression }
    / for

for
	= "For COURSE_CODE IN " list:list " Do " do_branch:string " Otherwise " otherwise_branch:string { return {type: "FOR", variable: "COURSE_CODE", list: list, do: do_branch, otherwise: otherwise_branch } }
    / string

list
	= "{" list:[a-zA-Z0-9"-"]*  "}" { return list.join("").split(", ") }

string "string"
	= minCreditPoints
    / permissionRequired
    / passedUnits
    / true
    / ""

minCreditPoints
	= "Must have passed " digits:[0-9]+ " credit points" { return {type: "MIN_CREDIT_POINTS", minCreditPoints: parseInt(digits.join(""))} }

permissionRequired
	= "Permission required" { return "PERMISSION_REQUIRED" }

passedUnits
	= "Must have passed " number:integer " (I/W)"? " unit" "s"? " in " list:list grades? { return { type: "PASSED_UNITS", number: number, list: list } }

grades
	= " with grades other than " list

true
	= "true" { return true }

integer
	= [0-9]+
    / "an" { return 1 }

_ "whitespace"
	= [ \t\n\r]*
