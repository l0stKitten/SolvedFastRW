import * as yup from 'yup';

const telephonNumberSchema = yup.object().shape({
    num_telefono: yup.string()
        .nullable(true) // Allows the value to be null
        .notRequired() // Field is not required
        .matches(/^\d*$/, "Solo puede contener números") // Adjusted to allow empty string
        .test(
            'len',
            'Debe tener 6 o 9 dígitos',
            val => !val || val.length === 0 || val.length === 6 || val.length === 9
        )
});

export default telephonNumberSchema;