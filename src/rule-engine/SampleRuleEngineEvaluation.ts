import {Instant, LocalDate} from "@js-joda/core";
import {
    RuleActionJs,
    RuleAttributeValue, RuleDataValueJs, RuleEngineContextJs, RuleEngineJs,
    RuleEnrollmentJs,
    RuleEnrollmentStatus,
    RuleEventJs,
    RuleEventStatus, RuleJs, RuleValueType, RuleVariableJs, RuleVariableType
} from "@dhis2/rule-engine";

export class SampleRuleEngineEvaluation {

    private eventId = "bpLisAdKn8Y";
    private enrollmentId = "PSx4QFn2CQG";
    private programStageId = "NwQDF1mNI7N";
    private programStageName = "Birth";
    private eventStatus = RuleEventStatus.ACTIVE;
    private organisationUnit = "rXAayHBSb9s";
    private organisationUnitCode = "OU_CODE";

    private dataElement1 = "MrKMNMrfpUb";
    private dataElement2 = "x2zigttt4zv";
    private attribute1 = "L0rqhvdtlLj";

    private rule1 = "RzS8dOAC2yx";

    evaluateSingleEvent() {
        const incidentDate = LocalDate.parse("2024-03-01")
        const enrollmentDate = LocalDate.parse("2024-03-10")
        const enrollment = new RuleEnrollmentJs(
            this.enrollmentId,
            "Program name",
            incidentDate,
            enrollmentDate,
            RuleEnrollmentStatus.ACTIVE,
            this.organisationUnit,
            this.organisationUnitCode,
            [
                new RuleAttributeValue(this.attribute1, "60")
            ]
        )

        const eventDate = Instant.now();
        const targetEvent = new RuleEventJs(
            this.eventId,
            this.programStageId,
            this.programStageName,
            this.eventStatus,
            eventDate,
            null,
            null,
            this.organisationUnit,
            this.organisationUnitCode,
            [
                new RuleDataValueJs(
                    eventDate,
                    this.programStageId,
                    this.dataElement1,
                    "30"
                ),
                new RuleDataValueJs(
                    eventDate,
                    this.programStageId,
                    this.dataElement2,
                    "40"
                )
            ]
        );

        const ruleVariables = [
            new RuleVariableJs(
                RuleVariableType.TEI_ATTRIBUTE,
                "dataElement1",
                false,
                [],
                this.dataElement1,
                RuleValueType.NUMERIC,
                null
            ),
            new RuleVariableJs(
                RuleVariableType.DATAELEMENT_CURRENT_EVENT,
                "dataElement2",
                false,
                [],
                this.dataElement2,
                RuleValueType.NUMERIC,
                null
            ),
            new RuleVariableJs(
                RuleVariableType.TEI_ATTRIBUTE,
                "attribute1",
                false,
                [],
                this.attribute1,
                RuleValueType.NUMERIC,
                null
            )
        ];

        const rules = [
            new RuleJs(
                "d2:daysBetween(V{incident_date}, V{enrollment_date}) > 5",
                [
                    new RuleActionJs("#{dataElement1} + #{dataElement2}", "ASSIGN", new Map([["field", "attribute1"]]))
                ],
                this.rule1,
                "Rule 1",
                null,
                null
            )];


        const result = new RuleEngineJs()
            .evaluateEvent(
                targetEvent,
                enrollment,
                [],
                new RuleEngineContextJs(
                    rules,
                    ruleVariables,
                    new Map(),
                    new Map()
                ));

        console.log(result);

        return result;
    }
}
