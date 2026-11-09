# Submission judge

The judge will grade Python submissions against ordered private cases. It will stop at the first failure and return only the case position, failure type, and that case's input. The web app can load that input for a custom run.

Keep production tests, expected answers, and judge credentials in private storage. The ignored `private/` directory can hold local private fixtures. Public tests for the judge should use synthetic data. Document the service's local startup, verification, and deployment prerequisites here when it is implemented.
