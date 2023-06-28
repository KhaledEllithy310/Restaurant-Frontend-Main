import { AbstractControl, ValidationErrors } from "@angular/forms";

export class userValidators {

    static cantContainSpace(control: AbstractControl): ValidationErrors | null {
        
        if((control.value as string).indexOf('') >= 0) {
            return {
                cantSpace: true
            }
        }
        return null
    }

}