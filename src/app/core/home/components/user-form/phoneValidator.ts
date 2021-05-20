import { FormArray, ValidatorFn } from "@angular/forms";

export function phoneValidator() : ValidatorFn  {

    return (formArray: FormArray): {[key: string]: any} | null=> {

        
        let controls = formArray.controls;

        for(let idx = 0; idx < controls.length; idx++) {

            let currentFormGroup = controls[idx];
            let nextFormGroup = controls[idx + 1];
            
            if (nextFormGroup === undefined) {
                return null;
            }


            if (currentFormGroup.get('phone').value === nextFormGroup.get('phone').value) {
                return {error:'Phone Already Exists'};
            }

        }

        return null;
    }
    

}