import * as yup from 'yup';

const quitarSuspensionSchema = yup.object().shape({
    suceso: yup.string().required('Suceso es requerido'),
    comentario: yup.string().nullable(true).notRequired(),
});

export default quitarSuspensionSchema;