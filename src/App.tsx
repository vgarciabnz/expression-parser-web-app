import React from 'react';
import './App.css';
import {SampleRuleEngineEvaluation} from "./rule-engine/SampleRuleEngineEvaluation";
import {ExpressionDataJs, ExpressionJs, ExpressionMode} from "@dhis2/expression-parser";

function evaluateResult(expression: string): any {
    const engine = new ExpressionJs(expression, ExpressionMode.RULE_ENGINE_CONDITION)
    const result = engine.evaluate(() => {}, new ExpressionDataJs());

    return `${expression} = ${result}`;
}

function evaluteProgramRule(): any {
    const ruleEngineResult = new SampleRuleEngineEvaluation().evaluateSingleEvent();

    return ruleEngineResult.length;
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>{evaluateResult("1 + 1")}</p>
                <p>{evaluateResult("d2:ceil(4.5)")}</p>
                <p>{evaluateResult("d2:floor(3.6)")}</p>
                <p>{evaluateResult("d2:right('tracker', 3)")}</p>
                <p>{evaluateResult("d2:left('tracker', 5)")}</p>
                <p>{evaluateResult("d2:validatePattern('55', '\\\\d{2}')")}</p>
                <p>{evaluateResult("d2:validatePattern('55', '\\\\d{3}')")}</p>
                <p>Rules evaluated: {evaluteProgramRule()}</p>
            </header>
        </div>
    );
}

export default App;
