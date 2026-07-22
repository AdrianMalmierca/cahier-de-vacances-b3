import { db } from "../db/database";
import { ruleTests, type RuleKey } from "./ruleEngine";

interface RuleRow {
    id: string;
    rule_key: string;
    description: string;
    active: number;
}

export interface RuleResult {
    id: string;
    passed: boolean;
    message: string;
}

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
    ruleResults: RuleResult[];
}

export function validatePassword(password: string): ValidationResult {
    //to search into sql all the activated rules, empty array cause no params into the query
    //each row will have the structure of RuleRow, return all the rows in one array
    const activeRules = db
        .prepare<[], RuleRow>("SELECT id, rule_key, description, active FROM rules WHERE active = 1")
        .all();

    const ruleResults: RuleResult[] = activeRules
        .filter((rule) => rule.rule_key in ruleTests) //if the rule_key is length for example check if it exists in ruleTests
        .map((rule) => {
            const test = ruleTests[rule.rule_key as RuleKey]; //get the validation function, and as RuleKey to say is a valid class
            return {
                id: rule.id,
                passed: test(password),
                message: rule.description,
            };
        });

    const errors = ruleResults.filter((r) => !r.passed).map((r) => r.message);

    return {
        isValid: errors.length === 0,
        errors,
        ruleResults,
    };
}