import { FormlyFieldConfig } from '@ngx-formly/core';

export const fields: FormlyFieldConfig[] = [
    {
        key: 'name',
        type: 'input',
        props: { placeholder: 'Username', label: 'User Name', required: true }
    },
    {
        key: 'email',
        type: 'input',
        props: { placeholder: 'Enter email', label: 'Email Adress', required: true },
        expressions: {
            'props.disabled': 'model.google'
        },
        validators: {
            validation: ['email']
        }
    }
];