# Text input renderer

This component have a redux-form validation above blueprint API. I'm change just few things:

- FormGroup's helperText now tip prop. If input is invalid, we hide tip and show error message

- If input valid - we use NONE intent, if invalid - DANGER.

- Require redux-form metas to render intents and errors.  

FormGroup API http://blueprintjs.com/docs/v2/#core/components/forms/form-group.javascript-api

InputGroup API http://blueprintjs.com/docs/v2/#core/components/forms/input-group.javascript-api
