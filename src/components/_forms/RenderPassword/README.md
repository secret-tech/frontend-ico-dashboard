# Password input renderer

This component have a redux-form validation and type changing above blueprint API.

- FormGroup's helperText now tip prop. If input is invalid, we hide tip and show error message.

- If input valid - we use NONE intent, if invalid - DANGER.

- Require redux-form metas to render intents and errors.

- Input's type stored in component state.

- InputGroup's rightElement disabled, coz we render eye here.

FormGroup API http://blueprintjs.com/docs/v2/#core/components/forms/form-group.javascript-api

InputGroup API http://blueprintjs.com/docs/v2/#core/components/forms/input-group.javascript-api

RenderInput REDME https://github.com/secret-tech/frontend-ico-dashboard/tree/develop/src/components/_forms/RenderInput/README.md
