<template>
    <main>
        <form class="card">
            <section class="container__info">
                <!-- Encabezdo del Fornulario -->
                <header>
                    <h1>Contact Us</h1>
                </header>
                <!-- Nombre -->
                <p class="first_name">
                    <label for="first_name">
                        <span>First Name</span>
                        <strong>*</strong>
                    </label>
                    <input
                      :class="{'invalid-input': v$.form.firstName.$error}"
                      v-model="form.firstName"
                      type="text" 
                      id="first_name" 
                      name="firstName"
                      autocomplete
                    >
                    <!-- Error -->
                    <span v-if="getError('firstName')" class="error__text">
                        {{ getError('firstName') }}
                    </span>
                </p>
                <!-- Apellido -->
                <p class="last_name">
                    <label for="last_name">
                        <span>Last Name</span>
                        <strong>*</strong></label>
                    <input
                      :class="{'invalid-input': v$.form.lastName.$error}"
                      v-model="form.lastName"
                      type="text" 
                      id="last_name" 
                      name="lastName"
                      autocomplete
                    >
                    <!-- Error -->
                    <span v-if="getError('lastName')" class="error__text">
                        {{ getError('lastName') }}
                    </span>                  
                </p>
                <!-- Email -->
                <p>
                    <label for="email">
                        <span>Email Address</span>
                        <strong>*</strong></label>
                    <input 
                      :class="{'invalid-input': v$.form.email.$error}"
                      v-model="form.email"
                      type="text" 
                      id="email" 
                      name="email"
                      autocomplete
                    >
                    <!-- error -->
                    <span v-if="getError('email')" class="error__text">
                        {{ getError('email') }}
                    </span>                        
                </p>
                <!-- Tipo de query -->
                <div class="container_radio">
                    
                    <label for="">
                        <span>Query Type</span>
                        <strong>*</strong>
                    </label>
                    <div>
                        <p class="generalQuery">
                            <input 
                              type="radio"
                              value="general"
                              v-model="form.query"
                              name="query" 
                              id="general">
                            <label for="general">General Enquiry</label>
                        </p>
                        <p class="generalQuery">
                            <input 
                              type="radio"
                              value="request"
                              v-model="form.query"
                              name="query" 
                              id="request">
                            <label for="request">Support Request</label>
                        </p>
                    </div>
                    <!-- Error -->
                    <span v-if="v$.form.query.$error && v$.form.query.$dirty" class="error__text">
                        Please select a query type
                    </span>
                </div>
                <!-- Mensaje -->
                <p>
                    <label for="message">
                        <span>Message</span>
                        <strong>*</strong></label>
                    <textarea 
                      v-model="form.message"
                      name="message" 
                      id="message"
                      autocomplete
                      :class="{'invalid-input': v$.form.message.$error}"
                    ></textarea>
                    <!-- Error -->
                    <span v-if="getError('message')" class="error__text">
                        {{ getError('message') }}
                    </span>                    
                </p>
            </section>
            <!-- Terminos y condiciones -->
            <p class="term-condition">
                <label for="term">
                    <input
                        v-model="form.termCondition"
                        type="checkbox" 
                        id="term" 
                        @change="v$.form.termCondition.$touch()" 
                        name="termCondition">
                    <span>I consent to being contacted by the team </span>
                    <strong>*</strong>
                </label>
                <!-- Error -->
                <span v-if="v$.form.termCondition.$error && v$.form.termCondition.$dirty" class="error__text">
                  To submit this form, please consent to being contacted
                </span>
            </p>
            <!-- Bonton de envio -->
            <button type="button" @click="subminData">Submit</button>
        </form>
    </main>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, email, alpha, } from "@vuelidate/validators";

export default {
    setup () {
        return { v$: useVuelidate() }
    },
    data() {
        return {
            form: {
                firstName: '',
                lastName: '',
                email: '',
                query: null,
                message: '',
                termCondition: false,
            },
        }
    },
    computed: {
        getError() {
            return (field) => {
                const firstNameErrors = this.v$.$errors.filter(err => err.$property === field);
                return firstNameErrors.length ? firstNameErrors[0].$message : null;
            }
        }
    },
    validations() {
        const alphaWithSpaces = helpers.regex(/^[A-Za-zÀ-ÿ\s]+$/);            
        return {
            form: {
                firstName: {
                    required: helpers.withMessage('This field is required', required),
                    alphaWithSpaces: helpers.withMessage('Solo se permiten letras y espacios.', alphaWithSpaces),
                },
                lastName: {
                    required: helpers.withMessage('This field is required', required),
                    alphaWithSpaces: helpers.withMessage('Solo se permiten letras y espacios.', alphaWithSpaces),
                },
                email: {
                    required: helpers.withMessage('This field is required', required),
                    email: helpers.withMessage('Please enter a valid email address', email)
                },
                query: {
                    required,
                },
                message: {
                    required: helpers.withMessage('This field is required', required),
                },
                termCondition: {
                    required: this.requiredTermin
                }
            }
        }
    },
    methods: {
        requiredTermin(value){
            return value === true;
        },
        subminData(){
            const formValid = this.validarForm();
            if (formValid) {
                this.$emit('save-data', this.form)
                this.v$.$reset() // Limpiar errores de validación
                this.clearForm();
            } else {
                this.$emit('save-data', formValid)
            }
        },
        validarForm() {
            if (this.v$) {
              this.v$.$touch()
            if (!this.v$.$invalid) {      
                return true;
            } else {
                return false;
            }
            } else {
              return false;
            }
        },
        clearForm() {
            this.form.firstName = '';
            this.form.lastName = '';
            this.form.email = '';
            this.form.query = null;
            this.form.message = '';
            this.form.termCondition = false;
        }
    }
}
</script>

<style lang="scss" scoped>
// Estilos Base 
%flex-column {
    display: flex;
    flex-direction: column;
}
%input-style {
    font-family: inherit;
    border: 1px solid $grey-500;
    border-radius: .8rem;
    padding: 1.2rem 2.4rem;
    background-color: white;
    color: $grey-900;
    font-size: 1.8rem;
    font-weight: 400;
    height: 5.1rem;
    &:hover {
        cursor: pointer;
        border-color: $green-600;
    }
}
main {
        background-color: $green-200;
        height: 100%;
        padding: 3.2rem 1.6rem;
        min-height: 100vh;
        .card {
            display: flex;
            flex-direction: column;
            gap: 4rem;
            border-radius: 1.6rem;
            background-color: white;
            padding: 2.4rem;
            .container__info {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                row-gap: 2.4rem;
                header {
                    margin-bottom: .8rem;
                    grid-column: 1 / -1;
                    width: 100%;
                    h1 {
                        font-size: 3.2rem;
                        font-weight: 700;
                        color: $grey-900;
                    }
                }
                p {
                    @extend %flex-column;
                    gap: .8rem;
                    grid-column: 1 / -1;

                    label {
                        display: flex;
                        gap: .8rem;
                        align-items: center;
                        height: 2.4rem;
                        span {
                            font-weight: 400;
                            color: $grey-900;
                        }
                        strong {
                            color: $green-600;
                        }
                    }
                    input, textarea {
                        @extend %input-style;
                        &:focus {
                            outline: none;
                            border-color: $green-600 !important;
                            box-shadow: 0 0 5px $green-600;
                        }
                    }
                    textarea {
                        height: 20.4rem;
                    }
                }
                .container_radio {
                    @extend %flex-column;
                    gap: 1.6rem;
                    grid-column: 1 / -1;

                    label {
                        display: flex;
                        gap: .8rem;
                        align-items: center;
                        height: 2.4rem;

                        span {
                            color: $grey-900;
                        }
                        strong {
                            color: $green-600;
                        }
                    }

                    div {
                        @extend %flex-column;
                        gap: 1.6rem;
                        .generalQuery:has(input:checked) {
                            background-color: hsla(169, 82%, 27%, 0.171);
                        }
                        p {
                            display: flex;
                            flex-direction: row;
                            gap: 1.2rem;
                            border-radius: .8rem;
                            border: 1px solid $grey-500;
                            padding: 1.2rem 2.4rem;

                            &:hover {
                                cursor: pointer;
                                border-color: $green-600;
                            }

                            label {
                                font-size: 1.8rem;
                                color: $grey-900;
                            }

                            input[type="radio"] {
                                appearance: none;
                                padding: 0;
                                border: 1px solid $grey-500;
                                border-radius: 50%;
                                height: 2.4rem;
                                width: 2.4rem;
                                outline: none;
                            }

                            input[type="radio"]:checked {
                                border: none;
                                background: url('../assets/images/icon-radio-selected.svg');
                                background-repeat: no-repeat;
                                background-position: center;
                                background-size: contain;
                            }
                        }
                    }
                }
            }
            .term-condition {
                @extend %flex-column;
                gap: 1rem;
                label {
                    display: flex;
                    gap: 1.6rem;
                    align-items: center;
                    span {
                        font-weight: 400;
                        color: $grey-900;
                    }

                    strong {
                        color: $green-600;
                    }

                    &:hover {
                    cursor: pointer;
                }
                }

                input[type="checkbox"] {
                    appearance: none;
                    position: relative;
                    border: .2rem solid $grey-500;
                    vertical-align: -2px;
                    width: 1.8rem;
                    height: 1.8rem;

                    &:hover {
                        cursor: pointer;
                    }
                }

                input[type="checkbox"]:checked {
                    border: none;
                    background-image: url('../assets/images/icon-checkbox-check.svg');
                    background-position: center;
                    background-repeat: no-repeat;
                }
                
            }
            button {
                font-family: inherit;
                border: none;
                border-radius: .8rem;
                color: white;
                font-size: 1.8rem;
                font-weight: 700;
                background-color: $green-600;
                padding: 1.6rem 4rem;
                height: 5.9rem;
                
                &:hover {
                    cursor: pointer;
                    background-color: $green-600-50;
                }
            }
        }
    }
.invalid-input {
  border-color: $color-error !important;
}  
.error__text {
    color: $color-error;
    font-size: 1.6rem;
    font-weight: 400;
}  
@media screen and (min-width: 48rem) {
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 12.8rem 0;
        .card {
            padding: 4rem;
            max-width: 73.6rem;
            .container__info {
                column-gap: 1.6rem;
                .first_name {
                    grid-column: 1 / 3;
                }

                .last_name {
                    grid-column: 3 / -1;
                }

                .container_radio {

                    div {
                        flex-direction: row;
                         
                        p {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }

}

@media screen and (min-width: 64rem) {
    main {
        .card {
            margin: 0 auto;

            .container__info {

                p {

                    textarea {
                         height: 10.5rem;
                    }
                }
            }
        }
    }
}
</style>