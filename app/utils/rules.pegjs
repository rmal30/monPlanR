/**
 * This is a parsing expression grammar for rules, using PEG.js as the library.
 * This constructs a parse tree, which can be traversed and be used as validation
 * in ValidateCoursePlan.js.
 */

start
	= expression

expression
	= head:and_expr tail:(_ "OR"i _ _? and_expr)+ {
    	var tree = {
        	type: "OR",
            left: head
        };

        var node = tree;

        for(var i = 0; i < tail.length - 1; i++) {
        	node.right = {
            	type: "OR",
                left: tail[i][tail[i].length - 1]
            };

            node = node.right;
        }

        node.right = tail[i][tail[i].length - 1];

    	return tree;
    }
    / and_expr

and_expr
	= head:bracket_expr tail:(_ "AND"i _ _? bracket_expr)+ {
    	var tree = {
        	type: "AND",
            left: head
        };

        var node = tree;

        for(var i = 0; i < tail.length - 1; i++) {
        	node.right = {
            	type: "AND",
                left: tail[i][tail[i].length - 1]
            };

            node = node.right;
        }

        node.right = tail[i][tail[i].length - 1];

    	return tree;
    }
    / bracket_expr

bracket_expr
	= "(" expression:expression ")" { return expression }
    / for

/**
 * The For syntax has the same meaning as the if syntax in Python's language.
 * For example, for a unit with rule "For COURSE_CODE IN {1234, 2345} Do true Otherwise Permission required",
 * it means that if a student is doing course 1234 or 2345, then the rule is satisified.
 * Otherwise the student will need to get permission to be able to do this unit.
 */
for
	= "For " expression:for_expression " Do" _  do_branch:expression _ "Otherwise" _ otherwise_branch:expression { return {type: "FOR", expression: expression, do: do_branch, otherwise: otherwise_branch } }
    / string

for_expression
	= for_or_expression

for_or_expression
	= left:for_and_expression " OR " right:for_and_expression { return { type: "OR", left: left, right: right } }
	/ for_and_expression

for_and_expression
	= left:for_bracket_expression " AND " right:for_bracket_expression { return { type: "AND", left: left, right: right } }
	/ for_bracket_expression

for_bracket_expression
	 = "(" middle:for_expression ")" { return middle }
     / for_in

for_in
	= variable:for_variable not:" NOT"? " IN " list:list { return {type: "IN", list: list, variable: variable, not: !!not } }

for_variable
	= variable:[A-Z_]+ { return variable.join("") }

list
	= "{" list:[a-zA-Z0-9-, "%\.\[\]()]*  "}" { return list.join("").split(", ") }

/**
 * These are the terminal tokens.
 */
string "string"
	= minCreditPoints
    / permissionRequired
    / passedUnits
	/ completedUnitSet
	/ enrolledInUnits
	/ coreqUnits
	/ enrolledInCourse
	/ incompatibleWith
	/ previouslyCoded
	/ WAM
    / true
    / ""

minCreditPoints
	= "Must have passed " minCreditPoints:integer IW:IW? " credit points" inUnits:inUnits? minGrade:minGrade? levels:atLevels? disciplines:disciplines? unitsOwnedBy:unitsOwnedBy? { return {type: "MIN_CREDIT_POINTS", minCreditPoints: minCreditPoints, inUnits: inUnits, minGrade: minGrade, levels: levels, disciplines: disciplines, unitsOwnedBy: unitsOwnedBy, IW: !!IW } }

inUnits
	= " in " list:list { return list }

permissionRequired
	= "Permission required" { return { type: "PERMISSION_REQUIRED" } }

passedUnits
	= "Must have passed " number:integer IW:IW? " unit" "s"? " in " list:list minGrade:minGrade? gradesOtherThan:gradesOtherThan? { return { type: "PASSED_UNITS", number: number, list: list, gradesOtherThan: gradesOtherThan, minGrade: minGrade, IW: !!IW } }

completedUnitSet
	= "Must have completed" IW:IW? " unit set " list:list { return { type: "COMPLETED_UNIT_SET", list: list, IW:IW } }

enrolledInUnits
	= "Must have enrolled in a unit in " list:list { return { type: "ENROLLED_IN_UNIT", list: list } }

coreqUnits
	= "Any passed co-req" IW:IW? " unit in " list:list { return { type: "PASSED_COREQ_UNITS", list: list, IW: !!IW }}
	/ "Any co-req" IW:IW? " unit in " list:list { return { type: "COREQ_UNITS", list: list, IW: !!IW }}
	/ "Any co-req unit set " list:list { return { type: "COREQ_UNIT_SET", list: list } }
	/ "Any " number:integer IW:IW? " co-req units in " list:list { return { type: "PASSED_COREQ_UNITS", list: list, number: number, IW: !!IW }}

enrolledInCourse
	 = "Must be enrolled in course type " list:list ownedBy:ownedBy? { return { type: "ENROLLED_IN_COURSE_TYPE", list: list, ownedBy: ownedBy } }
	 / "Must be enrolled in course version " list:list { return { type: "ENROLLED_IN_COURSE_VERSION", list: list } }
	 / "Must be enrolled in course owned by " list:list { return { type: "ENROLLED_IN_COURSE_OWNED_BY", list: list } }

gradesOtherThan
	= " with grades other than " list:list { return list }

/**
 * Not sure why minimium grade needs a list, so we only need to return the first element in the list.
 */
minGrade
	 = " with grade of at least " list:list { return list[0] }

ownedBy
	= " owned by" _ list:list { return list }

disciplines
	= " in discipline " list:list { return list }

unitsOwnedBy
	= " from units owned by " list:list { return list }

atLevels
	= " at levels " list:list { return list }

WAM
	= "Must have course WAM equal to or greater than " number:integer { return { type: "MIN_WAM", number: number } }

true
	= "true" { return { type: "TRUE" } }

incompatibleWith
	= "Incompatible with" " achievement in"? IW:IW? " " list:list { return { type: "INCOMPATIBLE_WITH", list: list, IW: !!IW } }
	/ "Incompatible with course version in " courseVersionList:list statusList:courseStatus? { return { type: "INCOMPATIBLE_WITH_COURSE_VERSION", courseVersionList: courseVersionList, statusList: statusList } }

courseStatus
	= " with course status in " list:list { return list }

previouslyCoded
	= "Unit was previously coded " list:list { return { type: "PREVIOUSLY_CODED", list: list }}

integer
	= digits:[0-9]+ { return parseInt(digits.join(""), 10) }
    / "an" { return 1 }
	/ "a" { return 1 }

IW
	= " (I/W)"

_ "whitespace"
	= [ \t\n\r]*
