'use strict'

let Enum = {
  'ADMINISTRATION_ACCOUNTS': 'ADMINISTRATION_ACCOUNTS',
  'BUSINESS_DEVELOPER': 'BUSINESS_DEVELOPER',
  'FLYER': 'FLYER',
  'HOST_VALET': 'HOST_VALET',
  'INVENTORY': 'INVENTORY',
  'DELIVERY': 'DELIVERY',
  'HEFTING': 'HEFTING',
  'PACKER': 'PACKER',
  'PHONE_CUSTOMER_SERVICE': 'PHONE_CUSTOMER_SERVICE',
  'ONLINE_SEARCH': 'ONLINE_SEARCH',
  'DATA': 'DATA',
  'WAITER': 'WAITER',
  'SAlES_ASSISTANT': 'SAlES_ASSISTANT',
  'OTHER': 'OTHER',

  /**
   * Get the url of the image for the category.
   * @param {string} category - Category of the mission.
   * @return {string} Url of the image.
   */
  getImgUrl(category) {
    if (category === 'ADMINISTRATION_ACCOUNTS') return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/data-2.gif'
    else if (category === 'BUSINESS_DEVELOPER') return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/business-developer-2.gif'
    else if (category === 'FLYER') return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/flyer-2.gif'
    else if (category === 'HOST_VALET') return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/parking-valet-2.gif'
    else if (category === 'INVENTORY') return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/inventoring-2.gif'
    else if (category === 'DELIVERY') return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/livreur-2.gif'
    else if (category === 'HEFTING') return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/manutention-2.gif'
    else if (category === 'PACKER') return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/packer-2.gif'
    else if (category === 'PHONE_CUSTOMER_SERVICE') return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/phoning-woman-2.gif'
    else if (category === 'ONLINE_SEARCH') return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/search-2.gif'
    else if (category === 'DATA') return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/data-2.gif'
    else if (category === 'WAITER') return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/serveur-2.gif'
    else if (category === 'SAlES_ASSISTANT') return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/vendeur-2.gif'
    else if (category === 'OTHER') return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/other-2.gif'
    else return 'https://s3.eu-west-3.amazonaws.com/hellodough/chatbot-images/other-2.gif'
  },

  /**
   * Get the url of the image for the category.
   * @param {string} category - Category of the mission.
   * @return {string} Url of the image.
   */
  getTranslation(category) {
    if (category === 'ADMINISTRATION_ACCOUNTS') return 'Comptabilité'
    else if (category === 'BUSINESS_DEVELOPER') return 'Business developement'
    else if (category === 'FLYER') return 'Flyer'
    else if (category === 'HOST_VALET') return 'Hôtes/Hôtesses'
    else if (category === 'INVENTORY') return 'Inventaire'
    else if (category === 'DELIVERY') return 'Livraison'
    else if (category === 'HEFTING') return 'Manutention'
    else if (category === 'PACKER') return 'Packer'
    else if (category === 'PHONE_CUSTOMER_SERVICE') return 'Support client'
    else if (category === 'ONLINE_SEARCH') return 'Recherche en ligne'
    else if (category === 'DATA') return 'Saisie de données'
    else if (category === 'WAITER') return 'Serveur/Serveuse'
    else if (category === 'SAlES_ASSISTANT') return 'Vente'
    else if (category === 'OTHER') return 'Autre'
    else return 'Unknown'
  },

  /**
   * Get the name of a person doing such work.
   * @param {string} category - Category of the mission.
   * @return {string} Name of a person doing such work.
   */
  getDesignation(category) {
    if (category === 'ADMINISTRATION_ACCOUNTS') return 'comptable'
    else if (category === 'BUSINESS_DEVELOPER') return 'business developer'
    else if (category === 'FLYER') return 'distributeur'
    else if (category === 'HOST_VALET') return 'voiturier'
    else if (category === 'INVENTORY') return 'inventoriste'
    else if (category === 'DELIVERY') return 'livreur'
    else if (category === 'HEFTING') return 'manutentionnaire'
    else if (category === 'PACKER') return 'packer'
    else if (category === 'PHONE_CUSTOMER_SERVICE') return 'support client'
    else if (category === 'ONLINE_SEARCH') return 'chercheur'
    else if (category === 'DATA') return 'data scientist'
    else if (category === 'WAITER') return 'serveur'
    else if (category === 'SAlES_ASSISTANT') return 'vendeur'
    else if (category === 'OTHER') return 'factotum'
    else return 'Unknown'
  }
}

Object.freeze(Enum)

module.exports = Enum
