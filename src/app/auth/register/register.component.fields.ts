import { FormlyFieldConfig } from "@ngx-formly/core";

export const fields: FormlyFieldConfig[] = [
    {
        key: 'name',
        className: 'col-xs-12',
        type: 'input',
        props: { placeholder: 'Name', required: true },
    },
    {
        key: 'email',
        type: 'input',
        className: 'col-xs-12',
        props: { placeholder: 'Email', required: true, type: 'email' },
        validators: { validation: ['email'] },
    },
    {
        fieldGroup: [
            {
                key: 'password',
                type: 'input',
                className: 'col-xs-12',
                props: { placeholder: 'Password', required: true, type: 'password' },
            },
            {
                key: 'password2',
                type: 'input',
                className: 'col-xs-12',
                props: { placeholder: 'Confirm Password', required: true, type: 'password' },
            },
        ],
        validators: {
            validation: [{ name: 'passwords', options: { errorPath: 'password2' } }],
        }
    },
    {
        className: 'penny',
        key: 'terms',
        type: 'checkbox',
        defaultValue: false,
        props: { label: 'I agree to all Terms' },
        validators: { validation: ['terms'] }
    }
];