interface ValidationResponse {
  isValid: boolean;
  errorCode?: number & any;
}

interface ComposeValidationResponse {
  isValid: boolean;
  errors: number[];
}

interface ArgumentsValidationFunctions {
  [val: string]: string & number & { [val: string]: string };
}

class ValidateInfo {
  composeValidation(
    value: any,
    callback: any,
    ...validationFunctions: Array<
      (value: ArgumentsValidationFunctions) => ValidationResponse
    >
  ) {
    const response: ComposeValidationResponse = {
      isValid: true,
      errors: []
    };

    validationFunctions.forEach(func => {
      const validaditionResponse: ValidationResponse = func.call(this, value);
      if (response.isValid && !validaditionResponse.isValid)
        response.isValid = false;

      if (!validaditionResponse.isValid) {
        response.errors.push(validaditionResponse.errorCode);
      }
    });

    callback(response);
  }

  validateValueNumber(
    params: ArgumentsValidationFunctions
  ): ValidationResponse {
    if (/[0-9]/.test(params.value)) {
      return {
        isValid: false,
        errorCode: params.errorNameValidateValueNumber
      };
    } else return { isValid: true };
  }

  validateValueDate(params: ArgumentsValidationFunctions): ValidationResponse {
    if (
      params.day &&
      params.year &&
      params.month &&
      params.minAge &&
      this.isDateValid({
        day: params.day,
        month: params.month,
        year: params.year
      })
    ) {
      const now = new Date();
      const minAccsessDate = new Date(
        now.getFullYear() - params.minAge,
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0
      );
      const date = new Date(+params.year, +params.month - 1, +params.day);

      if (typeof date === "object") {
        const testYear = this.validateValueDateOnMaxAge(params);
        // debugger;
        if (!testYear.isValid) {
          return {
            isValid: false,
            errorCode: params.errorNameValidateValueDate.uncrible
          };
        }
        // debugger;
        const difDate = date.getTime() - minAccsessDate.getTime();
        if (difDate <= 0) {
          return {
            isValid: true
          };
        }
        return {
          isValid: false,
          errorCode: params.errorNameValidateValueDate.year
        };
      }
    } else {
      return {
        isValid: false,
        errorCode: params.errorNameValidateValueDate.uncrible
      };
    }
    return {
      isValid: false,
      errorCode: params.errorNameValidateValueDate.uncrible
    };
  }

  validateValueSpace(params: ArgumentsValidationFunctions): ValidationResponse {
    ////debugger;
    if (/\s+/g.test(params.value)) {
      return {
        isValid: false,
        errorCode: params.errorNameValidateValueSpace
      };
    }
    return {
      isValid: true
    };
  }

  validateValueLength(
    params: ArgumentsValidationFunctions
  ): ValidationResponse {
    if (this.checkSizeValue(params.value)) {
      return { isValid: true };
    }

    if (params.value.length >= params.startLength) {
      if (params.endLength) {
        if (params.value.length <= params.endLength) {
          return {
            isValid: true
          };
        } else {
          return {
            isValid: false,
            errorCode: params.errorNameValidateValueLength
          };
        }
      }
      return {
        isValid: true
      };
    }
    // Плохо
    return {
      isValid: false,
      errorCode: params.errorNameValidateValueLength
    };
  }

  validateValueMail(params: ArgumentsValidationFunctions): ValidationResponse {
    if (this.checkSizeValue(params.value)) {
      return { isValid: true };
    }
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(params.value).toLowerCase())) {
      return {
        isValid: true
      };
    } else
      return {
        isValid: false,
        errorCode: params.errorNameValidateValueMail
      };
  }

  validateValueSpecificSymbol(
    params: ArgumentsValidationFunctions
  ): ValidationResponse {
    if (this.checkSizeValue(params.value)) {
      return { isValid: true };
    }
    ////debugger;
    for (let i = 0; i < params.specificSymbol.length; i++) {
      if (params.value.indexOf(params.specificSymbol[i]) !== -1) {
        return {
          isValid: false,
          errorCode: params.errorNameValidateValueSpecificSymbol
        };
      }
    }
    return {
      isValid: true
    };
  }

  validateValueLatin(params: ArgumentsValidationFunctions): ValidationResponse {
    if (this.checkSizeValue(params.value)) {
      return { isValid: true };
    }
    ////debugger;
    if (params.value)
      if (/[^a-z]/gi.test(String(params.value).toLowerCase())) {
        return {
          isValid: false,
          errorCode: params.errorNameValidateValueLatin
        };
      }
    return {
      isValid: true
    };
  }

  validateValueKyrillic(
    params: ArgumentsValidationFunctions
  ): ValidationResponse {
    if (this.checkSizeValue(params.value)) {
      return { isValid: true };
    }
    ////debugger;
    if (/^([а-яА-ЯёЁ])*$/.test(params.value)) {
      return {
        isValid: false,
        errorCode: params.errorNameValidateValueKyrillic
      };
    } else
      return {
        isValid: true
      };
  }

  /// method not used  in compose

  replaceValueByMask(params: { value: string; mask: string }) {
    let i = 0;
    let def = params.mask.replace(/\D/g, "");
    let val = params.value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    let validValue = params.mask.replace(/./g, function(a) {
      return /[X\d]/.test(a) && i < val.length
        ? val.charAt(i++)
        : i >= val.length
        ? ""
        : a;
    });
    return validValue;
  }
  getArrayElementToObj(params: {
    value: string;
    obj: {
      number: string;
    };
  }) {
    if (params.value.length === 0) return [];
    const arrayObject = this.objectToArrayValue(params.obj).sort();
    return arrayObject.filter(element => {
      const index = element.toLowerCase().indexOf(params.value.toLowerCase());
      if (index === 0) {
        return true;
      }
      return false;
    });
  }

  searchElementToObj(params: {
    value: string;
    obj: {
      number: string;
    };
  }) {
    const arraytoArray = Object.entries(params.obj);
    arraytoArray.map(array => array.reverse());
    const mapCountry = new Map(arraytoArray);
    if (mapCountry.has(params.value)) {
      return mapCountry.get(params.value);
    }
    return false;
  }

  objectToArrayValue(obj: { number: string }) {
    return Object.values(obj);
  }

  objectToArrayKey(obj: { number: string }) {
    return Object.keys(obj);
  }

  validateValueLogin(params: ArgumentsValidationFunctions): ValidationResponse {
    if (this.checkSizeValue(params.value)) {
      return { isValid: true };
    }
    const iif = /^[A-Za-z0-9]+$/; //{6,25}

    if (iif.test(params.value))
      return {
        isValid: true
      };
    else
      return {
        isValid: false,
        errorCode: params.errorNameValidateValueLogin
      };
  }

  validateValueDateOnMaxAge(
    params: ArgumentsValidationFunctions
  ): ValidationResponse {
    // debugger;
    const now = new Date();
    if (now.getFullYear() - params.year <= 100) {
      return {
        isValid: true
      };
    }
    return {
      isValid: false,
      errorCode: 1011
    };
  }

  //////// method for class

  // private
  private checkSizeValue(value: string) {
    if (value.length === 0) return true;

    return false;
  }

  private isDateValid(date: {
    day: number;
    month: number;
    year: number;
  }): boolean {
    const evalDate = new Date(date.year, date.month - 1, date.day);
    return (
      evalDate.getFullYear() === date.year &&
      evalDate.getMonth() + 1 === date.month &&
      evalDate.getDate() === date.day
    );
  }
}

export const validateInfo = new ValidateInfo();
