import { FormlyFieldConfig } from "@ngx-formly/core";

export const fields: FormlyFieldConfig[] = [
    {
        key: 'email',
        type: 'input',
        className: 'col-xs-12',
        props: { placeholder: 'Email', required: true, type: 'email' },
        validators: { validation: ['email'] },
    },
    {
        key: 'password',
        type: 'input',
        className: 'col-xs-12',
        props: { placeholder: 'Password', required: true, type: 'password' },
    },
    {
        fieldGroupClassName: 'd-flex justify-content-between',
        fieldGroup: [
            {
                key: 'remember',
                type: 'checkbox',
                defaultValue: false,
                props: { label: 'Remember me' }
            },
            {
                template: '</div><a href="javascript:void(0)" id="to-recover" class="text-dark pull-right"><i class="fa fa-lock m-r-5"></i> Forgot pwd?</a> </div>'
            }
        ]
    }
];