import { FormArray, ValidatorFn } from "@angular/forms";

export function phoneValidator() : ValidatorFn  {

    return (formArray: FormArray): {[key: string]: any} | null=> {

        
        let controls = formArray.controls;

        for(let idx = 0; idx < controls.length; idx++) {

            console.log(controls);
            let currentFormGroup = controls[idx];
            let nextFormGroup = controls[idx + 1];
            console.log(currentFormGroup.value);
            
            if (nextFormGroup === undefined) {
                return null;
            }

            console.log(nextFormGroup.value);

            if (currentFormGroup.get('phone').value === nextFormGroup.get('phone').value) {
                console.log('Phone Already Exists');
                return {error:'Phone Already Exists'};
            }

        }

        return null;
    }
    

}