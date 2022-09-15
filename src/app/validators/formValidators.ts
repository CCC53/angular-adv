import { AbstractControl, ValidationErrors } from '@angular/forms';

const termsValidator = (control: AbstractControl): ValidationErrors => control.value ? {} : { 'terms': true }

const emailValidator = (control: AbstractControl): ValidationErrors => {
    const regex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(control.value) ? {} : { 'email': true }
}

const passwordsValidator = (control: AbstractControl): ValidationErrors => {
    const { password, password2 } = control.value;
    if (!password || !password2) {
        return {}
    }
    if (password === password2) {
        return {}
    }
    return { 'passwords': true }
} 

export const formValidators = {
    validators: [
        { name: 'email', validation: emailValidator },
        { name: 'terms', validation: termsValidator },
        { name: 'passwords', validation: passwordsValidator }
    ],
    validationMessages: [
        { name: 'email', message: 'Not a valid email' },
        { name: 'terms', message: 'You must agree to the terms of use' },
        { name: 'required', message: 'This field is required' },
        { name: 'passwords', message: 'Password not matching' }
    ]
}