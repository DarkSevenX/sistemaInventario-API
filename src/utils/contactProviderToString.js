/**
  * @function contactProviderToString
  * @description Convierte el contact de un proveedor de Bigint a String para que no de error
  * @param {object} provider - Proveedor con contact de tipo Bigint
  * @returns {object} Proveedor con contact de tipo String
  */
export const contactProviderToString = (provider) => {
  return { ...provider, contact: provider.contact.toString() };
};
