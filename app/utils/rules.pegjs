/**
 * This is a parsing expression grammar for rules, using PEG.js as the library.
 * This constructs a parse tree, which can be traversed and be used as validation
 * in ValidateCoursePlan.js.
 */

start
	= expression

expression
	= left:and_expr _ "OR"i _ _? right:and_expr { return {type: "OR", left: left, right: right} }
    / and_expr

and_expr
	= left:bracket_expr _ "AND"i _ _? right:bracket_expr { return {type: "AND", left: left, right: right } }
    / bracket_expr

bracket_expr
	= "(" expression:expression ")" { return expression }
    / for

for
	= "For COURSE_CODE IN " list:list " Do " do_branch:expression " Otherwise " otherwise_branch:expression { return {type: "FOR", variable: "COURSE_CODE", list: list, do: do_branch, otherwise: otherwise_branch } }
    / string

list
	= "{" list:[a-zA-Z0-9-, "%\.]*  "}" { return list.join("").split(", ") }

string "string"
	= minCreditPoints
    / permissionRequired
    / passedUnits
	/ coreqUnits
	/ enrolledInCourse
	/ incompatibleWith
	/ previouslyCoded
    / true
    / ""

minCreditPoints
	= "Must have passed " digits:[0-9]+ " (I/W)"? " credit points" unitsOwnedBy:unitsOwnedBy? { return {type: "MIN_CREDIT_POINTS", minCreditPoints: parseInt(digits.join("")), unitsOwnedBy: unitsOwnedBy} }

permissionRequired
	= "Permission required" { return "PERMISSION_REQUIRED" }

passedUnits
	= "Must have passed " number:integer " (I/W)"? " unit" "s"? " in " list:list grades:grades? { return { type: "PASSED_UNITS", number: number, list: list, grades: grades } }

coreqUnits
	= "Any passed co-req" " (I/W)"? " unit in " list:list { return { type: "PASSED_COREQ_UNITS", list: list }}
	/ "Any co-req" " (I/W)"? " unit in " list:list { return { type: "COREQ_UNITS", list: list }}
	/ "Any co-req unit set " list:list { return { type: "COREQ_UNIT_SET", list: list } }
	/ "Any " number:integer " (I/W)"? " co-req units in " list:list { return { type: "PASSED_COREQ_UNITS", list: list, number: number }}

enrolledInCourse
	 = "Must be enrolled in course type " list:list { return { type: "ENROLLED_IN_COURSE_TYPE", list: list} }
	 / "Must be enrolled in course version " list:list { return { type: "ENROLLED_IN_COURSE_VERSION", list: list } }
	 / "Must be enrolled in course owned by " list:list { return { type: "ENROLLED_IN_COURSE_OWNED_BY", list: list } }

grades
	= " with grades other than " list

unitsOwnedBy
	= " from units owned by " list:list { return list }

true
	= "true" { return true }

incompatibleWith
	= "Incompatible with" " achievement in"? " (I/W)"? " " list:list { return { type: "INCOMPATIBLE_WITH", list: list } }

previouslyCoded
	= "Unit was previously coded " list:list { return { type: "PREVIOUSLY_CODED", list: list }}

integer
	= digits:[0-9]+ { return parseInt(digits.join(""), 10) }
    / "an" { return 1 }
	/ "a" { return 1 }

_ "whitespace"
	= [ \t\n\r]*
