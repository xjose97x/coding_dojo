import { AbstractControl, FormControl, Validators } from '@angular/forms';

export class CommonValidators {
  static commaSepEmail = (control: AbstractControl) => {
    const emails = (control.value as string).replace(' ', '').split(',');
    const forbidden = emails.some(email => !!Validators.email(new FormControl(email)));
    console.log(forbidden);
    return forbidden ? { toAddress: { value: control.value } } : null;
  }
}
