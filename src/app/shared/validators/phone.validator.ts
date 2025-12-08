import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { isPossiblePhoneNumber } from 'libphonenumber-js';


export function phoneCrossFieldValidator(): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const countryCode = formGroup.get('phoneCountryCode')?.value;
    const phone = formGroup.get('phone')?.value;
    
    if (!countryCode || !phone) {
      return null; 
    }
    
    const fullPhoneNumber = `${countryCode}${phone}`.trim();
    const valid = isPossiblePhoneNumber(fullPhoneNumber);
    
    if (!valid) {
      const phoneControl = formGroup.get('phone');
      if (phoneControl) {
        phoneControl.setErrors({ ...phoneControl.errors, phone: true });
      }
      return { phone: true };
    }
    
    const phoneControl = formGroup.get('phone');
    if (phoneControl?.hasError('phone')) {
      const errors = { ...phoneControl.errors };
      delete errors['phone'];
      phoneControl.setErrors(Object.keys(errors).length > 0 ? errors : null);
    }
    
    return null;
  };
}

