import * as yup from 'yup';

const personSchema = yup.object().shape({
    tipo_documento: yup.string().required('Tipo de documento es requerido'),
    documento_identidad: yup.string().when('tipo_documento', (tipo_documento, schema) => {
        return tipo_documento == '0' 
            ? schema.nullable(true).notRequired().length(0, "Debe estar vacío")
            : tipo_documento == '1' 
                ? schema.length(8, "Debe tener 8 dígitos").matches(/^\d*$/, "Solo puede contener números")
                : schema.length(12, "Debe tener 12 dígitos");
    }),
    nombres: yup.string().required("Los nombres son requeridos"),
    apellido_paterno: yup.string().required("Apellido paterno es requerido"),
    apellido_materno: yup.string().required("Apellido materno es requerido"),
    especialidad: yup.array().of(yup.string()).nullable(true),
    num_telefono: yup.array().of(yup.string()).nullable(true),
});

export default personSchema;