import { useEffect, useId, useRef, useState } from "react";
import { checkPassword, type ValidationResult } from "../validation/passwordApi";
import "./MatrixBreach.css";

/*export function MatrixBreach() {
    const [password, setPassword] = useState("");
    const [touched, setTouched] = useState(false);
    const inputId = useId();
    const statusId = useId();

    //memorize the validation result to avoid unnecessary recalculations on every render, only recalculate when the password changes
    const { isValid, failedRules } = useMemo(() => {
        return validatePassword(password);
    }, [password]);

    const showTrace = touched && !isValid && password.length > 0;

    const statusMessage = isValid && password.length > 0
        ? "Access Granted. Matrix Breached."
        : failedRules.length > 0
            ? failedRules.map((id: RuleId) => errorMessages[id]).join(". ")
            : "";

    return (
        <div className={`breach-console ${isValid && password.length > 0 ? "breach-console--granted" : ""}`}>
            <div className="breach-console__scanlines" aria-hidden="true" />

            <header className="breach-console__header">
                <p className="breach-console__eyebrow">Zion Resistance // Access Point</p>
                <h1 className="breach-console__title">Matrix Breach Simulator</h1>
                <p className="breach-console__subtitle">
                    Forge a key that matches Zion's signature pattern before Agent Smith traces you.
                </p>
            </header>

            <div className="breach-console__field">
                <label htmlFor={inputId} className="breach-console__label">
                    Breach key
                </label>
                <input
                    id={inputId}
                    type="text"
                    autoComplete="off"
                    spellCheck={false} //disable spellcheck to avoid browser suggestions, like "Did you mean: ...", which can be distracting in a password input
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setTouched(true);
                    }}
                    onBlur={() => setTouched(true)}
                    aria-describedby={statusId} //associate the input with the status message for screen readers, so they can read the validation feedback
                    aria-invalid={touched && !isValid} //indicate to screen readers that the input is invalid if it has been touched and the password is not valid, for accessibility purposes
                    className={`breach-console__input ${showTrace ? "breach-console__input--trace" : ""}`} //add a trace effect to the input when the password is invalid and has been touched, for visual feedback
                    placeholder="Enter exploit key..."
                />
            </div>

            <p id={statusId} role="status" aria-live="polite" className="breach-console__status">
                {statusMessage}
            </p>

            <ul className="breach-console__rules" aria-label="Zion's forged signature pattern requirements">
                {rules
                    .filter((rule) => rule.id !== "forbidden") //exclude the forbidden rule from the list, as it is more of a validation check than a user-facing requirement
                    .map((rule) => {
                        const passed = rule.test(password);
                        return (
                            <li
                                key={rule.id}
                                className={`breach-console__rule ${
                                    touched ? (passed ? "breach-console__rule--pass" : "breach-console__rule--fail") : ""
                                }`}
                            >
                                <span className="breach-console__rule-marker" aria-hidden="true">
                                    {touched ? (passed ? "✓" : "✕") : "•"}
                                </span>
                                {rule.label}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}*/

const DEBOUNCE_MS = 400; //debounce = wait for a certain amount of time after the last input before sending the request, 
//to avoid sending too many requests in a short period of time

//idle = no request sent yet
//checking = request sent and waiting for response
//success = request succeeded and password is valid
//timeout = request took too long
//network-error = request failed due to network issues
//server-error = request failed due to server issues
type ConnectionState = "idle" | "checking" | "success" | "timeout" | "network-error" | "server-error";

export function MatrixBreach() {
    const [password, setPassword] = useState("");
    const [touched, setTouched] = useState(false);
    const [connectionState, setConnectionState] = useState<ConnectionState>("idle");
    const [result, setResult] = useState<ValidationResult | null>(null);

    const inputId = useId();
    const statusId = useId();
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const requestIdRef = useRef(0);

    useEffect(() => {
        if (!touched || password.length === 0) { //if the user hasn't interacted with the input or the password is empty,
            //reset the result and connection state, to avoid showing any validation feedback or error messages
            setResult(null);
            setConnectionState("idle");
            return;
        }

        if (debounceRef.current) clearTimeout(debounceRef.current); //clear any existing debounce timeout to avoid 
        //sending multiple requests for the same input

        debounceRef.current = setTimeout(() => {
            const thisRequestId = ++requestIdRef.current;
            setConnectionState("checking");

            checkPassword(password).then((outcome) => {
                //Ignore responses from previous requests (user is still typing and has sent a new request)
                if (thisRequestId !== requestIdRef.current) return;

                switch (outcome.status) {
                    case "success":
                        setResult(outcome.result);
                        setConnectionState("success");
                        break;
                    case "timeout":
                        setConnectionState("timeout");
                        break;
                    case "network-error":
                        setConnectionState("network-error");
                        break;
                    case "server-error":
                        setConnectionState("server-error");
                        break;
                }
            });
        }, DEBOUNCE_MS);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [password, touched]);

    const isGranted = connectionState === "success" && result?.isValid === true;
    const showTrace = connectionState === "success" && result !== null && !result.isValid;

    //exclude "idle" and "success" from the connectionMessage object, as they don't require a message to be displayed
    const connectionMessage: Record<Exclude<ConnectionState, "idle" | "success">, string> = {
        checking: "Transmitting to Zion's Validation Core...",
        timeout: "Signal lost. The Core did not respond in time.",
        "network-error": "Connection severed. Cannot reach the Validation Core.",
        "server-error": "The Core rejected the transmission (server error).",
    };

    const statusMessage = isGranted
        ? "Access Granted. Matrix Breached."
        : connectionState === "success" && result
            ? result.errors.join(". ")
            : connectionState !== "idle" && connectionState !== "success"
                ? connectionMessage[connectionState]
                : "";

    return (
        <div className={`breach-console ${isGranted ? "breach-console--granted" : ""}`}>
            <div className="breach-console__scanlines" aria-hidden="true" />

            <header className="breach-console__header">
                <p className="breach-console__eyebrow">Zion Resistance // Access Point</p>
                <h1 className="breach-console__title">Matrix Breach Simulator</h1>
                <p className="breach-console__subtitle">
                    Validation now lives underground. The frontend only transmits.
                </p>
            </header>

            <div className="breach-console__field">
                <label htmlFor={inputId} className="breach-console__label">
                    Breach key
                </label>
                <div className="breach-console__input-wrapper">
                    <input
                        id={inputId}
                        type="text"
                        autoComplete="off"
                        spellCheck={false}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setTouched(true);
                        }}
                        onBlur={() => setTouched(true)}
                        aria-describedby={statusId}
                        aria-invalid={showTrace}
                        aria-busy={connectionState === "checking"} //indicate to screen readers that the input is busy when a request is being sent, for accessibility purposes
                        className={`breach-console__input ${showTrace ? "breach-console__input--trace" : ""}`}
                        placeholder="Enter exploit key..."
                    />
                    {connectionState === "checking" && (
                        <span className="breach-console__spinner" aria-hidden="true" />
                    )}
                </div>
            </div>

            <p id={statusId} role="status" aria-live="polite" className="breach-console__status">
                {statusMessage}
            </p>

            {result && (
                <ul className="breach-console__rules" aria-label="Zion's forged signature pattern requirements">
                    {result.ruleResults
                        .filter((rule) => rule.id !== "forbidden")
                        .map((rule) => (
                            <li
                                key={rule.id}
                                className={`breach-console__rule ${
                                    rule.passed ? "breach-console__rule--pass" : "breach-console__rule--fail"
                                }`}
                            >
                                <span className="breach-console__rule-marker" aria-hidden="true">
                                    {rule.passed ? "✓" : "✕"}
                                </span>
                                {rule.message}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}